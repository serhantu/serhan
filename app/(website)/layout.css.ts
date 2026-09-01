import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const siteWrapper = style({
  minBlockSize: "100dvh",
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
  insetBlockStart: 0,
  zIndex: vars.zIndex.sticky,
});

export const headerInner = style({
  maxInlineSize: "min(100%, 72rem)",
  marginInline: "auto",
  paddingBlock: vars.space.md,
  paddingInline: "clamp(1rem, 3vw, 2rem)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
});

export const brand = style({
  fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
  textDecoration: "none",
  inlineSize: "fit-content",
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
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.sm,
  borderRadius: vars.radius.sm,
  inlineSize: "fit-content",
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
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.md,
  borderRadius: vars.radius.sm,
  inlineSize: "fit-content",
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
  paddingBlockStart: "clamp(2rem, 5vw, 3.5rem)",
  paddingBlockEnd: vars.space.lg,
  paddingInline: "clamp(1rem, 3vw, 2rem)",
  marginBlockStart: "auto",
});

export const footerInner = style({
  maxInlineSize: "min(100%, 72rem)",
  marginInline: "auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))",
  gap: "clamp(1.5rem, 3vw, 2.5rem)",
  marginBlockEnd: "clamp(1.5rem, 4vw, 2.5rem)",
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
  marginBlockEnd: vars.space.xs,
});

export const footerLink = style({
  color: vars.color.mutedForeground,
  textDecoration: "none",
  fontSize: vars.font.sizeSm,
  inlineSize: "fit-content",
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
  maxInlineSize: "min(100%, 72rem)",
  marginInline: "auto",
  paddingBlockStart: vars.space.lg,
  borderTop: `1px solid ${vars.color.border}`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: vars.font.sizeXs,
  color: vars.color.mutedForeground,
  flexWrap: "wrap",
  gap: vars.space.sm,
});
