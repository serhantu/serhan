-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "TalepDurumu" AS ENUM ('YENI', 'INCELENIYOR', 'ILETISIME_GECILDI', 'TAMAMLANDI');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "Musteri" (
    "id" TEXT NOT NULL,
    "adSoyad" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "eposta" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Musteri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ogrenci" (
    "id" TEXT NOT NULL,
    "musteriId" TEXT NOT NULL,
    "okulId" TEXT NOT NULL,
    "ad" TEXT NOT NULL,
    "soyad" TEXT NOT NULL,
    "sinifKademe" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ogrenci_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Okul" (
    "id" TEXT NOT NULL,
    "ad" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "tcKimlikIster" BOOLEAN NOT NULL DEFAULT false,
    "ilce" TEXT,
    "adres" TEXT,
    "haritaUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Okul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnKayit" (
    "id" TEXT NOT NULL,
    "okulId" TEXT NOT NULL,
    "musteriId" TEXT,
    "ogrenciId" TEXT,
    "ogrenciAd" TEXT NOT NULL,
    "ogrenciSoyad" TEXT NOT NULL,
    "sinifKademe" TEXT NOT NULL,
    "tcKimlikNo" TEXT,
    "adres" TEXT NOT NULL,
    "veliAdSoyad" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "telefon2" TEXT,
    "eposta" TEXT,
    "refNo" TEXT,
    "status" "TalepDurumu" NOT NULL DEFAULT 'YENI',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "notificationSent" BOOLEAN NOT NULL DEFAULT false,
    "notificationSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OnKayit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consent" (
    "id" TEXT NOT NULL,
    "onKayitId" TEXT NOT NULL,
    "privacyNoticeVersion" TEXT NOT NULL,
    "privacyAcknowledgedAt" TIMESTAMP(3) NOT NULL,
    "explicitConsent" BOOLEAN NOT NULL,
    "explicitConsentAt" TIMESTAMP(3),
    "marketingConsent" BOOLEAN NOT NULL DEFAULT false,
    "marketingConsentAt" TIMESTAMP(3),
    "ipAddress" TEXT NOT NULL,

    CONSTRAINT "Consent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teklif" (
    "id" TEXT NOT NULL,
    "adSoyad" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "eposta" TEXT NOT NULL,
    "mesaj" TEXT NOT NULL,
    "status" "TalepDurumu" NOT NULL DEFAULT 'YENI',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teklif_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IsBasvuru" (
    "id" TEXT NOT NULL,
    "adSoyad" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "eposta" TEXT NOT NULL,
    "mesaj" TEXT NOT NULL,
    "status" "TalepDurumu" NOT NULL DEFAULT 'YENI',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IsBasvuru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Iletisim" (
    "id" TEXT NOT NULL,
    "adSoyad" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "eposta" TEXT NOT NULL,
    "mesaj" TEXT NOT NULL,
    "status" "TalepDurumu" NOT NULL DEFAULT 'YENI',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Iletisim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AracGeriBildirim" (
    "id" TEXT NOT NULL,
    "adSoyad" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "eposta" TEXT NOT NULL,
    "mesaj" TEXT NOT NULL,
    "status" "TalepDurumu" NOT NULL DEFAULT 'YENI',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AracGeriBildirim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reference" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "websiteUrl" TEXT,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqItem" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FaqItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "companyName" TEXT NOT NULL DEFAULT 'Serhan Turizm',
    "phone" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "whatsapp" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "twitter" TEXT,
    "googleMaps" TEXT,
    "workingHours" TEXT,
    "aboutShort" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Musteri_telefon_key" ON "Musteri"("telefon");

-- CreateIndex
CREATE INDEX "Musteri_telefon_idx" ON "Musteri"("telefon");

-- CreateIndex
CREATE INDEX "Musteri_eposta_idx" ON "Musteri"("eposta");

-- CreateIndex
CREATE INDEX "Ogrenci_musteriId_idx" ON "Ogrenci"("musteriId");

-- CreateIndex
CREATE INDEX "Ogrenci_okulId_idx" ON "Ogrenci"("okulId");

-- CreateIndex
CREATE UNIQUE INDEX "Ogrenci_musteriId_ad_soyad_okulId_key" ON "Ogrenci"("musteriId", "ad", "soyad", "okulId");

-- CreateIndex
CREATE UNIQUE INDEX "Okul_slug_key" ON "Okul"("slug");

-- CreateIndex
CREATE INDEX "Okul_aktif_idx" ON "Okul"("aktif");

-- CreateIndex
CREATE INDEX "OnKayit_okulId_idx" ON "OnKayit"("okulId");

-- CreateIndex
CREATE INDEX "OnKayit_musteriId_idx" ON "OnKayit"("musteriId");

-- CreateIndex
CREATE INDEX "OnKayit_ogrenciId_idx" ON "OnKayit"("ogrenciId");

-- CreateIndex
CREATE INDEX "OnKayit_createdAt_idx" ON "OnKayit"("createdAt");

-- CreateIndex
CREATE INDEX "OnKayit_status_idx" ON "OnKayit"("status");

-- CreateIndex
CREATE INDEX "OnKayit_isRead_idx" ON "OnKayit"("isRead");

-- CreateIndex
CREATE UNIQUE INDEX "Consent_onKayitId_key" ON "Consent"("onKayitId");

-- CreateIndex
CREATE INDEX "Teklif_createdAt_idx" ON "Teklif"("createdAt");

-- CreateIndex
CREATE INDEX "Teklif_status_idx" ON "Teklif"("status");

-- CreateIndex
CREATE INDEX "Teklif_isRead_idx" ON "Teklif"("isRead");

-- CreateIndex
CREATE INDEX "IsBasvuru_createdAt_idx" ON "IsBasvuru"("createdAt");

-- CreateIndex
CREATE INDEX "IsBasvuru_status_idx" ON "IsBasvuru"("status");

-- CreateIndex
CREATE INDEX "IsBasvuru_isRead_idx" ON "IsBasvuru"("isRead");

-- CreateIndex
CREATE INDEX "Iletisim_createdAt_idx" ON "Iletisim"("createdAt");

-- CreateIndex
CREATE INDEX "Iletisim_status_idx" ON "Iletisim"("status");

-- CreateIndex
CREATE INDEX "Iletisim_isRead_idx" ON "Iletisim"("isRead");

-- CreateIndex
CREATE INDEX "AracGeriBildirim_createdAt_idx" ON "AracGeriBildirim"("createdAt");

-- CreateIndex
CREATE INDEX "AracGeriBildirim_status_idx" ON "AracGeriBildirim"("status");

-- CreateIndex
CREATE INDEX "AracGeriBildirim_isRead_idx" ON "AracGeriBildirim"("isRead");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE INDEX "Page_status_idx" ON "Page"("status");

-- CreateIndex
CREATE INDEX "Page_createdAt_idx" ON "Page"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE INDEX "Service_active_idx" ON "Service"("active");

-- CreateIndex
CREATE INDEX "Service_sortOrder_idx" ON "Service"("sortOrder");

-- CreateIndex
CREATE INDEX "Reference_active_idx" ON "Reference"("active");

-- CreateIndex
CREATE INDEX "Reference_sortOrder_idx" ON "Reference"("sortOrder");

-- CreateIndex
CREATE INDEX "FaqItem_active_idx" ON "FaqItem"("active");

-- CreateIndex
CREATE INDEX "FaqItem_sortOrder_idx" ON "FaqItem"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_status_idx" ON "BlogPost"("status");

-- CreateIndex
CREATE INDEX "BlogPost_publishedAt_idx" ON "BlogPost"("publishedAt");

-- CreateIndex
CREATE INDEX "BlogPost_createdAt_idx" ON "BlogPost"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Ogrenci" ADD CONSTRAINT "Ogrenci_musteriId_fkey" FOREIGN KEY ("musteriId") REFERENCES "Musteri"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ogrenci" ADD CONSTRAINT "Ogrenci_okulId_fkey" FOREIGN KEY ("okulId") REFERENCES "Okul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnKayit" ADD CONSTRAINT "OnKayit_okulId_fkey" FOREIGN KEY ("okulId") REFERENCES "Okul"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnKayit" ADD CONSTRAINT "OnKayit_musteriId_fkey" FOREIGN KEY ("musteriId") REFERENCES "Musteri"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnKayit" ADD CONSTRAINT "OnKayit_ogrenciId_fkey" FOREIGN KEY ("ogrenciId") REFERENCES "Ogrenci"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consent" ADD CONSTRAINT "Consent_onKayitId_fkey" FOREIGN KEY ("onKayitId") REFERENCES "OnKayit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

