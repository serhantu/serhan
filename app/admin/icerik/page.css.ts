import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  display: "grid",
  gap: "0.875rem",
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))",
  gap: "0.75rem",
});

export const card = style({
  display: "grid",
  gap: "0.875rem",
  padding: "1.25rem",
  background: vars.color.adminSurface,
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.75rem",
  transition: "border-color 0.18s ease, box-shadow 0.18s ease",
  selectors: {
    "&:hover": {
      borderColor: vars.color.adminTextSubtle,
      boxShadow: vars.shadow.sm,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const cardHeader = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "0.625rem",
});

export const cardTitle = style({
  fontSize: "1rem",
  fontWeight: vars.font.weightBold,
  color: vars.color.adminText,
  margin: 0,
});

export const cardCount = style({
  fontFamily: vars.font.mono,
  fontSize: "0.6875rem",
  color: vars.color.adminTextCaption,
});

export const cardDesc = style({
  fontSize: "0.8125rem",
  lineHeight: 1.55,
  color: vars.color.adminTextMuted,
  margin: 0,
});

export const cardFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.625rem",
  paddingBlockStart: "0.75rem",
  borderBlockStart: `1px solid ${vars.color.adminBorderLight}`,
});

export const cardMeta = style({
  fontSize: "0.71875rem",
  color: vars.color.adminTextCaption,
});

export const editButton = style({
  paddingBlock: "0.4375rem",
  paddingInline: "0.875rem",
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.4375rem",
  background: vars.color.adminSurface,
  fontSize: "0.78125rem",
  color: vars.color.adminText,
  textDecoration: "none",
  cursor: "pointer",
  inlineSize: "fit-content",
  transition: "background 0.15s ease",
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
