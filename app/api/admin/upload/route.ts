import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { uploadToR2, isR2Configured } from "@/lib/r2";
import crypto from "node:crypto";

// POST /api/admin/upload
//
// Accepts multipart/form-data with a single file field named "file".
// Validates admin session, file size (max 5MB), and MIME type (image/*).
// Uploads to R2 and returns the public URL.

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

function extFromMime(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
  };
  return map[mime] ?? "bin";
}

export async function POST(req: NextRequest) {
  // Auth check
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  // R2 availability check
  if (!isR2Configured()) {
    return NextResponse.json(
      { error: "R2 yapılandırılmamış. Ortam değişkenlerini kontrol edin." },
      { status: 503 },
    );
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Dosya gereklidir." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: `Dosya boyutu ${MAX_FILE_SIZE / (1024 * 1024)}MB'yi aşamaz.` },
      { status: 400 },
    );
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Sadece resim dosyaları (JPEG, PNG, WebP, GIF, SVG) yüklenebilir." },
      { status: 400 },
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const hash = crypto.createHash("sha256").update(buffer).digest("hex").slice(0, 12);
  const timestamp = Date.now();
  const ext = extFromMime(file.type);
  const key = `images/${timestamp}-${hash}.${ext}`;

  try {
    const url = await uploadToR2(buffer, key, file.type);
    return NextResponse.json({ url, key });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Yükleme başarısız.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
