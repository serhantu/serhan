"use client";

// Drag & drop image upload component for admin CMS forms.
// Uploads to /api/admin/upload and returns the public URL via onChange.

import { useState, useRef, useCallback } from "react";
import * as s from "./image-upload.css";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export function ImageUpload({ value, onChange, label = "Resim" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (file: File) => {
      setError(null);
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Yükleme başarısız.");
        }

        onChange(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Yükleme başarısız.");
      } finally {
        setUploading(false);
      }
    },
    [onChange],
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave() {
    setDragActive(false);
  }

  function handleClick() {
    inputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) upload(file);
    // Reset so re-selecting the same file triggers onChange
    e.target.value = "";
  }

  function handleRemove() {
    onChange("");
    setError(null);
  }

  const dropzoneClass = [
    s.dropzone,
    dragActive ? s.dropzoneActive : "",
    uploading ? s.dropzoneDisabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={s.wrapper}>
      <span className={s.label}>{label}</span>

      {value ? (
        <div className={s.preview}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Yüklenen resim" className={s.previewImage} />
          <div className={s.previewInfo}>
            <p className={s.previewUrl}>{value}</p>
          </div>
          <button type="button" className={s.removeButton} onClick={handleRemove}>
            Kaldır
          </button>
        </div>
      ) : (
        <div
          className={dropzoneClass}
          role="button"
          tabIndex={0}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClick();
          }}
        >
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFileChange} />
          <p>{uploading ? "Yükleniyor…" : "Resim yüklemek için sürükleyin veya tıklayın"}</p>
        </div>
      )}

      {uploading && (
        <div className={s.progressBar}>
          <div className={s.progressFill} />
        </div>
      )}

      {error && (
        <p role="alert" className={s.errorText}>
          {error}
        </p>
      )}
    </div>
  );
}
