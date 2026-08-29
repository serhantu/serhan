import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { uploadToR2, isR2Configured } from "@/lib/r2";
import crypto from "node:crypto";

// POST /api/admin/upload
//
// Hardened upload endpoint:
//   - Requires valid admin session.
//   - Validates file size (max 5MB).
//   - Allows only safe raster image formats (JPEG, PNG, WebP, GIF). SVG is explicitly disabled for XSS prevention.
//   - Inspects binary Magic Bytes to verify the actual file signature (prevents MIME spoofing).
//   - Generates content-addressable + timestamped keys (prevents path traversal and collisions).

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

type AllowedMime = "image/jpeg" | "image/png" | "image/webp" | "image/gif";

const ALLOWED_MIME_TYPES: Set<AllowedMime> = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function extFromMime(mime: AllowedMime): string {
  const map: Record<AllowedMime, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  return map[mime] ?? "bin";
}

/**
 * Validate binary file signatures (Magic Bytes).
 */
function validateImageMagicBytes(buffer: Buffer): AllowedMime | null {
  if (buffer.length < 12) return null;

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "image/png";
  }

  // GIF: GIF87a or GIF89a
  if (
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38 &&
    (buffer[4] === 0x37 || buffer[4] === 0x39) &&
    buffer[5] === 0x61
  ) {
    return "image/gif";
  }

  // WebP: RIFF .... WEBP
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return "image/webp";
  }

  return null;
}

export async function POST(req: NextRequest) {
  // 1. Auth check
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  // 2. R2 configuration check
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

  // 3. File size limit
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: `Dosya boyutu ${MAX_FILE_SIZE / (1024 * 1024)}MB'yi aşamaz.` },
      { status: 400 },
    );
  }

  // 4. Initial MIME check
  if (!ALLOWED_MIME_TYPES.has(file.type as AllowedMime)) {
    return NextResponse.json(
      { error: "Sadece resim dosyaları (JPEG, PNG, WebP, GIF) yüklenebilir." },
      { status: 400 },
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 5. Binary magic bytes validation
  const detectedMime = validateImageMagicBytes(buffer);
  if (!detectedMime || !ALLOWED_MIME_TYPES.has(detectedMime)) {
    return NextResponse.json(
      { error: "Geçersiz veya bozuk resim dosyası." },
      { status: 400 },
    );
  }

  // 6. Safe content-addressable key generation
  const hash = crypto.createHash("sha256").update(buffer).digest("hex").slice(0, 16);
  const timestamp = Date.now();
  const ext = extFromMime(detectedMime);
  const key = `images/${timestamp}-${hash}.${ext}`;

  try {
    const url = await uploadToR2(buffer, key, detectedMime);
    return NextResponse.json({ url, key });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Yükleme başarısız.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
