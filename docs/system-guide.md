# Serhan Turizm — Sistem & Geliştirme Rehberi

Bu belge projenin güncel mimarisini, eklenen modülleri, güvenlik mekanizmalarını, konfigürasyon adımlarını ve operasyonel işleyişini açıklar.

---

## 1. Genel Mimari

Proje, **tek bir Next.js 16 (App Router)** uygulaması olarak çalışır. Ayrı backend veya mikroservis yoktur.

```
app/
├── (website)/              # Public kurumsal web sitesi (SSR / Dynamic)
│   ├── page.tsx            # Ana Sayfa (CMS modellerinden dinamik beslenir)
│   ├── layout.tsx          # Ortak Header & Footer (SiteSettings entegre)
│   ├── teklif/             # Teklif Alın formu (Honeypot korumalı)
│   ├── iletisim/           # İletişim formu & şirket bilgileri
│   ├── is-basvurusu/       # İş Başvurusu formu
│   ├── arac-geri-bildirim/ # Servis aracı geri bildirim formu
│   ├── hizmetler/[slug]/   # Hizmet detay (CMS)
│   ├── blog/[slug]/        # Blog detay (CMS)
│   ├── referanslar/        # Referanslar (CMS)
│   └── sss/                # SSS (CMS)
├── on-kayit/[slug]/        # Okul servisi QR kayıt giriş noktası (Honeypot korumalı)
├── admin/                  # Yönetim Paneli (HMAC İmzalı Session Korumalı)
│   ├── page.tsx            # Dashboard (özet kartlar & son talepler)
│   ├── talepler/           # Birleşik Talepler (filtreleme, arama, durum yönetimi)
│   ├── musteriler/         # CRM (veli & öğrenci geçmişi)
│   ├── okullar/            # Okul yönetimi & hızlı QR indirme
│   ├── qr/                 # QR Kod Yönetimi & Baskı Arayüzü
│   ├── icerik/             # CMS (Hizmetler, Blog, Referanslar, Sayfalar, SSS)
│   └── ayarlar/            # Site Ayarları (Şirket, iletişim, sosyal medya)
└── api/
    └── admin/
        ├── upload/         # 5K WebP İmaj İşleme & R2 Yükleme API
        ├── qr/batch/       # Toplu QR & Baskı Şablon API
        └── okullar/[id]/qr # Okul bazlı on-the-fly QR API
```

---

## 2. Modüller & Özellikler

### 2.1 Cloudflare R2 İmaj Yönetimi & 5K WebP Dönüşümü (`lib/r2.ts` & `/api/admin/upload`)
- **S3 Uyumlu İstemci:** `@aws-sdk/client-s3` kütüphanesi ile Cloudflare R2'ye bağlanır.
- **Otomatik WebP Optimizasyonu (`sharp`):** Yüklenen tüm raster görseller (JPG, PNG, GIF, WebP) sunucuda işlenerek doğrudan yüksek kaliteli `.webp` formatına dönüştürülür.
- **5K Çözünürlük Sınırı:** Görseller 5K sınırına (`5120×5120 px`) kadar orijinal detayını korur; daha büyük görseller en boy oranı korunarak 5K'ya resize edilir.
- **50MB Dosya Boyutu Sınırı:** Yüksek çözünürlüklü profesyonel kamera fotoğrafları için 50MB'a kadar yükleme desteklenir.
- **EXIF Otomatik Döndürme:** Yan/ters çekilmiş fotoğraflar EXIF oryantasyonuna göre otomatik düzeltilir.
- **Güvenlik Doğrulaması:** Binary Magic Bytes doğrulaması ile dosyanın gerçek imaj olup olmadığı bayt seviyesinde kontrol edilir. XSS riskini önlemek için SVG yüklemesi devre dışıdır.
- **Upload Bileşeni (`ImageUpload`):** Admin paneldeki Hizmetler, Blog ve Referanslar formlarında drag & drop ile anında yükleme yapılır.

### 2.2 QR Kod Yönetimi & Baskı Arayüzü (`/admin/qr`)
- **Şablonlar (`lib/qr-templates.ts`):**
  1. *Servis Etiketi (6×9 cm):* Şirket adı, QR kod, okul adı ve iletişim bilgisi.
  2. *A4 Poster:* Büyük afiş boyutu, açıklama metni ve public URL.
  3. *Sticker (5×5 cm):* Kompakt kare etiket.
- **Canlı Önizleme:** Seçilen okul ve şablona göre SVG anında render edilir.
- **Toplu İndirme (Batch):** İstenen okullar seçilerek tek tıkla tüm şablonlar SVG olarak indirilebilir.

### 2.3 Site Ayarları (`SiteSettings` Modeli & `/admin/ayarlar`)
- Singleton pattern (`id = "main"`).
- Şirket adı, telefon, e-posta, adres, WhatsApp, Instagram, Facebook, Twitter, Google Maps ve kısa tanıtım metni tek ekrandan yönetilir.
- Public web sitesinin Header ve Footer bileşenleri bu ayarlardan otomatik beslenir.

