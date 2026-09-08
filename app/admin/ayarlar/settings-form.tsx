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

  // Notification toggles state (matching prototype)
  const [notifs, setNotifs] = useState({
    emailOnKayit: true,
    smsTeklif: true,
    weeklyReport: false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    try {
      await updateSiteSettings(data);
      setMessage({ type: "success", text: "Ayarlar başarıyla kaydedildi." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Kaydetme sırasında bir hata oluştu.",
      });
    } finally {
      setSaving(false);
    }
  }

  function update(field: keyof SiteSettingsData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className={s.formWrap}>
      {message && (
        <div
          className={message.type === "success" ? s.successMessage : s.errorMessage}
          role="status"
        >
          {message.text}
        </div>
      )}

      {/* Card 1: Şirket Bilgileri */}
      <div className={s.card}>
        <div className={s.cardHeader}>
          <h2 className={s.cardTitle}>Şirket bilgileri</h2>
        </div>
        <div className={s.fieldsGrid}>
          <label className={s.field}>
            <span className={s.label}>Şirket adı *</span>
            <input
              type="text"
              className={s.input}
              value={data.companyName}
              onChange={(e) => update("companyName", e.target.value)}
              required
            />
          </label>

          <label className={s.field}>
            <span className={s.label}>Telefon</span>
            <input
              type="tel"
              className={s.input}
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </label>

          <label className={s.field}>
            <span className={s.label}>E-posta</span>
            <input
              type="email"
              className={s.input}
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </label>

          <label className={s.field}>
            <span className={s.label}>WhatsApp</span>
            <input
              type="text"
              className={s.input}
              placeholder="+90 5xx xxx xx xx"
              value={data.whatsapp ?? ""}
              onChange={(e) => update("whatsapp", e.target.value)}
            />
          </label>

          <label className={s.field}>
            <span className={s.label}>Adres</span>
            <input
              type="text"
              className={s.input}
              placeholder="Mahalle, cadde, no / ilçe"
              value={data.address ?? ""}
              onChange={(e) => update("address", e.target.value)}
            />
          </label>

          <label className={s.field}>
            <span className={s.label}>Çalışma saatleri</span>
            <input
              type="text"
              className={s.input}
              placeholder="Pazartesi - Cumartesi: 08:00 - 18:00"
              value={data.workingHours ?? ""}
              onChange={(e) => update("workingHours", e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* Card 2: Bildirimler */}
      <div className={s.card}>
        <div className={s.cardHeader}>
          <h2 className={s.cardTitle}>Bildirimler</h2>
        </div>
        <div className={s.toggleList}>
          <div className={s.toggleItem}>
            <div className={s.toggleText}>
              <span className={s.toggleTitle}>Yeni ön kayıtta e-posta</span>
              <span className={s.toggleDesc}>Veli formu gönderdiğinde anlık bildirim gelsin.</span>
            </div>
            <button
              type="button"
              className={`${s.toggleTrack} ${notifs.emailOnKayit ? s.toggleTrackActive : s.toggleTrackInactive}`}
              onClick={() =>
                setNotifs((prev) => ({ ...prev, emailOnKayit: !prev.emailOnKayit }))
              }
              aria-label="Yeni ön kayıtta e-posta bildirimi"
            >
              <span className={s.toggleThumb} aria-hidden="true" />
            </button>
          </div>

          <div className={s.toggleItem}>
            <div className={s.toggleText}>
              <span className={s.toggleTitle}>Teklif talebinde SMS</span>
              <span className={s.toggleDesc}>Kurumsal teklif taleplerinde sistem yöneticisine anlık SMS.</span>
            </div>
            <button
              type="button"
              className={`${s.toggleTrack} ${notifs.smsTeklif ? s.toggleTrackActive : s.toggleTrackInactive}`}
              onClick={() =>
                setNotifs((prev) => ({ ...prev, smsTeklif: !prev.smsTeklif }))
              }
              aria-label="Teklif talebinde SMS bildirimi"
            >
              <span className={s.toggleThumb} aria-hidden="true" />
            </button>
          </div>

          <div className={s.toggleItem}>
            <div className={s.toggleText}>
              <span className={s.toggleTitle}>Haftalık özet raporu</span>
              <span className={s.toggleDesc}>Pazartesi sabahı geçen haftanın operasyonel özeti.</span>
            </div>
            <button
              type="button"
              className={`${s.toggleTrack} ${notifs.weeklyReport ? s.toggleTrackActive : s.toggleTrackInactive}`}
              onClick={() =>
                setNotifs((prev) => ({ ...prev, weeklyReport: !prev.weeklyReport }))
              }
              aria-label="Haftalık özet raporu bildirimi"
            >
              <span className={s.toggleThumb} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className={s.actionsRow}>
          <button
            type="button"
            className={s.cancelButton}
            onClick={() => setData(initialData)}
          >
            Vazgeç
          </button>
          <button type="submit" className={s.saveButton} disabled={saving}>
            {saving ? "Kaydediliyor…" : "Kaydet"}
          </button>
        </div>
      </div>
    </form>
  );
}
