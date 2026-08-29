import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  maxInlineSize: "min(100%, 64rem)",
  marginInline: "auto",
  paddingBlock: vars.space.xl,
  paddingInline: "clamp(1rem, 3vw, 2rem)",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const heading = style({
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
});

export const layout = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
  gap: vars.space.xl,
  alignItems: "start",
});

export const sectionTitle = style({
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightMedium,
  color: vars.color.foreground,
  marginBlockEnd: vars.space.md,
});
