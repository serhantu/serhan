import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  padding: vars.space.xl,
  backgroundColor: vars.color.background,
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.border}`,
  boxShadow: vars.shadow.sm,
});

export const formHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${vars.color.border}`,
  paddingBottom: vars.space.md,
});

export const formTitle = style({
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
  margin: 0,
});

export const formSubtitle = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
  margin: 0,
  marginTop: vars.space.xs,
});

export const closeButton = style({
  background: "none",
  border: "none",
  fontSize: "1.25rem",
  cursor: "pointer",
  color: vars.color.mutedForeground,
  padding: vars.space.xs,
  borderRadius: vars.radius.sm,
  lineHeight: 1,
  ":hover": {
    color: vars.color.foreground,
    backgroundColor: vars.color.muted,
  },
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: vars.space.md,
  "@media": {
    [`screen and (max-width: ${breakpoints.md})`]: {
      gridTemplateColumns: "1fr",
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
  color: vars.color.foreground,
});

export const input = style({
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeSm,
  color: vars.color.foreground,
  backgroundColor: vars.color.background,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  paddingBlock: "0.625rem",
  paddingInline: vars.space.md,
  inlineSize: "100%",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  ":focus-visible": {
    outline: "none",
    borderColor: vars.color.primary,
    boxShadow: `0 0 0 1px ${vars.color.primary}`,
  },
  "::placeholder": {
    color: vars.color.mutedForeground,
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
  color: vars.color.foreground,
  cursor: "pointer",
});

export const checkbox = style({
  inlineSize: "1.125rem",
  blockSize: "1.125rem",
  accentColor: vars.color.primary,
  cursor: "pointer",
});

export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  paddingTop: vars.space.sm,
  borderTop: `1px solid ${vars.color.border}`,
});

export const submit = style({
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.primaryForeground,
  backgroundColor: vars.color.primary,
  border: `1px solid ${vars.color.primary}`,
  borderRadius: vars.radius.md,
  paddingBlock: "0.625rem",
  paddingInline: vars.space.xl,
  cursor: "pointer",
  transition: "background-color 0.15s ease",
  selectors: {
    "&:hover:not(:disabled)": {
      backgroundColor: "hsl(215 25% 22%)",
    },
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },
});

export const cancelButton = style({
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.mutedForeground,
  backgroundColor: "transparent",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  paddingBlock: "0.625rem",
  paddingInline: vars.space.lg,
  cursor: "pointer",
  transition: "all 0.15s ease",
  ":hover": {
    backgroundColor: vars.color.muted,
    color: vars.color.foreground,
  },
});

export const error = style({
  color: vars.color.danger,
  fontSize: vars.font.sizeSm,
  margin: 0,
});

export const successCard = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  padding: vars.space.lg,
  backgroundColor: vars.color.muted,
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.border}`,
});

export const successMessage = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  fontSize: vars.font.sizeSm,
  color: vars.color.foreground,
});

export const successBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  inlineSize: "2rem",
  blockSize: "2rem",
  borderRadius: vars.radius.full,
  backgroundColor: "hsl(140 50% 92%)",
  color: vars.color.success,
  fontWeight: vars.font.weightBold,
});
