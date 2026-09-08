import { style, globalStyle } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const wrapper = style({
  inlineSize: "100%",
  maxInlineSize: "100%",
  minInlineSize: 0,
  overflowX: "auto",
  WebkitOverflowScrolling: "touch",
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.75rem",
  backgroundColor: vars.color.adminSurface,
});

export const desktopWrapper = style({
  display: "none",
  inlineSize: "100%",
  maxInlineSize: "100%",
  minInlineSize: 0,
  overflowX: "hidden",
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.75rem",
  backgroundColor: vars.color.adminSurface,
  "@media": {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      display: "block",
    },
  },
});

export const mobileCardList = style({
  display: "grid",
  gap: "0.75rem",
  inlineSize: "100%",
  minInlineSize: 0,
  maxInlineSize: "100%",
  "@media": {
    [`screen and (min-width: ${breakpoints.lg})`]: {
      display: "none",
    },
  },
});

export const schoolCard = style({
  display: "grid",
  gap: "0.75rem",
  padding: "1rem",
  backgroundColor: vars.color.adminSurface,
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.75rem",
  boxShadow: vars.shadow.sm,
  minInlineSize: 0,
});

export const cardHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "0.75rem",
});

export const cardHeaderInfo = style({
  display: "grid",
  gap: "0.25rem",
  minInlineSize: 0,
});

export const cardSchoolName = style({
  fontSize: "0.9375rem",
  fontWeight: vars.font.weightBold,
  color: vars.color.adminText,
  lineHeight: 1.3,
  wordBreak: "break-word",
});

export const cardAddressBlock = style({
  display: "grid",
  gap: "0.375rem",
  paddingBlock: "0.5rem",
  borderBlock: `1px solid ${vars.color.adminBorderLight}`,
});

export const cardLocationRow = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  flexWrap: "wrap",
});

export const cardMetaGrid = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  flexWrap: "wrap",
});

export const countPillBadge = style({
  fontFamily: vars.font.mono,
  fontSize: "0.75rem",
  paddingBlock: "0.1875rem",
  paddingInline: "0.5rem",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.adminSurfaceSoft,
  color: vars.color.adminText,
  border: `1px solid ${vars.color.adminBorder}`,
});

export const slugBadge = style({
  fontFamily: vars.font.mono,
  fontSize: "0.71875rem",
  paddingBlock: "0.1875rem",
  paddingInline: "0.4375rem",
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.adminSurfaceSoft,
  color: vars.color.adminTextCaption,
  border: `1px solid ${vars.color.adminBorder}`,
  maxWidth: "14rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const dateText = style({
  fontFamily: vars.font.mono,
  fontSize: "0.71875rem",
  color: vars.color.adminTextCaption,
  marginInlineStart: "auto",
});

export const cardFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
  flexWrap: "wrap",
  paddingBlockStart: "0.25rem",
});

export const cardQrLabel = style({
  fontFamily: vars.font.mono,
  fontSize: "0.6875rem",
  color: vars.color.adminTextCaption,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
});

export const table = style({
  inlineSize: "100%",
  borderCollapse: "collapse",
  fontSize: "0.8125rem",
  textAlign: "left",
  tableLayout: "auto",
});

globalStyle(`${table} thead`, {
  backgroundColor: vars.color.adminSurfaceSoft,
});

globalStyle(`${table} th`, {
  paddingBlock: "0.625rem",
  paddingInline: "0.5rem",
  fontSize: "0.625rem",
  fontFamily: vars.font.mono,
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminTextCaption,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  borderBlockEnd: `1px solid ${vars.color.adminBorder}`,
  whiteSpace: "nowrap",
});

globalStyle(`${table} td`, {
  paddingBlock: "0.625rem",
  paddingInline: "0.5rem",
  borderBlockEnd: `1px solid ${vars.color.adminBorderLight}`,
  verticalAlign: "middle",
  color: vars.color.adminText,
});

globalStyle(`${table} tbody tr`, {
  transition: "background 0.15s ease",
});

globalStyle(`${table} tbody tr:hover`, {
  backgroundColor: vars.color.adminRowHover,
});

globalStyle(`${table} tbody tr:last-child td`, {
  borderBlockEnd: "none",
});

export const nameCell = style({
  maxInlineSize: "13rem",
});

export const schoolName = style({
  fontSize: "0.84375rem",
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminText,
  display: "block",
  lineHeight: 1.3,
});

