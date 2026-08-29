import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const page = style({
  padding: vars.space.xl,
  maxWidth: "48rem",
});

export const heading = style({
  fontSize: vars.font.sizeXl,
  fontWeight: vars.font.weightBold,
  marginBottom: vars.space.lg,
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const fieldGroup = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: vars.space.md,
  "@media": {
    [`screen and (max-width: ${breakpoints.sm})`]: {
      gridTemplateColumns: "1fr",
    },
  },
});


export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const fieldFull = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
  gridColumn: "1 / -1",
});

export const label = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.foreground,
});

export const input = style({
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

export const textarea = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeMd,
  fontFamily: vars.font.sans,
  minHeight: "5rem",
  resize: "vertical",
  selectors: {
    "&:focus": {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: "1px",
    },
  },
});

export const sectionTitle = style({
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightMedium,
  borderBottom: `1px solid ${vars.color.border}`,
  paddingBottom: vars.space.sm,
  marginTop: vars.space.lg,
});

export const actions = style({
  display: "flex",
  gap: vars.space.sm,
  marginTop: vars.space.md,
});

export const submitButton = style({
  padding: `${vars.space.sm} ${vars.space.xl}`,
  border: "none",
  borderRadius: vars.radius.sm,
  background: vars.color.primary,
  color: vars.color.primaryForeground,
  fontSize: vars.font.sizeMd,
  fontWeight: vars.font.weightMedium,
  cursor: "pointer",
  selectors: {
    "&:disabled": {
      opacity: "0.5",
      cursor: "not-allowed",
    },
  },
});

export const successMessage = style({
  padding: vars.space.md,
  background: "hsl(140 50% 95%)",
  color: vars.color.success,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeSm,
});

export const errorMessage = style({
  padding: vars.space.md,
  background: vars.color.dangerBg,
  color: vars.color.danger,
  borderRadius: vars.radius.sm,
  fontSize: vars.font.sizeSm,
});
