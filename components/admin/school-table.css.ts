import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const wrapper = style({
  inlineSize: "100%",
  overflowX: "auto",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.background,
  boxShadow: vars.shadow.sm,
});

export const table = style({
  inlineSize: "100%",
  minInlineSize: "68rem",
  borderCollapse: "collapse",
  fontSize: vars.font.sizeSm,
  textAlign: "left",
});

globalStyle(`${table} thead`, {
  backgroundColor: vars.color.muted,
});

globalStyle(`${table} th`, {
  paddingBlock: "0.875rem",
  paddingInline: vars.space.md,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightBold,
  color: vars.color.mutedForeground,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  borderBottom: `1px solid ${vars.color.border}`,
  whiteSpace: "nowrap",
});

globalStyle(`${table} td`, {
  paddingBlock: "1rem",
  paddingInline: vars.space.md,
  borderBottom: `1px solid ${vars.color.border}`,
  verticalAlign: "middle",
  color: vars.color.foreground,
});

globalStyle(`${table} tbody tr`, {
  transition: "background-color 0.15s ease",
});

globalStyle(`${table} tbody tr:hover`, {
  backgroundColor: "hsl(0 0% 98%)",
});

globalStyle(`${table} tbody tr:last-child td`, {
  borderBottom: "none",
});

export const nameCell = style({
  minInlineSize: "14rem",
});

export const schoolName = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
  display: "block",
  lineHeight: 1.35,
});

export const publicPageLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.25rem",
  fontSize: vars.font.sizeXs,
  color: vars.color.mutedForeground,
  textDecoration: "none",
  marginBlockStart: "0.25rem",
  transition: "color 0.15s ease",
  ":hover": {
    color: vars.color.primary,
    textDecoration: "underline",
  },
});

export const addressCell = style({
  minInlineSize: "16rem",
  maxInlineSize: "22rem",
});

export const districtBadge = style({
  display: "inline-flex",
  alignItems: "center",
  fontSize: "0.6875rem",
  fontWeight: vars.font.weightMedium,
  color: vars.color.primary,
  backgroundColor: vars.color.accent,
  paddingBlock: "0.125rem",
  paddingInline: "0.45rem",
  borderRadius: vars.radius.sm,
  marginBlockEnd: "0.3125rem",
});

export const addressText = style({
  display: "flex",
  alignItems: "flex-start",
  gap: "0.35rem",
  fontSize: "0.75rem",
  color: vars.color.mutedForeground,
  lineHeight: 1.4,
});

export const mapPinIcon = style({
  flexShrink: 0,
  inlineSize: "0.75rem",
  blockSize: "0.75rem",
  marginBlockStart: "0.15rem",
  color: vars.color.mutedForeground,
});

export const mapLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.25rem",
  fontSize: "0.6875rem",
  color: vars.color.primary,
  marginBlockStart: "0.3125rem",
  textDecoration: "underline",
  fontWeight: vars.font.weightMedium,
  ":hover": {
    opacity: 0.8,
  },
});

export const slugCell = style({
  minInlineSize: "11rem",
});

export const slug = style({
  fontFamily: vars.font.mono,
  fontSize: "0.75rem",
  color: vars.color.mutedForeground,
  backgroundColor: vars.color.muted,
  paddingBlock: "0.1875rem",
  paddingInline: "0.4375rem",
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.border}`,
  display: "inline-block",
  wordBreak: "break-all",
});

export const tcBadge = style({
  display: "inline-flex",
  alignItems: "center",
  paddingBlock: "0.1875rem",
  paddingInline: "0.5rem",
  borderRadius: vars.radius.full,
  fontSize: "0.6875rem",
  fontWeight: vars.font.weightMedium,
  whiteSpace: "nowrap",
});

export const tcRequired = style({
  backgroundColor: "hsl(35 92% 95%)",
  color: "hsl(35 92% 33%)",
  border: "1px solid hsl(35 92% 80%)",
});

export const tcOptional = style({
  backgroundColor: vars.color.muted,
  color: vars.color.mutedForeground,
});

export const countBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minInlineSize: "1.75rem",
  paddingBlock: "0.125rem",
  paddingInline: "0.375rem",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.muted,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
});

export const dateCell = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.mutedForeground,
  whiteSpace: "nowrap",
});

export const actionsCell = style({
  minInlineSize: "9rem",
  whiteSpace: "nowrap",
});

export const empty = style({
  padding: vars.space.xl,
  color: vars.color.mutedForeground,
  textAlign: "center",
  fontSize: vars.font.sizeSm,
});
