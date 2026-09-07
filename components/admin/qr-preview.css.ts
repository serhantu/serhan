import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const wrapper = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: vars.space.lg,
  background: vars.color.muted,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.md,
});

export const svgContainer = style({
  maxInlineSize: "100%",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
});

export const info = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
  textAlign: "center",
});

export const downloadActions = style({
  display: "flex",
  gap: vars.space.sm,
  flexWrap: "wrap",
  justifyContent: "center",
});

export const downloadButton = style({
  inlineSize: "fit-content",
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.md,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: vars.color.background,
  color: vars.color.foreground,
  cursor: "pointer",
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  transition: "all 0.15s ease",
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.accent,
      borderColor: vars.color.primary,
      color: vars.color.foreground,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});

export const downloadPdfButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
  inlineSize: "fit-content",
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.md,
  border: `1px solid ${vars.color.primary}`,
  borderRadius: vars.radius.sm,
  background: vars.color.primary,
  color: vars.color.primaryForeground,
  cursor: "pointer",
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  transition: "all 0.15s ease",
  selectors: {
    "&:hover:not(:disabled)": {
      background: "hsl(215 25% 22%)",
      borderColor: "hsl(215 25% 22%)",
      color: vars.color.primaryForeground,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
});
