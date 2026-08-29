// SiteSettings validation schema.

import { z } from "zod";

export const siteSettingsUpdateSchema = z.object({
  companyName: z.string().trim().min(1, "Şirket adı gereklidir.").max(200),
  phone: z.string().trim().max(30),
  email: z.union([z.literal(""), z.string().trim().email("Geçerli bir e-posta giriniz.")]),
  address: z.string().trim().max(500),
  whatsapp: z.string().trim().max(30).optional().transform((v) => v || null),
  instagram: z.string().trim().max(200).optional().transform((v) => v || null),
  facebook: z.string().trim().max(200).optional().transform((v) => v || null),
  twitter: z.string().trim().max(200).optional().transform((v) => v || null),
  googleMaps: z.string().trim().max(1000).optional().transform((v) => v || null),
  workingHours: z.string().trim().max(300).optional().transform((v) => v || null),
  aboutShort: z.string().trim().max(1000).optional().transform((v) => v || null),
});

export type SiteSettingsUpdateInput = z.infer<typeof siteSettingsUpdateSchema>;
