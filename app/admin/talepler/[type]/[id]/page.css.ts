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

export const kicker = style({
  color: vars.color.mutedForeground,
  fontSize: vars.font.sizeSm,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export const title = style({
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
});

export const backLink = style({
  color: vars.color.primary,
  textDecoration: "none",
  fontWeight: vars.font.weightMedium,
  inlineSize: "fit-content",
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))",
  gap: vars.space.lg,
});

export const card = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  background: vars.color.background,
  padding: vars.space.lg,
  boxShadow: vars.shadow.sm,
});

export const sectionTitle = style({
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightBold,
  marginBlockEnd: vars.space.md,
});

export const list = style({
  display: "grid",
  gap: vars.space.sm,
});

export const listRow = style({
  display: "grid",
  gap: vars.space.xs,
});

export const listLabel = style({
  color: vars.color.mutedForeground,
  fontSize: vars.font.sizeSm,
});

export const listValue = style({
  margin: 0,
  color: vars.color.foreground,
});

export const select = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  fontFamily: vars.font.sans,
  marginInlineEnd: vars.space.md,
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
});

export const detailGrid = style({
  display: "grid",
  gap: vars.space.md,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))",
});

export const inlineLink = style({
  marginBlockStart: vars.space.md,
  display: "inline-block",
  inlineSize: "fit-content",
});

export const phoneActions = style({
  display: "inline-flex",
  marginInlineStart: vars.space.sm,
  gap: vars.space.xs,
  fontSize: vars.font.sizeXs,
});

export const phoneCallLink = style({
  color: vars.color.linkBlue,
  textDecoration: "none",
  fontWeight: vars.font.weightMedium,
  inlineSize: "fit-content",
  ":hover": {
    textDecoration: "underline",
  },
});

export const phoneWaLink = style({
  color: vars.color.success,
  textDecoration: "none",
  fontWeight: vars.font.weightMedium,
  inlineSize: "fit-content",
  ":hover": {
    textDecoration: "underline",
  },
});

export const listValueAddress = style({
  margin: 0,
  color: vars.color.foreground,
  whiteSpace: "pre-wrap",
});
