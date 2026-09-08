import Link from "next/link";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import * as s from "./page.css";

export const dynamic = "force-dynamic";

export default async function IcerikPage() {
  await requireAdminSession();

  const [pageCount, serviceCount, referenceCount, faqCount, blogCount] = await Promise.all([
    prisma.page.count(),
    prisma.service.count(),
    prisma.reference.count(),
    prisma.faqItem.count(),
    prisma.blogPost.count(),
  ]);

  const areas = [
    {
      title: "Sayfalar",
      count: `${pageCount} sayfa`,
      desc: "Ana sayfa, kurumsal, hizmetler, iletişim ve ön kayıt sayfalarının metinleri.",
      href: "/admin/icerik/sayfalar",
    },
    {
      title: "Hizmetler",
      count: `${serviceCount} hizmet`,
      desc: "Personel taşımacılığı, okul servisi, filo kiralama, VIP ve havalimanı transferi.",
      href: "/admin/icerik/hizmetler",
    },
    {
      title: "Referanslar",
      count: `${referenceCount} kurum`,
      desc: "Okul ve kurum logoları, referans metinleri ve sıralama.",
      href: "/admin/icerik/referanslar",
    },
    {
      title: "SSS",
      count: `${faqCount} soru`,
      desc: "Veli ve kurum tarafından en sık sorulan sorular ve cevapları.",
      href: "/admin/icerik/sss",
    },
    {
      title: "Blog",
      count: `${blogCount} yazı`,
      desc: "Servis güvenliği, mevzuat ve operasyon bilgilendirme yazıları.",
      href: "/admin/icerik/blog",
    },
  ];

  return (
    <div className={s.page}>
      <div className={s.grid}>
        {areas.map((area) => (
          <div key={area.title} className={s.card}>
            <div className={s.cardHeader}>
              <h2 className={s.cardTitle}>{area.title}</h2>
              <span className={s.cardCount}>{area.count}</span>
            </div>
            <p className={s.cardDesc}>{area.desc}</p>
            <div className={s.cardFooter}>
              <span className={s.cardMeta}>Aktif modül</span>
              <Link href={area.href} className={s.editButton}>
                Düzenle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
