import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildPublicOnKayitUrl, generateQrPng, generateQrSvg } from "@/lib/qr";
import { generateQrTemplate, type TemplateType } from "@/lib/qr-templates";
import { getSiteSettings } from "@/lib/site-settings";
import { generateA4PdfFromSvgs } from "@/lib/pdf";

// GET /api/admin/okullar/[id]/qr?format=png|svg|pdf
//
// Server-only QR generation. Resolves the school by `id` (never trusting a
// client-provided URL or slug for identity), derives the canonical public URL
// from the immutable slug, and returns a freshly generated QR image. The image
// is never stored (no QR model, no DB storage); it is always regenerable.
type QrRouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: QrRouteContext) {
  const { id } = await ctx.params;
  const format = req.nextUrl.searchParams.get("format") ?? "png";

  const okul = await prisma.okul.findUnique({
    where: { id },
    select: { id: true, ad: true, slug: true },
  });
  if (!okul) {
    return new NextResponse("Okul bulunamadı.", { status: 404 });
  }

  const url = buildPublicOnKayitUrl(okul.slug);

  if (format === "pdf") {
    const template = (req.nextUrl.searchParams.get("template") ?? "poster") as TemplateType;
    const settings = await getSiteSettings();
    const svg = await generateQrTemplate(template, {
      schoolName: okul.ad,
      schoolSlug: okul.slug,
      companyName: settings.companyName,
      phone: settings.phone || undefined,
    });
    const pdfBytes = await generateA4PdfFromSvgs([svg]);
    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "content-type": "application/pdf",
        "content-disposition": `attachment; filename="serhan-a4-poster-${okul.slug}.pdf"`,
        "cache-control": "no-store",
      },
    });
  }

  if (format === "svg") {
    const svg = await generateQrSvg(url);
    return new NextResponse(svg, {
      status: 200,
      headers: {
        "content-type": "image/svg+xml; charset=utf-8",
        "content-disposition": `inline; filename="serhan-qr-${id}.svg"`,
        "cache-control": "no-store",
      },
    });
  }

  const png = await generateQrPng(url);
  return new NextResponse(new Blob([png], { type: "image/png" }), {
    status: 200,
    headers: {
      "content-type": "image/png",
      "content-disposition": `inline; filename="serhan-qr-${id}.png"`,
      "cache-control": "no-store",
    },
  });
}