### 2.4 Public Website Formları & Bot Koruması (`lib/forms/actions.ts` & `lib/validation/forms.ts`)
1. **Teklif Alın (`/teklif`):** Fiyat teklifi talepleri toplanır (`Teklif` tablosu).
2. **İletişim (`/iletisim`):** Genel iletişim mesajları toplanır (`Iletisim` tablosu).
3. **İş Başvurusu (`/is-basvurusu`):** Sürücü/rehber/personel başvuruları toplanır (`IsBasvuru` tablosu).
4. **Araç Geri Bildirim (`/arac-geri-bildirim`):** Araç ve servis memnuniyet geri bildirimleri toplanır (`AracGeriBildirim` tablosu).
- **Honeypot Koruması:** Formlara gizli `_hp` alanı yerleştirilmiştir. Botlar bu alanı doldurduğunda istek sessizce reddedilir, veritabanı şişirilmez ve Resend e-posta kotası korunur.

### 2.5 Resend E-Posta Genişletmesi (`lib/resend-notifications.ts`)
- Yeni form tipleri için admin bildirim e-postası altyapısı hazırlandı.
- HTML e-posta tasarımı `emails/form-notification-admin.tsx` üzerinden yönetilebilir.
- API Key tanımlı değilse form gönderimi engellenmez, hata loglanarak kayıt tamamlanır (graceful fallback).

---

## 3. Güvenlik Mimarisi

1. **HMAC-SHA256 İmzalı Oturum Çerezleri (`lib/auth.ts`):** Admin oturum çerezleri kriptografik olarak imzalanır. Çerez tahrifatı veya sahte token ile yetkisiz giriş yapılamaz.
2. **Server Action Yetki Doğrulaması:** Tüm admin action fonksiyonları (`services.ts`, `blog.ts`, `references.ts`, `faqs.ts`, `pages.ts`, `requests.ts`, `schools/actions.ts`, `site-settings.ts`) doğrudan `requireAdminSession()` kontrolü yapar.
3. **TC Kimlik Minimizasyonu:** TC kimlik numaraları sunucu tarafında algoritmik doğrulanır ve veritabanına **yalnızca son 4 hanesi** kaydedilir.
4. **Zamanlama Saldırısı Koruması (Timing Attack):** Giriş bilgilerinin ve çerez imzalarının kontrolünde sabit zamanlı `crypto.timingSafeEqual` kullanılır.

---

## 4. Ortam Değişkenleri (.env)

Aşağıdaki değişkenleri `.env` dosyanıza tanımlamanız yeterlidir:

```env
# Veritabanı (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/serhan?schema=public"

# Uygulama URL'i (QR kodların hedefi)
NEXT_PUBLIC_APP_URL="https://serhanturizm.com"

# Admin Kimlik Doğrulama
ADMIN_LOGIN_EMAIL="admin@serhanturizm.com"
ADMIN_LOGIN_PASSWORD="your-strong-password"
ADMIN_SESSION_SECRET="your-32-character-random-secret-key"

# Resend (E-posta)
RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_FROM_EMAIL="no-reply@serhanturizm.com"
ADMIN_EMAIL="admin@serhanturizm.com"

# Cloudflare R2 (İmaj Depolama)
R2_ACCOUNT_ID="your-cloudflare-account-id"
R2_ACCESS_KEY_ID="your-r2-access-key-id"
R2_SECRET_ACCESS_KEY="your-r2-secret-access-key"
R2_BUCKET_NAME="serhan-images"
R2_PUBLIC_URL="https://pub-xxxxxxxxxxxx.r2.dev"
```

---

## 5. Frontend & Stil Kuralları

Tüm arayüz kodları [docs/frontend-rules.md](file:///Users/tarikozbalkan/www/serhan/docs/frontend-rules.md) standartlarına %100 uyar:
- **Vanilla Extract (`.css.ts`)** kullanılır.
- **Inline CSS (`style={{...}}`) kesinlikle kullanılmaz.**
- **Mantıksal Özellikler (Logical Properties):** `inline-size`, `block-size`, `margin-inline`, `padding-block`, `inset-block-start` standarttır.
- **Akışkan Boyutlandırma:** Başlıklar, aralıklar ve padding'ler için `clamp(min, ideal, max)` kullanılır.
- **İçerik-Bazlı Boyutlandırma (Intrinsic Sizing):** Buton ve badge'lerde `inline-size: fit-content` kullanılır.
- **Akışkan Grid:** `grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr))` kalıbı kullanılır.
- **`rem` Birimi & Breakpointler:** Tüm ölçüler, radii (`999rem`) ve breakpointler (`30rem`, `48rem`, `64rem`, `80rem`) `rem` cinsindendir.
- **Renkler:** HSL tokenleri üzerindendir (`vars.color.*`).
- **Tip Güvenliği:** TypeScript strict mode aktif, Zod ile ortak client/server şemaları.
- **Sunucu Bileşenleri:** Server Components varsayılandır, interaktivite gereken yerler açıkça `"use client"` ile ayrılmıştır.

