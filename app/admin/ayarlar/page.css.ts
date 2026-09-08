import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  display: "grid",
  gap: "0.875rem",
  maxInlineSize: "53.75rem",
});

export const formWrap = style({
  display: "grid",
  gap: "0.875rem",
});

export const card = style({
  background: vars.color.adminSurface,
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.75rem",
  overflow: "hidden",
});

export const cardHeader = style({
  paddingBlock: "1rem",
  paddingInline: "1.125rem",
  borderBlockEnd: `1px solid ${vars.color.adminBorder}`,
});

export const cardTitle = style({
  fontSize: "0.9375rem",
  fontWeight: vars.font.weightBold,
  color: vars.color.adminText,
  margin: 0,
});

export const fieldsGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 13.75rem), 1fr))",
  gap: "0.875rem",
  padding: "1.125rem",
});

export const field = style({
  display: "grid",
  gap: "0.375rem",
});

export const label = style({
  fontSize: "0.78125rem",
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminText,
});

export const input = style({
  inlineSize: "100%",
  paddingBlock: "0.625rem",
  paddingInline: "0.75rem",
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.5rem",
  fontSize: "0.84375rem",
  fontFamily: vars.font.sans,
  color: vars.color.adminText,
  background: vars.color.adminSurface,
  outline: "none",
  transition: "border-color 0.15s ease",
  selectors: {
    "&:focus-visible": {
      borderColor: vars.color.adminPrimary,
    },
  },
});

export const toggleList = style({
  display: "grid",
});

export const toggleItem = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "0.875rem",
  alignItems: "center",
  paddingBlock: "0.9375rem",
  paddingInline: "1.125rem",
  borderBlockEnd: `1px solid ${vars.color.adminBorderLight}`,
  selectors: {
    "&:last-child": {
      borderBlockEnd: "none",
    },
  },
});

export const toggleText = style({
  display: "grid",
  gap: "0.1875rem",
});

export const toggleTitle = style({
  fontSize: "0.875rem",
  color: vars.color.adminText,
  fontWeight: vars.font.weightNormal,
});

export const toggleDesc = style({
  fontSize: "0.75rem",
  color: vars.color.adminTextCaption,
});

export const toggleTrack = style({
  inlineSize: "2.75rem",
  blockSize: "1.5625rem",
  borderRadius: vars.radius.full,
  border: "none",
  cursor: "pointer",
  padding: "0.1875rem",
  display: "flex",
  transition: "background 0.2s ease",
  background: vars.color.adminBorder,
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const toggleTrackActive = style({
  background: vars.color.adminPrimary,
  justifyContent: "flex-end",
});

export const toggleTrackInactive = style({
  background: vars.color.adminBorder,
  justifyContent: "flex-start",
});

export const toggleThumb = style({
  inlineSize: "1.1875rem",
  blockSize: "1.1875rem",
  borderRadius: vars.radius.full,
  background: vars.color.adminPrimaryForeground,
  boxShadow: vars.shadow.sm,
});

export const actionsRow = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.5rem",
  padding: "1rem 1.125rem",
  borderBlockStart: `1px solid ${vars.color.adminBorder}`,
});

export const saveButton = style({
  paddingBlock: "0.625rem",
  paddingInline: "1.125rem",
  border: "none",
  borderRadius: "0.5rem",
  background: vars.color.adminPrimary,
  color: vars.color.adminPrimaryForeground,
  fontSize: "0.84375rem",
  fontWeight: vars.font.weightMedium,
  cursor: "pointer",
  inlineSize: "fit-content",
  transition: "background 0.18s ease",
  selectors: {
    "&:hover": {
      background: vars.color.adminPrimaryHover,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const cancelButton = style({
  paddingBlock: "0.625rem",
  paddingInline: "1.125rem",
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.5rem",
  background: vars.color.adminSurface,
  color: vars.color.adminText,
  fontSize: "0.84375rem",
  cursor: "pointer",
  inlineSize: "fit-content",
  transition: "background 0.18s ease",
  selectors: {
    "&:hover": {
      background: vars.color.adminSurfaceSoft,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const successMessage = style({
  padding: "0.75rem 1rem",
  borderRadius: "0.5rem",
  backgroundColor: vars.color.adminPrimarySoft,
  color: vars.color.adminPrimary,
  fontSize: "0.8125rem",
});

export const errorMessage = style({
  padding: "0.75rem 1rem",
  borderRadius: "0.5rem",
  backgroundColor: vars.color.adminAlertSoft,
  color: vars.color.adminAlertText,
  fontSize: "0.8125rem",
});
