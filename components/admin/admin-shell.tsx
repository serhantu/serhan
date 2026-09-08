"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as s from "./admin-shell.css";

const navItems = [
  {
    id: "dashboard",
    no: "01",
    label: "Dashboard",
    href: "/admin",
    sub: "Operasyonel görünürlük için kısa özet.",
  },
  {
    id: "requests",
    no: "02",
    label: "Talepler",
    href: "/admin/talepler",
    sub: "Ön kayıt, teklif ve iletişim talepleri.",
  },
  {
    id: "customers",
    no: "03",
    label: "Müşteriler",
    href: "/admin/musteriler",
    sub: "Kurum yetkilileri ve veliler.",
  },
  {
    id: "schools",
    no: "04",
    label: "Okullar",
    href: "/admin/okullar",
    sub: "Kayıtlı okullar ve servis lokasyonları.",
  },
  {
    id: "qr",
    no: "05",
    label: "QR Üret",
    href: "/admin/qr",
    sub: "Okula özel QR kod ve baskı şablonları.",
  },
  {
    id: "content",
    no: "06",
    label: "İçerik",
    href: "/admin/icerik",
    sub: "Site sayfaları, hizmetler ve blog.",
  },
  {
    id: "settings",
    no: "07",
    label: "Ayarlar",
    href: "/admin/ayarlar",
    sub: "Şirket bilgileri ve bildirim tercihleri.",
  },
];

type Props = {
  children: React.ReactNode;
  unreadCount?: number;
  totalSchools?: number;
  onLogout?: () => Promise<void>;
};

export function AdminShell({ children, unreadCount = 0, totalSchools = 0, onLogout }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, render children directly without shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Find active navigation item
  const currentNav =
    navItems
      .slice()
      .reverse()
      .find((item) => (item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href))) ??
    navItems[0];

  const renderNavList = (onNavigate?: () => void) => (
    <nav className={s.navList} aria-label="Yönetim paneli navigasyonu">
      {navItems.map((item) => {
        const isActive =
          item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);

        let badge: React.ReactNode = null;
        if (item.id === "requests" && unreadCount > 0) {
          badge = <span className={`${s.navBadge} ${s.navBadgeAlert}`}>{unreadCount}</span>;
        } else if (item.id === "schools" && totalSchools > 0) {
          badge = <span className={s.navBadge}>{totalSchools}</span>;
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${s.navItem} ${isActive ? s.navItemActive : ""}`}
            onClick={onNavigate}
            prefetch
          >
            <span className={s.navIndex}>{item.no}</span>
            <span>{item.label}</span>
            {badge}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className={s.layout}>
      {/* Desktop Sticky Rail (252px) */}
      <aside className={s.sidebar}>
        <div className={s.brandArea}>
          <Link href="/admin">
            <Image
              src="/images/logo.png"
              alt="Serhan Turizm"
              width={168}
              height={43}
              className={s.brandLogo}
              priority
            />
          </Link>
          <div className={s.brandSubtitle}>YÖNETİM PANELİ</div>
        </div>

        {renderNavList()}

        <div className={s.profileArea}>
          <div className={s.profileRow}>
            <div className={s.profileAvatar} aria-hidden="true">
              SY
            </div>
            <div className={s.profileDetails}>
              <span className={s.profileName}>Serhan Yönetici</span>
              <span className={s.profileEmail}>admin@serhanturizm.com</span>
            </div>
          </div>
          {onLogout && (
            <form action={onLogout}>
              <button type="submit" className={s.logoutButton}>
                Çıkış yap
              </button>
            </form>
          )}
        </div>
      </aside>

      {/* Main Right Area */}
      <div className={s.mainColumn}>
        {/* Sticky Topbar */}
        <header className={s.topbar}>
          <div className={s.topbarLeft}>
            <button
              type="button"
              className={s.hamburgerButton}
              onClick={() => setMobileOpen(true)}
              aria-label="Menüyü aç"
            >
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="0" y1="1" x2="20" y2="1" />
                <line x1="0" y1="7" x2="20" y2="7" />
                <line x1="0" y1="13" x2="20" y2="13" />
              </svg>
            </button>

            <Image
              src="/images/logo.png"
              alt="Serhan Turizm"
              width={120}
              height={30}
              className={s.topbarMobileLogo}
            />

            <div className={s.pageTitleGroup}>
              <h1 className={s.pageTitle}>{currentNav.label === "Dashboard" ? "Yönetim Paneli" : currentNav.label}</h1>
              <p className={s.pageSubtitle}>{currentNav.sub}</p>
            </div>
          </div>

          <div className={s.topbarRight}>
            <form action="/admin/talepler" method="GET" className={s.searchForm}>
              <span className={s.searchIcon} aria-hidden="true">
                ⌕
              </span>
              <input
                type="search"
                name="search"
                placeholder="Ara: ref no, okul, veli…"
                className={s.searchInput}
                aria-label="Admin panelinde ara"
              />
            </form>

            <Link
              href="/admin/talepler?read=okunmamis"
              className={s.notifButton}
              title="Okunmamış talepler"
              aria-label={`Okunmamış talepler: ${unreadCount}`}
            >
              <span aria-hidden="true">☰</span>
              {unreadCount > 0 && <span className={s.notifBadge}>{unreadCount}</span>}
            </Link>

            {currentNav.id === "schools" ? (
              <Link href="/admin/okullar" className={s.actionButton}>
                <span>+ Yeni okul</span>
              </Link>
            ) : currentNav.id === "requests" ? (
              <Link href="/admin/talepler" className={s.actionButton}>
                <span>Talepleri Yönet</span>
              </Link>
            ) : (
              <Link href="/admin/okullar" className={s.actionButton}>
                <span>Yeni kayıt</span>
              </Link>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className={s.contentWrapper}>{children}</main>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className={s.mobileDrawer}>
          <div className={s.mobileDrawerContent}>
            <div className={s.mobileDrawerHeader}>
              <Image
                src="/images/logo.png"
                alt="Serhan Turizm"
                width={130}
                height={33}
                className={s.brandLogo}
              />
              <button
                type="button"
                className={s.mobileDrawerClose}
                onClick={() => setMobileOpen(false)}
                aria-label="Menüyü kapat"
              >
                ✕
              </button>
            </div>

            {renderNavList(() => setMobileOpen(false))}

            <div className={s.profileArea}>
              <div className={s.profileRow}>
                <div className={s.profileAvatar} aria-hidden="true">
                  SY
                </div>
                <div className={s.profileDetails}>
                  <span className={s.profileName}>Serhan Yönetici</span>
                  <span className={s.profileEmail}>admin@serhanturizm.com</span>
                </div>
              </div>
              {onLogout && (
                <form action={onLogout}>
                  <button type="submit" className={s.logoutButton}>
                    Çıkış yap
                  </button>
                </form>
              )}
            </div>
          </div>
          <div
            className={s.mobileDrawerBackdrop}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
