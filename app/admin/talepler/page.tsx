import Link from "next/link";
import { requireAdminSession } from "@/lib/auth";
import { listRequests } from "@/lib/admin/requests";
import * as styles from "./page.css";

const TYPE_OPTIONS = [
  { value: "TUMU", label: "Tümü" },
  { value: "TEKLIF", label: "Teklif" },
  { value: "IS_BASVURUSU", label: "İş Başvurusu" },
  { value: "ILETISIM", label: "İletişim" },
  { value: "ARAC_GERI_BILDIRIM", label: "Araç Geri Bildirim" },
  { value: "ON_KAYIT", label: "Ön Kayıt" },
] as const;

const STATUS_OPTIONS = [
  { value: "TUMU", label: "Tümü" },
  { value: "YENI", label: "YENİ" },
  { value: "INCELENIYOR", label: "İnceleniyor" },
  { value: "ILETISIME_GECILDI", label: "İletişime Geçildi" },
  { value: "TAMAMLANDI", label: "Tamamlandı" },
] as const;

export default async function AdminRequestsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdminSession();

  const resolved = (await searchParams) ?? {};
  const page = Number(resolved.page ?? 1);
  const type = typeof resolved.type === "string" ? resolved.type : "TUMU";
  const status = typeof resolved.status === "string" ? resolved.status : "TUMU";
  const read = typeof resolved.read === "string" ? resolved.read.toLowerCase() : "tumu";
  const search = typeof resolved.search === "string" ? resolved.search : "";

  const requestType = TYPE_OPTIONS.some((option) => option.value === type) ? type : "TUMU";
  const requestStatus = STATUS_OPTIONS.some((option) => option.value === status) ? status : "TUMU";
  const readFilter = read === "okunmamis" ? "OKUNMAMIS" : read === "okunmus" ? "OKUNMUS" : "TUMU";

  const data = await listRequests({
    page: Number.isFinite(page) && page > 0 ? page : 1,
    limit: 20,
    type: requestType as
      "TUMU" | "TEKLIF" | "IS_BASVURUSU" | "ILETISIM" | "ARAC_GERI_BILDIRIM" | "ON_KAYIT",
    status: requestStatus as "TUMU" | "YENI" | "INCELENIYOR" | "ILETISIME_GECILDI" | "TAMAMLANDI",
    readStatus: readFilter,
    search,
  });

  const readQueryParam = read !== "tumu" ? `&read=${read}` : "";

  return (
    <main className={styles.page}>
      <div className={styles.topBar}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <h1 className={styles.title}>Talepler</h1>
          {data.unreadTotal > 0 ? (
            <span className={styles.countBadge} title="İncelenmeyi bekleyen okunmamış talep">
              {data.unreadTotal} Okunmamış
            </span>
          ) : null}
        </div>

        <form className={styles.form} action="/admin/talepler" method="GET">
          <input
            className={styles.input}
            type="search"
            name="search"
            defaultValue={search}
            placeholder="Ara: ref no, öğrenci, veli, telefon..."
            aria-label="Taleplerde ara"
          />

          <select
            className={styles.select}
            name="type"
            defaultValue={requestType}
            aria-label="Talep tipi filtresi"
          >
            {TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            className={styles.select}
            name="status"
            defaultValue={requestStatus}
            aria-label="Talep durumu filtresi"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {read !== "tumu" ? <input type="hidden" name="read" value={read} /> : null}

          <button className={styles.button} type="submit">
            Uygula
          </button>
        </form>
      </div>

      {/* Quick Filter Navigation (Type + Read/Unread) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          borderBottom: "1px solid hsl(214 32% 91%)",
          paddingBottom: "0.75rem",
        }}
      >
        <nav
          className={styles.tabs}
          aria-label="Talep tipi filtreleri"
          style={{ borderBottom: "none", paddingBottom: 0 }}
        >
          {TYPE_OPTIONS.map((option) => {
            const isActive = requestType === option.value;
            return (
              <Link
                key={option.value}
                href={`/admin/talepler?type=${option.value}${requestStatus !== "TUMU" ? `&status=${requestStatus}` : ""}${readQueryParam}${search ? `&search=${encodeURIComponent(search)}` : ""}`}
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
              >
                {option.label}
              </Link>
            );
          })}
        </nav>

        {/* Read / Unread quick toggle pills */}
        <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
          {[
            { value: "tumu", label: "Tümü" },
            {
              value: "okunmamis",
              label: `Okunmamış${data.unreadTotal > 0 ? ` (${data.unreadTotal})` : ""}`,
            },
            { value: "okunmus", label: "Okunmuş" },
          ].map((rOpt) => {
            const isSelected = read === rOpt.value;
            const rQuery = rOpt.value === "tumu" ? "" : `&read=${rOpt.value}`;
            return (
              <Link
                key={rOpt.value}
                href={`/admin/talepler?type=${requestType}${requestStatus !== "TUMU" ? `&status=${requestStatus}` : ""}${rQuery}${search ? `&search=${encodeURIComponent(search)}` : ""}`}
                className={`${styles.tab} ${isSelected ? styles.tabActive : ""}`}
                style={{ fontSize: "0.8rem", paddingBlock: "0.25rem", paddingInline: "0.75rem" }}
              >
                {rOpt.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thStatus} title="Okunma Durumu">
                <span className="sr-only">Okundu Durumu</span>
              </th>
              <th className={styles.th}>Tip</th>
              <th className={styles.th}>Özet</th>
              <th className={styles.th}>Durum</th>
              <th className={styles.th}>Tarih</th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 ? (
              <tr>
                <td className={styles.td} colSpan={5}>
                  Sonuç bulunamadı.
                </td>
              </tr>
            ) : (
              data.items.map((item) => {
                const detailPath = `/admin/talepler/${item.type.toLowerCase().replace(/_/g, "-")}/${item.id}`;
                const isUnread = !item.isRead;

                let statusBadgeClass = styles.statusBadgeYeniRead;
                let statusLabel: string = item.status;

                if (item.status === "YENI") {
                  if (isUnread) {
                    statusBadgeClass = styles.statusBadgeYeniUnread;
                    statusLabel = "Yeni (Okunmadı)";
                  } else {
                    statusBadgeClass = styles.statusBadgeYeniRead;
                    statusLabel = "Yeni (Okundu)";
                  }
                } else if (item.status === "INCELENIYOR") {
                  statusBadgeClass = styles.statusBadgeInceleniyor;
                  statusLabel = "İnceleniyor";
                } else if (item.status === "ILETISIME_GECILDI") {
                  statusBadgeClass = styles.statusBadgeIletisimeGecildi;
                  statusLabel = "İletişime Geçildi";
                } else if (item.status === "TAMAMLANDI") {
                  statusBadgeClass = styles.statusBadgeTamamlandi;
                  statusLabel = "Tamamlandı";
                }

                return (
                  <tr
                    key={`${item.type}-${item.id}`}
                    className={isUnread ? styles.trUnread : styles.tr}
                  >
                    <td className={styles.tdStatus}>
                      <span
                        className={styles.dotWrap}
                        title={isUnread ? "Okunmadı — Yeni Talep" : "Okundu"}
                        aria-label={isUnread ? "Okunmadı" : "Okundu"}
                      >
                        <span
                          className={isUnread ? styles.statusDotUnread : styles.statusDotRead}
                        />
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.typeBadge}>{item.type}</span>
                    </td>
                    <td className={styles.td}>
                      <Link
                        className={isUnread ? styles.linkUnread : styles.linkRead}
                        href={detailPath}
                      >
                        {item.summary}
                      </Link>
                    </td>
                    <td className={styles.td}>
                      <span className={`${styles.statusBadge} ${statusBadgeClass}`}>
                        {statusLabel}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.meta}>
                        {new Date(item.createdAt).toLocaleString("tr-TR")}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <nav className={styles.pagination} aria-label="Sayfalama">
        {data.page > 1 ? (
          <Link
            className={styles.pageLink}
            href={
              {
                pathname: "/admin/talepler",
                query: { ...resolved, page: String(data.page - 1) },
              } as unknown as string
            }
          >
            Önceki
          </Link>
        ) : null}

        <span>
          Sayfa {data.page} / {data.totalPages}
        </span>

        {data.page < data.totalPages ? (
          <Link
            className={styles.pageLink}
            href={
              {
                pathname: "/admin/talepler",
                query: { ...resolved, page: String(data.page + 1) },
              } as unknown as string
            }
          >
            Sonraki
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
