import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const page = style({
  padding: vars.space.xl,
});

export const heading = style({
  fontSize: vars.font.sizeXl,
  fontWeight: vars.font.weightBold,
  marginBottom: vars.space.lg,
});

export const layout = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: vars.space.xl,
  "@media": {
    [`screen and (max-width: ${breakpoints.md})`]: {
      gridTemplateColumns: "1fr",
    },
  },
});


export const panel = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const sectionTitle = style({
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightMedium,
  borderBottom: `1px solid ${vars.color.border}`,
  paddingBottom: vars.space.sm,
});

export const fieldLabel = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.foreground,
  marginBottom: vars.space.xs,
  display: "block",
});

export const select = style({
  width: "100%",
  padding: `${vars.space.sm} ${vars.space.md}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeMd,
  fontFamily: vars.font.sans,
  selectors: {
    "&:focus": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "1px",
    },
  },
});

export const schoolList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  maxHeight: "20rem",
  overflowY: "auto",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  padding: vars.space.sm,
});

export const schoolItem = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  padding: `${vars.space.xs} ${vars.space.sm}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeSm,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      background: vars.color.muted,
    },
  },
});

export const schoolItemSelected = style({
  background: vars.color.accent,
  fontWeight: vars.font.weightMedium,
});

export const checkbox = style({
  accentColor: vars.color.primary,
});

export const templateOptions = style({
  display: "flex",
  gap: vars.space.sm,
  flexWrap: "wrap",
});

export const templateButton = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: vars.color.background,
  cursor: "pointer",
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  selectors: {
    "&:hover": {
      background: vars.color.muted,
    },
  },
});

export const templateButtonActive = style({
  background: vars.color.primary,
  color: vars.color.primaryForeground,
  borderColor: vars.color.primary,
});

export const batchActions = style({
  display: "flex",
  gap: vars.space.sm,
  marginTop: vars.space.md,
});

export const batchButton = style({
  padding: `${vars.space.sm} ${vars.space.lg}`,
  border: "none",
  borderRadius: vars.radius.sm,
  background: vars.color.primary,
  color: vars.color.primaryForeground,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  cursor: "pointer",
  selectors: {
    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
});

export const previewSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const selectAllWrap = style({
  marginBottom: vars.space.sm,
});

export const emptyState = style({
  color: vars.color.mutedForeground,
  fontSize: vars.font.sizeSm,
  textAlign: "center",
  padding: vars.space.xl,
});

