import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  maxWidth: "72rem",
  marginInline: "auto",
  padding: `${vars.space["2xl"]} ${vars.space.lg}`,
  display: "flex",
  flexDirection: "column",
  gap: vars.space["3xl"],
});

export const hero = style({
  textAlign: "center",
  padding: `${vars.space["2xl"]} 0`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: vars.space.md,
});

export const heroTitle = style({
  fontSize: vars.font.size3xl,
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
  lineHeight: vars.font.lineTight,
});

export const heroSubtitle = style({
  fontSize: vars.font.sizeLg,
  color: vars.color.mutedForeground,
  maxWidth: "40rem",
  lineHeight: vars.font.lineNormal,
});

export const heroActions = style({
  display: "flex",
  gap: vars.space.md,
  marginTop: vars.space.md,
  flexWrap: "wrap",
  justifyContent: "center",
});

export const primaryBtn = style({
  padding: `${vars.space.sm} ${vars.space.xl}`,
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
  padding: `${vars.space.sm} ${vars.space.xl}`,
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
  paddingBottom: vars.space.sm,
});

export const sectionTitle = style({
  fontSize: vars.font.sizeXl,
  fontWeight: vars.font.weightBold,
});

export const sectionLink = style({
  color: vars.color.primary,
  textDecoration: "none",
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
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
  width: "100%",
  height: "10rem",
  objectFit: "cover",
  borderRadius: vars.radius.sm,
  marginBottom: vars.space.xs,
});

export const refLogo = style({
  width: "100%",
  height: "5rem",
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
  marginBottom: vars.space.xs,
});

export const faqAnswer = style({
  color: vars.color.mutedForeground,
  fontSize: vars.font.sizeSm,
  lineHeight: vars.font.lineNormal,
});
