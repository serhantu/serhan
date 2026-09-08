import fs from "node:fs";
import path from "node:path";
import { getResendClient, RESEND_FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";

export type EmailTemplateId =
  | "FILO_KIRALAMA"
  | "IS_BASVURUSU"
  | "OKUL_SERVISI"
  | "PERSONEL_TASIMACILIGI"
  | "SOFOR_BASVURUSU"
  | "TALEBINIZI_ALDIK"
  | "VIP_TRANSFER";

export interface TemplateConfig {
  id: EmailTemplateId;
  fileName: string;
  defaultSubject: string;
  title: string;
  subtitle: string;
  refLabel: string;
  defaultRefPrefix: string;
  bodyText: string;
  buttonText: string;
  trackingPath: string;
}

export const EMAIL_TEMPLATES: Record<EmailTemplateId, TemplateConfig> = {
  FILO_KIRALAMA: {
    id: "FILO_KIRALAMA",
    fileName: "Filo-Kiralama-Talebi.dc.html",
    defaultSubject: "Filo Kiralama Talebiniz Alındı — Serhan Turizm",
    title: "Filo kiralama talebiniz alındı",
    subtitle: "Talebiniz başarıyla kaydedildi. Size geri dönüş yapacağız.",
    refLabel: "Talep numaranız",
    defaultRefPrefix: "STZ-FLEET",
    bodyText:
      "Filo kiralama talebiniz başarıyla alındı. Operasyon ekibimiz talep detaylarınızı inceleyecek ve en kısa sürede size uygun araçlar ve koşulları sunacaktır.",
    buttonText: "Talebimi Takip Et",
    trackingPath: "/takip",
  },
  IS_BASVURUSU: {
    id: "IS_BASVURUSU",
    fileName: "Is-Basvurusu-Alindi.dc.html",
    defaultSubject: "İş Başvurunuz Alındı — Serhan Turizm",
    title: "İş başvurunuz alındı",
    subtitle: "Başvurunuz başarıyla kaydedildi. Kısa sürede sizinle iletişime geçeceğiz.",
    refLabel: "Başvuru numaranız",
    defaultRefPrefix: "STZ-APP",
    bodyText:
      "Serhan Turizm'e başvurunuz için teşekkür ederiz. İK ekibimiz başvurunuzu inceleyecek ve uygun olması halinde sizi mülakata davet edecektir.",
    buttonText: "Başvuruyu Takip Et",
    trackingPath: "/basvuru-takip",
  },
  OKUL_SERVISI: {
    id: "OKUL_SERVISI",
    fileName: "Okul-Servisi-Talebi.dc.html",
    defaultSubject: "Okul Servisi Talebiniz Alındı — Serhan Turizm",
    title: "Okul servisi talebiniz alındı",
    subtitle: "Talebiniz başarıyla kaydedildi. Size geri dönüş yapacağız.",
    refLabel: "Talep numaranız",
    defaultRefPrefix: "STZ-SCHOOL",
    bodyText:
      "Okul servisi talebiniz başarıyla alındı. Operasyon ekibimiz talebinizi inceleyecek ve en kısa sürede size uygun çözümleri sunacaktır.",
    buttonText: "Talebimi Takip Et",
    trackingPath: "/takip",
  },
  PERSONEL_TASIMACILIGI: {
    id: "PERSONEL_TASIMACILIGI",
    fileName: "Personel-Tasimaciligi-Talebi.dc.html",
    defaultSubject: "Personel Taşımacılığı Talebiniz Alındı — Serhan Turizm",
    title: "Personel taşımacılığı talebiniz alındı",
    subtitle: "Talebiniz başarıyla kaydedildi. Size geri dönüş yapacağız.",
    refLabel: "Talep numaranız",
    defaultRefPrefix: "STZ-PERSONNEL",
    bodyText:
      "Personel taşımacılığı talebiniz başarıyla alındı. Ekibimiz talebinizi inceleyecek ve en uygun çözümü sunmak için sizinle iletişime geçecektir.",
    buttonText: "Talebimi Takip Et",
    trackingPath: "/takip",
  },
  SOFOR_BASVURUSU: {
    id: "SOFOR_BASVURUSU",
    fileName: "Sofar-Basvurusu-Alindi.dc.html",
    defaultSubject: "Şoför Başvurunuz Alındı — Serhan Turizm",
    title: "Şoför başvurunuz alındı",
    subtitle: "Başvurunuz başarıyla kaydedildi. Ekibimiz sizinle iletişime geçecektir.",
    refLabel: "Başvuru numaranız",
    defaultRefPrefix: "STZ-DRV",
    bodyText:
      "Şoför olarak Serhan Turizm'e başvurunuz için teşekkür ederiz. Başvurunuz değerlendirme aşamasındadır. Size en kısa sürede dönüş yapacağız.",
    buttonText: "Başvuruyu Takip Et",
    trackingPath: "/sofar-takip",
  },
  TALEBINIZI_ALDIK: {
    id: "TALEBINIZI_ALDIK",
    fileName: "Talebinizi-Aldik.dc.html",
    defaultSubject: "Talebinizi Aldık — Serhan Turizm",
    title: "Talebinizi aldık",
    subtitle: "Başvurunuz başarıyla kaydedildi. Size geri dönüş yapacağız.",
    refLabel: "Referans numaranız",
    defaultRefPrefix: "STZ",
    bodyText:
      "Talebiniz başarıyla alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir. Bu sırada herhangi bir sorunuz varsa bize yazabilirsiniz.",
    buttonText: "Talebimi Takip Et",
    trackingPath: "/takip",
  },
  VIP_TRANSFER: {
    id: "VIP_TRANSFER",
    fileName: "VIP-Transfer-Talebi.dc.html",
    defaultSubject: "VIP Transfer Talebiniz Alındı — Serhan Turizm",
    title: "VIP Transfer talebiniz alındı",
    subtitle: "Talebiniz başarıyla kaydedildi. Size geri dönüş yapacağız.",
    refLabel: "Talep numaranız",
    defaultRefPrefix: "STZ-VIP",
    bodyText:
      "VIP Transfer talebiniz başarıyla alındı. Premium hizmet ekibimiz talep detaylarınızı inceleyecek ve en kısa sürede sizinle iletişime geçecektir.",
    buttonText: "Talebimi Takip Et",
    trackingPath: "/takip",
  },
};

export interface RenderTemplateOptions {
  name: string;
  refNo?: string;
  customMessage?: string;
  baseUrl?: string;
}

/**
 * Generate a unique reference number if not provided.
 */
export function generateReferenceNo(prefix: string): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  return `${prefix}-${dateStr}-${randomSuffix}`;
}

