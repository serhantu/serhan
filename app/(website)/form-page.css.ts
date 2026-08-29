import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const main = style({
  maxInlineSize: "min(100%, 48rem)",
  marginInline: "auto",
  paddingBlock: "clamp(1.5rem, 4vw, 3rem)",
  paddingInline: "clamp(1rem, 3vw, 2rem)",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  color: vars.color.foreground,
  fontFamily: vars.font.sans,
});

export const title = style({
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  fontWeight: vars.font.weightBold,
});

export const description = style({
  fontSize: vars.font.sizeMd,
  color: vars.color.mutedForeground,
  lineHeight: vars.font.lineNormal,
  maxInlineSize: "min(100%, 42rem)",
});
