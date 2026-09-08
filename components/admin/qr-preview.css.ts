import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const wrapper = style({
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: vars.radius.md,
  padding: vars.space.lg,
  background: vars.color.adminSurfaceSoft,
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
  color: vars.color.adminTextCaption,
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
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: vars.radius.sm,
  background: vars.color.adminSurface,
  color: vars.color.adminText,
  cursor: "pointer",
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  transition: "all 0.15s ease",
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.adminSurfaceSoft,
      borderColor: vars.color.adminTextSubtle,
      color: vars.color.adminText,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
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
  border: `1px solid ${vars.color.adminPrimary}`,
  borderRadius: vars.radius.sm,
  background: vars.color.adminPrimary,
  color: vars.color.adminPrimaryForeground,
  cursor: "pointer",
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  transition: "all 0.15s ease",
  selectors: {
    "&:hover:not(:disabled)": {
      background: vars.color.adminPrimaryHover,
      borderColor: vars.color.adminPrimaryHover,
      color: vars.color.adminPrimaryForeground,
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});
