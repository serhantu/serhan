import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const page = style({
  display: "grid",
  gap: "0.875rem",
  minInlineSize: 0,
  inlineSize: "100%",
  maxInlineSize: "100%",
});

// Top Type Filter Pills Row
export const typePillsRow = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  flexWrap: "wrap",
});

export const typePill = style({
  paddingBlock: "0.5rem",
  paddingInline: "0.9375rem",
  borderRadius: vars.radius.full,
  cursor: "pointer",
  fontSize: "0.8125rem",
  textDecoration: "none",
  inlineSize: "fit-content",
  transition: "background 0.18s ease, color 0.18s ease, border-color 0.18s ease",
  border: `1px solid ${vars.color.adminBorder}`,
  background: vars.color.adminSurface,
  color: vars.color.adminTextBody,
  fontWeight: vars.font.weightNormal,
  selectors: {
    "&:hover": {
      background: vars.color.adminSurfaceSoft,
      color: vars.color.adminText,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const typePillActive = style({
  background: vars.color.adminText,
  color: vars.color.adminPrimaryForeground,
  borderColor: vars.color.adminText,
  fontWeight: vars.font.weightMedium,
  selectors: {
    "&:hover": {
      background: vars.color.adminText,
      color: vars.color.adminPrimaryForeground,
    },
  },
});

// Main Card
export const cardBox = style({
  background: vars.color.adminSurface,
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.75rem",
  overflow: "hidden",
});

// Card Toolbar
export const cardToolbar = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem",
  flexWrap: "wrap",
  paddingBlock: "0.875rem",
  paddingInline: "1.125rem",
  borderBlockEnd: `1px solid ${vars.color.adminBorder}`,
});

export const readFilterGroup = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  flexWrap: "wrap",
});

export const readTab = style({
  paddingBlock: "0.4375rem",
  paddingInline: "0.8125rem",
  borderRadius: "0.4375rem",
  fontSize: "0.78125rem",
  textDecoration: "none",
  cursor: "pointer",
  inlineSize: "fit-content",
  transition: "all 0.18s ease",
  border: `1px solid ${vars.color.adminBorder}`,
  background: vars.color.adminSurface,
  color: vars.color.adminTextMuted,
  selectors: {
    "&:hover": {
      background: vars.color.adminSurfaceSoft,
      color: vars.color.adminText,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const readTabActive = style({
  background: vars.color.adminPrimarySoft,
  color: vars.color.adminPrimary,
  borderColor: vars.color.adminFilterLine,
  fontWeight: vars.font.weightMedium,
  selectors: {
    "&:hover": {
      background: vars.color.adminPrimarySoft,
      color: vars.color.adminPrimary,
    },
  },
});

export const rowCountText = style({
  fontFamily: vars.font.mono,
  fontSize: "0.6875rem",
  color: vars.color.adminTextCaption,
});

export const tableContainer = style({
  inlineSize: "100%",
  maxInlineSize: "100%",
  minInlineSize: 0,
  overflowX: "auto",
  WebkitOverflowScrolling: "touch",
});

export const table = style({
  inlineSize: "100%",
  borderCollapse: "collapse",
  textAlign: "left",
});

export const thead = style({
  background: vars.color.adminSurfaceSoft,
  borderBlockEnd: `1px solid ${vars.color.adminBorder}`,
  fontFamily: vars.font.mono,
  fontSize: "0.625rem",
  letterSpacing: "0.1em",
  color: vars.color.adminTextCaption,
  textTransform: "uppercase",
});

export const th = style({
  paddingBlock: "0.6875rem",
  paddingInline: "1.125rem",
  fontWeight: vars.font.weightMedium,
  selectors: {
    "&:first-child": {
      inlineSize: "2rem",
      paddingInlineEnd: "0.25rem",
      textAlign: "center",
    },
  },
});

export const tr = style({
  borderBlockEnd: `1px solid ${vars.color.adminBorderLight}`,
  transition: "background 0.15s ease",
  selectors: {
    "&:hover": {
      background: vars.color.adminRowHover,
    },
    "&:last-child": {
      borderBlockEnd: "none",
    },
  },
});

export const trUnread = style({
  background: vars.color.adminRowUnread,
});

export const td = style({
  paddingBlock: "0.9375rem",
  paddingInline: "1.125rem",
  verticalAlign: "middle",
  fontSize: "0.875rem",
  color: vars.color.adminText,
  selectors: {
    "&:first-child": {
      paddingInlineEnd: "0.25rem",
      textAlign: "center",
    },
  },
});

export const statusDot = style({
  inlineSize: "0.5625rem",
  blockSize: "0.5625rem",
  borderRadius: vars.radius.full,
  display: "inline-block",
});

export const statusDotUnread = style({
  background: vars.color.adminPrimary,
  boxShadow: `0 0 0 3px ${vars.color.adminPrimarySoft}`,
});

export const statusDotRead = style({
  background: vars.color.adminBorder,
});

export const typeBadge = style({
  display: "inline-block",
  fontFamily: vars.font.mono,
  fontSize: "0.65625rem",
  paddingBlock: "0.25rem",
  paddingInline: "0.5rem",
  borderRadius: "0.3125rem",
  background: vars.color.adminSurfaceSoft,
  color: vars.color.adminTextMuted,
  whiteSpace: "nowrap",
});

export const summaryCol = style({
  display: "grid",
  gap: "0.125rem",
  minInlineSize: 0,
});

export const summaryLink = style({
  color: vars.color.adminText,
  textDecoration: "none",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontWeight: vars.font.weightNormal,
  selectors: {
    "&:hover": {
      color: vars.color.adminPrimary,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const summaryLinkUnread = style({
  fontWeight: vars.font.weightBold,
});

export const mobileMeta = style({
  fontSize: "0.71875rem",
  color: vars.color.adminTextCaption,
  "@media": {
    [`(min-width: ${breakpoints.md})`]: {
      display: "none",
    },
  },
});

export const schoolCell = style({
  fontSize: "0.8125rem",
  color: vars.color.adminTextMuted,
  display: "none",
  "@media": {
    [`(min-width: ${breakpoints.md})`]: {
      display: "table-cell",
    },
  },
});

export const dateCell = style({
  fontFamily: vars.font.mono,
  fontSize: "0.71875rem",
  color: vars.color.adminTextCaption,
  whiteSpace: "nowrap",
  display: "none",
  "@media": {
    [`(min-width: ${breakpoints.md})`]: {
      display: "table-cell",
    },
  },
});

// Card Footer
export const cardFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem",
  paddingBlock: "0.875rem",
  paddingInline: "1.125rem",
  fontSize: "0.78125rem",
  color: vars.color.adminTextCaption,
  borderBlockStart: `1px solid ${vars.color.adminBorder}`,
});

export const pageButtons = style({
  display: "flex",
  gap: "0.375rem",
});

export const pageBtn = style({
  paddingBlock: "0.4375rem",
  paddingInline: "0.8125rem",
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.4375rem",
  background: vars.color.adminSurface,
  fontSize: "0.78125rem",
  cursor: "pointer",
  color: vars.color.adminText,
  textDecoration: "none",
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

export const pageBtnDisabled = style({
  opacity: 0.4,
  pointerEvents: "none",
});

export const emptyState = style({
  padding: "2rem",
  textAlign: "center",
  color: vars.color.adminTextCaption,
  fontSize: "0.875rem",
});
