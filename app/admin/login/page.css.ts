import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const container = style({
  minBlockSize: "100dvh",
  display: "grid",
  gridTemplateColumns: "1fr",
  color: vars.color.adminText,
  fontFamily: vars.font.sans,
  background: `linear-gradient(135deg, ${vars.color.adminBg} 0%, ${vars.color.adminBgAlt} 100%)`,
  "@media": {
    [`(min-width: ${breakpoints.lg})`]: {
      gridTemplateColumns: "1.05fr 1fr",
    },
  },
});

// Left Hero Brand Panel (Desktop)
export const heroPanel = style({
  display: "none",
  background: `linear-gradient(180deg, ${vars.color.adminPrimary} 0%, ${vars.color.adminPrimaryHover} 100%)`,
  paddingBlock: "clamp(2rem, 4vw, 3rem)",
  paddingInline: "clamp(2rem, 4vw, 3.5rem)",
  color: vars.color.adminPrimaryForeground,
  "@media": {
    [`(min-width: ${breakpoints.lg})`]: {
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      gap: vars.space.xl,
      justifyItems: "start",
    },
  },
});

export const heroLogo = style({
  inlineSize: "100%",
  maxInlineSize: "12.5rem",
  blockSize: "auto",
  display: "block",
});

export const heroContent = style({
  display: "grid",
  gap: vars.space.xl,
  alignContent: "center",
  maxInlineSize: "40rem",
});

export const heroHeader = style({
  display: "grid",
  gap: vars.space.sm,
});

export const heroTag = style({
  fontFamily: vars.font.mono,
  fontSize: "0.75rem",
  letterSpacing: "0.14em",
  color: vars.color.adminPrimaryForeground,
  opacity: 0.7,
  fontWeight: vars.font.weightMedium,
  textTransform: "uppercase",
});

export const heroTitle = style({
  fontSize: "clamp(2rem, 3.5vw, 3rem)",
  lineHeight: 1.1,
  letterSpacing: "-0.04em",
  margin: 0,
  color: vars.color.adminPrimaryForeground,
  fontWeight: vars.font.weightBold,
});

export const heroDesc = style({
  fontSize: "1rem",
  lineHeight: 1.65,
  margin: 0,
  color: vars.color.adminPrimaryForeground,
  opacity: 0.85,
});

export const featureList = style({
  display: "grid",
  gap: vars.space.sm,
  fontSize: "0.875rem",
  color: vars.color.adminPrimaryForeground,
  opacity: 0.9,
});

export const featureItem = style({
  display: "flex",
  alignItems: "center",
  gap: "0.625rem",
});

export const featureIcon = style({
  inlineSize: "1.25rem",
  blockSize: "1.25rem",
  borderRadius: vars.radius.full,
  display: "grid",
  placeItems: "center",
  background: vars.color.adminPrimarySoft,
  color: vars.color.adminPrimary,
  fontSize: "0.7rem",
  fontWeight: vars.font.weightBold,
  flexShrink: 0,
});

export const heroFooter = style({
  fontSize: "0.8125rem",
  color: vars.color.adminPrimaryForeground,
  opacity: 0.65,
  lineHeight: 1.6,
});

export const heroFooterLinks = style({
  color: vars.color.adminPrimaryForeground,
  opacity: 0.8,
  textDecoration: "none",
  selectors: {
    "&:hover": {
      opacity: 1,
      textDecoration: "underline",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimaryForeground}`,
      outlineOffset: "2px",
    },
  },
});

// Right Form Section
export const formPanel = style({
  display: "grid",
  placeItems: "center",
  paddingBlock: "clamp(1.5rem, 5vw, 3rem)",
  paddingInline: "clamp(1.25rem, 5vw, 3rem)",
});

export const formCard = style({
  inlineSize: "100%",
  maxInlineSize: "26.25rem",
  display: "grid",
  gap: vars.space.lg,
});

export const formHeader = style({
  display: "grid",
  gap: vars.space.xs,
  textAlign: "center",
});

export const mobileLogo = style({
  inlineSize: "100%",
  maxInlineSize: "10rem",
  blockSize: "auto",
  marginInline: "auto",
  marginBlockEnd: vars.space.xs,
  display: "block",
  "@media": {
    [`(min-width: ${breakpoints.lg})`]: {
      display: "none",
    },
  },
});

export const formTitle = style({
  fontSize: "1.75rem",
  fontWeight: vars.font.weightBold,
  letterSpacing: "-0.03em",
  margin: 0,
  color: vars.color.adminText,
});

export const formSubtitle = style({
  fontSize: "0.875rem",
  color: vars.color.adminTextMuted,
  margin: 0,
});

export const form = style({
  display: "grid",
  gap: "0.875rem",
});

export const field = style({
  display: "grid",
  gap: "0.4rem",
});

export const fieldLabelRow = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: vars.space.sm,
});

export const label = style({
  fontSize: "0.8125rem",
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminText,
});

export const forgotLink = style({
  fontSize: "0.75rem",
  color: vars.color.adminPrimary,
  textDecoration: "none",
  selectors: {
    "&:hover": {
      color: vars.color.adminPrimaryHover,
      textDecoration: "underline",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const input = style({
  inlineSize: "100%",
  paddingBlock: "0.75rem",
  paddingInline: "0.875rem",
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: vars.radius.md,
  fontSize: "0.9375rem",
  background: vars.color.adminSurface,
  color: vars.color.adminText,
  fontFamily: vars.font.sans,
  outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    "&:focus-visible": {
      borderColor: vars.color.adminPrimary,
      boxShadow: `0 0 0 3px ${vars.color.adminPrimarySoft}`,
    },
    "&::placeholder": {
      color: vars.color.adminTextSubtle,
    },
  },
});

export const rememberRow = style({
  display: "flex",
  alignItems: "center",
  gap: "0.625rem",
  fontSize: "0.875rem",
  color: vars.color.adminText,
  cursor: "pointer",
  userSelect: "none",
});

export const checkbox = style({
  inlineSize: "1.125rem",
  blockSize: "1.125rem",
  accentColor: vars.color.adminPrimary,
  cursor: "pointer",
});

export const submitButton = style({
  marginBlockStart: "0.5rem",
  paddingBlock: "0.875rem",
  paddingInline: "1.25rem",
  border: "none",
  borderRadius: vars.radius.md,
  background: vars.color.adminPrimary,
  color: vars.color.adminPrimaryForeground,
  fontSize: "0.9375rem",
  fontWeight: vars.font.weightMedium,
  cursor: "pointer",
  transition: "background 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.sm,
  selectors: {
    "&:hover": {
      background: vars.color.adminPrimaryHover,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const errorBox = style({
  paddingBlock: "0.75rem",
  paddingInline: "0.875rem",
  background: vars.color.adminAlertSoft,
  border: `1px solid ${vars.color.adminAlertBorder}`,
  borderRadius: vars.radius.md,
  fontSize: "0.8125rem",
  color: vars.color.adminAlertText,
  lineHeight: 1.5,
});


export const infoCard = style({
  display: "grid",
  gap: "0.5rem",
  padding: "0.875rem",
  background: vars.color.adminPrimarySoft,
  borderRadius: vars.radius.md,
  fontSize: "0.8125rem",
  color: vars.color.adminTextMuted,
  lineHeight: 1.6,
});

export const infoCardTitle = style({
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminPrimary,
});

export const infoCardMono = style({
  fontFamily: vars.font.mono,
  fontSize: "0.75rem",
  color: vars.color.adminTextBody,
});
