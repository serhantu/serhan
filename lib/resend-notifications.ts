// Extended Resend notification layer for public website forms.
//
// This module adds admin email notifications for the four public form types
// (Teklif, Iletisim, IsBasvuru, AracGeriBildirim). The existing on-kayit
// notifications in lib/resend.ts remain unchanged.
//
// When RESEND_API_KEY is not set, all senders throw so callers can handle
// gracefully (the form submission still succeeds; only the email fails).

import { getResendClient, RESEND_FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";
import { FormNotificationAdminEmail } from "@/emails/form-notification-admin";

export type FormType = "TEKLIF" | "ILETISIM" | "IS_BASVURUSU" | "ARAC_GERI_BILDIRIM";

const FORM_TYPE_LABELS: Record<FormType, string> = {
  TEKLIF: "Teklif Talebi",
  ILETISIM: "İletişim Formu",
  IS_BASVURUSU: "İş Başvurusu",
  ARAC_GERI_BILDIRIM: "Araç Geri Bildirim",
};

export type FormNotificationInput = {
  adSoyad: string;
  telefon: string;
  eposta: string;
  mesaj: string;
};

/**
 * Send an admin notification email for a public website form submission.
 */
export async function sendFormAdminNotification(
  type: FormType,
  data: FormNotificationInput,
): Promise<void> {
  const from = RESEND_FROM_EMAIL;
  const admin = ADMIN_EMAIL;

  if (!from || !admin) {
    throw new Error("RESEND_FROM_EMAIL or ADMIN_EMAIL is not configured.");
  }

  const label = FORM_TYPE_LABELS[type];

  await getResendClient().emails.send({
    from,
    to: admin,
    subject: `Yeni ${label} — ${data.adSoyad}`,
    react: FormNotificationAdminEmail({ type: label, ...data }),
  });
}
