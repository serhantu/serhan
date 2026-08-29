import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateQrTemplate, type TemplateType } from "@/lib/qr-templates";
import { getSiteSettings } from "@/lib/site-settings";

// POST /api/admin/qr/batch
//
// Accepts JSON: { schoolIds: string[], template: "label"|"poster"|"sticker" }
// Returns an array of { schoolId, schoolName, svg } objects.

const VALID_TEMPLATES = new Set<TemplateType>(["label", "poster", "sticker"]);

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const body = await req.json();
  const { schoolIds, template } = body as {
    schoolIds?: string[];
    template?: string;
  };

  if (!schoolIds || !Array.isArray(schoolIds) || schoolIds.length === 0) {
    return NextResponse.json({ error: "En az bir okul seçmelisiniz." }, { status: 400 });
  }

  if (!template || !VALID_TEMPLATES.has(template as TemplateType)) {
    return NextResponse.json(
      { error: "Geçerli bir şablon seçin: label, poster, sticker." },
      { status: 400 },
    );
  }

  const schools = await prisma.okul.findMany({
    where: { id: { in: schoolIds } },
    select: { id: true, ad: true, slug: true },
  });

  if (schools.length === 0) {
    return NextResponse.json({ error: "Okul bulunamadı." }, { status: 404 });
  }

  const settings = await getSiteSettings();

  const results = await Promise.all(
    schools.map(async (school) => {
      const svg = await generateQrTemplate(template as TemplateType, {
        schoolName: school.ad,
        schoolSlug: school.slug,
        companyName: settings.companyName,
        phone: settings.phone || undefined,
      });

      return {
        schoolId: school.id,
        schoolName: school.ad,
        svg,
      };
    }),
  );

  return NextResponse.json({ results });
}
