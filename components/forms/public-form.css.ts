import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  maxInlineSize: "min(100%, 34rem)",
  inlineSize: "100%",
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
  inlineSize: "100%",
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeMd,
  fontFamily: vars.font.sans,
  background: vars.color.background,
  color: vars.color.foreground,
  selectors: {
    "&:focus": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "1px",
    },
  },
});

export const textarea = style({
  inlineSize: "100%",
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeMd,
  fontFamily: vars.font.sans,
  background: vars.color.background,
  color: vars.color.foreground,
  minBlockSize: "8rem",
  resize: "vertical",
  selectors: {
    "&:focus": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "1px",
    },
  },
});

export const submitButton = style({
  inlineSize: "fit-content",
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.lg,
  border: "none",
  borderRadius: vars.radius.sm,
  background: vars.color.primary,
  color: vars.color.primaryForeground,
  fontSize: vars.font.sizeMd,
  fontWeight: vars.font.weightMedium,
  cursor: "pointer",
  alignSelf: "flex-start",
  selectors: {
    "&:hover": {
      opacity: "0.9",
    },
    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
});

export const errorBox = style({
  padding: vars.space.md,
  background: vars.color.dangerBg,
  color: vars.color.danger,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeSm,
});

export const successBox = style({
  padding: vars.space.md,
  background: "hsl(140 50% 95%)",
  color: vars.color.success,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeSm,
});

export const fieldError = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.danger,
});

export const honeypot = style({
  position: "absolute",
  insetInlineStart: "-999rem",
  inlineSize: "1px",
  blockSize: "1px",
  opacity: 0,
  pointerEvents: "none",
});