export const publicPageLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.25rem",
  fontSize: "0.6875rem",
  fontFamily: vars.font.mono,
  color: vars.color.adminTextCaption,
  textDecoration: "none",
  marginBlockStart: "0.1875rem",
  inlineSize: "fit-content",
  transition: "color 0.15s ease",
  selectors: {
    "&:hover": {
      color: vars.color.adminPrimary,
      textDecoration: "underline",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const addressCell = style({
  maxInlineSize: "16rem",
});

export const addressHeaderRow = style({
  display: "flex",
  alignItems: "center",
  gap: "0.375rem",
  flexWrap: "wrap",
  marginBlockEnd: "0.25rem",
});

export const districtBadge = style({
  display: "inline-block",
  fontSize: "0.6875rem",
  fontWeight: vars.font.weightNormal,
  color: vars.color.adminTextMuted,
  backgroundColor: vars.color.adminSurfaceSoft,
  paddingBlock: "0.125rem",
  paddingInline: "0.5rem",
  borderRadius: vars.radius.full,
});

export const slugCell = style({
  fontFamily: vars.font.mono,
  fontSize: "0.6875rem",
  color: vars.color.adminTextCaption,
  maxInlineSize: "8rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const countCell = style({
  fontFamily: vars.font.mono,
  fontSize: "0.8125rem",
  color: vars.color.adminText,
});

export const countBadge = style({
  fontFamily: vars.font.mono,
  fontSize: "0.8125rem",
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminText,
});

export const dateCell = style({
  fontFamily: vars.font.mono,
  fontSize: "0.71875rem",
  color: vars.color.adminTextCaption,
  whiteSpace: "nowrap",
});

export const centerCell = style({
  textAlign: "center",
});

export const empty = style({
  padding: "2rem",
  textAlign: "center",
  color: vars.color.adminTextCaption,
  fontSize: "0.875rem",
});

export const mapPinIcon = style({
  inlineSize: "0.8125rem",
  blockSize: "0.8125rem",
  color: vars.color.adminTextSubtle,
  flexShrink: 0,
  marginBlockStart: "0.125rem",
});

export const mapLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.1875rem",
  fontSize: "0.6875rem",
  color: vars.color.adminPrimary,
  textDecoration: "none",
  inlineSize: "fit-content",
  selectors: {
    "&:hover": {
      color: vars.color.adminPrimaryHover,
      textDecoration: "underline",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const slug = style({
  fontFamily: vars.font.mono,
  fontSize: "0.6875rem",
  color: vars.color.adminTextCaption,
});

export const addressText = style({
  display: "flex",
  alignItems: "flex-start",
  gap: "0.3125rem",
  fontSize: "0.71875rem",
  color: vars.color.adminTextCaption,
  lineHeight: 1.35,
});

export const mapsLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.25rem",
  fontSize: "0.6875rem",
  color: vars.color.adminPrimary,
  textDecoration: "none",
  marginBlockStart: "0.1875rem",
  inlineSize: "fit-content",
  selectors: {
    "&:hover": {
      color: vars.color.adminPrimaryHover,
      textDecoration: "underline",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const tcBadge = style({
  fontSize: "0.6875rem",
  fontWeight: vars.font.weightMedium,
  paddingBlock: "0.1875rem",
  paddingInline: "0.4375rem",
  borderRadius: "0.25rem",
  display: "inline-block",
});

export const tcRequired = style({
  backgroundColor: vars.color.adminPrimarySoft,
  color: vars.color.adminPrimary,
});

export const tcOptional = style({
  backgroundColor: vars.color.adminSurfaceSoft,
  color: vars.color.adminTextCaption,
});

export const statusBadge = style({
  fontSize: "0.6875rem",
  fontWeight: vars.font.weightMedium,
  paddingBlock: "0.1875rem",
  paddingInline: "0.4375rem",
  borderRadius: "0.25rem",
  display: "inline-block",
});

export const statusActive = style({
  backgroundColor: vars.color.adminPrimarySoft,
  color: vars.color.adminPrimary,
});

export const statusPassive = style({
  backgroundColor: vars.color.adminAlertSoft,
  color: vars.color.adminAlertText,
});

export const actionsCell = style({
  whiteSpace: "nowrap",
});

export const actionButtons = style({
  display: "flex",
  alignItems: "center",
  gap: "0.375rem",
  flexWrap: "wrap",
});

export const qrActionButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.25rem",
  paddingBlock: "0.375rem",
  paddingInline: "0.6875rem",
  fontSize: "0.71875rem",
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminText,
  backgroundColor: vars.color.adminSurface,
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.375rem",
  cursor: "pointer",
  textDecoration: "none",
  inlineSize: "fit-content",
  transition: "all 0.15s ease",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.adminSurfaceSoft,
      borderColor: vars.color.adminTextSubtle,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});
