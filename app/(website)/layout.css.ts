import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";


export const siteWrapper = style({
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  background: vars.color.background,
  color: vars.color.foreground,
  fontFamily: vars.font.sans,
});

export const header = style({
  borderBottom: `1px solid ${vars.color.border}`,
  background: vars.color.background,
  position: "sticky",
  top: 0,
  zIndex: vars.zIndex.sticky,
});

export const headerInner = style({
  maxWidth: "72rem",
  marginInline: "auto",
  padding: `${vars.space.md} ${vars.space.lg}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
});

export const brand = style({
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
  textDecoration: "none",
});

export const nav = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
  "@media": {
    [`screen and (max-width: ${breakpoints.md})`]: {
      display: "none",
    },
  },
});

export const navLink = style({
  color: vars.color.foreground,
  textDecoration: "none",
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  selectors: {
    "&:hover": {
      background: vars.color.muted,
      color: vars.color.primary,
    },
  },
});

export const ctaLink = style({
  color: vars.color.primaryForeground,
  background: vars.color.primary,
  textDecoration: "none",
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: vars.radius.sm,
  selectors: {
    "&:hover": {
      opacity: 0.9,
    },
  },
});

export const content = style({
  flex: 1,
});

export const footer = style({
  borderTop: `1px solid ${vars.color.border}`,
  background: vars.color.muted,
  padding: `${vars.space["2xl"]} ${vars.space.lg} ${vars.space.lg}`,
  marginTop: "auto",
});

export const footerInner = style({
  maxWidth: "72rem",
  marginInline: "auto",
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr",
  gap: vars.space.xl,
  marginBottom: vars.space.xl,
  "@media": {
    [`screen and (max-width: ${breakpoints.md})`]: {
      gridTemplateColumns: "1fr 1fr",
    },
    [`screen and (max-width: ${breakpoints.sm})`]: {
      gridTemplateColumns: "1fr",
    },
  },
});


export const footerCol = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const footerTitle = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
  marginBottom: vars.space.xs,
});

export const footerLink = style({
  color: vars.color.mutedForeground,
  textDecoration: "none",
  fontSize: vars.font.sizeSm,
  selectors: {
    "&:hover": {
      color: vars.color.foreground,
    },
  },
});

export const footerText = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
  lineHeight: vars.font.lineNormal,
});

export const footerBottom = style({
  maxWidth: "72rem",
  marginInline: "auto",
  paddingTop: vars.space.lg,
  borderTop: `1px solid ${vars.color.border}`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: vars.font.sizeXs,
  color: vars.color.mutedForeground,
  flexWrap: "wrap",
  gap: vars.space.sm,
});
