import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const button = style({
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  color: vars.color.primaryForeground,
  backgroundColor: vars.color.primary,
  border: `1px solid ${vars.color.primary}`,
  borderRadius: vars.radius.sm,
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.sm,
  inlineSize: "fit-content",
  cursor: "pointer",
  ":disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  "@media": {
    [`screen and (max-width: ${breakpoints.sm})`]: {
      inlineSize: "100%",
    },
  },
});

export const actions = style({
  display: "flex",
  gap: vars.space.xs,
  flexWrap: "wrap",
});

export const errorText = style({
  color: vars.color.danger,
  fontSize: vars.font.sizeSm,
  marginBlockStart: vars.space.xs,
});
