import Link from "next/link";
import { requireAdminSession } from "@/lib/auth";
import { searchCustomers, getAllCustomers } from "@/lib/admin/crm";
import * as s from "./page.css";

export const dynamic = "force-dynamic";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default async function MusterilerPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireAdminSession();
  const { q } = await searchParams;

  const query = q?.trim() ?? "";
  const customers = query ? await searchCustomers(query) : await getAllCustomers(60);

  return (
    <div className={s.page}>
      {/* Search Input */}
      <form method="GET" action="/admin/musteriler" className={s.searchBar}>
        <span className={s.searchIcon} aria-hidden="true">
          ⌕
        </span>
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Ad, telefon veya e-posta…"
          className={s.searchInput}
          aria-label="Müşteri ara"
        />
      </form>

      {/* Results or Empty State */}
      {customers.length === 0 ? (
        <div className={s.emptyState}>
          {query ? "Arama kriterine uygun müşteri bulunamadı." : "Henüz kayıtlı müşteri bulunmuyor."}
        </div>
      ) : (
        <div className={s.grid}>
          {customers.map((c) => {
            const initials = getInitials(c.adSoyad);
            const since = new Date(c.createdAt).getFullYear();

            return (
              <Link key={c.id} href={`/admin/musteriler/${c.id}`} className={s.card}>
                <div className={s.cardHeader}>
                  <span className={s.avatar} aria-hidden="true">
                    {initials}
                  </span>
                  <div className={s.headerText}>
                    <span className={s.customerName}>{c.adSoyad}</span>
                    <span className={s.customerRole}>Müşteri / Veli</span>
                  </div>
                </div>

                <div className={s.contactDetails}>
                  <span className={s.contactLine}>{c.telefon}</span>
                  <span className={s.contactLine}>{c.eposta || "—"}</span>
                </div>

                <div className={s.cardFooter}>
                  <span className={s.statusTag}>Kayıtlı</span>
                  <span className={s.sinceYear}>{since}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
