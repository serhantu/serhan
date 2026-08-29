import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const main = style({
  maxWidth: "48rem",
  marginInline: "auto",
  padding: `${vars.space["2xl"]} ${vars.space.md}`,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
  color: vars.color.foreground,
  fontFamily: vars.font.sans,
});

export const title = style({
  fontSize: vars.font.size2xl,
  fontWeight: vars.font.weightBold,
});

export const description = style({
  fontSize: vars.font.sizeMd,
  color: vars.color.mutedForeground,
  lineHeight: vars.font.lineNormal,
});
