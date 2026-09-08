import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  display: "grid",
  gap: "0.875rem",
  minInlineSize: 0,
  inlineSize: "100%",
  maxInlineSize: "100%",
});

export const tableSection = style({
  minInlineSize: 0,
  inlineSize: "100%",
  maxInlineSize: "100%",
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.75rem",
  flexWrap: "wrap",
});

export const titleGroup = style({
  display: "grid",
  gap: "0.25rem",
});

export const titleRow = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

export const heading = style({
  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
  fontWeight: vars.font.weightBold,
  color: vars.color.adminText,
  margin: 0,
});

export const countPill = style({
  fontFamily: vars.font.mono,
  fontSize: "0.71875rem",
  fontWeight: vars.font.weightMedium,
  paddingBlock: "0.1875rem",
  paddingInline: "0.5rem",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.adminSurfaceSoft,
  color: vars.color.adminTextCaption,
  border: `1px solid ${vars.color.adminBorder}`,
});

export const subheading = style({
  fontSize: "0.8125rem",
  color: vars.color.adminTextCaption,
  margin: 0,
});

export const toggleButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  paddingBlock: "0.625rem",
  paddingInline: "1.125rem",
  borderRadius: "0.5rem",
  backgroundColor: vars.color.adminPrimary,
  color: vars.color.adminPrimaryForeground,
  fontWeight: vars.font.weightMedium,
  fontSize: "0.84375rem",
  border: "none",
  cursor: "pointer",
  inlineSize: "fit-content",
  transition: "background 0.18s ease",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.adminPrimaryHover,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const toggleButtonActive = style({
  backgroundColor: vars.color.adminSurface,
  color: vars.color.adminText,
  border: `1px solid ${vars.color.adminBorder}`,
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.adminSurfaceSoft,
    },
  },
});

export const formCollapse = style({
  marginBlockEnd: "0.25rem",
});

export const toolbar = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "0.75rem",
  flexWrap: "wrap",
});

export const searchWrap = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  inlineSize: "100%",
  maxInlineSize: "23.75rem",
  backgroundColor: vars.color.adminSurface,
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.5rem",
  paddingBlock: "0.5625rem",
  paddingInline: "0.8125rem",
  transition: "border-color 0.15s ease",
  selectors: {
    "&:focus-within": {
      borderColor: vars.color.adminPrimary,
    },
  },
});

export const searchInput = style({
  border: "none",
  outline: "none",
  inlineSize: "100%",
  fontSize: "0.84375rem",
  fontFamily: vars.font.sans,
  color: vars.color.adminText,
  backgroundColor: "transparent",
  selectors: {
    "&::placeholder": {
      color: vars.color.adminTextSubtle,
    },
  },
});

export const tableSummary = style({
  fontFamily: vars.font.mono,
  fontSize: "0.6875rem",
  color: vars.color.adminTextCaption,
});
