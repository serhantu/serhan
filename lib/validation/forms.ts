// Public website form validation schemas.
//
// Shared between client-side forms and server-side actions. All four request
// types (Teklif, Iletisim, IsBasvuru, AracGeriBildirim) use the same base
// shape: adSoyad, telefon, eposta, mesaj.

import { z } from "zod";

const baseFormSchema = z.object({
  adSoyad: z.string().trim().min(1, "Ad soyad gereklidir.").max(120),
  telefon: z.string().trim().min(1, "Telefon gereklidir.").max(30),
  eposta: z
    .union([z.literal(""), z.string().trim().email("Geçerli bir e-posta giriniz.")])
    .transform((v) => (v === "" ? "" : v)),
  mesaj: z.string().trim().min(1, "Mesaj gereklidir.").max(2000),
});

export const teklifSchema = baseFormSchema;
export type TeklifFormValues = z.infer<typeof teklifSchema>;

export const iletisimSchema = baseFormSchema;
export type IletisimFormValues = z.infer<typeof iletisimSchema>;

export const isBasvuruSchema = baseFormSchema;
export type IsBasvuruFormValues = z.infer<typeof isBasvuruSchema>;

export const aracGeriBildirimSchema = baseFormSchema;
export type AracGeriBildirimFormValues = z.infer<typeof aracGeriBildirimSchema>;
