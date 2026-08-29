# Serhan Turizm — Kapsamlı Güvenlik Analizi Raporu

Bu rapor; sistemdeki **dosya yükleme (R2 upload)**, **admin kimlik doğrulama**, **Server Action yetkilendirme**, **public form girişleri** ve **veri gizliliği** katmanlarının derinlemesine güvenlik denetimini (audit) içerir.

---

## 🚨 Özet Skor & Risk Matrisi

| Kategori | Risk Seviyesi | Mevcut Durum |
| :--- | :--- | :--- |
| **Admin Oturum Güvenliği** | 🔴 **KRİTİK** | Çerez imzalanmıyor (düz Base64 JSON) — Sahte çerezle admin yetkisi alınabilir |
| **Server Action Yetki Kontrolü** | 🟠 **YÜKSEK** | Action fonksiyonları içinde session kontrolü yok (Doğrudan POST ile tetiklenebilir) |
| **Dosya Yükleme (R2 Upload)** | 🟠 **YÜKSEK** | SVG XSS riski & Magic Bytes kontrolü eksikliği |
| **Form Girişleri & Spam/DDoS** | 🟡 **ORTA** | Rate limiting ve Bot/Honeypot koruması eksikliği |
| **Admin Brute Force Koruması** | 🟡 **ORTA** | Hatalı giriş sınırı & timing-safe karşılaştırma eksik |
| **SQL Injection** | 🟢 **GÜVENLİ** | Prisma ORM parametreli sorgular kullanıyor |
| **Path Traversal** | 🟢 **GÜVENLİ** | Yüklenen dosya adları timestamp + hash ile eziliyor |
| **TC Kimlik & KVKK** | 🟢 **GÜVENLİ** | Tam TC DB'ye girmiyor (sadece son 4 hane), IP ve consent loglanıyor |

---

## 1. 🔴 KRİTİK: Admin Oturum Çerezi İmzasız (Auth Bypass)

### Tespit Edilen Açık
`lib/auth.ts` dosyası oturum çerezini şu şekilde oluşturup doğrulamaktadır:
```typescript
// lib/auth.ts (Satır 83)
cookieStore.set(ADMIN_SESSION_COOKIE, Buffer.from(JSON.stringify(session)).toString("base64"), ...);

// lib/auth.ts (Satır 31)
const decoded = Buffer.from(raw, "base64").toString("utf-8");
const parsed = JSON.parse(decoded);
```

### Risk
Çerez herhangi bir **HMAC imzası (Secret Key)** veya **şifreleme (JWT/AES)** içermez. 
Saldırgan şifreyi bilmeden, tarayıcısının `serhan_admin_session` çerezine `eyJ1c2VySWQiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5Ac2VyaGFudHVyaXptLmNvbSJ9` (yani `{"userId":"admin","email":"admin@serhanturizm.com"}` değerinin base64 hali) değerini yazdığında **sistem bunu geçerli bir admin oturumu kabul eder**.

### Çözüm Önerisi
`crypto.createHmac("sha256", process.env.ADMIN_SESSION_SECRET)` ile çerez imzalanmalı veya iron-session / jose / Web Crypto API ile imzalı JWT / şifreli çerez yapısına geçilmelidir.

---

## 2. 🟠 YÜKSEK: Server Action'larda Doğrudan Yetkilendirme Eksikliği

### Tespit Edilen Açık
Next.js Server Action'ları (`"use server"`), tarayıcıdan bağımsız olarak dış dünyaya açık HTTP POST uç noktalarıdır.
`lib/admin/services.ts`, `lib/admin/blog.ts`, `lib/admin/references.ts`, `lib/admin/site-settings.ts` ve `lib/schools/actions.ts` içindeki mutation fonksiyonlarında **session doğrulaması yapılmamaktadır**:

```typescript
// lib/admin/site-settings.ts
export async function updateSiteSettings(input: unknown) {
  const parsed = siteSettingsUpdateSchema.parse(input);
  // requireAdminSession() kontrolü YOK!
  await prisma.siteSettings.upsert(...);
}
```

### Risk
Admin sayfalarındaki `requireAdminSession()` kontrolü sadece sayfanın HTML olarak açılmasını korur. Ancak bir saldırgan Next.js'in action ID'sini bularak veya otomatik test araçlarıyla doğrudan sunucu action'ına POST isteği gönderirse; **giriş yapmadan site ayarlarını, hizmetleri, blog yazılarını silebilir veya değiştirebilir**.

