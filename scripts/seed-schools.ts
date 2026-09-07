import { prisma } from "../lib/db";

const SCHOOLS = [
  {
    ad: "Başakşehir Asil ve Sinerji Koleji",
    slug: "basaksehir-asil-ve-sinerji-koleji",
    ilce: "Başakşehir / İstanbul",
    adres: "Kayabaşı Mah. Ulubatlı Hasan Cad. No: 8C, Başakşehir / İstanbul",
    haritaUrl:
      "https://maps.google.com/?q=Kayabaşı+Mahallesi+Ulubatlı+Hasan+Caddesi+No:8C+Başakşehir+İstanbul",
    tcKimlikIster: false,
    aktif: true,
  },
  {
    ad: "Merter Asil Koleji",
    slug: "merter-asil-koleji",
    ilce: "Güngören / İstanbul",
    adres:
      "Abdurrahman Nafiz Gürman Mah. General Ali Rıza Gürcan Cad. No: 66, Merter, Güngören / İstanbul",
    haritaUrl:
      "https://maps.google.com/?q=Abdurrahman+Nafiz+Gürman+Mah.+General+Ali+Rıza+Gürcan+Cad.+No:66+Güngören+İstanbul",
    tcKimlikIster: false,
    aktif: true,
  },
  {
    ad: "Zinde Okulları Eyüpsultan",
    slug: "zinde-okullari-eyupsultan",
    ilce: "Eyüpsultan / İstanbul",
    adres: "Düğmeciler Mah. Düğmeciler Cad. No: 8-10, Eyüpsultan / İstanbul",
    haritaUrl:
      "https://maps.google.com/?q=Düğmeciler+Mahallesi+Düğmeciler+Caddesi+No:8-10+Eyüpsultan+İstanbul",
    tcKimlikIster: false,
    aktif: true,
  },
  {
    ad: "Uğur Koleji Güngören Kampüsü",
    slug: "ugur-koleji-gungoren-kampus",
    ilce: "Güngören / İstanbul",
    adres: "Sanayi Mah. Davutpaşa Cad. No: 24, Güngören / İstanbul",
    haritaUrl: "https://maps.google.com/?q=Sanayi+Mah.+Davutpaşa+Cad.+No:24+Güngören+İstanbul",
    tcKimlikIster: false,
    aktif: true,
  },
  {
    ad: "Uğur Koleji Fatih - Topkapı Kampüsü",
    slug: "ugur-koleji-fatih-kampus",
    ilce: "Fatih - Zeytinburnu / İstanbul",
    adres: "Maltepe Mah. Cebe Ali Bey Sok. No: 12, Zeytinburnu (Topkapı - Fatih) / İstanbul",
    haritaUrl:
      "https://maps.google.com/?q=Maltepe+Mah.+Cebe+Ali+Bey+Sok.+No:12+Zeytinburnu+İstanbul",
    tcKimlikIster: false,
    aktif: true,
  },
  {
    ad: "Sultangazi Birikim Koleji",
    slug: "sultangazi-birikim-koleji",
    ilce: "Sultangazi / İstanbul",
    adres: "Sultançiftliği Mah. Eski Edirne Asfaltı Cad. No: 455, Sultangazi / İstanbul",
    haritaUrl:
      "https://maps.google.com/?q=Sultançiftliği+Mah.+Eski+Edirne+Asfaltı+Cad.+No:455+Sultangazi+İstanbul",
    tcKimlikIster: false,
    aktif: true,
  },
  {
    ad: "Firuzköy Mektebim Koleji",
    slug: "firuzkoy-mektebim-koleji",
    ilce: "Avcılar / İstanbul",
    adres: "Mustafa Kemalpaşa Mah. 106. Sok. No: 8, Firuzköy, Avcılar / İstanbul",
    haritaUrl: "https://maps.google.com/?q=Mustafa+Kemalpaşa+Mah.+106.+Sok.+No:8+Avcılar+İstanbul",
    tcKimlikIster: false,
    aktif: true,
  },
];

async function main() {
  console.log("Seeding schools...");

  // Deactivate test school if present
  await prisma.okul.updateMany({
    where: { slug: "abdulhak-hamit-ortaokulu" },
    data: { aktif: false },
  });

  for (const school of SCHOOLS) {
    const upserted = await prisma.okul.upsert({
      where: { slug: school.slug },
      update: {
        ad: school.ad,
        ilce: school.ilce,
        adres: school.adres,
        haritaUrl: school.haritaUrl,
        tcKimlikIster: school.tcKimlikIster,
        aktif: school.aktif,
      },
      create: school,
    });
    console.log(`✓ [${upserted.slug}] ${upserted.ad}`);
  }

  console.log("All schools seeded successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error seeding schools:", err);
  process.exit(1);
});
