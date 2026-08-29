// Admin notification email template for public website form submissions.
//
// Covers all four form types: Teklif, Iletisim, IsBasvuru, AracGeriBildirim.
// The template is intentionally simple — HTML design will be refined separately.

import * as React from "react";

type FormNotificationAdminEmailProps = {
  type: string;
  adSoyad: string;
  telefon: string;
  eposta: string;
  mesaj: string;
};

export function FormNotificationAdminEmail({
  type,
  adSoyad,
  telefon,
  eposta,
  mesaj,
}: FormNotificationAdminEmailProps) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "20px" }}>
      <h2 style={{ margin: "0 0 16px" }}>Yeni {type}</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ padding: "8px 12px", fontWeight: "bold", borderBottom: "1px solid #eee" }}>
              Ad Soyad
            </td>
            <td style={{ padding: "8px 12px", borderBottom: "1px solid #eee" }}>{adSoyad}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 12px", fontWeight: "bold", borderBottom: "1px solid #eee" }}>
              Telefon
            </td>
            <td style={{ padding: "8px 12px", borderBottom: "1px solid #eee" }}>{telefon}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 12px", fontWeight: "bold", borderBottom: "1px solid #eee" }}>
              E-posta
            </td>
            <td style={{ padding: "8px 12px", borderBottom: "1px solid #eee" }}>
              {eposta || "—"}
            </td>
          </tr>
          <tr>
            <td
              style={{ padding: "8px 12px", fontWeight: "bold", borderBottom: "1px solid #eee" }}
            >
              Mesaj
            </td>
            <td style={{ padding: "8px 12px", borderBottom: "1px solid #eee" }}>{mesaj}</td>
          </tr>
        </tbody>
      </table>
      <p style={{ color: "#888", fontSize: "12px", marginTop: "24px" }}>
        Bu bildirim Serhan Turizm web sitesinden otomatik olarak gönderilmiştir.
      </p>
    </div>
  );
}
