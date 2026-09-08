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
      { url: "/favicon.ico?v=2" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
      { url: "/favicon-96x96.png?v=2", sizes: "96x96", type: "image/png" },
      { url: "/images/logo-icon.svg?v=2", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon-180x180.png?v=2", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon-152x152.png?v=2", sizes: "152x152", type: "image/png" },
      { url: "/apple-icon-144x144.png?v=2", sizes: "144x144", type: "image/png" },
      { url: "/apple-icon-120x120.png?v=2", sizes: "120x120", type: "image/png" },
      { url: "/apple-icon-114x114.png?v=2", sizes: "114x114", type: "image/png" },
      { url: "/apple-icon-76x76.png?v=2", sizes: "76x76", type: "image/png" },
      { url: "/apple-icon-72x72.png?v=2", sizes: "72x72", type: "image/png" },
      { url: "/apple-icon-60x60.png?v=2", sizes: "60x60", type: "image/png" },
      { url: "/apple-icon-57x57.png?v=2", sizes: "57x57", type: "image/png" },
      { url: "/apple-touch-icon.png?v=2" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg?v=2",
        color: "#0E8A44",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Serhan Turizm",
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
