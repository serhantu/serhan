import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  minBlockSize: "100dvh",
  background: vars.color.background,
  color: vars.color.foreground,
});

export const nav = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.md,
  borderBottom: `1px solid ${vars.color.border}`,
  paddingBlock: vars.space.md,
  paddingInline: "clamp(1rem, 3vw, 2rem)",
  background: vars.color.muted,
  position: "sticky",
  insetBlockStart: 0,
  zIndex: vars.zIndex.sticky,
});

export const links = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const link = style({
  color: vars.color.foreground,
  textDecoration: "none",
  fontWeight: vars.font.weightMedium,
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.sm,
  borderRadius: vars.radius.sm,
  inlineSize: "fit-content",
  selectors: {
    "&:hover": { background: vars.color.accent },
    "&:focus-visible": { outline: `2px solid ${vars.color.primary}`, outlineOffset: "2px" },
  },
});

export const activeLink = style({
  background: vars.color.accent,
});

export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
});
