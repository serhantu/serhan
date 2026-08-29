import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const card = style({
  inlineSize: "100%",
  maxInlineSize: "min(100%, 42rem)",
  marginInline: "auto",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  paddingBlock: vars.space.xl,
  paddingInline: "clamp(1rem, 3vw, 2rem)",
  backgroundColor: vars.color.background,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
});

export const steps = style({
  display: "flex",
  gap: vars.space.sm,
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const stepItem = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
});

export const stepBar = style({
  blockSize: "0.25rem",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.border,
});

export const stepBarActive = style({
  backgroundColor: vars.color.primary,
});

export const stepLabel = style({});

export const stepLabelActive = style({
  color: vars.color.foreground,
  fontWeight: vars.font.weightMedium,
});

export const stepHeading = style({
  fontSize: "clamp(1.15rem, 2vw, 1.35rem)",
  fontWeight: vars.font.weightMedium,
  color: vars.color.foreground,
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

export const requiredMark = style({
  color: vars.color.danger,
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

export const inputInvalid = style({
  borderColor: vars.color.danger,
});

export const fieldError = style({
  color: vars.color.danger,
  fontSize: vars.font.sizeSm,
});

export const legalBox = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.muted,
  padding: vars.space.md,
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
  maxBlockSize: "14rem",
  overflowY: "auto",
});

export const checkboxRow = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.space.sm,
  fontSize: vars.font.sizeMd,
  color: vars.color.foreground,
  cursor: "pointer",
});

export const checkbox = style({
  inlineSize: "1.1rem",
  blockSize: "1.1rem",
  marginBlockStart: "0.15rem",
  accentColor: vars.color.primary,
  flexShrink: 0,
});

export const checkboxError = style({
  color: vars.color.danger,
  fontSize: vars.font.sizeSm,
});

export const controls = style({
  display: "flex",
  justifyContent: "space-between",
  gap: vars.space.md,
});

export const button = style({
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeMd,
  fontWeight: vars.font.weightMedium,
  color: vars.color.primaryForeground,
  backgroundColor: vars.color.primary,
  border: `1px solid ${vars.color.primary}`,
  borderRadius: vars.radius.sm,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.lg,
  inlineSize: "fit-content",
  cursor: "pointer",
  ":disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
});

export const buttonSecondary = style({
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeMd,
  fontWeight: vars.font.weightMedium,
  color: vars.color.foreground,
  backgroundColor: vars.color.background,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.lg,
  inlineSize: "fit-content",
  cursor: "pointer",
  ":disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
});

export const formError = style({
  color: vars.color.danger,
  fontSize: vars.font.sizeSm,
});

export const success = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
  alignItems: "center",
  textAlign: "center",
  padding: vars.space.xl,
});

export const successTitle = style({
  fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
  fontWeight: vars.font.weightBold,
  color: vars.color.success,
});

export const successText = style({
  fontSize: vars.font.sizeMd,
  color: vars.color.foreground,
  maxInlineSize: "min(100%, 32rem)",
});

// Prevent the number inputs from showing spinners inconsistently.
globalStyle(`${input}[type="tel"], ${input}[inputmode="numeric"]`, {
  letterSpacing: "0.05em",
});

export const fieldset = style({
  border: "none",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const noteText = style({
  marginBlockStart: vars.space.xs,
  color: vars.color.mutedForeground,
  fontSize: vars.font.sizeSm,
});

export const honeypot = style({
  position: "absolute",
  insetInlineStart: "-999rem",
  inlineSize: "1px",
  blockSize: "1px",
  opacity: 0,
  pointerEvents: "none",
});
