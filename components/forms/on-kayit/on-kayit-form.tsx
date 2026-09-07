"use client";

// Public school-service pre-registration form.
// Matches the visual and UX specifications of QR-On-Kayit.dc.html.
//
// Security & Compliance:
//   - Honeypot spam trap (`_hp`) prevents automated bot submissions.
//   - TC Kimlik algorithmic format check on client; only minimal representation stored.
//   - Server-side authoritative validation with Zod.
//   - Full KVKK consent acknowledgment logging.

import { useRef, useState, useActionState } from "react";
import Link from "next/link";
import { onKayitOlustur } from "@/lib/on-kayit/actions";
import { isValidTcKimlik } from "@/lib/tc-kimlik";
import * as s from "./on-kayit-form.css";

type Props = {
  slug: string;
  okulAd: string;
  ilce?: string | null;
  okulAdres?: string | null;
  okulHaritaUrl?: string | null;
  showTc: boolean;
  explicitConsentRequired: boolean;
};

type FieldErrors = Record<string, string>;

type FormState = {
  ok: boolean;
  refNo?: string;
  error?: string;
  fieldErrors?: FieldErrors;
};

export function OnKayitForm({
  slug,
  okulAd,
  ilce,
  okulAdres,
  okulHaritaUrl,
  showTc,
  explicitConsentRequired,
}: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Form input states to preserve values across step switches
  const [ogrenciAdSoyad, setOgrenciAdSoyad] = useState("");
  const [kademe, setKademe] = useState("İlkokul");
  const [sinif, setSinif] = useState("");
  const [tcKimlikNo, setTcKimlikNo] = useState("");
  const [veliAdSoyad, setVeliAdSoyad] = useState("");
  const [telefon, setTelefon] = useState("");
  const [telefon2, setTelefon2] = useState("");
  const [eposta, setEposta] = useState("");
  const [adres, setAdres] = useState("");
  const [kvkk, setKvkk] = useState(false);

  const [state, formAction, pending] = useActionState<FormState, FormData>(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      const res = await onKayitOlustur(slug, formData);
      if (res.ok) {
        return { ok: true, refNo: res.refNo };
      }
      return { ok: false, error: res.error, fieldErrors: res.fieldErrors };
    },
    { ok: false },
  );

  const err = (key: string) => clientErrors[key] ?? state.fieldErrors?.[key];

  function validateStep1(): boolean {
    const next: FieldErrors = {};
    if (!ogrenciAdSoyad.trim()) {
      next.ogrenciAdSoyad = "Öğrenci adı soyadı gereklidir.";
    }
    if (!sinif.trim()) {
      next.sinif = "Sınıf / şube bilgisi gereklidir.";
    }
    if (showTc) {
      const cleanedTc = tcKimlikNo.trim();
      if (!cleanedTc) {
        next.tcKimlikNo = "T.C. kimlik numarası gereklidir.";
      } else if (!/^\d{11}$/.test(cleanedTc) || !isValidTcKimlik(cleanedTc)) {
        next.tcKimlikNo = "Geçerli bir 11 haneli T.C. kimlik numarası giriniz.";
      }
    }

    setClientErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleNext() {
    if (validateStep1()) {
      setClientErrors({});
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleBack() {
    setClientErrors({});
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // If successfully registered, show the Success Screen
  if (state.ok) {
    const waText = encodeURIComponent(
      `Merhaba, ${okulAd} için ön kayıt başvurusu yaptım. Başvuru Numaram: ${state.refNo || ""}. Bilgi almak istiyorum.`,
    );
    const waUrl = `https://wa.me/905439126349?text=${waText}`;

    return (
      <div className={s.successWrap} role="status" aria-live="polite">
        <div className={s.successIcon} aria-hidden>
          ✓
        </div>
        <h1 className={s.successTitle}>Ön kaydınız alındı</h1>
        <p className={s.successText}>
          Talebiniz Serhan Turizm&apos;e iletildi. Operasyon ekibimiz güzergah uygunluğunu kontrol
          edip aynı gün içinde sizi arayacak.
        </p>

        {state.refNo ? (
          <div className={s.refBox}>
            <span className={s.refKicker}>Başvuru numaranız</span>
            <span className={s.refCode}>{state.refNo}</span>
          </div>
        ) : null}

        <a href={waUrl} target="_blank" rel="noopener noreferrer" className={s.waButton}>
          <span>WhatsApp&apos;tan bilgi al</span>
        </a>

        <Link href="/" className={s.homeLink}>
          Ana sayfaya dön
        </Link>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className={s.formWrap} noValidate>
      {/* Honeypot spam trap */}
      <input
        type="text"
        name="_hp"
        tabIndex={-1}
        autoComplete="off"
        className={s.honeypot}
        aria-hidden="true"
      />

      {/* 3 Step Progress Bar */}
      <div className={s.stepsBar} aria-hidden="true">
        <span className={`${s.stepBarItem} ${s.stepBarActive}`} />
        <span className={`${s.stepBarItem} ${step === 2 ? s.stepBarActive : ""}`} />
        <span className={s.stepBarItem} />
      </div>

      {/* Pre-defined, Locked School Card */}
      <div className={s.schoolBadge}>
        <span className={s.schoolBadgeKicker}>QR KODDAN OKUNAN OKUL</span>
        <h2 className={s.schoolBadgeName}>{okulAd}</h2>
        {ilce ? <span className={s.schoolBadgeDistrict}>{ilce}</span> : null}
        {okulAdres ? (
          <div className={s.schoolBadgeAddress}>
            <svg
              className={s.schoolBadgePinIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{okulAdres}</span>
          </div>
        ) : null}
        {okulHaritaUrl ? (
          <a
            href={okulHaritaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={s.schoolBadgeMapLink}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" y1="3" x2="9" y2="18" />
              <line x1="15" y1="6" x2="15" y2="21" />
            </svg>
            <span>Haritada Konumu Gör ↗</span>
          </a>
        ) : null}
      </div>

      {/* Hidden inputs to guarantee step 1 values submit when on step 2 */}
      <input type="hidden" name="ogrenciAdSoyad" value={ogrenciAdSoyad} />
      <input type="hidden" name="kademe" value={kademe} />
      <input type="hidden" name="sinif" value={sinif} />
      {showTc ? <input type="hidden" name="tcKimlikNo" value={tcKimlikNo} /> : null}

      {/* STEP 1: ÖĞRENCİ BİLGİLERİ */}
      {step === 1 && (
        <section aria-label="Öğrenci Bilgileri">
          <h1 className={s.stepHeading}>Öğrenci bilgileri</h1>
          <p className={s.stepDesc}>Servise kayıt olacak öğrencinin bilgilerini girin.</p>

          <div className={s.fieldsGrid}>
            <label className={s.fieldLabel}>
              <span className={s.labelText}>
                Öğrenci adı soyadı <span className={s.requiredMark}>*</span>
              </span>
              <input
                id="ogrenciAdSoyad"
                value={ogrenciAdSoyad}
                onChange={(e) => {
                  setOgrenciAdSoyad(e.target.value);
                  if (clientErrors.ogrenciAdSoyad) {
                    setClientErrors((prev) => ({ ...prev, ogrenciAdSoyad: "" }));
                  }
                }}
                placeholder="Ad Soyad"
                className={`${s.input} ${err("ogrenciAdSoyad") ? s.inputInvalid : ""}`}
                maxLength={100}
                required
              />
              {err("ogrenciAdSoyad") ? (
                <span className={s.fieldError}>{err("ogrenciAdSoyad")}</span>
              ) : null}
            </label>

            <div className={s.rowTwoCols}>
              <label className={s.fieldLabel}>
                <span className={s.labelText}>Kademe</span>
                <select
                  id="kademe"
                  value={kademe}
                  onChange={(e) => setKademe(e.target.value)}
                  className={s.select}
                >
                  <option value="Anaokulu">Anaokulu</option>
                  <option value="İlkokul">İlkokul</option>
                  <option value="Ortaokul">Ortaokul</option>
                  <option value="Lise">Lise</option>
                </select>
              </label>

              <label className={s.fieldLabel}>
                <span className={s.labelText}>
                  Sınıf / şube <span className={s.requiredMark}>*</span>
                </span>
                <input
                  id="sinif"
                  value={sinif}
                  onChange={(e) => {
                    setSinif(e.target.value);
                    if (clientErrors.sinif) {
                      setClientErrors((prev) => ({ ...prev, sinif: "" }));
                    }
                  }}
                  placeholder="Örn. 5-A"
                  className={`${s.input} ${err("sinif") ? s.inputInvalid : ""}`}
                  maxLength={40}
                  required
                />
                {err("sinif") ? <span className={s.fieldError}>{err("sinif")}</span> : null}
              </label>
            </div>

            {showTc && (
              <label className={s.fieldLabel}>
                <span className={s.labelText}>
                  T.C. kimlik numarası <span className={s.requiredMark}>*</span>
                </span>
                <input
                  id="tcKimlikNo"
                  value={tcKimlikNo}
                  onChange={(e) => {
                    setTcKimlikNo(e.target.value.replace(/\D/g, "").slice(0, 11));
                    if (clientErrors.tcKimlikNo) {
                      setClientErrors((prev) => ({ ...prev, tcKimlikNo: "" }));
                    }
                  }}
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="11 haneli"
                  className={`${s.input} ${err("tcKimlikNo") ? s.inputInvalid : ""}`}
                />
                {err("tcKimlikNo") ? (
                  <span className={s.fieldError}>{err("tcKimlikNo")}</span>
                ) : null}
              </label>
            )}
          </div>

          <div className={s.btnRow}>
            <button type="button" onClick={handleNext} className={s.btnPrimary}>
              Devam et
            </button>
          </div>
        </section>
      )}

      {/* STEP 2: VELİ VE ADRES BİLGİLERİ */}
      {step === 2 && (
        <section aria-label="Veli ve Adres Bilgileri">
          <h1 className={s.stepHeading}>Veli ve adres bilgileri</h1>
          <p className={s.stepDesc}>Güzergah planlaması ve iletişim için gerekli.</p>

          <div className={s.fieldsGrid}>
            <label className={s.fieldLabel}>
              <span className={s.labelText}>
                Veli adı soyadı <span className={s.requiredMark}>*</span>
              </span>
              <input
                id="veliAdSoyad"
                name="veliAdSoyad"
                value={veliAdSoyad}
                onChange={(e) => setVeliAdSoyad(e.target.value)}
                placeholder="Ad Soyad"
                className={`${s.input} ${err("veliAdSoyad") ? s.inputInvalid : ""}`}
                maxLength={120}
                required
              />
              {err("veliAdSoyad") ? (
                <span className={s.fieldError}>{err("veliAdSoyad")}</span>
              ) : null}
            </label>

            <div className={s.rowTwoCols}>
              <label className={s.fieldLabel}>
                <span className={s.labelText}>
                  İletişim numarası <span className={s.requiredMark}>*</span>
                </span>
                <input
                  id="telefon"
                  name="telefon"
                  type="tel"
                  inputMode="tel"
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                  placeholder="05XX XXX XX XX"
                  className={`${s.input} ${err("telefon") ? s.inputInvalid : ""}`}
                  maxLength={25}
                  required
                />
                {err("telefon") ? <span className={s.fieldError}>{err("telefon")}</span> : null}
              </label>

              <label className={s.fieldLabel}>
                <span className={s.labelText}>2. iletişim numarası</span>
                <input
                  id="telefon2"
                  name="telefon2"
                  type="tel"
                  inputMode="tel"
                  value={telefon2}
                  onChange={(e) => setTelefon2(e.target.value)}
                  placeholder="05XX XXX XX XX (Yedek telefon)"
                  className={`${s.input} ${err("telefon2") ? s.inputInvalid : ""}`}
                  maxLength={25}
                />
                {err("telefon2") ? <span className={s.fieldError}>{err("telefon2")}</span> : null}
              </label>
            </div>

            <label className={s.fieldLabel}>
              <span className={s.labelText}>E-posta (isteğe bağlı)</span>
              <input
                id="eposta"
                name="eposta"
                type="email"
                inputMode="email"
                value={eposta}
                onChange={(e) => setEposta(e.target.value)}
                placeholder="ornek@eposta.com"
                className={`${s.input} ${err("eposta") ? s.inputInvalid : ""}`}
                maxLength={160}
              />
              {err("eposta") ? <span className={s.fieldError}>{err("eposta")}</span> : null}
            </label>

            <label className={s.fieldLabel}>
              <span className={s.labelText}>
                Öğrencinin alınacağı adres <span className={s.requiredMark}>*</span>
              </span>
              <textarea
                id="adres"
                name="adres"
                rows={3}
                value={adres}
                onChange={(e) => setAdres(e.target.value)}
                placeholder="Mahalle, cadde/sokak, bina no, ilçe"
                className={`${s.textarea} ${err("adres") ? s.inputInvalid : ""}`}
                maxLength={300}
                required
              />
              {err("adres") ? <span className={s.fieldError}>{err("adres")}</span> : null}
            </label>

            {/* KVKK Onay Kutusu */}
            <label className={s.kvkkRow}>
              <input
                type="checkbox"
                name="privacyAcknowledged"
                value="true"
                checked={kvkk}
                onChange={(e) => setKvkk(e.target.checked)}
                className={s.checkbox}
                required
              />
              <span className={s.kvkkText}>
                KVKK aydınlatma metnini okudum; öğrenci ve veli verilerimin servis kaydı ve güzergah
                planlaması amacıyla işlenmesini onaylıyorum.
                <span className={s.requiredMark}> *</span>
              </span>
            </label>
            {err("privacyAcknowledged") ? (
              <span className={s.fieldError}>{err("privacyAcknowledged")}</span>
            ) : null}

            {explicitConsentRequired ? (
              <input type="hidden" name="explicitConsent" value="true" />
            ) : null}
          </div>

          {state.error ? (
            <div role="alert" className={s.formError}>
              {state.error}
            </div>
          ) : null}

          <div className={s.btnRow}>
            <button
              type="button"
              onClick={handleBack}
              disabled={pending}
              className={s.btnSecondary}
            >
              Geri
            </button>
            <button type="submit" disabled={pending} className={s.btnPrimary}>
              {pending ? "Gönderiliyor..." : "Ön Kaydı Gönder"}
            </button>
          </div>
        </section>
      )}
    </form>
  );
}
