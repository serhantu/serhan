import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  display: "grid",
  gap: vars.space.lg,
  color: vars.color.adminText,
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const kicker = style({
  color: vars.color.adminTextCaption,
  fontSize: vars.font.sizeSm,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export const title = style({
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  fontWeight: vars.font.weightBold,
  color: vars.color.adminText,
});

export const backLink = style({
  color: vars.color.adminPrimary,
  textDecoration: "none",
  fontWeight: vars.font.weightMedium,
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

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))",
  gap: vars.space.lg,
});

export const card = style({
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: vars.radius.md,
  background: vars.color.adminSurface,
  padding: vars.space.lg,
});

export const sectionTitle = style({
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightBold,
  color: vars.color.adminText,
  marginBlockEnd: vars.space.md,
});

export const list = style({
  display: "grid",
  gap: vars.space.sm,
});

export const listRow = style({
  display: "grid",
  gap: vars.space.xs,
});

export const listLabel = style({
  color: vars.color.adminTextCaption,
  fontSize: vars.font.sizeSm,
});

export const listValue = style({
  margin: 0,
  color: vars.color.adminText,
});

export const select = style({
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: vars.radius.md,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  fontFamily: vars.font.sans,
  marginInlineEnd: vars.space.md,
  background: vars.color.adminSurface,
  color: vars.color.adminText,
  selectors: {
    "&:focus-visible": {
      borderColor: vars.color.adminPrimary,
      outline: `2px solid ${vars.color.adminPrimary}`,
    },
  },
});

export const button = style({
  border: "none",
  borderRadius: vars.radius.md,
  background: vars.color.adminPrimary,
  color: vars.color.adminPrimaryForeground,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  fontWeight: vars.font.weightMedium,
  cursor: "pointer",
  inlineSize: "fit-content",
  transition: "background 0.15s ease",
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

export const detailGrid = style({
  display: "grid",
  gap: vars.space.md,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))",
});

export const inlineLink = style({
  marginBlockStart: vars.space.md,
  display: "inline-block",
  inlineSize: "fit-content",
  color: vars.color.adminPrimary,
  textDecoration: "none",
  fontWeight: vars.font.weightMedium,
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

export const phoneActions = style({
  display: "inline-flex",
  marginInlineStart: vars.space.sm,
  gap: vars.space.xs,
  fontSize: vars.font.sizeXs,
});

export const phoneCallLink = style({
  color: vars.color.linkBlue,
  textDecoration: "none",
  fontWeight: vars.font.weightMedium,
  inlineSize: "fit-content",
  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export const phoneWaLink = style({
  color: vars.color.success,
  textDecoration: "none",
  fontWeight: vars.font.weightMedium,
  inlineSize: "fit-content",
  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export const listValueAddress = style({
  margin: 0,
  color: vars.color.adminText,
  whiteSpace: "pre-wrap",
});

export const statusRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const statusButton = style({
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeXs,
  fontWeight: vars.font.weightMedium,
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.sm,
  borderRadius: vars.radius.sm,
  cursor: "pointer",
  inlineSize: "fit-content",
  border: "1px solid transparent",
  transition: "background 0.15s ease, color 0.15s ease",
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const statusButtonRead = style([
  statusButton,
  {
    backgroundColor: vars.color.adminSurfaceSoft,
    borderColor: vars.color.adminBorder,
    color: vars.color.adminTextMuted,
    selectors: {
      "&:hover": {
        backgroundColor: vars.color.adminBorderLight,
        color: vars.color.adminText,
      },
    },
  },
]);

export const statusButtonUnread = style([
  statusButton,
  {
    backgroundColor: vars.color.adminPrimarySoft,
    borderColor: vars.color.adminFilterLine,
    color: vars.color.adminPrimary,
    selectors: {
      "&:hover": {
        backgroundColor: vars.color.adminPrimary,
        color: vars.color.adminPrimaryForeground,
      },
    },
  },
]);
