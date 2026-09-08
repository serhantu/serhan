import { config } from "dotenv";
config();

import { sendTemplateEmail, EMAIL_TEMPLATES, EmailTemplateId } from "../lib/email-templates";

const TARGET_EMAIL = process.env.ADMIN_EMAIL || "serhanturdev@gmail.com";

async function sendOne(templateId: EmailTemplateId) {
  const tpl = EMAIL_TEMPLATES[templateId];
  console.log(`[Resend Test] '${templateId}' (${tpl.title}) -> ${TARGET_EMAIL}`);

  const result = await sendTemplateEmail({
    to: TARGET_EMAIL,
    template: templateId,
    data: {
      name: "Tarık Özbalkan",
      refNo: `STZ-${templateId.slice(0, 4)}-${Date.now().toString().slice(-4)}`,
    },
  });

  if (result.ok) {
    console.log(`  ✅ Başarılı! Resend ID: ${result.id}`);
  } else {
    console.error(`  ❌ Başarısız:`, result.error);
  }
  return result.ok;
}

async function main() {
  const arg = (process.argv[2] || "TALEBINIZI_ALDIK").toUpperCase();

  console.log(`========================================`);
  console.log(`📧 Resend Test Gönderim Aracı`);
  console.log(`Hedef E-posta : ${TARGET_EMAIL}`);
  console.log(`========================================\n`);

  if (arg === "ALL") {
    const templateIds = Object.keys(EMAIL_TEMPLATES) as EmailTemplateId[];
    console.log(`Toplam ${templateIds.length} şablon sırayla test ediliyor...\n`);
    for (const id of templateIds) {
      await sendOne(id);
      // Wait 1s between sends to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } else {
    const templateId = arg as EmailTemplateId;
    if (!EMAIL_TEMPLATES[templateId]) {
      console.error(`Geçersiz şablon ID: ${arg}`);
      console.log("Mevcut şablonlar:", Object.keys(EMAIL_TEMPLATES).join(", "), "veya ALL");
      process.exit(1);
    }
    await sendOne(templateId);
  }

  console.log(`\n✨ Test tamamlandı. Lütfen ${TARGET_EMAIL} gelen kutusunu (ve Spam klasörünü) kontrol edin.`);
}

main();

