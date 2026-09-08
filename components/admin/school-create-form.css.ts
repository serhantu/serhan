import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  padding: vars.space.xl,
  backgroundColor: vars.color.adminSurface,
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.adminBorder}`,
  boxShadow: vars.shadow.sm,
});

export const formHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBlockEnd: `1px solid ${vars.color.adminBorder}`,
  paddingBlockEnd: vars.space.md,
});

export const formTitle = style({
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightBold,
  color: vars.color.adminText,
  margin: 0,
});

export const formSubtitle = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.adminTextCaption,
  margin: 0,
  marginBlockStart: vars.space.xs,
});

export const closeButton = style({
  background: "none",
  border: "none",
  fontSize: "1.25rem",
  cursor: "pointer",
  color: vars.color.adminTextCaption,
  padding: vars.space.xs,
  borderRadius: vars.radius.sm,
  lineHeight: 1,
  selectors: {
    "&:hover": {
      color: vars.color.adminText,
      backgroundColor: vars.color.adminSurfaceSoft,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: vars.space.md,
  "@media": {
    [`screen and (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: "1fr 1fr",
    },
  },
});

export const fullWidth = style({
  gridColumn: "1 / -1",
});

export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const label = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminText,
});

export const requiredMark = style({
  color: vars.color.adminAlert,
});

export const input = style({
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeSm,
  color: vars.color.adminText,
  backgroundColor: vars.color.adminSurface,
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: vars.radius.md,
  paddingBlock: "0.625rem",
  paddingInline: vars.space.md,
  inlineSize: "100%",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  selectors: {
    "&:focus-visible": {
      outline: "none",
      borderColor: vars.color.adminPrimary,
      boxShadow: `0 0 0 1px ${vars.color.adminPrimary}`,
    },
    "&::placeholder": {
      color: vars.color.adminTextSubtle,
    },
  },
});

export const checkboxField = style({
  gridColumn: "1 / -1",
  display: "flex",
  alignItems: "center",
  paddingBlock: vars.space.xs,
});

export const checkboxLabel = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminText,
  cursor: "pointer",
});

export const checkbox = style({
  inlineSize: "1.125rem",
  blockSize: "1.125rem",
  accentColor: vars.color.adminPrimary,
  cursor: "pointer",
});

export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  paddingBlockStart: vars.space.sm,
  borderBlockStart: `1px solid ${vars.color.adminBorder}`,
});

export const submit = style({
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminPrimaryForeground,
  backgroundColor: vars.color.adminPrimary,
  border: `1px solid ${vars.color.adminPrimary}`,
  borderRadius: vars.radius.md,
  paddingBlock: "0.625rem",
  paddingInline: vars.space.xl,
  cursor: "pointer",
  inlineSize: "fit-content",
  transition: "background-color 0.15s ease",
  selectors: {
    "&:hover:not(:disabled)": {
      backgroundColor: vars.color.adminPrimaryHover,
    },
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const cancelButton = style({
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminTextMuted,
  backgroundColor: "transparent",
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: vars.radius.md,
  paddingBlock: "0.625rem",
  paddingInline: vars.space.lg,
  cursor: "pointer",
  inlineSize: "fit-content",
  transition: "all 0.15s ease",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.adminSurfaceSoft,
      color: vars.color.adminText,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const error = style({
  color: vars.color.adminAlert,
  fontSize: vars.font.sizeSm,
  margin: 0,
});

export const successCard = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  padding: vars.space.lg,
  backgroundColor: vars.color.adminSurfaceSoft,
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.adminBorder}`,
});

export const successMessage = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  fontSize: vars.font.sizeSm,
  color: vars.color.adminText,
});

export const successBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  inlineSize: "2rem",
  blockSize: "2rem",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.adminSuccessBg,
  color: vars.color.success,
  fontWeight: vars.font.weightBold,
});

export const successDesc = style({
  margin: 0,
  color: vars.color.adminTextCaption,
});
