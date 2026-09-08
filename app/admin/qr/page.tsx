import { requireAdminSession } from "@/lib/auth";
import { listSchools } from "@/lib/schools";
import { QrManager } from "./qr-manager";
import * as s from "./page.css";

export const dynamic = "force-dynamic";

export default async function AdminQrPage() {
  await requireAdminSession();
  const schools = await listSchools();

  return (
    <div className={s.page}>
      <QrManager schools={schools} />
    </div>
  );
}
