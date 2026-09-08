import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const wrapper = style({
  inlineSize: "100%",
  overflowX: "auto",
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.75rem",
  backgroundColor: vars.color.adminSurface,
});

export const table = style({
  inlineSize: "100%",
  minInlineSize: "58rem",
  borderCollapse: "collapse",
  fontSize: "0.875rem",
  textAlign: "left",
});

globalStyle(`${table} thead`, {
  backgroundColor: vars.color.adminSurfaceSoft,
});

globalStyle(`${table} th`, {
  paddingBlock: "0.6875rem",
  paddingInline: "1.125rem",
  fontSize: "0.625rem",
  fontFamily: vars.font.mono,
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminTextCaption,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  borderBlockEnd: `1px solid ${vars.color.adminBorder}`,
  whiteSpace: "nowrap",
});

globalStyle(`${table} td`, {
  paddingBlock: "0.9375rem",
  paddingInline: "1.125rem",
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
  minInlineSize: "14rem",
});

export const schoolName = style({
  fontSize: "0.875rem",
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminText,
  display: "block",
  lineHeight: 1.35,
});

export const publicPageLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.25rem",
  fontSize: "0.71875rem",
  fontFamily: vars.font.mono,
  color: vars.color.adminTextCaption,
  textDecoration: "none",
  marginBlockStart: "0.25rem",
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
  minInlineSize: "13rem",
  maxInlineSize: "20rem",
});

export const districtBadge = style({
  display: "inline-block",
  fontSize: "0.75rem",
  fontWeight: vars.font.weightNormal,
  color: vars.color.adminTextMuted,
  backgroundColor: vars.color.adminSurfaceSoft,
  paddingBlock: "0.25rem",
  paddingInline: "0.625rem",
  borderRadius: vars.radius.full,
});

export const slugCell = style({
  fontFamily: vars.font.mono,
  fontSize: "0.71875rem",
  color: vars.color.adminTextCaption,
  maxInlineSize: "11rem",
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
  inlineSize: "0.875rem",
  blockSize: "0.875rem",
  color: vars.color.adminTextSubtle,
  flexShrink: 0,
});

export const mapLink = style({
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

export const slug = style({
  fontFamily: vars.font.mono,
  fontSize: "0.71875rem",
  color: vars.color.adminTextCaption,
});

export const addressText = style({
  fontSize: "0.75rem",
  color: vars.color.adminTextCaption,
  lineHeight: 1.4,
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
