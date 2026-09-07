import { loginAdmin } from "@/lib/auth";
import {
  page,
  card,
  title,
  form,
  label,
  input,
  actions,
  button,
  helper,
  errorMessage,
} from "./page.css";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolved = (await searchParams) ?? {};
  const error = resolved.error;

  let errorText = "";
  if (error === "invalid") {
    errorText = "Geçersiz e-posta adresi veya şifre girdiniz.";
  } else if (error === "missing") {
    errorText = "Lütfen e-posta ve şifrenizi eksiksiz giriniz.";
  } else if (error === "config") {
    errorText = "Sistemde admin kimlik bilgileri tanımlanmamış.";
  }

  return (
    <main className={page}>
      <div className={card}>
        <h1 className={title}>Admin Girişi</h1>

        <p className={helper}>
          Serhan Turizm yönetim paneline erişmek için kullanıcı bilgilerinizi giriniz.
        </p>

        {errorText ? (
          <div className={errorMessage} role="alert">
            {errorText}
          </div>
        ) : null}

        <form action={loginAdmin} className={form}>
          <label className={label} htmlFor="email">
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue="admin@serhanturizm.com"
            className={input}
            required
            autoComplete="email"
          />

          <label className={label} htmlFor="password">
            Şifre
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={input}
            required
            autoComplete="current-password"
          />

          <div className={actions}>
            <button type="submit" className={button}>
              Giriş yap
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
