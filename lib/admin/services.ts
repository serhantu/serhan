"use server";

// Admin Services Server Actions (Phase 7)

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { generateSlug } from "@/lib/slug";
import {
  serviceCreateSchema,
  serviceUpdateSchema,
  serviceToggleSchema,
  serviceSortOrderSchema,
} from "@/lib/validation/cms";

export async function createService(input: unknown) {
  await requireAdminSession();
  const parsed = serviceCreateSchema.parse(input);

  const slug = generateSlug(parsed.name);

  const existing = await prisma.service.findUnique({ where: { slug } });
  if (existing) {
    throw new Error("Slug already exists");
  }

  const service = await prisma.service.create({
    data: {
      name: parsed.name,
      slug,
      shortDescription: parsed.shortDescription || null,
      content: parsed.content,
      imageUrl: parsed.imageUrl || null,
    },
  });

  revalidatePath("/admin/icerik/hizmetler");
  return service;
}

export async function updateService(input: unknown) {
  await requireAdminSession();
  const parsed = serviceUpdateSchema.parse(input);

  const service = await prisma.service.update({
    where: { id: parsed.id },
    data: {
      name: parsed.name,
      shortDescription: parsed.shortDescription || null,
      content: parsed.content,
      imageUrl: parsed.imageUrl || null,
    },
  });

  revalidatePath("/admin/icerik/hizmetler");
  revalidatePath(`/hizmetler/${service.slug}`);
  return service;
}

export async function setServiceActive(input: unknown) {
  await requireAdminSession();
  const parsed = serviceToggleSchema.parse(input);

  const service = await prisma.service.update({
    where: { id: parsed.id },
    data: { active: parsed.active },
  });

  revalidatePath("/admin/icerik/hizmetler");
  revalidatePath(`/hizmetler/${service.slug}`);
  return service;
}

export async function setServiceSortOrder(input: unknown) {
  await requireAdminSession();
  const parsed = serviceSortOrderSchema.parse(input);

  const service = await prisma.service.update({
    where: { id: parsed.id },
    data: { sortOrder: parsed.sortOrder },
  });

  revalidatePath("/admin/icerik/hizmetler");
  return service;
}

export async function getServiceForAdmin(id: string) {
  await requireAdminSession();
  return prisma.service.findUnique({
    where: { id },
  });
}

export async function listServicesForAdmin() {
  await requireAdminSession();
  return prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function deleteService(id: string) {
  await requireAdminSession();
  const service = await prisma.service.delete({
    where: { id },
  });

  revalidatePath("/admin/icerik/hizmetler");
  revalidatePath(`/hizmetler/${service.slug}`);
  return service;
}
