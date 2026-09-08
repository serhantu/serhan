import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const toggle = style({
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  borderRadius: vars.radius.full,
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.md,
  inlineSize: "fit-content",
  border: `1px solid ${vars.color.adminBorder}`,
  cursor: "pointer",
  color: vars.color.adminTextCaption,
  backgroundColor: vars.color.adminSurfaceSoft,
  transition: "all 0.15s ease",
  selectors: {
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
    "&[data-active='true']": {
      color: vars.color.success,
      backgroundColor: vars.color.adminSuccessBg,
      borderColor: vars.color.adminSuccessBorder,
    },
    "&[data-active='false']": {
      color: vars.color.adminAlertText,
      backgroundColor: vars.color.adminDangerBg,
      borderColor: vars.color.adminDangerBorder,
    },
  },
});
