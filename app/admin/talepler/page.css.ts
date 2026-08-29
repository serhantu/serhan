import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  maxInlineSize: "min(100%, 80rem)",
  marginInline: "auto",
  paddingBlock: vars.space.xl,
  paddingInline: "clamp(1rem, 3vw, 2rem)",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xl,
});

export const title = style({
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
});

export const topBar = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const form = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
  alignItems: "center",
});

export const input = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  minInlineSize: "min(100%, 12rem)",
  fontFamily: vars.font.sans,
});

export const select = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  fontFamily: vars.font.sans,
});

export const button = style({
  border: `1px solid ${vars.color.border}`,
  background: vars.color.primary,
  color: vars.color.primaryForeground,
  borderRadius: vars.radius.md,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  fontWeight: vars.font.weightMedium,
  inlineSize: "fit-content",
  cursor: "pointer",
});

export const tableWrap = style({
  inlineSize: "100%",
  overflowX: "auto",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
});

export const table = style({
  inlineSize: "100%",
  borderCollapse: "collapse",
  background: vars.color.background,
});

export const th = style({
  textAlign: "left",
  paddingBlock: vars.space.md,
  paddingInline: vars.space.md,
  borderBottom: `1px solid ${vars.color.border}`,
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
  background: vars.color.muted,
});

export const td = style({
  paddingBlock: vars.space.md,
  paddingInline: vars.space.md,
  borderBottom: `1px solid ${vars.color.border}`,
  verticalAlign: "top",
});

export const link = style({
  color: vars.color.primary,
  textDecoration: "none",
  fontWeight: vars.font.weightMedium,
  inlineSize: "fit-content",
});

export const meta = style({
  color: vars.color.mutedForeground,
  fontSize: vars.font.sizeSm,
});

export const pagination = style({
  display: "flex",
  gap: vars.space.sm,
  flexWrap: "wrap",
  alignItems: "center",
});

export const pageLink = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.sm,
  textDecoration: "none",
  color: vars.color.foreground,
  inlineSize: "fit-content",
});
