"use server";

// Admin Pages Server Actions (Phase 7)

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { generateSlug } from "@/lib/slug";
import { pageCreateSchema, pageUpdateSchema, pagePublishSchema } from "@/lib/validation/cms";

export async function createPage(input: unknown) {
  await requireAdminSession();
  const parsed = pageCreateSchema.parse(input);

  const slug = generateSlug(parsed.title);

  const existing = await prisma.page.findUnique({ where: { slug } });
  if (existing) {
    throw new Error("Slug already exists");
  }

  const page = await prisma.page.create({
    data: {
      title: parsed.title,
      slug,
      excerpt: parsed.excerpt || null,
      content: parsed.content,
      status: "DRAFT",
    },
  });

  revalidatePath("/admin/icerik/sayfalar");
  return page;
}

export async function updatePage(input: unknown) {
  await requireAdminSession();
  const parsed = pageUpdateSchema.parse(input);

  const page = await prisma.page.update({
    where: { id: parsed.id },
    data: {
      title: parsed.title,
      excerpt: parsed.excerpt || null,
      content: parsed.content,
    },
  });

  revalidatePath("/admin/icerik/sayfalar");
  revalidatePath(`/kurumsal/${page.slug}`);
  return page;
}

export async function publishPage(input: unknown) {
  await requireAdminSession();
  const parsed = pagePublishSchema.parse(input);

  const page = await prisma.page.update({
    where: { id: parsed.id },
    data: { status: parsed.status },
  });

  revalidatePath("/admin/icerik/sayfalar");
  revalidatePath(`/kurumsal/${page.slug}`);
  return page;
}

export async function getPageForAdmin(id: string) {
  await requireAdminSession();
  return prisma.page.findUnique({
    where: { id },
  });
}

export async function listPagesForAdmin() {
  await requireAdminSession();
  return prisma.page.findMany({
    orderBy: [{ createdAt: "desc" }],
  });
}

export async function deletePage(id: string) {
  await requireAdminSession();
  const page = await prisma.page.delete({
    where: { id },
  });

  revalidatePath("/admin/icerik/sayfalar");
  revalidatePath(`/kurumsal/${page.slug}`);
  return page;
}
