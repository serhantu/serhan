"use server";

// Public website form server actions.
//
// Each action validates input with the shared Zod schema, inserts a row into
// the appropriate Prisma model, and optionally sends an admin notification.
// E-mail notification is best-effort: if Resend is not configured the record
// is still created.

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

export async function submitTeklif(formData: FormData): Promise<FormSubmitResult> {
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
