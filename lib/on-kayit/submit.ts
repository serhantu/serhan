// OnKayit pre-registration submission logic (Phase 4-6).
//
// This is the server-side core of the public pre-registration flow. It is kept
// OUTSIDE the "use server" actions file so it can be unit/integration tested
// without a React Server Action wrapper. The action file (actions.ts) validates
// the request surface (slug + FormData) and then delegates to `submitOnKayit`.
//
// Behavior (per spec):
//   1. Resolve Okul by slug (never trust a client-provided okulId).
//   2. School must exist AND be aktif.
//   3. Use school.tcKimlikIster to pick the right Zod schema.
//   4. Validate TC algorithmically when required.
//   5. Store only the last 4 digits of TC (minimization) when required; drop
//      any TC value when not required.
//   6. Resolve customer and student via CRM foundation (Phase 6).
//   7. Create OnKayit + Consent in ONE transaction.
//   8. Send notification emails OUTSIDE the transaction; on failure keep
//      notificationSent = false (no rollback).

import "server-only";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { getClientIp } from "@/lib/ip";
import { LEGAL_VERSIONS, REGISTRATION_LEGAL_CONFIG } from "@/lib/legal/config";
import { maskTcKimlik } from "@/lib/tc-kimlik";
import { onKayitSchema } from "@/lib/validation";
import { sendOnKayitAdminNotification, sendOnKayitParentConfirmation } from "@/lib/resend";
import { resolveOrCreateCustomer, resolveOrCreateStudent } from "@/lib/crm";

export type SubmitOnKayitInput = Record<string, string | undefined>;

export type SubmitOnKayitResult =
  | { ok: true; id: string; refNo: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

function fieldErrorsFromZod(
  issue: { path: (string | number)[]; message: string }[],
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const i of issue) {
    const key = String(i.path[0] ?? "_");
    if (!out[key]) out[key] = i.message;
  }
  return out;
}

