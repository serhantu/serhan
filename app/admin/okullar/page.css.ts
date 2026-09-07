import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const page = style({
  maxInlineSize: "min(100%, 84rem)",
  marginInline: "auto",
  paddingBlock: vars.space.xl,
  paddingInline: "clamp(1rem, 3vw, 2.5rem)",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const titleGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const titleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
});

export const heading = style({
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
  margin: 0,
});

export const countPill = style({
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightMedium,
  paddingBlock: "0.2rem",
  paddingInline: "0.6rem",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.accent,
  color: vars.color.primary,
  border: `1px solid ${vars.color.border}`,
});

export const subheading = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
  margin: 0,
});

export const toggleButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  paddingBlock: "0.625rem",
  paddingInline: vars.space.lg,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.primary,
  color: vars.color.primaryForeground,
  fontWeight: vars.font.weightMedium,
  fontSize: vars.font.sizeSm,
  border: `1px solid ${vars.color.primary}`,
  cursor: "pointer",
  transition: "all 0.15s ease",
  ":hover": {
    backgroundColor: "hsl(215 25% 22%)",
  },
});

export const toggleButtonActive = style({
  backgroundColor: vars.color.background,
  color: vars.color.foreground,
  borderColor: vars.color.border,
  ":hover": {
    backgroundColor: vars.color.muted,
  },
});

export const formCollapse = style({
  marginBlockEnd: vars.space.md,
});

export const toolbar = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
  paddingBottom: vars.space.xs,
});

export const searchWrap = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
  inlineSize: "100%",
  maxInlineSize: "22rem",
  "@media": {
    [`screen and (max-width: ${breakpoints.sm})`]: {
      maxInlineSize: "100%",
    },
  },
});

export const searchInput = style({
  inlineSize: "100%",
  paddingBlock: "0.5rem",
  paddingInline: vars.space.md,
  fontSize: vars.font.sizeSm,
  color: vars.color.foreground,
  backgroundColor: vars.color.background,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  ":focus-visible": {
    outline: "none",
    borderColor: vars.color.primary,
    boxShadow: `0 0 0 1px ${vars.color.primary}`,
  },
  "::placeholder": {
    color: vars.color.mutedForeground,
  },
});

export const tableSummary = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
});
