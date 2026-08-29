// Shared minimal styling for public CMS pages (Phase 7).

import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const main = style({
  display: "block",
  maxInlineSize: "min(100%, 60rem)",
  marginInline: "auto",
  paddingBlock: "clamp(1.5rem, 4vw, 3rem)",
  paddingInline: "clamp(1rem, 3vw, 2rem)",
  color: vars.color.foreground,
  fontFamily: vars.font.sans,
});

export const backLink = style({
  display: "inline-block",
  marginBlockEnd: vars.space.md,
  color: vars.color.primary,
  inlineSize: "fit-content",
});

export const metaText = style({
  color: vars.color.mutedForeground,
  fontSize: vars.font.sizeSm,
  marginBlockEnd: vars.space.md,
});

export const coverImage = style({
  display: "block",
  maxInlineSize: "100%",
  blockSize: "auto",
  marginBlockEnd: vars.space.lg,
  borderRadius: vars.radius.md,
});

export const excerpt = style({
  fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
  fontStyle: "italic",
  marginBlockEnd: vars.space.md,
});

export const article = style({
  marginBlockEnd: vars.space.lg,
  lineHeight: vars.font.lineNormal,
});

export const listBlock = style({
  marginBlockStart: vars.space.lg,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 15rem), 1fr))",
  gap: vars.space.lg,
  marginBlockStart: vars.space.lg,
});

export const refCard = style({
  textAlign: "center",
});

export const refLogo = style({
  display: "block",
  maxInlineSize: "100%",
  blockSize: "clamp(4rem, 10vw, 7.5rem)",
  objectFit: "contain",
  marginInline: "auto",
  marginBlockEnd: vars.space.md,
});

export const refLink = style({
  color: vars.color.primary,
  inlineSize: "fit-content",
});

export const faqItem = style({
  marginBlockEnd: vars.space.lg,
  paddingBlockEnd: vars.space.md,
  borderBottom: `1px solid ${vars.color.border}`,
});

export const blogItem = style({
  marginBlockEnd: vars.space.lg,
  paddingBlockEnd: vars.space.lg,
  borderBottom: `1px solid ${vars.color.border}`,
});

export const headline = style({
  fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
  fontWeight: vars.font.weightBold,
  marginBlockEnd: vars.space.sm,
});
