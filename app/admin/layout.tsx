import { getAdminSession, logoutAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";
import { prisma } from "@/lib/db";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  let unreadCount = 0;
  let totalSchools = 0;

  if (session) {
    try {
      const [
        schoolsCount,
        onKayitUnread,
        teklifUnread,
        isBasvuruUnread,
        iletisimUnread,
        aracUnread,
      ] = await Promise.all([
        prisma.okul.count(),
        prisma.onKayit.count({ where: { isRead: false } }),
        prisma.teklif.count({ where: { isRead: false } }),
        prisma.isBasvuru.count({ where: { isRead: false } }),
        prisma.iletisim.count({ where: { isRead: false } }),
        prisma.aracGeriBildirim.count({ where: { isRead: false } }),
      ]);

      totalSchools = schoolsCount;
      unreadCount =
        onKayitUnread + teklifUnread + isBasvuruUnread + iletisimUnread + aracUnread;
    } catch {
      // In case of query error, fall back gracefully
    }
  }

  async function handleLogout() {
    "use server";
    await logoutAdmin();
  }

  return (
    <AdminShell
      unreadCount={unreadCount}
      totalSchools={totalSchools}
      onLogout={handleLogout}
    >
      {children}
    </AdminShell>
  );
}
