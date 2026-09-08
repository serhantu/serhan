import { config } from "dotenv";
config();

import { sendTemplateEmail, EMAIL_TEMPLATES, EmailTemplateId } from "../lib/email-templates";

async function main() {
  const templateId = (process.argv[2] as EmailTemplateId) || "TALEBINIZI_ALDIK";

  console.log(`[Resend Test] '${templateId}' şablonu test ediliyor...`);

  if (!EMAIL_TEMPLATES[templateId]) {
    console.error(`Geçersiz şablon ID: ${templateId}`);
    console.log("Mevcut şablonlar:", Object.keys(EMAIL_TEMPLATES).join(", "));
    process.exit(1);
  }

  const result = await sendTemplateEmail({
    to: "serhanturdev@gmail.com",
    template: templateId,
    data: {
      name: "Tarık Özbalkan",
      refNo: "STZ-TEST-2026-001",
    },
  });

  if (result.ok) {
    console.log(`✅ E-posta başarıyla gönderildi! Resend ID: ${result.id}`);
  } else {
    console.error(`❌ Gönderim başarısız oldu:`, result.error);
    process.exit(1);
  }
}

main();
