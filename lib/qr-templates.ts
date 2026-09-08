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
import fs from "node:fs";
import path from "node:path";
import { generateQrSvg, buildPublicOnKayitUrl, type QrRenderOptions } from "@/lib/qr";

let cachedLogoBase64: string | null = null;
function getLogoBase64(): string {
  if (cachedLogoBase64 !== null) return cachedLogoBase64;
  try {
    const filePath = path.join(process.cwd(), "public", "images", "logo.png");
    const buf = fs.readFileSync(filePath);
    cachedLogoBase64 = `data:image/png;base64,${buf.toString("base64")}`;
  } catch (err) {
    console.error("Logo dosyası okunamadı:", err);
    cachedLogoBase64 = "";
  }
  return cachedLogoBase64;
}

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
      return buildStickerSvg(qrInner, qrViewBox, input.schoolName, companyName, input.phone);
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
  const logoBase64 = getLogoBase64();
  const logoW = 95;
  const logoH = 24;
  const logoX = (w - logoW) / 2;

  const headerElem = logoBase64
    ? `<image href="${logoBase64}" x="${logoX}" y="12" width="${logoW}" height="${logoH}" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="${w / 2}" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#1a1a1a">${escapeXml(companyName)}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="white" rx="8"/>
  ${headerElem}
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
  const logoBase64 = getLogoBase64();
  const logoW = 220;
  const logoH = 56;
  const logoX = (w - logoW) / 2;
  const logoY = 40;

  const headerElem = logoBase64
    ? `<image href="${logoBase64}" x="${logoX}" y="${logoY}" width="${logoW}" height="${logoH}" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="${w / 2}" y="80" text-anchor="middle" font-family="system-ui, sans-serif" font-size="32" font-weight="700" fill="#1a1a1a">${escapeXml(companyName)}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="white"/>
  ${headerElem}
  <text x="${w / 2}" y="128" text-anchor="middle" font-family="system-ui, sans-serif" font-size="20" font-weight="600" fill="#444">Okul Servisi Ön Kayıt</text>
  <svg x="${qrX}" y="175" width="${qrSize}" height="${qrSize}" viewBox="${qrViewBox}">
    ${qrInner}
  </svg>
  <text x="${w / 2}" y="${175 + qrSize + 48}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="24" font-weight="700" fill="#1a1a1a">${escapeXml(schoolName)}</text>
  <text x="${w / 2}" y="${175 + qrSize + 84}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#666">QR kodu telefonunuzla tarayarak ön kayıt yapabilirsiniz.</text>
  ${phone ? `<text x="${w / 2}" y="${h - 55}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" fill="#444">${escapeXml(phone)}</text>` : ""}
</svg>`;
}

function buildStickerSvg(
  qrInner: string,
  qrViewBox: string,
  schoolName: string,
  companyName: string,
  phone?: string,
): string {
  // 10×10 cm → 378×378 px at 96 DPI
  const size = 378;
  const qrSize = 220;
  const qrPos = (size - qrSize) / 2;
  const logoBase64 = getLogoBase64();
  const logoW = 126;
  const logoH = 32;
  const logoX = (size - logoW) / 2;
  const logoY = 14;

  const headerElem = logoBase64
    ? `<image href="${logoBase64}" x="${logoX}" y="${logoY}" width="${logoW}" height="${logoH}" preserveAspectRatio="xMidYMid meet"/>`
    : `<text x="${size / 2}" y="36" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#1a1a1a">${escapeXml(companyName)}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="white" rx="12"/>
  ${headerElem}
  <svg x="${qrPos}" y="54" width="${qrSize}" height="${qrSize}" viewBox="${qrViewBox}">
    ${qrInner}
  </svg>
  <text x="${size / 2}" y="${54 + qrSize + 26}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#1a1a1a">${escapeXml(truncate(schoolName, 36))}</text>
  <text x="${size / 2}" y="${54 + qrSize + 46}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#666">Servis Ön Kayıt</text>
  ${phone ? `<text x="${size / 2}" y="${size - 12}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#888">${escapeXml(phone)}</text>` : ""}
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
