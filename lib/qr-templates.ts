// QR print template generators.
//
// These functions compose a QR code with school/company information into
// print-ready SVG strings. The SVG can be rendered inline for preview or
// converted to PNG for download.
//
// Template types:
//   - label:   6×9 cm service vehicle sticker
//   - poster:  A4 portrait poster
//   - sticker: 5×5 cm compact square

import "server-only";
import { generateQrSvg, buildPublicOnKayitUrl, type QrRenderOptions } from "@/lib/qr";

export type TemplateType = "label" | "poster" | "sticker";

export type TemplateInput = {
  schoolName: string;
  schoolSlug: string;
  companyName?: string;
  phone?: string;
};

/**
 * Generate a print-ready SVG template for a given school.
 * Returns raw SVG string.
 */
export async function generateQrTemplate(
  template: TemplateType,
  input: TemplateInput,
): Promise<string> {
  const url = buildPublicOnKayitUrl(input.schoolSlug);
  const companyName = input.companyName || "Serhan Turizm";

  const qrOptions: QrRenderOptions = {
    margin: 1,
    errorCorrectionLevel: "H",
  };

  const qrSvg = await generateQrSvg(url, qrOptions);
  // Extract the inner SVG content (remove the outer <svg> wrapper)
  const qrInner = qrSvg
    .replace(/<\?xml[^?]*\?>/, "")
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>/, "");

  // Extract viewBox from the original QR SVG
  const viewBoxMatch = qrSvg.match(/viewBox="([^"]*)"/);
  const qrViewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 33 33";

  switch (template) {
    case "label":
      return buildLabelSvg(qrInner, qrViewBox, input.schoolName, companyName, input.phone);
    case "poster":
      return buildPosterSvg(qrInner, qrViewBox, input.schoolName, companyName, url, input.phone);
    case "sticker":
      return buildStickerSvg(qrInner, qrViewBox, input.schoolName, companyName);
    default:
      throw new Error(`Bilinmeyen şablon tipi: ${template}`);
  }
}

function buildLabelSvg(
  qrInner: string,
  qrViewBox: string,
  schoolName: string,
  companyName: string,
  phone?: string,
): string {
  // 6×9 cm → 227×340 px at 96 DPI
  const w = 227;
  const h = 340;
  const qrSize = 160;
  const qrX = (w - qrSize) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="white" rx="8"/>
  <text x="${w / 2}" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#1a1a1a">${escapeXml(companyName)}</text>
  <svg x="${qrX}" y="42" width="${qrSize}" height="${qrSize}" viewBox="${qrViewBox}">
    ${qrInner}
  </svg>
  <text x="${w / 2}" y="${42 + qrSize + 24}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#333">${escapeXml(schoolName)}</text>
  <text x="${w / 2}" y="${42 + qrSize + 44}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" fill="#666">Servis Ön Kayıt</text>
  ${phone ? `<text x="${w / 2}" y="${42 + qrSize + 60}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" fill="#888">${escapeXml(phone)}</text>` : ""}
</svg>`;
}

function buildPosterSvg(
  qrInner: string,
  qrViewBox: string,
  schoolName: string,
  companyName: string,
  publicUrl: string,
  phone?: string,
): string {
  // A4 portrait: 595×842 px at 72 DPI
  const w = 595;
  const h = 842;
  const qrSize = 340;
  const qrX = (w - qrSize) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="white"/>
  <text x="${w / 2}" y="80" text-anchor="middle" font-family="system-ui, sans-serif" font-size="32" font-weight="700" fill="#1a1a1a">${escapeXml(companyName)}</text>
  <text x="${w / 2}" y="130" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" fill="#444">Okul Servisi Ön Kayıt</text>
  <svg x="${qrX}" y="180" width="${qrSize}" height="${qrSize}" viewBox="${qrViewBox}">
    ${qrInner}
  </svg>
  <text x="${w / 2}" y="${180 + qrSize + 50}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" font-weight="600" fill="#222">${escapeXml(schoolName)}</text>
  <text x="${w / 2}" y="${180 + qrSize + 90}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#666">QR kodu telefonunuzla tarayarak ön kayıt yapabilirsiniz.</text>
  <text x="${w / 2}" y="${180 + qrSize + 120}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#999">${escapeXml(publicUrl)}</text>
  ${phone ? `<text x="${w / 2}" y="${h - 60}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" fill="#444">${escapeXml(phone)}</text>` : ""}
</svg>`;
}

function buildStickerSvg(
  qrInner: string,
  qrViewBox: string,
  schoolName: string,
  companyName: string,
): string {
  // 5×5 cm → 189×189 px at 96 DPI
  const size = 189;
  const qrSize = 120;
  const qrPos = (size - qrSize) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="white" rx="6"/>
  <text x="${size / 2}" y="18" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#1a1a1a">${escapeXml(companyName)}</text>
  <svg x="${qrPos}" y="24" width="${qrSize}" height="${qrSize}" viewBox="${qrViewBox}">
    ${qrInner}
  </svg>
  <text x="${size / 2}" y="${24 + qrSize + 16}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" font-weight="600" fill="#333">${escapeXml(truncate(schoolName, 28))}</text>
  <text x="${size / 2}" y="${24 + qrSize + 30}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="7" fill="#888">Ön Kayıt</text>
</svg>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function truncate(str: string, maxLen: number): string {
  return str.length > maxLen ? str.slice(0, maxLen - 1) + "…" : str;
}
