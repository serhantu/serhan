import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  maxInlineSize: "min(100%, 64rem)",
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

export const note = style({
  fontSize: vars.font.sizeMd,
  color: vars.color.mutedForeground,
  marginBlockStart: vars.space.xs,
});

export const cards = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 12rem), 1fr))",
  gap: vars.space.lg,
});

export const card = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: vars.space.lg,
  background: vars.color.muted,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const cardTitle = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export const cardValue = style({
  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
  lineHeight: vars.font.lineTight,
});

export const cardLink = style({
  color: vars.color.primary,
  textDecoration: "none",
  fontWeight: vars.font.weightMedium,
  inlineSize: "fit-content",
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});
