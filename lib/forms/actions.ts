"use server";

// Public website form server actions with honeypot bot & spam protection.
//
// Each action:
//   1. Checks for honeypot bot trap (_hp). If populated by a bot, silently discards.
//   2. Validates input with the shared Zod schema.
//   3. Inserts a row into the appropriate Prisma model.
//   4. Sends best-effort admin notification via Resend.

import { prisma } from "@/lib/db";
import {
  teklifSchema,
  iletisimSchema,
  isBasvuruSchema,
  aracGeriBildirimSchema,
} from "@/lib/validation/forms";
import { sendFormAdminNotification } from "@/lib/resend-notifications";

export type FormSubmitResult = {
  ok: boolean;
  error?: string;
};

/**
 * Check if the submission is an automated bot trap (honeypot).
 */
function isBotSubmission(formData: FormData): boolean {
  const hp = formData.get("_hp");
  return typeof hp === "string" && hp.trim().length > 0;
}

export async function submitTeklif(formData: FormData): Promise<FormSubmitResult> {
  if (isBotSubmission(formData)) {
    return { ok: true };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = teklifSchema.safeParse(raw);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Geçersiz form verisi.";
    return { ok: false, error: firstError };
  }

  await prisma.teklif.create({
    data: {
      adSoyad: parsed.data.adSoyad,
      telefon: parsed.data.telefon,
      eposta: parsed.data.eposta,
      mesaj: parsed.data.mesaj,
    },
  });

  // Best-effort notification
  try {
    await sendFormAdminNotification("TEKLIF", parsed.data);
  } catch {
    // Notification failure does not block form submission
  }

  return { ok: true };
}

export async function submitIletisim(formData: FormData): Promise<FormSubmitResult> {
  if (isBotSubmission(formData)) {
    return { ok: true };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = iletisimSchema.safeParse(raw);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Geçersiz form verisi.";
    return { ok: false, error: firstError };
  }

  await prisma.iletisim.create({
    data: {
      adSoyad: parsed.data.adSoyad,
      telefon: parsed.data.telefon,
      eposta: parsed.data.eposta,
      mesaj: parsed.data.mesaj,
    },
  });

  try {
    await sendFormAdminNotification("ILETISIM", parsed.data);
  } catch {
    // Notification failure does not block form submission
  }

  return { ok: true };
}

export async function submitIsBasvuru(formData: FormData): Promise<FormSubmitResult> {
  if (isBotSubmission(formData)) {
    return { ok: true };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = isBasvuruSchema.safeParse(raw);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Geçersiz form verisi.";
    return { ok: false, error: firstError };
  }

  await prisma.isBasvuru.create({
    data: {
      adSoyad: parsed.data.adSoyad,
      telefon: parsed.data.telefon,
      eposta: parsed.data.eposta,
      mesaj: parsed.data.mesaj,
    },
  });

  try {
    await sendFormAdminNotification("IS_BASVURUSU", parsed.data);
  } catch {
    // Notification failure does not block form submission
  }

  return { ok: true };
}

export async function submitAracGeriBildirim(formData: FormData): Promise<FormSubmitResult> {
  if (isBotSubmission(formData)) {
    return { ok: true };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = aracGeriBildirimSchema.safeParse(raw);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Geçersiz form verisi.";
    return { ok: false, error: firstError };
  }

  await prisma.aracGeriBildirim.create({
    data: {
      adSoyad: parsed.data.adSoyad,
      telefon: parsed.data.telefon,
      eposta: parsed.data.eposta,
      mesaj: parsed.data.mesaj,
    },
  });

  try {
    await sendFormAdminNotification("ARAC_GERI_BILDIRIM", parsed.data);
  } catch {
    // Notification failure does not block form submission
  }

  return { ok: true };
}
