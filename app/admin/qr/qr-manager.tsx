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
  const [template, setTemplate] = useState<TemplateType>("label");
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

  function toggleAll() {
    if (checkedSchoolIds.size === schools.length) {
      setCheckedSchoolIds(new Set());
    } else {
      setCheckedSchoolIds(new Set(schools.map((sc) => sc.id)));
    }
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

      // Download each SVG with a small stagger
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
      <div className={s.emptyState}>
        Henüz tanımlı okul bulunmuyor. Önce Okullar sayfasından okul ekleyin.
      </div>
    );
  }

  return (
    <div className={s.layout}>
      <section className={s.panel}>
        <div>
          <h2 className={s.sectionTitle}>Şablon Seçimi</h2>
          <div className={s.templateOptions}>
            <button
              type="button"
              className={`${s.templateButton} ${template === "label" ? s.templateButtonActive : ""}`}
              onClick={() => setTemplate("label")}
            >
              Servis Etiketi (6x9 cm)
            </button>
            <button
              type="button"
              className={`${s.templateButton} ${template === "poster" ? s.templateButtonActive : ""}`}
              onClick={() => setTemplate("poster")}
            >
              A4 Poster
            </button>
            <button
              type="button"
              className={`${s.templateButton} ${template === "sticker" ? s.templateButtonActive : ""}`}
              onClick={() => setTemplate("sticker")}
            >
              Sticker (10x10 cm)
            </button>
          </div>
        </div>

        <div>
          <h2 className={s.sectionTitle}>Okul Listesi & Seçim</h2>
          <div className={s.selectAllWrap}>
            <label className={s.schoolItem}>
              <input
                type="checkbox"
                className={s.checkbox}
                checked={checkedSchoolIds.size === schools.length}
                onChange={toggleAll}
              />
              <span>
                Tümünü Seç ({checkedSchoolIds.size}/{schools.length})
              </span>
            </label>
          </div>
          <div className={s.schoolList}>
            {schools.map((school) => {
              const isSelectedForPreview = school.id === selectedSchoolId;
              const isChecked = checkedSchoolIds.has(school.id);
              return (
                <div
                  key={school.id}
                  className={`${s.schoolItem} ${isSelectedForPreview ? s.schoolItemSelected : ""}`}
                  onClick={() => setSelectedSchoolId(school.id)}
                >
                  <input
                    type="checkbox"
                    className={s.checkbox}
                    checked={isChecked}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleCheck(school.id);
                    }}
                  />
                  <div className={s.schoolItemText}>
                    <span>{school.ad}</span>
                    {school.ilce ? (
                      <span className={s.schoolItemDistrict}>{school.ilce}</span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          <div className={s.batchActions}>
            <button
              type="button"
              className={s.batchButton}
              onClick={handleBatchDownload}
              disabled={downloadingBatch || checkedSchoolIds.size === 0}
            >
              {downloadingBatch
                ? "İndiriliyor..."
                : `Seçili Okulları İndir (${checkedSchoolIds.size})`}
            </button>
            {template === "poster" && (
              <button
                type="button"
                className={s.batchPdfButton}
                onClick={handleBatchPdfDownload}
                disabled={downloadingBatch || checkedSchoolIds.size === 0}
              >
                {downloadingBatch
                  ? "PDF Hazırlanıyor..."
                  : `Toplu A4 PDF İndir (${checkedSchoolIds.size})`}
              </button>
            )}
          </div>
        </div>
      </section>

      <section className={s.previewSection}>
        <h2 className={s.sectionTitle}>Canlı Önizleme</h2>
        {selectedSchool ? (
          <QrPreview
            schoolId={selectedSchool.id}
            schoolName={selectedSchool.ad}
            template={template}
          />
        ) : (
          <div className={s.emptyState}>Önizleme için okul seçin.</div>
        )}
      </section>
    </div>
  );
}
