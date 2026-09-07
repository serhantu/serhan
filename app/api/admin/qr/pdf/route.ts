import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateQrTemplate, type TemplateType } from "@/lib/qr-templates";
import { getSiteSettings } from "@/lib/site-settings";
import { generateA4PdfFromSvgs } from "@/lib/pdf";

// POST /api/admin/qr/pdf
//
// Generates a print-ready A4 PDF for one or multiple schools.
// Single school -> 1-page PDF
// Multiple schools -> Multi-page combined booklet (1 page per school)
export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const body = await req.json();
  const { schoolIds, template = "poster" } = body as {
    schoolIds?: string[];
    template?: string;
  };

  if (!schoolIds || !Array.isArray(schoolIds) || schoolIds.length === 0) {
    return NextResponse.json({ error: "En az bir okul seçmelisiniz." }, { status: 400 });
  }

  const schools = await prisma.okul.findMany({
    where: { id: { in: schoolIds } },
    select: { id: true, ad: true, slug: true },
  });

  if (schools.length === 0) {
    return NextResponse.json({ error: "Okul bulunamadı." }, { status: 404 });
  }

  const settings = await getSiteSettings();

  const svgs: string[] = [];
  for (const school of schools) {
    const svg = await generateQrTemplate(template as TemplateType, {
      schoolName: school.ad,
      schoolSlug: school.slug,
      companyName: settings.companyName,
      phone: settings.phone || undefined,
    });
    svgs.push(svg);
  }

  const pdfBytes = await generateA4PdfFromSvgs(svgs);

  const filename =
    schools.length === 1
      ? `qr-a4-poster-${schools[0].slug}.pdf`
      : `qr-a4-posterlar-toplu-${schools.length}-okul.pdf`;

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
