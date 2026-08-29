"use client";

import { useState } from "react";
import { submitAracGeriBildirim, type FormSubmitResult } from "@/lib/forms/actions";
import * as s from "./public-form.css";

export function AracGeriBildirimForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<FormSubmitResult | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setResult(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await submitAracGeriBildirim(formData);
    setResult(res);
    setPending(false);

    if (res.ok) form.reset();
  }

  if (result?.ok) {
    return (
      <div className={s.successBox} role="status">
        Geri bildiriminiz başarıyla gönderildi. İlginiz için teşekkür ederiz.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      {result?.error && (
        <div className={s.errorBox} role="alert">
          {result.error}
        </div>
      )}

      <div className={s.field}>
        <label htmlFor="arac-adSoyad" className={s.label}>Ad Soyad *</label>
        <input id="arac-adSoyad" name="adSoyad" type="text" required className={s.input} />
      </div>

      <div className={s.field}>
        <label htmlFor="arac-telefon" className={s.label}>Telefon *</label>
        <input id="arac-telefon" name="telefon" type="tel" required className={s.input} />
      </div>

      <div className={s.field}>
        <label htmlFor="arac-eposta" className={s.label}>E-posta</label>
        <input id="arac-eposta" name="eposta" type="email" className={s.input} />
      </div>

      <div className={s.field}>
        <label htmlFor="arac-mesaj" className={s.label}>Geri Bildirim *</label>
        <textarea id="arac-mesaj" name="mesaj" required className={s.textarea} placeholder="Araç, sürücü veya servis hakkındaki geri bildiriminiz…" />
      </div>

      <button type="submit" disabled={pending} className={s.submitButton}>
        {pending ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
}
