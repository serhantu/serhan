import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  minBlockSize: "100dvh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.space.md,
  paddingBlock: "clamp(1.5rem, 4vw, 3rem)",
  paddingInline: "clamp(1rem, 3vw, 2rem)",
  textAlign: "center",
});

export const title = style({
  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
});

export const name = style({
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightMedium,
  color: vars.color.foreground,
});

export const note = style({
  fontSize: vars.font.sizeMd,
  color: vars.color.mutedForeground,
  maxInlineSize: "min(100%, 36rem)",
});

export const closed = style({
  fontSize: vars.font.sizeMd,
  color: vars.color.mutedForeground,
  maxInlineSize: "min(100%, 36rem)",
});

export const badge = style({
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  borderRadius: vars.radius.full,
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.md,
  inlineSize: "fit-content",
  selectors: {
    '&[data-state="open"]': {
      color: vars.color.success,
      backgroundColor: "hsl(140 50% 92%)",
      border: `1px solid hsl(140 50% 70%)`,
    },
    '&[data-state="closed"]': {
      color: vars.color.danger,
      backgroundColor: "hsl(0 70% 94%)",
      border: `1px solid hsl(0 70% 80%)`,
    },
  },
});
