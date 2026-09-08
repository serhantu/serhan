// Centralized design tokens for Serhan Turizm.
//
// RULES (see docs/frontend-rules.md):
//   - Colors are HSL only. Never hex / rgb() / rgba() in components.
//   - Sizes use rem. px is reserved for technically-1px needs (e.g. borders).
//   - Typography, spacing, radii, shadows and breakpoints are all tokenized.
//   - The brand palette below is a NEUTRAL placeholder. The final Serhan Turizm
//     visual identity is defined in a later design phase.
//
// These vars are intentionally generic. Components must reference `vars.*`
// rather than raw values.

import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    // Neutral grayscale placeholder palette (HSL).
    background: "hsl(0 0% 100%)",
    foreground: "hsl(0 0% 9%)",
    muted: "hsl(0 0% 96%)",
    mutedForeground: "hsl(0 0% 40%)",
    border: "hsl(0 0% 88%)",
    // Functional accents (placeholder hue: neutral blue-gray).
    primary: "hsl(215 25% 30%)",
    primaryForeground: "hsl(0 0% 100%)",
    accent: "hsl(215 20% 92%)",
    danger: "hsl(0 70% 45%)",
    dangerBg: "hsl(0 70% 96%)",
    success: "hsl(140 50% 38%)",

    // Sand palette tokens (QR On-Kayıt system) — 100% HSL
    sandBg: "hsl(39 44% 93%)",
    sandBgTranslucent: "hsl(39 44% 93% / 0.88)",
    sandBgFooter: "hsl(39 44% 93% / 0.75)",
    sandSurface: "hsl(40 50% 97%)",
    sandCardBg: "hsl(0 0% 100%)",
    sandCardTranslucent: "hsl(0 0% 100% / 0.6)",
    sandInk: "hsl(143 18% 14%)",
    sandInkMuted: "hsl(143 18% 14% / 0.75)",
    sandInkSubtle: "hsl(143 18% 14% / 0.55)",
    sandInkFaint: "hsl(143 18% 14% / 0.38)",
    sandInkJadeHover: "hsl(143 18% 14% / 0.05)",
    sandInkJadePressed: "hsl(143 18% 14% / 0.04)",
    sandLine: "hsl(143 18% 14% / 0.14)",
    sandLineSubtle: "hsl(143 18% 14% / 0.12)",
    sandLineMedium: "hsl(143 18% 14% / 0.22)",
    sandLineStrong: "hsl(143 18% 14% / 0.25)",
    sandLineHover: "hsl(143 18% 14% / 0.4)",
    sandLineFocus: "hsl(143 18% 14% / 0.5)",
    sandLineDashed: "hsl(143 18% 14% / 0.3)",
    sandAccent: "hsl(157 55% 27%)",
    sandAccentSoft: "hsl(157 55% 27% / 0.09)",
    sandAccentInk: "hsl(0 0% 100%)",
    sandError: "hsl(4 67% 51%)",
    sandErrorBg: "hsl(4 67% 51% / 0.1)",
    sandErrorLine: "hsl(4 67% 51% / 0.25)",
    whatsapp: "hsl(142 70% 49%)",
    whatsappInk: "hsl(149 78% 11%)",
    linkBlue: "hsl(217 91% 60%)",

    // Admin Panel Design Tokens (100% HSL)
    adminBg: "hsl(45 13% 94%)",
    adminBgAlt: "hsl(43 15% 92%)",
    adminSurface: "hsl(0 0% 100%)",
    adminSurfaceSoft: "hsl(45 25% 97%)",
    adminBorder: "hsl(45 11% 87%)",
    adminBorderLight: "hsl(43 15% 92%)",
    adminPrimary: "hsl(152 83% 23%)",
    adminPrimaryHover: "hsl(152 83% 18%)",
    adminPrimarySoft: "hsl(144 29% 94%)",
    adminText: "hsl(150 3% 12%)",
    adminTextBody: "hsl(150 1% 29%)",
    adminTextMuted: "hsl(60 2% 41%)",
    adminTextCaption: "hsl(60 2% 53%)",
    adminTextSubtle: "hsl(60 3% 65%)",
    adminAlert: "hsl(17 88% 40%)",
    adminAlertSoft: "hsl(23 88% 94%)",
    adminAlertText: "hsl(15 79% 34%)",
    adminAlertBorder: "hsl(20 70% 85%)",
    adminChartInactive: "hsl(144 16% 84%)",
    adminFilterLine: "hsl(146 25% 80%)",
    adminPrimaryForeground: "hsl(0 0% 100%)",
    adminRowHover: "hsl(45 15% 96%)",
    adminRowUnread: "hsl(150 33% 99%)",
    adminSuccessBg: "hsl(140 50% 92%)",
    adminSuccessBorder: "hsl(140 50% 70%)",
    adminDangerBg: "hsl(0 70% 94%)",
    adminDangerBorder: "hsl(0 70% 80%)",
    adminBackdrop: "hsl(150 3% 12% / 0.42)",
    adminTopbarBg: "hsl(0 0% 100% / 0.93)",
  },

  font: {
    sans: "var(--font-schibsted, 'Schibsted Grotesk'), system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    mono: "var(--font-ibm-mono, 'IBM Plex Mono'), ui-monospace, 'SFMono-Regular', 'Menlo', 'Consolas', monospace",
    // Modular type scale (rem). Override in the design phase.
    sizeXs: "0.75rem",
    sizeSm: "0.875rem",
    sizeMd: "1rem",
    sizeLg: "1.25rem",
    sizeXl: "1.5rem",
    size2xl: "2rem",
    size3xl: "2.5rem",
    weightNormal: "400",
    weightMedium: "500",
    weightBold: "700",
    lineTight: "1.25",
    lineNormal: "1.6",
  },

  space: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },

  radius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    full: "999rem",
  },

  shadow: {
    sm: "0 1px 2px hsl(0 0% 0% / 0.06)",
    md: "0 2px 8px hsl(0 0% 0% / 0.08)",
    lg: "0 8px 24px hsl(0 0% 0% / 0.12)",
  },

  zIndex: {
    base: "0",
    dropdown: "100",
    sticky: "200",
    overlay: "300",
    modal: "400",
  },

  breakpoint: {
    sm: "30rem",
    md: "48rem",
    lg: "64rem",
    xl: "80rem",
  },
});

export const breakpoints = {
  sm: "30rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
} as const;
