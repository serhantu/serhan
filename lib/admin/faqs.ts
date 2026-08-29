"use server";

// Admin FAQ Server Actions (Phase 7)

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import {
  faqCreateSchema,
  faqUpdateSchema,
  faqToggleSchema,
  faqSortOrderSchema,
} from "@/lib/validation/cms";

export async function createFaq(input: unknown) {
  await requireAdminSession();
  const parsed = faqCreateSchema.parse(input);

  const faq = await prisma.faqItem.create({
    data: {
      question: parsed.question,
      answer: parsed.answer,
    },
  });

  revalidatePath("/admin/icerik/sss");
  revalidatePath("/sss");
  return faq;
}

export async function updateFaq(input: unknown) {
  await requireAdminSession();
  const parsed = faqUpdateSchema.parse(input);

  const faq = await prisma.faqItem.update({
    where: { id: parsed.id },
    data: {
      question: parsed.question,
      answer: parsed.answer,
    },
  });

  revalidatePath("/admin/icerik/sss");
  revalidatePath("/sss");
  return faq;
}

export async function setFaqActive(input: unknown) {
  await requireAdminSession();
  const parsed = faqToggleSchema.parse(input);

  const faq = await prisma.faqItem.update({
    where: { id: parsed.id },
    data: { active: parsed.active },
  });

  revalidatePath("/admin/icerik/sss");
  revalidatePath("/sss");
  return faq;
}

export async function setFaqSortOrder(input: unknown) {
  await requireAdminSession();
  const parsed = faqSortOrderSchema.parse(input);

  const faq = await prisma.faqItem.update({
    where: { id: parsed.id },
    data: { sortOrder: parsed.sortOrder },
  });

  revalidatePath("/admin/icerik/sss");
  return faq;
}

export async function getFaqForAdmin(id: string) {
  await requireAdminSession();
  return prisma.faqItem.findUnique({
    where: { id },
  });
}

export async function listFaqsForAdmin() {
  await requireAdminSession();
  return prisma.faqItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
}

export async function deleteFaq(id: string) {
  await requireAdminSession();
  await prisma.faqItem.delete({
    where: { id },
  });

  revalidatePath("/admin/icerik/sss");
  revalidatePath("/sss");
}