/**
 * Render the HTML email template with provided parameters.
 */
export function renderEmailTemplate(
  templateId: EmailTemplateId,
  options: RenderTemplateOptions,
): { subject: string; html: string } {
  const config = EMAIL_TEMPLATES[templateId];
  if (!config) {
    throw new Error(`Bilinmeyen e-posta şablonu: ${templateId}`);
  }

  const baseUrl = (
    options.baseUrl ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://serhanturizm.com"
  ).replace(/\/$/, "");

  const logoUrl = `${baseUrl}/images/logo.png`;
  const name = options.name || "Müşteri";
  const refNo = options.refNo || generateReferenceNo(config.defaultRefPrefix);
  const message = options.customMessage || config.bodyText;
  const trackingUrl = `${baseUrl}${config.trackingPath}`;

  // Check if physical file exists in html/emails/
  const filePath = path.join(process.cwd(), "html", "emails", config.fileName);
  let rawHtml: string | null = null;
  try {
    if (fs.existsSync(filePath)) {
      rawHtml = fs.readFileSync(filePath, "utf-8");
    }
  } catch {
    // Fall back to embedded renderer
  }

  if (rawHtml) {
    // Clean and transform the .dc.html design
    let html = rawHtml
      // Replace variables
      .replace(/\{\{\s*name\s*\}\}/g, escapeHtml(name))
      .replace(/\{\{\s*(refNo|appNo)\s*\}\}/g, escapeHtml(refNo))
      // Replace relative logo with public absolute URL
      .replace(/\.\.\/uploads\/[a-zA-Z0-9_\-\.]+/g, logoUrl)
      // Strip out <x-dc>, </x-dc>
      .replace(/<\/?x-dc>/gi, "")
      // Strip out <helmet> and </helmet>
      .replace(/<\/?helmet>/gi, "")
      // Strip out custom dc scripts
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

    // If custom message provided, replace body text
    if (options.customMessage) {
      html = html.replace(
        /<p style="font-size: 15px; color: #4A4C4B; margin: 0 0 20px 0; line-height: 1\.7">[\s\S]*?<\/p>/,
        `<p style="font-size: 15px; color: #4A4C4B; margin: 0 0 20px 0; line-height: 1.7">${escapeHtml(
          message,
        )}</p>`,
      );
    }

    return {
      subject: config.defaultSubject,
      html,
    };
  }

  // Fallback standalone responsive email template
  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(config.title)}</title>
  <style>
    body { margin: 0; background: #F2F1EE; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    * { box-sizing: border-box; }
    a { color: #0A6B3D; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div style="background: #F2F1EE; padding: 40px 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
      <tr>
        <td style="padding: 40px 32px; color: #1C1E1D; line-height: 1.6;">

          <div style="text-align: center; margin-bottom: 36px;">
            <img src="${logoUrl}" alt="Serhan Turizm" style="max-width: 200px; height: auto; display: inline-block;">
          </div>

          <h1 style="font-size: 24px; font-weight: 600; letter-spacing: -0.02em; text-align: center; margin: 0 0 12px 0;">${escapeHtml(
            config.title,
          )}</h1>
          <p style="font-size: 15px; color: #6B6B66; text-align: center; margin: 0 0 32px 0;">${escapeHtml(
            config.subtitle,
          )}</p>

          <div style="background: #EAF3EE; border-left: 4px solid #0A6B3D; padding: 16px; margin-bottom: 32px; border-radius: 4px;">
            <p style="font-size: 14px; color: #4A4C4B; margin: 0;">
              <strong>${escapeHtml(config.refLabel)}:</strong><br>
              <span style="font-family: monospace; font-size: 13px;">#${escapeHtml(refNo)}</span>
            </p>
          </div>

          <p style="font-size: 15px; color: #4A4C4B; margin: 0 0 20px 0;">
            Merhaba <strong>${escapeHtml(name)}</strong>,
          </p>

          <p style="font-size: 15px; color: #4A4C4B; margin: 0 0 20px 0; line-height: 1.7;">
            ${escapeHtml(message)}
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${trackingUrl}" style="display: inline-block; background: #0A6B3D; color: #FFFFFF; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 500; text-decoration: none;">${escapeHtml(
              config.buttonText,
            )}</a>
          </div>

          <p style="font-size: 14px; color: #6B6B66; margin: 32px 0 0 0; padding-top: 24px; border-top: 1px solid #D6D4CE;">
            <strong>Serhan Turizm</strong><br>
            Bahçelievler Mah. Hareket Ordusu Sok. No: 7A<br>
            Bahçelievler / İstanbul<br><br>
            <a href="tel:05439126349" style="color: #0A6B3D;">0543 912 63 49</a><br>
            <a href="mailto:info@serhanturizm.com" style="color: #0A6B3D;">info@serhanturizm.com</a>
          </p>

          <p style="font-size: 12px; color: #A8A8A2; margin: 16px 0 0 0; text-align: center;">
            © 2026 Serhan Turizm. Tüm hakları saklıdır.
          </p>

        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;

  return {
    subject: config.defaultSubject,
    html,
  };
}

