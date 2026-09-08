import Link from "next/link";
import { QrDownloadButton } from "./qr-download-button";
import { SchoolActiveToggle } from "./school-active-toggle";
import type { SchoolRow } from "@/lib/schools";
import * as t from "./school-table.css";

// Server Component: renders the spacious, responsive schools list.
export function SchoolTable({ schools }: { schools: SchoolRow[] }) {
  if (schools.length === 0) {
    return (
      <div className={t.wrapper}>
        <p className={t.empty}>
          Henüz tanımlı okul bulunmuyor. Yukarıdaki butona tıklayarak ilk okulu ekleyebilirsiniz.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Card Layout (visible on phone/tablet < 1024px) */}
      <div className={t.mobileCardList}>
        {schools.map((s) => (
          <article key={s.id} className={t.schoolCard}>
            <header className={t.cardHeader}>
              <div className={t.cardHeaderInfo}>
                <span className={t.cardSchoolName}>{s.ad}</span>
                <Link
                  href={`/on-kayit/${s.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={t.publicPageLink}
                >
                  <span>Ön Kayıt Sayfası</span>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </Link>
              </div>

              <SchoolActiveToggle schoolId={s.id} initialActive={s.aktif} />
            </header>

            {(s.ilce || s.adres || s.haritaUrl) && (
              <div className={t.cardAddressBlock}>
                <div className={t.cardLocationRow}>
                  {s.ilce ? <span className={t.districtBadge}>{s.ilce}</span> : null}
                  {s.haritaUrl ? (
                    <a
                      href={s.haritaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={t.mapLink}
                    >
                      Haritada Gör ↗
                    </a>
                  ) : null}
                </div>
                {s.adres ? (
                  <div className={t.addressText}>
                    <svg
                      className={t.mapPinIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{s.adres}</span>
                  </div>
                ) : null}
              </div>
            )}

            <div className={t.cardMetaGrid}>
              <span className={`${t.tcBadge} ${s.tcKimlikIster ? t.tcRequired : t.tcOptional}`}>
                TC: {s.tcKimlikIster ? "Zorunlu" : "İsteğe Bağlı"}
              </span>

              <span className={t.countPillBadge}>
                <strong>{s.kayitSayisi}</strong> Kayıt
              </span>

              <code className={t.slugBadge}>{s.slug}</code>

              <span className={t.dateText}>
                {s.createdAt.toLocaleDateString("tr-TR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>

            <footer className={t.cardFooter}>
              <span className={t.cardQrLabel}>QR Çıktıları:</span>
              <QrDownloadButton schoolId={s.id} />
            </footer>
          </article>
        ))}
      </div>

      {/* Desktop Table View (visible on desktop >= 1024px) */}
      <div className={t.desktopWrapper}>
        <table className={t.table}>
          <thead>
            <tr>
              <th scope="col">Okul Adı</th>
              <th scope="col">İlçe & Açık Adres</th>
              <th scope="col">Slug</th>
              <th scope="col">Durum</th>
              <th scope="col">TC Kimlik</th>
              <th scope="col" className={t.centerCell}>
                Kayıt
              </th>
              <th scope="col">Kayıt Tarihi</th>
              <th scope="col">QR & İndir</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((s) => (
              <tr key={s.id}>
                <td className={t.nameCell}>
                  <span className={t.schoolName}>{s.ad}</span>
                  <Link
                    href={`/on-kayit/${s.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={t.publicPageLink}
                  >
                    <span>Ön Kayıt Sayfası</span>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </Link>
                </td>

                <td className={t.addressCell}>
                  {(s.ilce || s.haritaUrl) && (
                    <div className={t.addressHeaderRow}>
                      {s.ilce ? <span className={t.districtBadge}>{s.ilce}</span> : null}
                      {s.haritaUrl ? (
                        <a
                          href={s.haritaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={t.mapLink}
                        >
                          Haritada Gör ↗
                        </a>
                      ) : null}
                    </div>
                  )}
                  {s.adres ? (
                    <div className={t.addressText}>
                      <svg
                        className={t.mapPinIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{s.adres}</span>
                    </div>
                  ) : null}
                </td>

                <td className={t.slugCell}>
                  <code className={t.slug}>{s.slug}</code>
                </td>

                <td>
                  <SchoolActiveToggle schoolId={s.id} initialActive={s.aktif} />
                </td>

                <td>
                  <span className={`${t.tcBadge} ${s.tcKimlikIster ? t.tcRequired : t.tcOptional}`}>
                    {s.tcKimlikIster ? "Zorunlu" : "İsteğe Bağlı"}
                  </span>
                </td>

                <td className={t.centerCell}>
                  <span className={t.countBadge}>{s.kayitSayisi}</span>
                </td>

                <td className={t.dateCell}>
                  {s.createdAt.toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>

                <td className={t.actionsCell}>
                  <QrDownloadButton schoolId={s.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
