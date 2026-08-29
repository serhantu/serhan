import type { Metadata } from "next";
import { IletisimForm } from "@/components/forms/iletisim-form";
import { getSiteSettings } from "@/lib/site-settings";
import * as s from "../form-page.css";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Serhan Turizm ile iletişime geçin.",
};

export const dynamic = "force-dynamic";

export default async function IletisimPage() {
  const settings = await getSiteSettings();

  return (
    <main className={s.main}>
      <div>
        <h1 className={s.title}>İletişim</h1>
        <p className={s.description}>
          Sorularınız, görüşleriniz ve iş birlikleri için bize ulaşın.
        </p>
      </div>

      {settings.phone || settings.email || settings.address ? (
        <div>
          {settings.phone && <p><strong>Telefon:</strong> {settings.phone}</p>}
          {settings.email && <p><strong>E-posta:</strong> {settings.email}</p>}
          {settings.address && <p><strong>Adres:</strong> {settings.address}</p>}
          {settings.workingHours && <p><strong>Çalışma Saatleri:</strong> {settings.workingHours}</p>}
        </div>
      ) : null}

      <IletisimForm />
    </main>
  );
}
