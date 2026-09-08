import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const button = style({
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminPrimaryForeground,
  backgroundColor: vars.color.adminPrimary,
  border: `1px solid ${vars.color.adminPrimary}`,
  borderRadius: vars.radius.sm,
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.sm,
  inlineSize: "100%",
  cursor: "pointer",
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
  "@media": {
    [`screen and (min-width: ${breakpoints.sm})`]: {
      inlineSize: "fit-content",
    },
  },
});

export const actions = style({
  display: "flex",
  gap: vars.space.xs,
  flexWrap: "wrap",
});

export const errorText = style({
  color: vars.color.adminAlert,
  fontSize: vars.font.sizeSm,
  marginBlockStart: vars.space.xs,
});
