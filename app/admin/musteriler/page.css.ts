import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  maxInlineSize: "min(100%, 72rem)",
  marginInline: "auto",
  paddingBlock: vars.space.xl,
  paddingInline: "clamp(1rem, 3vw, 2rem)",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xl,
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const title = style({
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
});

export const note = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
});

export const searchForm = style({
  display: "flex",
  gap: vars.space.md,
  alignItems: "flex-end",
  flexWrap: "wrap",
});

export const searchInput = style({
  flex: 1,
  minInlineSize: "min(100%, 14rem)",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  fontFamily: vars.font.sans,
});

export const searchButton = style({
  border: "none",
  borderRadius: vars.radius.md,
  background: vars.color.primary,
  color: vars.color.primaryForeground,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  fontWeight: vars.font.weightMedium,
  cursor: "pointer",
  inlineSize: "fit-content",
});

export const customerList = style({
  display: "grid",
  gap: vars.space.md,
});

export const customerCard = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: vars.space.lg,
  background: vars.color.background,
  boxShadow: vars.shadow.sm,
});

export const customerName = style({
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
});

export const customerMeta = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
  marginBlockStart: vars.space.sm,
});

export const customerLink = style({
  color: vars.color.primary,
  textDecoration: "none",
  fontWeight: vars.font.weightMedium,
  marginBlockStart: vars.space.md,
  display: "inline-block",
  inlineSize: "fit-content",
});

export const emptyState = style({
  textAlign: "center",
  padding: vars.space.xl,
  color: vars.color.mutedForeground,
});