export interface SendTemplateEmailParams {
  to: string;
  template: EmailTemplateId;
  data: RenderTemplateOptions;
  subject?: string;
}

export interface SendTemplateEmailResult {
  ok: boolean;
  id?: string;
  error?: string;
}

/**
 * Send an email with Resend using one of the Serhan Turizm templates.
 *
 * In testing/sandbox mode (when sending from onboarding@resend.dev), Resend
 * permits sending ONLY to the registered account email (serhanturdev@gmail.com).
 * This function handles that gracefully so development never crashes.
 */
export async function sendTemplateEmail({
  to,
  template,
  data,
  subject,
}: SendTemplateEmailParams): Promise<SendTemplateEmailResult> {
  const from = RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const adminEmail = ADMIN_EMAIL || "serhanturdev@gmail.com";

  const { subject: defaultSubject, html } = renderEmailTemplate(template, data);

  // In Resend sandbox mode, if attempting to send to an external recipient,
  // reroute to adminEmail to prevent Resend 422 validation error.
  const isSandbox = from.includes("resend.dev");
  let recipient = to;
  let finalHtml = html;

  if (isSandbox && to !== adminEmail) {
    recipient = adminEmail;
    finalHtml = `
      <div style="background: #fff3cd; color: #856404; padding: 12px; font-size: 13px; font-family: sans-serif; text-align: center; border-bottom: 1px solid #ffeeba;">
        <strong>[TEST MODU]</strong> Bu e-posta normalde <strong>${escapeHtml(
          to,
        )}</strong> adresine gidecekti. (Resend sandbox modu nedeniyle hesabınıza iletildi.)
      </div>
      ${html}
    `;
  }

  try {
    const resend = getResendClient();
    const result = await resend.emails.send({
      from,
      to: recipient,
      subject: subject || defaultSubject,
      html: finalHtml,
    });

    if (result.error) {
      console.error("[Resend] Gönderim hatası:", result.error);
      return { ok: false, error: result.error.message };
    }

    return { ok: true, id: result.data?.id };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Resend] İstisna:", errorMsg);
    return { ok: false, error: errorMsg };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
