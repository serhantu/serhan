"use client";

// QR template preview: fetches SVG from the batch API and renders inline.
// Also provides a download button for the generated SVG.

import { useState, useEffect } from "react";
import * as s from "./qr-preview.css";

type Props = {
  schoolId: string;
  schoolName: string;
  template: "label" | "poster" | "sticker";
};

export function QrPreview({ schoolId, schoolName, template }: Props) {
  const [svg, setSvg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!schoolId) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/admin/qr/batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ schoolIds: [schoolId], template }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Önizleme yüklenemedi.");
        }

        const data = await res.json();
        const result = data.results?.[0];
        if (!cancelled && result?.svg) {
          setSvg(result.svg);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Hata oluştu.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [schoolId, template]);

  const [downloadingPdf, setDownloadingPdf] = useState(false);

  function handleDownloadSvg() {
    if (!svg) return;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr-${template}-${schoolName.replace(/\s+/g, "-").toLowerCase()}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function handleDownloadPdf() {
    if (!schoolId) return;
    setDownloadingPdf(true);
    try {
      const res = await fetch("/api/admin/qr/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolIds: [schoolId], template: "poster" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "PDF indirilemedi.");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-a4-poster-${schoolName.replace(/\s+/g, "-").toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "PDF indirilirken hata oluştu.");
    } finally {
      setDownloadingPdf(false);
    }
  }

  if (loading) {
    return (
      <div className={s.wrapper}>
        <p className={s.info}>Önizleme yükleniyor…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={s.wrapper}>
        <p className={s.info}>{error}</p>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className={s.wrapper}>
        <p className={s.info}>Okul seçerek önizleme oluşturun.</p>
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      <div className={s.svgContainer} dangerouslySetInnerHTML={{ __html: svg }} />
      <p className={s.info}>
        {schoolName} — {template}
      </p>
      <div className={s.downloadActions}>
        {template === "poster" && (
          <button
            type="button"
            className={s.downloadPdfButton}
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
          >
            {downloadingPdf ? "PDF Hazırlanıyor…" : "A4 PDF İndir"}
          </button>
        )}
        <button type="button" className={s.downloadButton} onClick={handleDownloadSvg}>
          SVG İndir
        </button>
      </div>
    </div>
  );
}
