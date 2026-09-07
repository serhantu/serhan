import Link from "next/link";
import { getSiteSettings } from "@/lib/site-settings";
import * as s from "./layout.css";

export const dynamic = "force-dynamic";

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <div className={s.siteWrapper}>
      <header className={s.header}>
        <div className={s.headerInner}>
          <Link href="/" className={s.brand}>
            {settings.companyName || "Serhan Turizm"}
          </Link>

          <nav className={s.nav} aria-label="Ana Navigasyon">
            <Link href="/" className={s.navLink}>
              Ana Sayfa
            </Link>
            <Link href="/hizmetler" className={s.navLink}>
              Hizmetler
            </Link>
            <Link href="/kurumsal" className={s.navLink}>
              Kurumsal
            </Link>
            <Link href="/referanslar" className={s.navLink}>
              Referanslar
            </Link>
            <Link href="/blog" className={s.navLink}>
              Blog
            </Link>
            <Link href="/sss" className={s.navLink}>
              SSS
            </Link>
            <Link href="/iletisim" className={s.navLink}>
              İletişim
            </Link>
            <Link href="/teklif" className={s.ctaLink}>
              Teklif Alın
            </Link>
          </nav>
        </div>
      </header>

      <div className={s.content}>{children}</div>

      <footer className={s.footer}>
        <div className={s.footerInner}>
          <div className={s.footerCol}>
            <p className={s.footerTitle}>{settings.companyName || "Serhan Turizm"}</p>
            <p className={s.footerText}>
              {settings.aboutShort ||
                "Öğrenci ve personel taşımacılığında güvenli, konforlu ve zamanında hizmet anlayışı."}
            </p>
            {settings.phone && <p className={s.footerText}>Tel: {settings.phone}</p>}
            {settings.email && <p className={s.footerText}>E-posta: {settings.email}</p>}
          </div>

          <div className={s.footerCol}>
            <p className={s.footerTitle}>Hızlı Bağlantılar</p>
            <Link href="/hizmetler" className={s.footerLink}>
              Hizmetlerimiz
            </Link>
            <Link href="/kurumsal" className={s.footerLink}>
              Hakkımızda
            </Link>
            <Link href="/referanslar" className={s.footerLink}>
              Referanslar
            </Link>
            <Link href="/blog" className={s.footerLink}>
              Blog / Haberler
            </Link>
            <Link href="/sss" className={s.footerLink}>
              Sıkça Sorulan Sorular
            </Link>
          </div>

          <div className={s.footerCol}>
            <p className={s.footerTitle}>Başvuru & İletişim</p>
            <Link href="/teklif" className={s.footerLink}>
              Teklif Alın
            </Link>
            <Link href="/is-basvurusu" className={s.footerLink}>
              İş Başvurusu
            </Link>
            <Link href="/arac-geri-bildirim" className={s.footerLink}>
              Araç Geri Bildirim
            </Link>
            <Link href="/iletisim" className={s.footerLink}>
              İletişim
            </Link>
          </div>

          <div className={s.footerCol}>
            <p className={s.footerTitle}>Sosyal Medya</p>
            {settings.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={s.footerLink}
              >
                Instagram
              </a>
            )}
            {settings.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={s.footerLink}
              >
                Facebook
              </a>
            )}
            {settings.twitter && (
              <a
                href={settings.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={s.footerLink}
              >
                Twitter / X
              </a>
            )}
            {settings.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className={s.footerLink}
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>

        <div className={s.footerBottom}>
          <span>
            © {new Date().getFullYear()} {settings.companyName || "Serhan Turizm"}. Tüm hakları
            saklıdır.
          </span>
          <span>Güvenli & Konforlu Ulaşım</span>
        </div>
      </footer>
    </div>
  );
}
