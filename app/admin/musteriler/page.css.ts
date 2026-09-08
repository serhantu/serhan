import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  display: "grid",
  gap: "0.875rem",
});

export const searchBar = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  paddingBlock: "0.5625rem",
  paddingInline: "0.875rem",
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.5rem",
  background: vars.color.adminSurface,
  inlineSize: "100%",
  maxInlineSize: "28.75rem",
  transition: "border-color 0.15s ease",
  selectors: {
    "&:focus-within": {
      borderColor: vars.color.adminPrimary,
    },
  },
});

export const searchIcon = style({
  fontFamily: vars.font.mono,
  fontSize: "0.75rem",
  color: vars.color.adminTextSubtle,
});

export const searchInput = style({
  inlineSize: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: "0.84375rem",
  fontFamily: vars.font.sans,
  color: vars.color.adminText,
  selectors: {
    "&::placeholder": {
      color: vars.color.adminTextSubtle,
    },
  },
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16.25rem), 1fr))",
  gap: "0.75rem",
});

export const card = style({
  display: "grid",
  gap: "0.75rem",
  padding: "1.125rem",
  background: vars.color.adminSurface,
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.75rem",
  textDecoration: "none",
  color: "inherit",
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
  display: "grid",
  gridTemplateColumns: "2.375rem 1fr",
  gap: "0.6875rem",
  alignItems: "center",
});

export const avatar = style({
  inlineSize: "2.375rem",
  blockSize: "2.375rem",
  borderRadius: "0.5625rem",
  display: "grid",
  placeItems: "center",
  background: vars.color.adminPrimarySoft,
  color: vars.color.adminPrimary,
  fontSize: "0.8125rem",
  fontWeight: vars.font.weightBold,
});

export const headerText = style({
  display: "grid",
  gap: "0.125rem",
  minInlineSize: 0,
});

export const customerName = style({
  fontSize: "0.90625rem",
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminText,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const customerRole = style({
  fontSize: "0.71875rem",
  color: vars.color.adminTextCaption,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const contactDetails = style({
  display: "grid",
  gap: "0.375rem",
  fontSize: "0.78125rem",
  color: vars.color.adminTextMuted,
});

export const contactLine = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const cardFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.625rem",
  paddingBlockStart: "0.6875rem",
  borderBlockStart: `1px solid ${vars.color.adminBorderLight}`,
});

export const statusTag = style({
  fontSize: "0.71875rem",
  paddingBlock: "0.25rem",
  paddingInline: "0.625rem",
  borderRadius: vars.radius.full,
  fontWeight: vars.font.weightMedium,
  background: vars.color.adminPrimarySoft,
  color: vars.color.adminPrimary,
});

export const sinceYear = style({
  fontFamily: vars.font.mono,
  fontSize: "0.6875rem",
  color: vars.color.adminTextSubtle,
});

export const emptyState = style({
  padding: "2.5rem 1.5rem",
  textAlign: "center",
  background: vars.color.adminSurface,
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.75rem",
  color: vars.color.adminTextCaption,
  fontSize: "0.875rem",
});
