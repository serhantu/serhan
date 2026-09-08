import Link from "next/link";
import { requireAdminSession } from "@/lib/auth";
import { listSchools } from "@/lib/schools";
import { listRequests } from "@/lib/admin/requests";
import { prisma } from "@/lib/db";
import * as s from "./page.css";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdminSession();

  const [schools, latestRequests, onKayitCount, totalContracts] = await Promise.all([
    listSchools(),
    listRequests({ page: 1, limit: 6 }),
    prisma.onKayit.count(),
    prisma.teklif.count(),
  ]);

  const unreadCount = latestRequests.unreadTotal;
  const activeSchoolsCount = schools.filter((school) => school.aktif).length;

  // Calculate 7-day incoming requests distribution
  const now = new Date();
  const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
  const sevenDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(now.getDate() - (6 - i));
    d.setHours(0, 0, 0, 0);
    const nextD = new Date(d);
    nextD.setDate(d.getDate() + 1);
    return {
      date: d,
      nextDate: nextD,
      dayLabel: dayNames[d.getDay()],
    };
  });

  // Query actual incoming requests in the last 7 days
  const sevenDaysAgo = sevenDays[0].date;
  const [recentOnKayit, recentTeklif, recentIletisim] = await Promise.all([
    prisma.onKayit.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
    prisma.teklif.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
    prisma.iletisim.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
  ]);

  const allRecentDates = [
    ...recentOnKayit.map((r) => r.createdAt),
    ...recentTeklif.map((r) => r.createdAt),
    ...recentIletisim.map((r) => r.createdAt),
  ];

  const chartData = sevenDays.map((slot, index) => {
    const count = allRecentDates.filter(
      (created) => created >= slot.date && created < slot.nextDate,
    ).length;
    return {
      day: slot.dayLabel,
      value: count,
      isToday: index === 6,
    };
  });

  const weekTotal = chartData.reduce((acc, curr) => acc + curr.value, 0);
  const maxVal = Math.max(...chartData.map((c) => c.value), 1);

  // Operational tasks
  const operationalTasks = [
    {
      title: "Yeni ön kayıt başvuruları kontrolü",
      meta: `${unreadCount > 0 ? `${unreadCount} okunmamış başvuru bekliyor` : "Tüm başvurular güncel"}`,
      time: "Bugün",
      dotClass: unreadCount > 0 ? s.kpiDotAlert : s.kpiDotGreen,
    },
    {
      title: "Okul QR kod ve servis etiketleri",
      meta: `${schools.length} kayıtlı okul servis hattı`,
      time: "Aktif",
      dotClass: s.kpiDotGreen,
    },
    {
      title: "Kurumsal teklif talepleri değerlendirmesi",
      meta: `${totalContracts} adet teklif talebi kayıtlı`,
      time: "Haftalık",
      dotClass: s.kpiDotGray,
    },
    {
      title: "Filo ve araç geri bildirim denetimi",
      meta: "Düzenli şoför & araç servis kayıtları",
      time: "Rutin",
      dotClass: s.kpiDotGray,
    },
  ];

  return (
    <div className={s.page}>
      {/* 4 KPI Cards */}
      <section className={s.kpiGrid} aria-label="Temel Performans Göstergeleri">
        <article className={s.kpiCard}>
          <span className={s.kpiLabel}>TOPLAM ÖN KAYIT</span>
          <span className={s.kpiValue}>{onKayitCount}</span>
          <span className={s.kpiDeltaRow}>
            <span className={`${s.kpiDot} ${s.kpiDotGreen}`} aria-hidden="true" />
            <span>Aktif veli kayıtları</span>
          </span>
        </article>

        <article className={s.kpiCard}>
          <span className={s.kpiLabel}>OKUNMAMIŞ TALEP</span>
          <span className={s.kpiValue}>{unreadCount}</span>
          <span className={s.kpiDeltaRow}>
            <span
              className={`${s.kpiDot} ${unreadCount > 0 ? s.kpiDotAlert : s.kpiDotGreen}`}
              aria-hidden="true"
            />
            <span>{unreadCount > 0 ? "Yanıt bekliyor" : "Tümü okundu"}</span>
          </span>
        </article>

        <article className={s.kpiCard}>
          <span className={s.kpiLabel}>AKTİF OKUL</span>
          <span className={s.kpiValue}>{activeSchoolsCount}</span>
          <span className={s.kpiDeltaRow}>
            <span className={`${s.kpiDot} ${s.kpiDotGreen}`} aria-hidden="true" />
            <span>Tümü yayında</span>
          </span>
        </article>

        <article className={s.kpiCard}>
          <span className={s.kpiLabel}>TOPLAM TALEP</span>
          <span className={s.kpiValue}>{latestRequests.total}</span>
          <span className={s.kpiDeltaRow}>
            <span className={`${s.kpiDot} ${s.kpiDotGray}`} aria-hidden="true" />
            <span>Tüm kanallar</span>
          </span>
        </article>
      </section>

      {/* Middle Grid: 7-day Chart (1.5fr) + Today's Tasks (1fr) */}
      <section className={s.middleGrid}>
        {/* 7-day Chart */}
        <div className={s.cardBox}>
          <div className={s.cardHeader}>
            <h2 className={s.cardTitle}>Son 7 gün — gelen talepler</h2>
            <span className={s.cardHeaderMeta}>TOPLAM {weekTotal}</span>
          </div>
          <div className={s.chartContainer}>
            {chartData.map((item, i) => {
              const stepIndex = Math.max(
                0,
                Math.min(7, Math.round((item.value / maxVal) * 7)),
              );
              const heightClass = s.chartBarHeights[stepIndex] ?? s.chartBarHeights[0];
              const isPeakOrToday = item.isToday || (item.value === maxVal && item.value > 0);
              return (
                <div key={`${item.day}-${i}`} className={s.chartCol}>
                  <span className={s.chartVal}>{item.value}</span>
                  <div
                    className={`${s.chartBar} ${heightClass} ${isPeakOrToday ? s.chartBarPeak : s.chartBarNormal}`}
                  />
                  <span className={s.chartDay}>{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tasks / Reminders */}
        <div className={s.cardBox}>
          <div className={s.cardHeader}>
            <h2 className={s.cardTitle}>Bugünün işleri</h2>
          </div>
          <div className={s.taskList}>
            {operationalTasks.map((task, i) => (
              <div key={i} className={s.taskItem}>
                <span className={`${s.kpiDot} ${task.dotClass}`} aria-hidden="true" />
                <div className={s.taskDetails}>
                  <span className={s.taskTitle}>{task.title}</span>
                  <span className={s.taskMeta}>{task.meta}</span>
                </div>
                <span className={s.taskTime}>{task.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Table: Recent Requests */}
      <section className={s.cardBox}>
        <div className={s.cardHeader}>
          <h2 className={s.cardTitle}>Son talepler</h2>
          <Link href="/admin/talepler" className={s.cardHeaderLink}>
            Tümünü gör →
          </Link>
        </div>

        <div className={s.recentTable}>
          {latestRequests.items.length === 0 ? (
            <div className={s.emptyState}>
              Henüz talep bulunmuyor.
            </div>
          ) : (
            latestRequests.items.map((item) => {
              const detailUrl = `/admin/talepler/${item.type.toLowerCase().replace(/_/g, "-")}/${item.id}`;
              const parts = item.summary.split(" · ");
              const name = parts[0] || item.summary;
              const schoolOrInfo = parts.slice(1).join(" · ") || item.type;
              const refPrefix = item.type === "ON_KAYIT" ? "SRV" : item.type === "TEKLIF" ? "TKL" : "TLP";
              const refNo = `${refPrefix}-${item.id.slice(-6).toUpperCase()}`;

              return (
                <Link key={`${item.type}-${item.id}`} href={detailUrl} className={s.recentRow}>
                  <span className={s.recentRef}>{refNo}</span>
                  <span className={s.recentName}>{name}</span>
                  <span className={s.recentSchool}>{schoolOrInfo}</span>
                  <span
                    className={`${s.statusBadge} ${item.isRead ? s.statusBadgeSuccess : s.statusBadgeAlert}`}
                  >
                    {item.isRead ? "Okundu" : "Okunmadı"}
                  </span>
                </Link>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
