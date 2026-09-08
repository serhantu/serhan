import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSchoolBySlug } from "@/lib/schools";
import { REGISTRATION_LEGAL_CONFIG } from "@/lib/legal/config";
import { OnKayitForm } from "@/components/forms/on-kayit/on-kayit-form";
import * as s from "./page.css";

// Public school-service pre-registration entry point.
//
// The route `slug` is the authoritative school identifier. We resolve the school
// by slug (never by a client-provided id or hidden field). Behaviour:
//   - school not found  → 404
//   - school inactive   → "closed" state, but QR URL stays valid
//   - school active     → show the pre-registration screen matching QR-On-Kayit.dc.html
//
// Rendered dynamically from PostgreSQL per request.
export const dynamic = "force-dynamic";

export default async function OnKayitPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const okul = await getSchoolBySlug(slug);

  if (!okul) {
    notFound();
  }

  const waSupportUrl =
    "https://wa.me/905439126349?text=" +
    encodeURIComponent(`Merhaba, ${okul.ad} okul servisi ön kaydı hakkında bilgi almak istiyorum.`);

  return (
    <div className={s.pageWrapper}>
      {/* Sticky Header */}
      <header className={s.header}>
        <Link href="/" className={s.logoLink} aria-label="Serhan Turizm Ana Sayfa">
          <Image
            src="/images/logo.png"
            alt="Serhan Turizm"
            width={140}
            height={35}
            className={s.logoImg}
            priority
          />
        </Link>
        <span className={s.headerBadge}>Servis Ön Kaydı</span>
      </header>

      {/* Main Content */}
      <main className={s.main}>
        {!okul.aktif ? (
          <div className={s.closedCard}>
            <h1 className={s.closedTitle}>{okul.ad}</h1>
            <p className={s.closedText}>
              Bu okul için ön kayıt şu anda aktif değildir. QR kodu geçerlidir; kayıtlar açıldığında
              bu sayfa üzerinden başvuru yapabilirsiniz.
            </p>
          </div>
        ) : (
          <OnKayitForm
            slug={slug}
            okulAd={okul.ad}
            ilce={okul.ilce}
            okulAdres={okul.adres}
            okulHaritaUrl={okul.haritaUrl}
            showTc={okul.tcKimlikIster}
            explicitConsentRequired={REGISTRATION_LEGAL_CONFIG.explicitConsentRequired}
          />
        )}
      </main>

      {/* Footer Support */}
      <footer className={s.footer}>
        <span className={s.footerText}>Sorunuz mu var?</span>
        <div className={s.footerActions}>
          <a href="tel:05439126349" className={s.footerCallLink}>
            0543 912 63 49
          </a>
          <a
            href={waSupportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={s.footerWaLink}
          >
            WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
}
