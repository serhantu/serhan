import "server-only";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";

// Standard A4 dimensions in PDF points (72 pt/inch, 210 x 297 mm)
export const A4_WIDTH_PT = 595.28;
export const A4_HEIGHT_PT = 841.89;

/**
 * Converts one or more SVG strings into a single, high-resolution A4 PDF document.
 * SVGs are rasterized at 300 DPI using sharp to ensure crisp print-ready output.
 */
export async function generateA4PdfFromSvgs(svgs: string[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  for (const svg of svgs) {
    const pngBuffer = await sharp(Buffer.from(svg), { density: 300 }).png().toBuffer();
    const page = pdfDoc.addPage([A4_WIDTH_PT, A4_HEIGHT_PT]);
    const pngImage = await pdfDoc.embedPng(pngBuffer);

    page.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: A4_WIDTH_PT,
      height: A4_HEIGHT_PT,
    });
  }

  return pdfDoc.save();
}