export async function submitOnKayit(
  slug: string,
  formData: SubmitOnKayitInput,
): Promise<SubmitOnKayitResult> {
  // 1-2. Resolve the school by slug; require existence + active state.
  const okul = await prisma.okul.findUnique({
    where: { slug },
    select: { id: true, ad: true, aktif: true, tcKimlikIster: true },
  });

  if (!okul) {
    return { ok: false, error: "Okul bulunamadı." };
  }
  if (!okul.aktif) {
    return { ok: false, error: "Bu okul için ön kayıt şu anda kapalı." };
  }

  // Pre-process friendly form mappings if passed
  const preprocessed: Record<string, string | undefined> = { ...formData };

  // If ogrenciAdSoyad provided instead of split names
  if (!preprocessed.ogrenciAd && !preprocessed.ogrenciSoyad && preprocessed.ogrenciAdSoyad) {
    const parts = preprocessed.ogrenciAdSoyad.trim().split(/\s+/);
    if (parts.length > 1) {
      preprocessed.ogrenciSoyad = parts.pop();
      preprocessed.ogrenciAd = parts.join(" ");
    } else {
      preprocessed.ogrenciAd = parts[0] || "";
      preprocessed.ogrenciSoyad = parts[0] || "";
    }
  }

  // If kademe + sinif are provided separately
  if (!preprocessed.sinifKademe) {
    if (preprocessed.kademe && preprocessed.sinif) {
      preprocessed.sinifKademe = `${preprocessed.kademe} — ${preprocessed.sinif}`;
    } else {
      preprocessed.sinifKademe = preprocessed.sinif || preprocessed.kademe;
    }
  }

  // 3. Pick the schema based on the school's TC requirement AND the
  //    server-controlled explicit-consent requirement.
  const BOOLEAN_FIELDS = ["privacyAcknowledged", "explicitConsent", "marketingConsent"] as const;
  const normalized: Record<string, string | boolean | undefined> = { ...preprocessed };
  for (const key of BOOLEAN_FIELDS) {
    const raw = preprocessed[key];
    normalized[key] = raw === "true";
  }

  const schema = onKayitSchema(
    okul.tcKimlikIster,
    REGISTRATION_LEGAL_CONFIG.explicitConsentRequired,
  );
  const parsed = schema.safeParse(normalized);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Lütfen formu kontrol edip tekrar deneyiniz.",
      fieldErrors: fieldErrorsFromZod(
        parsed.error.issues as { path: (string | number)[]; message: string }[],
      ),
    };
  }

  const v = parsed.data;

  // 5. TC minimization: store last 4 digits only when the school requires it.
  const tcKimlikNo = okul.tcKimlikIster && v.tcKimlikNo ? v.tcKimlikNo.slice(-4) : null;

  const ip = getClientIp(await headers());
  const consentAt = new Date();
  const refNo = "SRV-" + Math.floor(100000 + Math.random() * 900000);

  // 6. CRM: Resolve or create customer and student before transaction.
  let musteriId: string;
  let ogrenciId: string;

  try {
    const customer = await resolveOrCreateCustomer({
      adSoyad: v.veliAdSoyad,
      telefon: v.telefon,
      eposta: v.eposta,
    });
    musteriId = customer.id;

    const student = await resolveOrCreateStudent({
      musteriId: customer.id,
      okulId: okul.id,
      ad: v.ogrenciAd,
      soyad: v.ogrenciSoyad,
      sinifKademe: v.sinifKademe,
    });
    ogrenciId = student.id;
  } catch (err) {
    console.error("[on-kayit] CRM resolution failed", err);
    return { ok: false, error: "Müşteri ve öğrenci kimliği çözümlenemedi." };
  }

  // 7. Single transaction: OnKayit + Consent (atomic).
  const kayit = await prisma.$transaction(async (tx) => {
    const created = await tx.onKayit.create({
      data: {
        okulId: okul.id,
        musteriId,
        ogrenciId,
        ogrenciAd: v.ogrenciAd,
        ogrenciSoyad: v.ogrenciSoyad,
        sinifKademe: v.sinifKademe,
        tcKimlikNo,
        adres: v.adres,
        veliAdSoyad: v.veliAdSoyad,
        telefon: v.telefon,
        telefon2: v.telefon2 ?? null,
        eposta: v.eposta ?? null,
        refNo,
        status: "YENI",
      },
    });

    await tx.consent.create({
      data: {
        onKayitId: created.id,
        privacyNoticeVersion: LEGAL_VERSIONS.privacyNotice,
        privacyAcknowledgedAt: consentAt,
        explicitConsent: v.explicitConsent,
        explicitConsentAt:
          REGISTRATION_LEGAL_CONFIG.explicitConsentRequired && v.explicitConsent ? consentAt : null,
        marketingConsent: v.marketingConsent,
        marketingConsentAt: v.marketingConsent ? consentAt : null,
        ipAddress: ip ?? "",
      },
    });

    return created;
  });

  // 8. Email notifications OUTSIDE the transaction.
  try {
    await sendOnKayitAdminNotification({
      okulAd: okul.ad,
      ogrenciAd: v.ogrenciAd,
      ogrenciSoyad: v.ogrenciSoyad,
      sinifKademe: v.sinifKademe,
      veliAdSoyad: v.veliAdSoyad,
      telefon: v.telefon,
      telefon2: v.telefon2 ?? null,
      eposta: v.eposta ?? null,
      adres: v.adres,
      tcKimlikMasked: tcKimlikNo ? maskTcKimlik(tcKimlikNo.padStart(11, "0")) : null,
      refNo,
      status: "YENI",
      createdAt: kayit.createdAt.toLocaleString("tr-TR"),
    });

    if (v.eposta) {
      await sendOnKayitParentConfirmation({
        okulAd: okul.ad,
        ogrenciAd: v.ogrenciAd,
        veliAdSoyad: v.veliAdSoyad,
        eposta: v.eposta,
      });
    }

    await prisma.onKayit.update({
      where: { id: kayit.id },
      data: { notificationSent: true, notificationSentAt: new Date() },
    });
  } catch {
    console.error(`[on-kayit] notification email failed for kayit ${kayit.id} (school ${okul.id})`);
  }

  return { ok: true, id: kayit.id, refNo };
}
