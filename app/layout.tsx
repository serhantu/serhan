import type { Metadata } from "next";
import { Schibsted_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "@/styles/global.css";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-schibsted",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Serhan Turizm",
    template: "%s · Serhan Turizm",
  },
  description: "Serhan Turizm kurumsal web sitesi.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
      { url: "/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${schibsted.variable} ${ibmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
