"use client";

// Client control: the school creation form. Submits to the `createSchool` Server
// Action. The slug is generated server-side and is never sent from here.
// Validation here is UX-only; the Server Action re-validates with Zod.

import { useState } from "react";
import { useActionState } from "react";
import { createSchool } from "@/lib/schools/actions";
import * as s from "./school-create-form.css";

type FormState = { ok: boolean; error?: string };

type Props = {
  onCancel?: () => void;
  onSuccess?: () => void;
};

export function SchoolCreateForm({ onCancel, onSuccess }: Props) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    async (_prev: FormState, formData: FormData): Promise<FormState> => {
      const res = await createSchool({
        ad: String(formData.get("ad") ?? ""),
        ilce: String(formData.get("ilce") ?? "").trim() || undefined,
        adres: String(formData.get("adres") ?? "").trim() || undefined,
        haritaUrl: String(formData.get("haritaUrl") ?? "").trim() || undefined,
        tcKimlikIster: formData.get("tcKimlikIster") === "on",
      });

      if (res.ok) {
        onSuccess?.();
        return { ok: true };
      }
      return { ok: false, error: res.error };
    },
    { ok: false },
  );

  const [name, setName] = useState("");
  const [ilce, setIlce] = useState("");
  const [adres, setAdres] = useState("");
  const [haritaUrl, setHaritaUrl] = useState("");
  const [tc, setTc] = useState(false);

  if (state.ok) {
    return (
      <div className={s.successCard} role="status">
        <div className={s.successMessage}>
          <span className={s.successBadge}>✓</span>
          <div>
            <strong>Okul başarıyla eklendi.</strong>
            <p className={s.successDesc}>Liste güncellendi.</p>
          </div>
        </div>
        <button
          type="button"
          className={s.cancelButton}
          onClick={() => {
            setName("");
            setIlce("");
            setAdres("");
            setHaritaUrl("");
            setTc(false);
            onCancel?.();
          }}
        >
          Kapat
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} className={s.form} aria-label="Yeni okul ekle">
      <div className={s.formHeader}>
        <div>
          <h2 className={s.formTitle}>Yeni Okul Ekle</h2>
          <p className={s.formSubtitle}>
            QR servis ön kaydı için yeni bir okul ve konum bilgisi tanımlayın.
          </p>
        </div>
        {onCancel && (
          <button
            type="button"
            className={s.closeButton}
            onClick={onCancel}
            aria-label="Formu kapat"
          >
            ✕
          </button>
        )}
      </div>

      <div className={s.grid}>
        <div className={`${s.field} ${s.fullWidth}`}>
          <label htmlFor="ad" className={s.label}>
            Okul adı <span className={s.requiredMark}>*</span>
          </label>
          <input
            id="ad"
            name="ad"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={s.input}
            placeholder="Örn. Başakşehir Asil ve Sinerji Koleji"
            maxLength={120}
          />
        </div>

        <div className={s.field}>
          <label htmlFor="ilce" className={s.label}>
            İlçe / Şehir
          </label>
          <input
            id="ilce"
            name="ilce"
            type="text"
            value={ilce}
            onChange={(e) => setIlce(e.target.value)}
            className={s.input}
            placeholder="Örn. Başakşehir / İstanbul"
            maxLength={100}
          />
        </div>

        <div className={s.field}>
          <label htmlFor="adres" className={s.label}>
            Açık Adres
          </label>
          <input
            id="adres"
            name="adres"
            type="text"
            value={adres}
            onChange={(e) => setAdres(e.target.value)}
            className={s.input}
            placeholder="Örn. Kayabaşı Mah. Ulubatlı Hasan Cad. No: 8C"
            maxLength={255}
          />
        </div>

        <div className={`${s.field} ${s.fullWidth}`}>
          <label htmlFor="haritaUrl" className={s.label}>
            Harita (Google Maps) Linki
          </label>
          <input
            id="haritaUrl"
            name="haritaUrl"
            type="url"
            value={haritaUrl}
            onChange={(e) => setHaritaUrl(e.target.value)}
            className={s.input}
            placeholder="https://maps.google.com/?q=..."
            maxLength={500}
          />
        </div>

        <div className={s.checkboxField}>
          <label htmlFor="tcKimlikIster" className={s.checkboxLabel}>
            <input
              id="tcKimlikIster"
              name="tcKimlikIster"
              type="checkbox"
              checked={tc}
              onChange={(e) => setTc(e.target.checked)}
              className={s.checkbox}
            />
            <span>Velilerden T.C. Kimlik numarası zorunlu olarak istensin</span>
          </label>
        </div>
      </div>

      {state.error ? (
        <p role="alert" className={s.error}>
          {state.error}
        </p>
      ) : null}

      <div className={s.actions}>
        <button type="submit" className={s.submit} disabled={pending || name.trim() === ""}>
          {pending ? "Ekleniyor…" : "Okul Ekle"}
        </button>
        {onCancel && (
          <button type="button" className={s.cancelButton} onClick={onCancel} disabled={pending}>
            Vazgeç
          </button>
        )}
      </div>
    </form>
  );
}
