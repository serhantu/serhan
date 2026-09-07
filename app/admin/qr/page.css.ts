import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  paddingBlock: vars.space.xl,
  paddingInline: "clamp(1rem, 3vw, 2rem)",
});

export const heading = style({
  fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
  fontWeight: vars.font.weightBold,
  marginBlockEnd: vars.space.lg,
});

export const layout = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))",
  gap: vars.space.xl,
});

export const panel = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const sectionTitle = style({
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightMedium,
  borderBottom: `1px solid ${vars.color.border}`,
  paddingBlockEnd: vars.space.sm,
});

export const fieldLabel = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.foreground,
  marginBlockEnd: vars.space.xs,
  display: "block",
  inlineSize: "fit-content",
});

export const select = style({
  inlineSize: "100%",
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
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

export const schoolList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  maxBlockSize: "20rem",
  overflowY: "auto",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  padding: vars.space.sm,
});

export const schoolItem = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.sm,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeSm,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      background: vars.color.muted,
    },
  },
});

export const schoolItemSelected = style({
  background: vars.color.accent,
  fontWeight: vars.font.weightMedium,
});

export const schoolItemText = style({
  display: "flex",
  flexDirection: "column",
});

export const schoolItemDistrict = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.mutedForeground,
});

export const checkbox = style({
  accentColor: vars.color.primary,
});

export const templateOptions = style({
  display: "flex",
  gap: vars.space.sm,
  flexWrap: "wrap",
});

export const templateButton = style({
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  inlineSize: "fit-content",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: vars.color.background,
  color: vars.color.foreground,
  cursor: "pointer",
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  transition: "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease",
  selectors: {
    "&:hover": {
      background: vars.color.muted,
      color: vars.color.foreground,
      borderColor: vars.color.border,
    },
  },
});

export const templateButtonActive = style({
  background: vars.color.primary,
  color: vars.color.primaryForeground,
  borderColor: vars.color.primary,
  selectors: {
    "&:hover": {
      background: "hsl(215 25% 22%)",
      color: vars.color.primaryForeground,
      borderColor: "hsl(215 25% 22%)",
    },
  },
});

export const batchActions = style({
  display: "flex",
  gap: vars.space.sm,
  marginBlockStart: vars.space.md,
  flexWrap: "wrap",
});

export const batchButton = style({
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.lg,
  inlineSize: "fit-content",
  border: "none",
  borderRadius: vars.radius.sm,
  background: vars.color.primary,
  color: vars.color.primaryForeground,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  cursor: "pointer",
  transition: "background-color 0.15s ease, opacity 0.15s ease",
  selectors: {
    "&:hover:not(:disabled)": {
      background: "hsl(215 25% 22%)",
      color: vars.color.primaryForeground,
    },
    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
});

export const batchPdfButton = style({
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.lg,
  inlineSize: "fit-content",
  border: `1px solid ${vars.color.primary}`,
  borderRadius: vars.radius.sm,
  background: vars.color.background,
  color: vars.color.primary,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  cursor: "pointer",
  transition: "all 0.15s ease",
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.primary,
      color: vars.color.primaryForeground,
    },
    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
});

export const previewSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const selectAllWrap = style({
  marginBlockEnd: vars.space.sm,
});

export const emptyState = style({
  color: vars.color.mutedForeground,
  fontSize: vars.font.sizeSm,
  textAlign: "center",
  padding: vars.space.xl,
});
