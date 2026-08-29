import type { Metadata } from "next";
import { TeklifForm } from "@/components/forms/teklif-form";
import * as s from "../form-page.css";

export const metadata: Metadata = {
  title: "Teklif Alın",
  description: "Personel ve öğrenci taşımacılığı hizmetlerimiz için hızlı teklif alın.",
};

export default function TeklifPage() {
  return (
    <main className={s.main}>
      <div>
        <h1 className={s.title}>Teklif Alın</h1>
        <p className={s.description}>
          Taşımacılık ihtiyaçlarınız için formu doldurarak hemen fiyat teklifi talep edebilirsiniz.
        </p>
      </div>
      <TeklifForm />
    </main>
  );
}
