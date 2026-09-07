"use client";

import { useState } from "react";
import { submitIsBasvuru, type FormSubmitResult } from "@/lib/forms/actions";
import * as s from "./public-form.css";

export function IsBasvuruForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<FormSubmitResult | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setResult(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await submitIsBasvuru(formData);
    setResult(res);
    setPending(false);

    if (res.ok) form.reset();
  }

  if (result?.ok) {
    return (
      <div className={s.successBox} role="status">
        Başvurunuz başarıyla gönderildi. Değerlendirme sürecinden sonra sizinle iletişime geçeceğiz.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <input
        type="text"
        name="_hp"
        tabIndex={-1}
        autoComplete="off"
        className={s.honeypot}
        aria-hidden="true"
      />
      {result?.error && (
        <div className={s.errorBox} role="alert">
          {result.error}
        </div>
      )}

      <div className={s.field}>
        <label htmlFor="isbasvuru-adSoyad" className={s.label}>
          Ad Soyad *
        </label>
        <input id="isbasvuru-adSoyad" name="adSoyad" type="text" required className={s.input} />
      </div>

      <div className={s.field}>
        <label htmlFor="isbasvuru-telefon" className={s.label}>
          Telefon *
        </label>
        <input id="isbasvuru-telefon" name="telefon" type="tel" required className={s.input} />
      </div>

      <div className={s.field}>
        <label htmlFor="isbasvuru-eposta" className={s.label}>
          E-posta
        </label>
        <input id="isbasvuru-eposta" name="eposta" type="email" className={s.input} />
      </div>

      <div className={s.field}>
        <label htmlFor="isbasvuru-mesaj" className={s.label}>
          Mesaj *
        </label>
        <textarea
          id="isbasvuru-mesaj"
          name="mesaj"
          required
          className={s.textarea}
          placeholder="Deneyiminiz, pozisyon tercihiniz vb."
        />
      </div>

      <button type="submit" disabled={pending} className={s.submitButton}>
        {pending ? "Gönderiliyor…" : "Başvuru Yap"}
      </button>
    </form>
  );
}
