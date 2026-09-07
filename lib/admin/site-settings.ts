"use server";

// Admin SiteSettings server action.

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";
import { siteSettingsUpdateSchema } from "@/lib/validation/site-settings";

const SINGLETON_ID = "main";

export async function updateSiteSettings(input: unknown) {
  await requireAdminSession();
  const parsed = siteSettingsUpdateSchema.parse(input);

  await prisma.siteSettings.upsert({
    where: { id: SINGLETON_ID },
    update: {
      companyName: parsed.companyName,
      phone: parsed.phone,
      email: parsed.email,
      address: parsed.address,
      whatsapp: parsed.whatsapp,
      instagram: parsed.instagram,
      facebook: parsed.facebook,
      twitter: parsed.twitter,
      googleMaps: parsed.googleMaps,
      workingHours: parsed.workingHours,
      aboutShort: parsed.aboutShort,
    },
    create: {
      id: SINGLETON_ID,
      companyName: parsed.companyName,
      phone: parsed.phone,
      email: parsed.email,
      address: parsed.address,
      whatsapp: parsed.whatsapp,
      instagram: parsed.instagram,
      facebook: parsed.facebook,
      twitter: parsed.twitter,
      googleMaps: parsed.googleMaps,
      workingHours: parsed.workingHours,
      aboutShort: parsed.aboutShort,
    },
  });

  revalidatePath("/admin/ayarlar");
  revalidatePath("/");
}
