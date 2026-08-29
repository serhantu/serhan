"use client";

import { useState } from "react";
import { submitTeklif, type FormSubmitResult } from "@/lib/forms/actions";
import * as s from "./public-form.css";

export function TeklifForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<FormSubmitResult | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setResult(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await submitTeklif(formData);
    setResult(res);
    setPending(false);

    if (res.ok) form.reset();
  }

  if (result?.ok) {
    return (
      <div className={s.successBox} role="status">
        Teklif talebiniz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <input type="text" name="_hp" tabIndex={-1} autoComplete="off" className={s.honeypot} aria-hidden="true" />
      {result?.error && (
        <div className={s.errorBox} role="alert">
          {result.error}
        </div>
      )}


      <div className={s.field}>
        <label htmlFor="teklif-adSoyad" className={s.label}>Ad Soyad *</label>
        <input id="teklif-adSoyad" name="adSoyad" type="text" required className={s.input} />
      </div>

      <div className={s.field}>
        <label htmlFor="teklif-telefon" className={s.label}>Telefon *</label>
        <input id="teklif-telefon" name="telefon" type="tel" required className={s.input} />
      </div>

      <div className={s.field}>
        <label htmlFor="teklif-eposta" className={s.label}>E-posta</label>
        <input id="teklif-eposta" name="eposta" type="email" className={s.input} />
      </div>

      <div className={s.field}>
        <label htmlFor="teklif-mesaj" className={s.label}>Mesaj *</label>
        <textarea id="teklif-mesaj" name="mesaj" required className={s.textarea} />
      </div>

      <button type="submit" disabled={pending} className={s.submitButton}>
        {pending ? "Gönderiliyor…" : "Teklif Alın"}
      </button>
    </form>
  );
}
