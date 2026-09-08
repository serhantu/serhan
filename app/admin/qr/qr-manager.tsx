"use client";

import { useState } from "react";
import type { SchoolRow } from "@/lib/schools";
import { QrPreview } from "@/components/admin/qr-preview";
import type { TemplateType } from "@/lib/qr-templates";
import * as s from "./page.css";

type Props = {
  schools: SchoolRow[];
};

export function QrManager({ schools }: Props) {
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(schools[0]?.id ?? "");
  const [template, setTemplate] = useState<TemplateType>("poster");
  const [checkedSchoolIds, setCheckedSchoolIds] = useState<Set<string>>(
    new Set(schools.map((sc) => sc.id)),
  );
  const [downloadingBatch, setDownloadingBatch] = useState(false);

  const selectedSchool = schools.find((sc) => sc.id === selectedSchoolId);

  function toggleCheck(id: string) {
    setCheckedSchoolIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function handleBatchDownload() {
    if (checkedSchoolIds.size === 0) return;
    setDownloadingBatch(true);

    try {
      const res = await fetch("/api/admin/qr/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolIds: Array.from(checkedSchoolIds),
          template,
        }),
      });

      if (!res.ok) {
        throw new Error("Toplu QR indirme başarısız oldu.");
      }

      const data = await res.json();
      const results: Array<{ schoolId: string; schoolName: string; svg: string }> =
        data.results ?? [];

      for (const item of results) {
        const blob = new Blob([item.svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `qr-${template}-${item.schoolName.replace(/\s+/g, "-").toLowerCase()}.svg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Toplu indirme hatası.");
    } finally {
      setDownloadingBatch(false);
    }
  }

  async function handleBatchPdfDownload() {
    if (checkedSchoolIds.size === 0) return;
    setDownloadingBatch(true);

    try {
      const res = await fetch("/api/admin/qr/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolIds: Array.from(checkedSchoolIds),
          template: "poster",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Toplu PDF indirme başarısız oldu.");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-a4-posterlar-toplu-${checkedSchoolIds.size}-okul.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Toplu PDF indirme hatası.");
    } finally {
      setDownloadingBatch(false);
    }
  }

  if (schools.length === 0) {
    return (
      <div className={`${s.card} ${s.emptyState}`}>
        Henüz tanımlı okul bulunmuyor. Önce Okullar sayfasından okul ekleyin.
      </div>
    );
  }

  return (
    <div className={s.layout}>
      {/* Left Column: Template + Schools List */}
      <div className={s.leftCol}>
        {/* Template Card */}
        <div className={s.card}>
          <div className={s.cardHeader}>
            <h2 className={s.cardTitle}>Şablon</h2>
          </div>
          <div className={s.templatePills}>
            <button
              type="button"
              className={`${s.templatePill} ${template === "label" ? s.templatePillActive : ""}`}
              onClick={() => setTemplate("label")}
            >
              Servis Etiketi 6×9
            </button>
            <button
              type="button"
              className={`${s.templatePill} ${template === "poster" ? s.templatePillActive : ""}`}
              onClick={() => setTemplate("poster")}
            >
              A4 Poster
            </button>
            <button
              type="button"
              className={`${s.templatePill} ${template === "sticker" ? s.templatePillActive : ""}`}
              onClick={() => setTemplate("sticker")}
            >
              Sticker 10×10
            </button>
          </div>
        </div>

        {/* School Selection Card */}
        <div className={s.card}>
          <div className={s.cardHeader}>
            <h2 className={s.cardTitle}>Okul seçimi</h2>
            <span className={s.cardHeaderMeta}>
              {checkedSchoolIds.size} / {schools.length} SEÇİLİ
            </span>
          </div>

          <div className={s.schoolList}>
            {schools.map((school) => {
              const isChecked = checkedSchoolIds.has(school.id);
              const isPreviewed = school.id === selectedSchoolId;

              return (
                <button
                  key={school.id}
                  type="button"
                  className={`${s.schoolItem} ${isPreviewed ? s.schoolItemActive : ""}`}
                  onClick={() => {
                    setSelectedSchoolId(school.id);
                    toggleCheck(school.id);
                  }}
                >
                  <span
                    className={`${s.checkSquare} ${isChecked ? s.checkSquareActive : ""}`}
                    aria-hidden="true"
                  >
                    {isChecked ? "✓" : ""}
                  </span>
                  <div className={s.schoolTextGroup}>
                    <span className={s.schoolName}>{school.ad}</span>
                    <span className={s.schoolDistrict}>
                      {school.ilce ? `${school.ilce} / İstanbul` : "İstanbul"}
                    </span>
                  </div>
                  <span className={s.schoolMeta}>aktif</span>
                </button>
              );
            })}
          </div>

          <div className={s.actionsArea}>
            <button
              type="button"
              className={s.primaryActionBtn}
              onClick={handleBatchDownload}
              disabled={downloadingBatch || checkedSchoolIds.size === 0}
            >
              {downloadingBatch
                ? "İndiriliyor…"
                : `Seçili okulları indir (${checkedSchoolIds.size})`}
            </button>
            <button
              type="button"
              className={s.secondaryActionBtn}
              onClick={handleBatchPdfDownload}
              disabled={downloadingBatch || checkedSchoolIds.size === 0}
            >
              {downloadingBatch ? "Hazırlanıyor…" : "Toplu A4 PDF"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Live Sticky Preview Card */}
      <div className={s.stickyPreviewWrap}>
        <div className={s.cardHeader}>
          <h2 className={s.cardTitle}>Canlı önizleme</h2>
        </div>
        {selectedSchool ? (
          <QrPreview
            schoolId={selectedSchool.id}
            schoolName={selectedSchool.ad}
            template={template}
          />
        ) : (
          <div className={s.emptyState}>
            Önizleme için okul seçin.
          </div>
        )}
      </div>
    </div>
  );
}
