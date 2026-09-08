import "dotenv/config";
import { prisma } from "../lib/db";

const SCHOOLS = [
  {
    ad: "Başakşehir Asil",
    slug: "basaksehir-asil",
    ilce: "Başakşehir / İstanbul",
    adres: "Kayabaşı Mah. Ulubatlı Hasan Cad. No: 8C, Başakşehir / İstanbul",
    haritaUrl:
      "https://maps.google.com/?q=Kayabaşı+Mahallesi+Ulubatlı+Hasan+Caddesi+No:8C+Başakşehir+İstanbul",
    tcKimlikIster: false,
    aktif: true,
  },
  {
    ad: "Başakşehir Sinerji Koleji",
    slug: "basaksehir-sinerji-koleji",
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
    ad: "Eyüp Zinde Koleji",
    slug: "eyup-zinde-koleji",
    ilce: "Eyüpsultan / İstanbul",
    adres: "Düğmeciler Mah. Düğmeciler Cad. No: 8-10, Eyüpsultan / İstanbul",
    haritaUrl:
      "https://maps.google.com/?q=Düğmeciler+Mahallesi+Düğmeciler+Caddesi+No:8-10+Eyüpsultan+İstanbul",
    tcKimlikIster: false,
    aktif: true,
  },
  {
    ad: "Uğur Koleji Güngören",
    slug: "ugur-koleji-gungoren",
    ilce: "Güngören / İstanbul",
    adres: "Sanayi Mah. Davutpaşa Cad. No: 24, Güngören / İstanbul",
    haritaUrl: "https://maps.google.com/?q=Sanayi+Mah.+Davutpaşa+Cad.+No:24+Güngören+İstanbul",
    tcKimlikIster: false,
    aktif: true,
  },
  {
    ad: "Fatih Sınav Koleji",
    slug: "fatih-sinav-koleji",
    ilce: "Fatih / İstanbul",
    adres: "Topkapı Mah. Şeyhülislam Sok. No: 28/1, Fatih / İstanbul",
    haritaUrl:
      "https://maps.google.com/?q=Topkapı+Mahallesi+Şeyhülislam+Sokak+No:28/1+Fatih+İstanbul",
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
  {
    ad: "Fatih Birikim Koleji",
    slug: "fatih-birikim-koleji",
    ilce: "Fatih / İstanbul",
    adres: "Topkapı Mah. Şeyhülislam Sok. No: 24, Fatih / İstanbul",
    haritaUrl:
      "https://maps.google.com/?q=Topkapı+Mahallesi+Şeyhülislam+Sokak+No:24+Fatih+İstanbul",
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

  // Clean up legacy unused slugs that have zero registrations
  const legacySlugs = [
    "basaksehir-asil-ve-sinerji-koleji",
    "zinde-okullari-eyupsultan",
    "ugur-koleji-gungoren-kampus",
    "ugur-koleji-fatih-kampus",
  ];

  for (const slug of legacySlugs) {
    const school = await prisma.okul.findUnique({
      where: { slug },
      include: { _count: { select: { onKayitlar: true } } },
    });
    if (school && school._count.onKayitlar === 0) {
      await prisma.okul.delete({ where: { slug } });
      console.log(`Cleaned up obsolete school: ${slug}`);
    }
  }

  // Upsert all 9 current schools with sequential timestamps
  const baseTime = new Date("2026-09-08T09:00:00Z").getTime();

  for (let i = 0; i < SCHOOLS.length; i++) {
    const school = SCHOOLS[i];
    const itemDate = new Date(baseTime + i * 60000);

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
      create: {
        ...school,
        createdAt: itemDate,
      },
    });
    console.log(`${i + 1}. [${upserted.slug}] ${upserted.ad}`);
  }

  console.log("All 9 schools seeded successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Error seeding schools:", err);
  process.exit(1);
});
