"use client";

import { useState } from "react";
import { submitIletisim, type FormSubmitResult } from "@/lib/forms/actions";
import * as s from "./public-form.css";

export function IletisimForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<FormSubmitResult | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setResult(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const res = await submitIletisim(formData);
    setResult(res);
    setPending(false);

    if (res.ok) form.reset();
  }

  if (result?.ok) {
    return (
      <div className={s.successBox} role="status">
        Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.
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
        <label htmlFor="iletisim-adSoyad" className={s.label}>
          Ad Soyad *
        </label>
        <input id="iletisim-adSoyad" name="adSoyad" type="text" required className={s.input} />
      </div>

      <div className={s.field}>
        <label htmlFor="iletisim-telefon" className={s.label}>
          Telefon *
        </label>
        <input id="iletisim-telefon" name="telefon" type="tel" required className={s.input} />
      </div>

      <div className={s.field}>
        <label htmlFor="iletisim-eposta" className={s.label}>
          E-posta
        </label>
        <input id="iletisim-eposta" name="eposta" type="email" className={s.input} />
      </div>

      <div className={s.field}>
        <label htmlFor="iletisim-mesaj" className={s.label}>
          Mesaj *
        </label>
        <textarea id="iletisim-mesaj" name="mesaj" required className={s.textarea} />
      </div>

      <button type="submit" disabled={pending} className={s.submitButton}>
        {pending ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
}
