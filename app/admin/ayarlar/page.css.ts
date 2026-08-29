import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  paddingBlock: vars.space.xl,
  paddingInline: "clamp(1rem, 3vw, 2rem)",
  maxInlineSize: "min(100%, 48rem)",
});

export const heading = style({
  fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
  fontWeight: vars.font.weightBold,
  marginBlockEnd: vars.space.lg,
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const fieldGroup = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
  gap: vars.space.md,
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const fieldFull = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  gridColumn: "1 / -1",
});

export const label = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.foreground,
  inlineSize: "fit-content",
});

export const input = style({
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  inlineSize: "100%",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeMd,
  fontFamily: vars.font.sans,
  selectors: {
    "&:focus": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "1px",
    },
  },
});

export const textarea = style({
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  inlineSize: "100%",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeMd,
  fontFamily: vars.font.sans,
  minBlockSize: "5rem",
  resize: "vertical",
  selectors: {
    "&:focus": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "1px",
    },
  },
});

export const sectionTitle = style({
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightMedium,
  borderBottom: `1px solid ${vars.color.border}`,
  paddingBlockEnd: vars.space.sm,
  marginBlockStart: vars.space.lg,
});

export const actions = style({
  display: "flex",
  gap: vars.space.sm,
  marginBlockStart: vars.space.md,
  flexWrap: "wrap",
});

export const submitButton = style({
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.xl,
  inlineSize: "fit-content",
  border: "none",
  borderRadius: vars.radius.sm,
  background: vars.color.primary,
  color: vars.color.primaryForeground,
  fontSize: vars.font.sizeMd,
  fontWeight: vars.font.weightMedium,
  cursor: "pointer",
  selectors: {
    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
});

export const successMessage = style({
  padding: vars.space.md,
  background: "hsl(140 50% 95%)",
  color: vars.color.success,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeSm,
});

export const errorMessage = style({
  padding: vars.space.md,
  background: vars.color.dangerBg,
  color: vars.color.danger,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeSm,
});
