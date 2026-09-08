import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const page = style({
  display: "grid",
  gap: "0.875rem",
});

export const layout = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "0.875rem",
  alignItems: "start",
  "@media": {
    [`(min-width: ${breakpoints.lg})`]: {
      gridTemplateColumns: "1fr 0.85fr",
    },
  },
});

export const leftCol = style({
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
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem",
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

export const cardHeaderMeta = style({
  fontFamily: vars.font.mono,
  fontSize: "0.6875rem",
  color: vars.color.adminTextCaption,
});

// Template Pills
export const templatePills = style({
  display: "flex",
  gap: "0.5rem",
  flexWrap: "wrap",
  padding: "1.125rem",
});

export const templatePill = style({
  paddingBlock: "0.5625rem",
  paddingInline: "0.9375rem",
  borderRadius: "0.5rem",
  cursor: "pointer",
  fontSize: "0.8125rem",
  border: `1px solid ${vars.color.adminBorder}`,
  background: vars.color.adminSurface,
  color: vars.color.adminTextBody,
  inlineSize: "fit-content",
  transition: "all 0.18s ease",
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

export const templatePillActive = style({
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

// School Selection List
export const schoolList = style({
  display: "grid",
  maxBlockSize: "24rem",
  overflowY: "auto",
});

export const schoolItem = style({
  inlineSize: "100%",
  display: "grid",
  gridTemplateColumns: "1.25rem 1fr auto",
  gap: "0.75rem",
  alignItems: "center",
  textAlign: "left",
  paddingBlock: "0.8125rem",
  paddingInline: "1.125rem",
  border: "none",
  borderBlockEnd: `1px solid ${vars.color.adminBorderLight}`,
  cursor: "pointer",
  background: vars.color.adminSurface,
  transition: "background 0.15s ease",
  selectors: {
    "&:hover": {
      background: vars.color.adminSurfaceSoft,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
    "&:last-child": {
      borderBlockEnd: "none",
    },
  },
});

export const schoolItemActive = style({
  background: vars.color.adminRowUnread,
});

export const checkSquare = style({
  inlineSize: "1.125rem",
  blockSize: "1.125rem",
  borderRadius: "0.3125rem",
  display: "grid",
  placeItems: "center",
  fontSize: "0.6875rem",
  border: `1px solid ${vars.color.adminBorder}`,
  background: vars.color.adminSurface,
  color: vars.color.adminPrimaryForeground,
  fontWeight: vars.font.weightBold,
});

export const checkSquareActive = style({
  background: vars.color.adminPrimary,
  borderColor: vars.color.adminPrimary,
});

export const schoolTextGroup = style({
  display: "grid",
  gap: "0.125rem",
  minInlineSize: 0,
});

export const schoolName = style({
  fontSize: "0.84375rem",
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminText,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const schoolDistrict = style({
  fontSize: "0.71875rem",
  color: vars.color.adminTextCaption,
});

export const schoolMeta = style({
  fontFamily: vars.font.mono,
  fontSize: "0.6875rem",
  color: vars.color.adminTextSubtle,
});

export const actionsArea = style({
  display: "flex",
  gap: "0.5rem",
  flexWrap: "wrap",
  padding: "1rem 1.125rem",
  borderBlockStart: `1px solid ${vars.color.adminBorder}`,
});

export const primaryActionBtn = style({
  paddingBlock: "0.625rem",
  paddingInline: "1rem",
  border: "none",
  borderRadius: "0.5rem",
  background: vars.color.adminPrimary,
  color: vars.color.adminPrimaryForeground,
  fontSize: "0.8125rem",
  fontWeight: vars.font.weightMedium,
  cursor: "pointer",
  inlineSize: "fit-content",
  transition: "background 0.18s ease",
  selectors: {
    "&:hover": {
      background: vars.color.adminPrimaryHover,
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

export const secondaryActionBtn = style({
  paddingBlock: "0.625rem",
  paddingInline: "1rem",
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.5rem",
  background: vars.color.adminSurface,
  color: vars.color.adminText,
  fontSize: "0.8125rem",
  cursor: "pointer",
  inlineSize: "fit-content",
  transition: "background 0.18s ease",
  selectors: {
    "&:hover": {
      background: vars.color.adminSurfaceSoft,
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

// Right Column: Live Sticky Preview
export const stickyPreviewWrap = style({
  background: vars.color.adminSurface,
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.75rem",
  overflow: "hidden",
  "@media": {
    [`(min-width: ${breakpoints.lg})`]: {
      position: "sticky",
      insetBlockStart: "4.5rem",
    },
  },
});

export const previewSurface = style({
  padding: "1.5rem",
  display: "grid",
  placeItems: "center",
  background: vars.color.adminSurfaceSoft,
});

export const emptyState = style({
  padding: "2rem",
  textAlign: "center",
  color: vars.color.adminTextCaption,
  fontSize: "0.875rem",
});
