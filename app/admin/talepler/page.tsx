import Link from "next/link";
import { requireAdminSession } from "@/lib/auth";
import { listRequests } from "@/lib/admin/requests";
import * as s from "./page.css";

const TYPE_OPTIONS = [
  { value: "TUMU", label: "Tümü" },
  { value: "ON_KAYIT", label: "Ön Kayıt" },
  { value: "TEKLIF", label: "Teklif" },
  { value: "IS_BASVURUSU", label: "İş Başvurusu" },
  { value: "ILETISIM", label: "İletişim" },
  { value: "ARAC_GERI_BILDIRIM", label: "Araç Geri Bildirim" },
] as const;

const READ_OPTIONS = [
  { value: "tumu", label: "Tümü" },
  { value: "okunmamis", label: "Okunmamış" },
  { value: "okunmus", label: "Okunmuş" },
] as const;

export const dynamic = "force-dynamic";

export default async function AdminRequestsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdminSession();

  const resolved = (await searchParams) ?? {};
  const page = Number(resolved.page ?? 1);
  const type = typeof resolved.type === "string" ? resolved.type : "TUMU";
  const read = typeof resolved.read === "string" ? resolved.read.toLowerCase() : "tumu";
  const search = typeof resolved.search === "string" ? resolved.search : "";

  const requestType = TYPE_OPTIONS.some((opt) => opt.value === type) ? type : "TUMU";
  const readFilter = read === "okunmamis" ? "OKUNMAMIS" : read === "okunmus" ? "OKUNMUS" : "TUMU";

  const data = await listRequests({
    page: Number.isFinite(page) && page > 0 ? page : 1,
    limit: 20,
    type: requestType as
      | "TUMU"
      | "TEKLIF"
      | "IS_BASVURUSU"
      | "ILETISIM"
      | "ARAC_GERI_BILDIRIM"
      | "ON_KAYIT",
    readStatus: readFilter,
    search,
  });

  const getFilterUrl = (newParams: { type?: string; read?: string; page?: number }) => {
    const p = new URLSearchParams();
    const t = newParams.type ?? type;
    const r = newParams.read ?? read;
    const pg = newParams.page ?? (newParams.type || newParams.read ? 1 : page);

    if (t && t !== "TUMU") p.set("type", t);
    if (r && r !== "tumu") p.set("read", r);
    if (search) p.set("search", search);
    if (pg > 1) p.set("page", String(pg));

    const qs = p.toString();
    return `/admin/talepler${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className={s.page}>
      {/* Type Filter Pills */}
      <nav className={s.typePillsRow} aria-label="Talep türü filtreleri">
        {TYPE_OPTIONS.map((opt) => {
          const isActive = requestType === opt.value;
          return (
            <Link
              key={opt.value}
              href={getFilterUrl({ type: opt.value })}
              className={`${s.typePill} ${isActive ? s.typePillActive : ""}`}
            >
              {opt.label}
            </Link>
          );
        })}
      </nav>

      {/* Main Content Card Box */}
      <div className={s.cardBox}>
        {/* Card Toolbar */}
        <div className={s.cardToolbar}>
          <div className={s.readFilterGroup}>
            {READ_OPTIONS.map((opt) => {
              const isActive = read === opt.value;
              const label =
                opt.value === "okunmamis" && data.unreadTotal > 0
                  ? `Okunmamış (${data.unreadTotal})`
                  : opt.label;

              return (
                <Link
                  key={opt.value}
                  href={getFilterUrl({ read: opt.value })}
                  className={`${s.readTab} ${isActive ? s.readTabActive : ""}`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <span className={s.rowCountText}>{data.total} KAYIT</span>
        </div>

        {/* Table View */}
        <div className={s.tableContainer}>
          <table className={s.table}>
            <thead className={s.thead}>
              <tr>
                <th className={s.th} aria-label="Okunma durumu" />
                <th className={s.th}>TİP</th>
                <th className={s.th}>ÖZET</th>
                <th className={`${s.th} ${s.schoolCell}`}>OKUL / BİRİM</th>
                <th className={`${s.th} ${s.dateCell}`}>TARİH</th>
              </tr>
            </thead>
            <tbody>
              {data.items.length === 0 ? (
                <tr>
                  <td colSpan={5} className={s.emptyState}>
                    Filtreye uygun talep bulunamadı.
                  </td>
                </tr>
              ) : (
                data.items.map((item) => {
                  const detailUrl = `/admin/talepler/${item.type.toLowerCase().replace(/_/g, "-")}/${item.id}`;
                  const parts = item.summary.split(" · ");
                  const name = parts[0] || item.summary;
                  const school = parts.slice(1).join(" · ") || "—";
                  const dateFormatted = new Date(item.createdAt).toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <tr key={`${item.type}-${item.id}`} className={`${s.tr} ${!item.isRead ? s.trUnread : ""}`}>
                      <td className={s.td}>
                        <span
                          className={`${s.statusDot} ${!item.isRead ? s.statusDotUnread : s.statusDotRead}`}
                          title={item.isRead ? "Okundu" : "Okunmadı"}
                          aria-label={item.isRead ? "Okundu" : "Okunmadı"}
                        />
                      </td>
                      <td className={s.td}>
                        <span className={s.typeBadge}>{item.type}</span>
                      </td>
                      <td className={s.td}>
                        <div className={s.summaryCol}>
                          <Link
                            href={detailUrl}
                            className={`${s.summaryLink} ${!item.isRead ? s.summaryLinkUnread : ""}`}
                          >
                            {name}
                          </Link>
                          <span className={s.mobileMeta}>
                            {school} · {dateFormatted}
                          </span>
                        </div>
                      </td>
                      <td className={`${s.td} ${s.schoolCell}`}>{school}</td>
                      <td className={`${s.td} ${s.dateCell}`}>{dateFormatted}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Card Footer: Pagination */}
        <div className={s.cardFooter}>
          <span>
            Sayfa {data.page} / {Math.max(1, data.totalPages)}
          </span>
          <div className={s.pageButtons}>
            <Link
              href={getFilterUrl({ page: Math.max(1, data.page - 1) })}
              className={`${s.pageBtn} ${data.page <= 1 ? s.pageBtnDisabled : ""}`}
            >
              Önceki
            </Link>
            <Link
              href={getFilterUrl({ page: Math.min(data.totalPages, data.page + 1) })}
              className={`${s.pageBtn} ${data.page >= data.totalPages ? s.pageBtnDisabled : ""}`}
            >
              Sonraki
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
