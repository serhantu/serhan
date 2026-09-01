# Serhan Turizm — Gelecek Geliştirme & TODO Listesi

Bu belge, ilerleyen geliştirme aşamalarında yapılacak işleri ve hatırlatmaları içerir.

---

## 📌 1. Public İletişim / Form İl & İlçe Seçimi (Geo Dropdown)

- **Açıklama:** İletişim, teklif ve ilgili formlara dinamik il/ilçe seçimi (select / searchable dropdown) eklenecek.
- **Veri Kaynakları:**
  - İller: `/Users/tarikozbalkan/www/kimden/geo/provinces.json`
  - İlçeler: `/Users/tarikozbalkan/www/kimden/geo/districts.json`
- **Uygulama Notları:**
  - JSON verileri projeye `lib/geo/` veya statik data katmanına aktarılacak.
  - İl seçildiğinde ilgili ilçelerin dinamik filtrelenmesi sağlanacak.
  - Zod form şemalarına (`lib/validation/forms.ts`) `il` ve `ilce` alanları eklenecek.
  - Prisma modelleri (`Iletisim`, `Teklif` vb.) gerekirse `il` ve `ilce` sütunlarıyla güncellenecek.
