"use client";

import { useState } from "react";
import type { SiteSettingsData } from "@/lib/site-settings";
import { updateSiteSettings } from "@/lib/admin/site-settings";
import * as s from "./page.css";

type Props = {
  initialData: SiteSettingsData;
};

export function SettingsForm({ initialData }: Props) {
  const [data, setData] = useState<SiteSettingsData>(initialData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    try {
      await updateSiteSettings(data);
      setMessage({ type: "success", text: "Ayarlar kaydedildi." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Kaydetme başarısız.",
      });
    } finally {
      setSaving(false);
    }
  }

  function update(field: keyof SiteSettingsData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div>
      {message && (
        <div
          className={
            message.type === "success" ? s.successMessage : s.errorMessage
          }
          role="status"
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className={s.form}>
        <h2 className={s.sectionTitle}>Şirket Bilgileri</h2>
        <div className={s.fieldGroup}>
          <div className={s.field}>
            <label htmlFor="companyName" className={s.label}>
              Şirket Adı *
            </label>
            <input
              id="companyName"
              type="text"
              className={s.input}
              value={data.companyName}
              onChange={(e) => update("companyName", e.target.value)}
              required
            />
          </div>
          <div className={s.field}>
            <label htmlFor="phone" className={s.label}>
              Telefon
            </label>
            <input
              id="phone"
              type="tel"
              className={s.input}
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
          <div className={s.field}>
            <label htmlFor="email" className={s.label}>
              E-posta
            </label>
            <input
              id="email"
              type="email"
              className={s.input}
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
          <div className={s.field}>
            <label htmlFor="whatsapp" className={s.label}>
              WhatsApp
            </label>
            <input
              id="whatsapp"
              type="text"
              className={s.input}
              value={data.whatsapp ?? ""}
              onChange={(e) => update("whatsapp", e.target.value)}
              placeholder="+90 5xx xxx xx xx"
            />
          </div>
          <div className={s.fieldFull}>
            <label htmlFor="address" className={s.label}>
              Adres
            </label>
            <textarea
              id="address"
              className={s.textarea}
              value={data.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>
          <div className={s.fieldFull}>
            <label htmlFor="workingHours" className={s.label}>
              Çalışma Saatleri
            </label>
            <input
              id="workingHours"
              type="text"
              className={s.input}
              value={data.workingHours ?? ""}
              onChange={(e) => update("workingHours", e.target.value)}
              placeholder="Pazartesi - Cumartesi: 08:00 - 18:00"
            />
          </div>
        </div>

        <h2 className={s.sectionTitle}>Sosyal Medya</h2>
        <div className={s.fieldGroup}>
          <div className={s.field}>
            <label htmlFor="instagram" className={s.label}>
              Instagram
            </label>
            <input
              id="instagram"
              type="url"
              className={s.input}
              value={data.instagram ?? ""}
              onChange={(e) => update("instagram", e.target.value)}
              placeholder="https://instagram.com/..."
            />
          </div>
          <div className={s.field}>
            <label htmlFor="facebook" className={s.label}>
              Facebook
            </label>
            <input
              id="facebook"
              type="url"
              className={s.input}
              value={data.facebook ?? ""}
              onChange={(e) => update("facebook", e.target.value)}
              placeholder="https://facebook.com/..."
            />
          </div>
          <div className={s.field}>
            <label htmlFor="twitter" className={s.label}>
              Twitter / X
            </label>
            <input
              id="twitter"
              type="url"
              className={s.input}
              value={data.twitter ?? ""}
              onChange={(e) => update("twitter", e.target.value)}
              placeholder="https://x.com/..."
            />
          </div>
        </div>

        <h2 className={s.sectionTitle}>Diğer</h2>
        <div className={s.field}>
          <label htmlFor="googleMaps" className={s.label}>
            Google Maps Embed URL
          </label>
          <input
            id="googleMaps"
            type="url"
            className={s.input}
            value={data.googleMaps ?? ""}
            onChange={(e) => update("googleMaps", e.target.value)}
            placeholder="https://www.google.com/maps/embed?..."
          />
        </div>
        <div className={s.field}>
          <label htmlFor="aboutShort" className={s.label}>
            Kısa Hakkında Metni
          </label>
          <textarea
            id="aboutShort"
            className={s.textarea}
            value={data.aboutShort ?? ""}
            onChange={(e) => update("aboutShort", e.target.value)}
            placeholder="Footer ve ana sayfada kullanılacak kısa tanıtım metni…"
          />
        </div>

        <div className={s.actions}>
          <button type="submit" disabled={saving} className={s.submitButton}>
            {saving ? "Kaydediliyor…" : "Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
}
