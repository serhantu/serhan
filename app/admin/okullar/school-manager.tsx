"use client";

import { useState, useMemo } from "react";
import type { SchoolRow } from "@/lib/schools";
import { SchoolTable } from "@/components/admin/school-table";
import { SchoolCreateForm } from "@/components/admin/school-create-form";
import * as s from "./page.css";

type Props = {
  schools: SchoolRow[];
};

export function SchoolManager({ schools }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredSchools = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return schools;
    return schools.filter(
      (school) =>
        school.ad.toLowerCase().includes(q) ||
        (school.ilce && school.ilce.toLowerCase().includes(q)) ||
        (school.adres && school.adres.toLowerCase().includes(q)) ||
        school.slug.toLowerCase().includes(q),
    );
  }, [schools, search]);

  return (
    <div className={s.page}>
      {/* Top Header */}
      <header className={s.header}>
        <div className={s.titleGroup}>
          <div className={s.titleRow}>
            <h1 className={s.heading}>Okullar</h1>
            <span className={s.countPill}>{schools.length} Okul</span>
          </div>
          <p className={s.subheading}>
            Sistemde kayıtlı okul ve servis lokasyonlarını görüntüleyin, yönetin veya yeni okul
            ekleyin.
          </p>
        </div>

        <button
          type="button"
          className={`${s.toggleButton} ${isFormOpen ? s.toggleButtonActive : ""}`}
          onClick={() => setIsFormOpen((prev) => !prev)}
          aria-expanded={isFormOpen}
        >
          {isFormOpen ? (
            <>
              <span>✕</span>
              <span>Formu Kapat</span>
            </>
          ) : (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>Yeni Okul Ekle</span>
            </>
          )}
        </button>
      </header>

      {/* Collapsible New School Form */}
      {isFormOpen && (
        <div className={s.formCollapse}>
          <SchoolCreateForm
            onCancel={() => setIsFormOpen(false)}
            onSuccess={() => setIsFormOpen(false)}
          />
        </div>
      )}

      {/* Search and Table Toolbar */}
      <div className={s.toolbar}>
        <div className={s.searchWrap}>
          <input
            type="text"
            className={s.searchInput}
            placeholder="Okul adı veya ilçe ara…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className={s.tableSummary}>
          {search.trim()
            ? `Bulunan: ${filteredSchools.length} / ${schools.length} okul`
            : `Toplam ${schools.length} kayıtlı okul`}
        </span>
      </div>

      {/* Full-width Horizontal Table */}
      <section aria-label="Okul Listesi">
        <SchoolTable schools={filteredSchools} />
      </section>
    </div>
  );
}
