import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  padding: vars.space.lg,
  backgroundColor: vars.color.muted,
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.border}`,
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const label = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.foreground,
  inlineSize: "fit-content",
});

export const input = style({
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeMd,
  color: vars.color.foreground,
  backgroundColor: vars.color.background,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  inlineSize: "100%",
  ":focus-visible": {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: "1px",
  },
});

export const checkboxLabel = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  fontSize: vars.font.sizeMd,
  color: vars.color.foreground,
  cursor: "pointer",
  inlineSize: "fit-content",
});

export const checkbox = style({
  inlineSize: "1.1rem",
  blockSize: "1.1rem",
  accentColor: vars.color.primary,
});

export const error = style({
  color: vars.color.danger,
  fontSize: vars.font.sizeSm,
});

export const success = style({
  color: vars.color.success,
  fontSize: vars.font.sizeMd,
  fontWeight: vars.font.weightMedium,
});

export const submit = style({
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeMd,
  fontWeight: vars.font.weightMedium,
  color: vars.color.primaryForeground,
  backgroundColor: vars.color.primary,
  border: `1px solid ${vars.color.primary}`,
  borderRadius: vars.radius.sm,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  inlineSize: "fit-content",
  cursor: "pointer",
  ":disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
});
