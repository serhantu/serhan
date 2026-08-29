import type { Metadata } from "next";
import { AracGeriBildirimForm } from "@/components/forms/arac-geri-bildirim-form";
import * as s from "../form-page.css";

export const metadata: Metadata = {
  title: "Araç Geri Bildirim",
  description: "Servis araçlarımız ve hizmet kalitemiz hakkında geri bildirimde bulunun.",
};

export default function AracGeriBildirimPage() {
  return (
    <main className={s.main}>
      <div>
        <h1 className={s.title}>Araç Geri Bildirim</h1>
        <p className={s.description}>
          Hizmet kalitemizi artırmak için servis araçlarımız, sürücülerimiz ve yolculuk deneyiminizle ilgili görüşlerinizi paylaşabilirsiniz.
        </p>
      </div>
      <AracGeriBildirimForm />
    </main>
  );
}
