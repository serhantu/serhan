# Serhan Turizm — Kapsamlı Güvenlik Analizi & Çözüm Raporu

Bu rapor; sistemdeki **dosya yükleme (R2 upload)**, **admin kimlik doğrulama**, **Server Action yetkilendirme**, **public form girişleri** ve **veri gizliliği** katmanlarının derinlemesine güvenlik denetimini ve uygulanan çözümleri içerir.

---

## 🛡️ Güvenlik Durumu & Çözüm Matrisi

| Kategori                         | Başlangıç Riski | Uygulanan Çözüm                                                          | Güncel Durum   |
| :------------------------------- | :-------------- | :----------------------------------------------------------------------- | :------------- |
| **Admin Oturum Güvenliği**       | 🔴 **KRİTİK**   | HMAC-SHA256 kriptografik imza + timingSafeEqual eklendi                  | 🟢 **GÜVENLİ** |
| **Server Action Yetki Kontrolü** | 🟠 **YÜKSEK**   | Tüm admin mutation fonksiyonlarına `requireAdminSession()` eklendi       | 🟢 **GÜVENLİ** |
| **Dosya Yükleme (R2 Upload)**    | 🟠 **YÜKSEK**   | Binary Magic Bytes kontrolü + Sharp ile 5K WebP zorunluluğu (SVG kapalı) | 🟢 **GÜVENLİ** |
| **Form Girişleri & Spam/DDoS**   | 🟡 **ORTA**     | Tüm public formlara gizli Honeypot (`_hp`) bot tuzağı eklendi            | 🟢 **GÜVENLİ** |
| **Admin Brute Force & Timing**   | 🟡 **ORTA**     | `crypto.timingSafeEqual` ile zamanlama saldırısı koruması eklendi        | 🟢 **GÜVENLİ** |
| **SQL Injection**                | 🟢 **GÜVENLİ**  | Prisma ORM parametreli sorgular kullanıyor                               | 🟢 **GÜVENLİ** |
| **Path Traversal**               | 🟢 **GÜVENLİ**  | Yüklenen dosya adları timestamp + sha256 hash ile eziliyor               | 🟢 **GÜVENLİ** |
| **TC Kimlik & KVKK**             | 🟢 **GÜVENLİ**  | Tam TC DB'ye girmiyor (sadece son 4 hane), IP ve consent loglanıyor      | 🟢 **GÜVENLİ** |

---

## 1. Admin Oturum Çerezi Koruması (`lib/auth.ts`)

- **Eski Durum:** Çerez düz base64 formatındaydı ve sahte çerez oluşturularak şifresiz admin olunabiliyordu.
- **Uygulanan Çözüm:**
  - Çerez içeriği `HMAC-SHA256` ile imzalanıyor (`<payloadBase64>.<hmacSignature>`).
  - Çerez çözülürken `crypto.timingSafeEqual` ile imza doğrulaması yapılıyor. Geçersiz veya tahrif edilmiş çerezler anında reddediliyor.

---

## 2. Server Action Yetkilendirme Koruması (`lib/admin/*.ts`)

- **Eski Durum:** Sayfada session kontrolü olsa da sunucu action'ları HTTP POST ile doğrudan tetiklenebiliyordu.
- **Uygulanan Çözüm:**
  - `services.ts`, `blog.ts`, `references.ts`, `faqs.ts`, `pages.ts`, `requests.ts`, `schools/actions.ts`, `site-settings.ts` dosyalarındaki tüm mutation fonksiyonlarının en başına `await requireAdminSession();` eklendi.

---

## 3. İmaj Yükleme & WebP Dönüşüm Koruması (`app/api/admin/upload/route.ts`)

- **Eski Durum:** SVG XSS riski ve MIME spoofing riski mevcuttu.
- **Uygulanan Çözüm:**
  - XSS riski taşıyan SVG formatı kaldırıldı.
  - Dosyanın gerçek formatı ilk baytları (Magic Bytes: JPEG, PNG, WebP, GIF) incelenerek doğrulanıyor.
  - Yüklenen tüm görseller `sharp` ile optimize edilerek doğrudan **`.webp`** formatına dönüştürülüyor ve 5K (`5120px`) tavan çözünürlüğü ile sınırlandırılıyor.
  - Maksimum dosya boyutu 50MB'a çıkarıldı.

---

## 4. Public Formlarda Bot/Spam Koruması (`lib/forms/actions.ts` & `lib/on-kayit/actions.ts`)

- **Eski Durum:** Otomatik botlar formları floodlayarak veritabanını şişirebilir ve Resend e-posta kotasını tüketebilirdi.
- **Uygulanan Çözüm:**
  - Formlara CSS ile gizlenmiş `_hp` tuzak alanı yerleştirildi.
  - Botlar bu alanı doldurduğunda istek sessizce reddedilir; veritabanına kayıt atılmaz ve e-posta gönderilmez.
