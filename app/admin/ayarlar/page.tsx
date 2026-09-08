import { requireAdminSession } from "@/lib/auth";
import { getSiteSettings } from "@/lib/site-settings";
import { SettingsForm } from "./settings-form";
import * as s from "./page.css";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  await requireAdminSession();
  const settings = await getSiteSettings();

  return (
    <div className={s.page}>
      <SettingsForm initialData={settings} />
    </div>
  );
}