### Çözüm Önerisi
Tüm admin Server Action fonksiyonlarının en başına `await requireAdminSession();` kontrolü eklenmelidir.

---

## 3. 🟠 YÜKSEK: İmaj Yüklemede SVG Stored XSS & MIME Sniffing

### Tespit Edilen Açık
`app/api/admin/upload/route.ts`:
1. `ALLOWED_TYPES` içinde `image/svg+xml` yer almaktadır.
2. Dosya tipi sadece istemcinin beyan ettiği `file.type` üzerinden kontrol edilmektedir.

### Risk
1. **SVG XSS:** SVG dosyaları XML tabanlıdır ve içlerine gömülü `<script>` veya `onload` JavaScript çalıştırabilir. SVG dosyası R2 üzerinden doğrudan tarayıcıda açılırsa hedef kullanıcının/adminin oturumunu çalabilir (Stored Cross-Site Scripting).
2. **MIME Spoofing:** Bir saldırgan `file.type` değerini `image/png` olarak gönderip içine zararlı içerik koyabilir; magic bytes (dosya başlığı baytları) kontrol edilmediği için dosya R2'ye yüklenir.

### Çözüm Önerisi
1. SVG dosyalarını tamamen kaldırmak veya yüklenirken sanitize etmek (örn: `dompurify` / regex ile script tag'lerini temizlemek) veya R2'den sunulurken `Content-Disposition: attachment` ve `Content-Security-Policy: default-src 'none'` header'ları ile zorunlu indirmeye tabi tutmak.
2. Dosya yüklemede ilk birkaç baytı (magic bytes) kontrol ederek gerçek dosya tipini doğrulamak (`file-type` veya buffer header check).

---

## 4. 🟡 ORTA: Public Formlarda Spam, Flooding & Rate Limiting

### Tespit Edilen Açık
`/teklif`, `/iletisim`, `/is-basvurusu`, `/arac-geri-bildirim` ve `/on-kayit/[slug]` formlarında:
- İstek sınırlama (Rate Limiting) bulunmamaktadır.
- Bot / Spam koruması (Honeypot alanı, Cloudflare Turnstile vb.) bulunmamaktadır.

### Risk
- Kötü niyetli bir bot dakikada binlerce sahte talep oluşturarak veritabanını şişirebilir (DB DoS).
- Formlar her başarılı kayıtta Resend üzerinden e-posta tetiklediği için, spam gönderimler şirketin Resend aylık e-posta kotasını dakikalar içinde tüketebilir.

### Çözüm Önerisi
1. **Honeypot Alanı (Kolay & Etkili):** Formlara CSS ile gizlenmiş sahte bir `input[name="website_url"]` alanı eklenir. Botlar bu alanı doldurursa istek sessizce reddedilir.
2. **In-Memory / Upstash Redis Rate Limiter:** Aynı IP adresinden dakikada 5'ten fazla form gönderimi engellenir.
3. **Cloudflare Turnstile:** İleri aşamada görünmez captcha eklenebilir.

---

## 5. 🟡 ORTA: Admin Girişinde Brute Force Koruması & Timing Attack

### Tespit Edilen Açık
`lib/auth.ts` içerisindeki `loginAdmin` fonksiyonu:
- Başarısız şifre denemelerini sınırlandırmaz (sınırsız şifre denenebilir).
- Şifre ve e-posta kontrolünü standart `!==` operatörü ile yapar.

### Çözüm Önerisi
- Başarısız denemelerde kısa süreli bekleme (delay/backoff) veya IP bazlı kısıtlama eklenmeli.
- `crypto.timingSafeEqual` ile zamanlama saldırılarına (timing attacks) karşı güvenli dize karşılaştırması yapılmalı.

---

## 🛠️ Öncelikli Düzeltme Eylem Planı

Aşağıdaki adımları hızlıca uygulayarak sistem güvenliğini A+ seviyesine çıkarabiliriz:

1. **Adım 1:** `lib/auth.ts` oturum çerezine `HMAC-SHA256` imzası eklenmesi.
2. **Adım 2:** Tüm `lib/admin/*.ts` Server Action fonksiyonlarına `requireAdminSession()` kontrolü eklenmesi.
3. **Adım 3:** `app/api/admin/upload/route.ts` içinde SVG dosya tipinin kaldırılması / sınırlandırılması ve magic byte kontrolü.
4. **Adım 4:** Public formlara gizli Honeypot alanı eklenerek botların engellenmesi.
