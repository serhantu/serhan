"use server";

// School mutations (Phase 3) — Server Actions.

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { uniqueSlug } from "@/lib/slug";
import {
  schoolCreateSchema,
  schoolUpdateSchema,
  schoolToggleSchema,
  type SchoolCreateInput,
  type SchoolUpdateInput,
  type SchoolToggleInput,
} from "@/lib/validation";

// Create a school. The slug is generated from the name and is unique + immutable.
export async function createSchool(input: SchoolCreateInput): Promise<{
  ok: boolean;
  id?: string;
  error?: string;
}> {
  await requireAdminSession();
  const parsed = schoolCreateSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Geçersiz okul bilgileri." };
  }
  const { ad, tcKimlikIster, ilce, adres, haritaUrl } = parsed.data;

  const existing = await prisma.okul.findMany({ select: { slug: true } });
  const slug = uniqueSlug(ad, new Set(existing.map((e) => e.slug)));

  const created = await prisma.okul.create({
    data: {
      ad,
      slug,
      tcKimlikIster,
      ilce: ilce || null,
      adres: adres || null,
      haritaUrl: haritaUrl || null,
    },
    select: { id: true },
  });

  revalidatePath("/admin/okullar");
  return { ok: true, id: created.id };
}

// Update a school. Only `ad`, `aktif`, `tcKimlikIster`, `ilce`, `adres`, `haritaUrl` may change.
export async function updateSchool(input: SchoolUpdateInput): Promise<{
  ok: boolean;
  error?: string;
}> {
  await requireAdminSession();
  const parsed = schoolUpdateSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Geçersiz okul bilgileri." };
  }
  const { id, ad, aktif, tcKimlikIster, ilce, adres, haritaUrl } = parsed.data;

  const exists = await prisma.okul.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!exists) {
    return { ok: false, error: "Okul bulunamadı." };
  }

  await prisma.okul.update({
    where: { id },
    data: {
      ad,
      aktif,
      tcKimlikIster,
      ilce: ilce || null,
      adres: adres || null,
      haritaUrl: haritaUrl || null,
    },
  });

  revalidatePath("/admin/okullar");
  return { ok: true };
}

// Toggle active/inactive state. Never touches the slug.
export async function setSchoolActive(input: SchoolToggleInput): Promise<{
  ok: boolean;
  error?: string;
}> {
  await requireAdminSession();
  const parsed = schoolToggleSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Geçersiz istek." };
  }
  const { id, aktif } = parsed.data;

  const exists = await prisma.okul.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!exists) {
    return { ok: false, error: "Okul bulunamadı." };
  }

  await prisma.okul.update({
    where: { id },
    data: { aktif },
  });

  revalidatePath("/admin/okullar");
  return { ok: true };
}
