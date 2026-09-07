import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  minBlockSize: "100dvh",
  display: "grid",
  placeItems: "center",
  paddingBlock: vars.space.xl,
  paddingInline: "clamp(1rem, 3vw, 2rem)",
  background: vars.color.muted,
});

export const card = style({
  inlineSize: "100%",
  maxInlineSize: "min(100%, 28rem)",
  background: vars.color.background,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  paddingBlock: vars.space.xl,
  paddingInline: "clamp(1.25rem, 3vw, 2rem)",
  boxShadow: vars.shadow.md,
});

export const title = style({
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  fontWeight: vars.font.weightBold,
  marginBlockEnd: vars.space.md,
});

export const helper = style({
  color: vars.color.mutedForeground,
  marginBlockEnd: vars.space.lg,
  lineHeight: vars.font.lineNormal,
});

export const errorMessage = style({
  padding: vars.space.sm,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.dangerBg,
  color: vars.color.danger,
  border: `1px solid ${vars.color.danger}`,
  fontSize: vars.font.sizeSm,
  marginBlockEnd: vars.space.md,
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const label = style({
  fontWeight: vars.font.weightMedium,
  inlineSize: "fit-content",
});

export const input = style({
  inlineSize: "100%",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  fontSize: vars.font.sizeMd,
  fontFamily: vars.font.sans,
});

export const actions = style({
  marginBlockStart: vars.space.sm,
});

export const button = style({
  border: "none",
  borderRadius: vars.radius.md,
  background: vars.color.primary,
  color: vars.color.primaryForeground,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  fontWeight: vars.font.weightMedium,
  cursor: "pointer",
  inlineSize: "fit-content",
  selectors: {
    "&:focus-visible": { outline: `2px solid ${vars.color.primary}`, outlineOffset: "2px" },
  },
});
