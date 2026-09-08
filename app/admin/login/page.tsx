import Image from "next/image";
import Link from "next/link";
import { loginAdmin } from "@/lib/auth";
import * as s from "./page.css";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = (await searchParams) ?? {};
  const error = resolved.error;

  let errorText = "";
  if (error === "invalid") {
    errorText = "E-posta veya şifre hatalı. Lütfen kontrol ediniz.";
  } else if (error === "missing") {
    errorText = "Lütfen e-posta ve şifrenizi eksiksiz giriniz.";
  } else if (error === "config") {
    errorText = "Sistemde admin kimlik bilgileri tanımlanmamış.";
  }

  return (
    <div className={s.container}>
      {/* Left Brand Panel (Desktop) */}
      <aside className={s.heroPanel} aria-label="Serhan Turizm Yönetim Paneli">
        <div>
          <Image
            src="/images/logo-white.png"
            alt="Serhan Turizm"
            width={200}
            height={51}
            className={s.heroLogo}
            priority
          />
        </div>

        <div className={s.heroContent}>
          <div className={s.heroHeader}>
            <span className={s.heroTag}>YÖNETİM PANELİ</span>
            <h1 className={s.heroTitle}>Operasyon kontrolü, bir tıkta.</h1>
            <p className={s.heroDesc}>
              Talepler, teklif yönetimi, okul yönetimi ve QR kod baskısı — tek panel, hepsi bir yerde.
            </p>
          </div>

          <div className={s.featureList}>
            <div className={s.featureItem}>
              <span className={s.featureIcon} aria-hidden="true">✓</span>
              <span>Canlı operasyon takibi</span>
            </div>
            <div className={s.featureItem}>
              <span className={s.featureIcon} aria-hidden="true">✓</span>
              <span>Talep yönetim sistemi</span>
            </div>
            <div className={s.featureItem}>
              <span className={s.featureIcon} aria-hidden="true">✓</span>
              <span>QR kod ve baskı otomasyonu</span>
            </div>
          </div>
        </div>

        <div className={s.heroFooter}>
          <span>© 2026 Serhan Turizm</span>
          <br />
          <Link href="/kurumsal/kullanim-kosullari" className={s.heroFooterLinks}>
            Kullanım şartları
          </Link>
          <span> · </span>
          <Link href="/kurumsal/gizlilik-politikasi" className={s.heroFooterLinks}>
            Gizlilik
          </Link>
        </div>
      </aside>

      {/* Right Login Form Panel */}
      <main className={s.formPanel}>
        <div className={s.formCard}>
          <div className={s.formHeader}>
            <Image
              src="/images/logo.png"
              alt="Serhan Turizm"
              width={160}
              height={40}
              className={s.mobileLogo}
              priority
            />
            <h2 className={s.formTitle}>Giriş yap</h2>
            <p className={s.formSubtitle}>
              Yönetim paneline erişmek için kimlik bilgilerinizi girin.
            </p>
          </div>

          <form action={loginAdmin} className={s.form}>
            {errorText ? (
              <div className={s.errorBox} role="alert" aria-live="polite">
                {errorText}
              </div>
            ) : null}

            <label className={s.field} htmlFor="email">
              <span className={s.label}>E-posta veya kullanıcı adı</span>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue="admin@serhanturizm.com"
                placeholder="admin@serhanturizm.com"
                className={s.input}
                required
                autoComplete="email"
              />
            </label>

            <label className={s.field} htmlFor="password">
              <div className={s.fieldLabelRow}>
                <span className={s.label}>Şifre</span>
                <span className={s.forgotLink}>Şifremi unuttum</span>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className={s.input}
                required
                autoComplete="current-password"
              />
            </label>

            <label className={s.rememberRow}>
              <input type="checkbox" name="remember" className={s.checkbox} defaultChecked />
              <span>Beni hatırla</span>
            </label>

            <button type="submit" className={s.submitButton}>
              <span>Giriş yap</span>
              <span aria-hidden="true">→</span>
            </button>
          </form>


          <div className={s.infoCard}>
            <span className={s.infoCardTitle}>Sistem Yöneticisi Girişi:</span>
            <div className={s.infoCardMono}>
              <div>admin@serhanturizm.com</div>
              <div>Çevre değişkenlerinde tanımlı şifreniz</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
