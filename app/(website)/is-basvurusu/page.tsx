import type { Metadata } from "next";
import { IsBasvuruForm } from "@/components/forms/is-basvuru-form";
import * as s from "../form-page.css";

export const metadata: Metadata = {
  title: "İş Başvurusu",
  description: "Serhan Turizm ailesine katılmak için iş başvurusunda bulunun.",
};

export default function IsBasvuruPage() {
  return (
    <main className={s.main}>
      <div>
        <h1 className={s.title}>İş Başvurusu</h1>
        <p className={s.description}>
          Sürücü, rehber veya ofis personeli pozisyonları için başvurunuzu iletebilirsiniz.
        </p>
      </div>
      <IsBasvuruForm />
    </main>
  );
}
