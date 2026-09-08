// Resend integration (Phase 4 — actual notification flows implemented).
//
// RULES (privacy):
//   - Never send the full TC Kimlik number. Only a masked/last-four representation
//     (produced by the caller) may appear in the company email.
//   - Never log sensitive form data.
//   - If RESEND_API_KEY / FROM / ADMIN are missing, the senders throw — the
//     caller is expected to catch and keep `notificationSent = false`.

import { Resend } from "resend";
import { OnKayitAdminEmail } from "@/emails/on-kayit-admin";

let cached: Resend | null = null;

// Lazily create a single Resend client. Throws if RESEND_API_KEY is missing,
// so callers fail fast during development rather than sending silently.
export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not set. Configure it in your environment before sending email.",
    );
  }
  if (!cached) {
    cached = new Resend(apiKey);
  }
  return cached;
}

export const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "serhanturdev@gmail.com";

export type OnKayitNotificationInput = {
  okulAd: string;
  ogrenciAd: string;
  ogrenciSoyad: string;
  sinifKademe: string;
  veliAdSoyad: string;
  telefon: string;
  telefon2?: string | null;
  eposta?: string | null;
  adres: string;
  tcKimlikMasked?: string | null;
  refNo?: string | null;
  status: string;
  createdAt: string;
};

// A. Company notification → ADMIN_EMAIL.
export async function sendOnKayitAdminNotification(input: OnKayitNotificationInput): Promise<void> {
  const from = RESEND_FROM_EMAIL;
  const admin = ADMIN_EMAIL;
  if (!from || !admin) {
    throw new Error("RESEND_FROM_EMAIL or ADMIN_EMAIL is not configured.");
  }

  await getResendClient().emails.send({
    from,
    to: admin,
    subject: `Yeni Ön Kayıt Talebi — ${input.okulAd}`,
    react: OnKayitAdminEmail(input),
  });
}

// B. Parent confirmation → only when an email was provided.
export async function sendOnKayitParentConfirmation(input: {
  okulAd: string;
  ogrenciAd: string;
  veliAdSoyad: string;
  eposta: string;
}): Promise<void> {
  const { sendTemplateEmail } = await import("@/lib/email-templates");
  await sendTemplateEmail({
    to: input.eposta,
    template: "OKUL_SERVISI",
    data: {
      name: input.veliAdSoyad,
      customMessage: `${input.okulAd} okulu için ${input.ogrenciAd} adlı öğrenciye ait ön kayıt talebiniz alınmıştır. Operasyon ekibimiz talebinizi inceleyecek ve en kısa sürede sizinle iletişime geçecektir.`,
    },
    subject: `Ön Kayıt Talebiniz Alınmıştır — ${input.okulAd}`,
  });
}
