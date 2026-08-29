import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  maxInlineSize: "min(100%, 72rem)",
  marginInline: "auto",
  paddingBlock: "clamp(1.5rem, 4vw, 3rem)",
  paddingInline: "clamp(1rem, 3vw, 2rem)",
  display: "flex",
  flexDirection: "column",
  gap: "clamp(2rem, 5vw, 4rem)",
});

export const hero = style({
  textAlign: "center",
  paddingBlock: "clamp(1.5rem, 5vw, 3.5rem)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.md,
});

export const heroTitle = style({
  fontSize: "clamp(1.85rem, 4.5vw, 2.75rem)",
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
  lineHeight: vars.font.lineTight,
});

export const heroSubtitle = style({
  fontSize: "clamp(1rem, 2vw, 1.25rem)",
  color: vars.color.mutedForeground,
  maxInlineSize: "min(100%, 40rem)",
  lineHeight: vars.font.lineNormal,
});

export const heroActions = style({
  display: "flex",
  gap: vars.space.md,
  marginBlockStart: vars.space.md,
  flexWrap: "wrap",
  justifyContent: "center",
});

export const primaryBtn = style({
  inlineSize: "fit-content",
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.xl,
  background: vars.color.primary,
  color: vars.color.primaryForeground,
  textDecoration: "none",
  borderRadius: vars.radius.sm,
  fontWeight: vars.font.weightMedium,
  fontSize: vars.font.sizeMd,
  selectors: {
    "&:hover": { opacity: 0.9 },
  },
});

export const secondaryBtn = style({
  inlineSize: "fit-content",
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.xl,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.background,
  color: vars.color.foreground,
  textDecoration: "none",
  borderRadius: vars.radius.sm,
  fontWeight: vars.font.weightMedium,
  fontSize: vars.font.sizeMd,
  selectors: {
    "&:hover": { background: vars.color.muted },
  },
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.lg,
});

export const sectionHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  borderBottom: `1px solid ${vars.color.border}`,
  paddingBlockEnd: vars.space.sm,
});

export const sectionTitle = style({
  fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
  fontWeight: vars.font.weightBold,
});

export const sectionLink = style({
  color: vars.color.primary,
  textDecoration: "none",
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  inlineSize: "fit-content",
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
  gap: vars.space.lg,
});

export const card = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: vars.space.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  textDecoration: "none",
  color: vars.color.foreground,
  transition: "border-color 0.15s, box-shadow 0.15s",
  selectors: {
    "&:hover": {
      borderColor: vars.color.primary,
      boxShadow: vars.shadow.sm,
    },
  },
});

export const cardTitle = style({
  fontSize: vars.font.sizeLg,
  fontWeight: vars.font.weightBold,
});

export const cardDescription = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
  lineHeight: vars.font.lineNormal,
});

export const cardImage = style({
  inlineSize: "100%",
  blockSize: "clamp(8rem, 18vw, 11rem)",
  objectFit: "cover",
  borderRadius: vars.radius.sm,
  marginBlockEnd: vars.space.xs,
});

export const refLogo = style({
  inlineSize: "100%",
  blockSize: "clamp(3.5rem, 8vw, 5rem)",
  objectFit: "contain",
});

export const faqList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});

export const faqItem = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  padding: vars.space.md,
});

export const faqQuestion = style({
  fontWeight: vars.font.weightBold,
  marginBlockEnd: vars.space.xs,
});

export const faqAnswer = style({
  color: vars.color.mutedForeground,
  fontSize: vars.font.sizeSm,
  lineHeight: vars.font.lineNormal,
});
