// SiteSettings query layer (singleton pattern).
//
// The settings row uses a fixed ID ("main"). getSiteSettings() uses upsert
// to guarantee the row exists — if it is missing (e.g. fresh database) a
// default row is created transparently.

import "server-only";
import { prisma } from "@/lib/db";

export type SiteSettingsData = {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
  twitter: string | null;
  googleMaps: string | null;
  workingHours: string | null;
  aboutShort: string | null;
};

const SINGLETON_ID = "main";

/**
 * Get the site settings. Creates a default row if none exists.
 */
export async function getSiteSettings(): Promise<SiteSettingsData> {
  const settings = await prisma.siteSettings.upsert({
    where: { id: SINGLETON_ID },
    update: {},
    create: { id: SINGLETON_ID },
    select: {
      companyName: true,
      phone: true,
      email: true,
      address: true,
      whatsapp: true,
      instagram: true,
      facebook: true,
      twitter: true,
      googleMaps: true,
      workingHours: true,
      aboutShort: true,
    },
  });

  return settings;
}
