import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  maxInlineSize: "min(100%, 80rem)",
  marginInline: "auto",
  paddingBlock: vars.space.xl,
  paddingInline: "clamp(1rem, 3vw, 2rem)",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xl,
});

export const title = style({
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  fontWeight: vars.font.weightBold,
  color: vars.color.foreground,
});

export const topBar = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const tabs = style({
  display: "flex",
  gap: vars.space.xs,
  flexWrap: "wrap",
  borderBottom: `1px solid ${vars.color.border}`,
  paddingBottom: vars.space.sm,
});

export const tab = style({
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.md,
  borderRadius: vars.radius.full,
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  textDecoration: "none",
  color: vars.color.mutedForeground,
  backgroundColor: "transparent",
  border: `1px solid transparent`,
  transition: "all 0.2s ease",
  ":hover": {
    color: vars.color.foreground,
    backgroundColor: vars.color.muted,
  },
});

export const tabActive = style({
  color: vars.color.primaryForeground,
  backgroundColor: vars.color.primary,
  borderColor: vars.color.primary,
  ":hover": {
    color: vars.color.primaryForeground,
    backgroundColor: vars.color.primary,
  },
});

export const form = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.sm,
  alignItems: "center",
});

export const input = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  minInlineSize: "min(100%, 12rem)",
  fontFamily: vars.font.sans,
});

export const select = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  fontFamily: vars.font.sans,
});

export const button = style({
  border: `1px solid ${vars.color.border}`,
  background: vars.color.primary,
  color: vars.color.primaryForeground,
  borderRadius: vars.radius.md,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  fontWeight: vars.font.weightMedium,
  inlineSize: "fit-content",
  cursor: "pointer",
});

export const tableWrap = style({
  inlineSize: "100%",
  overflowX: "auto",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
});

export const table = style({
  inlineSize: "100%",
  borderCollapse: "collapse",
  background: vars.color.background,
});

export const th = style({
  textAlign: "left",
  paddingBlock: vars.space.md,
  paddingInline: vars.space.md,
  borderBottom: `1px solid ${vars.color.border}`,
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
  background: vars.color.muted,
});

export const thStatus = style({
  inlineSize: "2.5rem",
  textAlign: "center",
  paddingBlock: vars.space.md,
  paddingInline: vars.space.xs,
  borderBottom: `1px solid ${vars.color.border}`,
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
  background: vars.color.muted,
});

export const tr = style({
  transition: "background-color 0.15s ease",
  ":hover": {
    backgroundColor: "hsl(210 20% 98%)",
  },
});

export const trUnread = style({
  backgroundColor: "hsl(142 60% 98% / 0.8)",
  transition: "background-color 0.15s ease",
  ":hover": {
    backgroundColor: "hsl(142 55% 95%)",
  },
});

export const td = style({
  paddingBlock: vars.space.md,
  paddingInline: vars.space.md,
  borderBottom: `1px solid ${vars.color.border}`,
  verticalAlign: "middle",
});

export const tdStatus = style({
  inlineSize: "2.5rem",
  textAlign: "center",
  paddingBlock: vars.space.md,
  paddingInline: vars.space.xs,
  borderBottom: `1px solid ${vars.color.border}`,
  verticalAlign: "middle",
});

export const dotWrap = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  inlineSize: "1.25rem",
  blockSize: "1.25rem",
});

export const statusDotUnread = style({
  display: "inline-block",
  inlineSize: "0.625rem",
  blockSize: "0.625rem",
  borderRadius: vars.radius.full,
  backgroundColor: "hsl(142 71% 45%)",
  boxShadow: "0 0 0 3px hsl(142 71% 45% / 0.25)",
});

export const statusDotRead = style({
  display: "inline-block",
  inlineSize: "0.5rem",
  blockSize: "0.5rem",
  borderRadius: vars.radius.full,
  border: "1.5px solid hsl(215 16% 75%)",
  backgroundColor: "transparent",
});

export const link = style({
  color: vars.color.primary,
  textDecoration: "none",
  fontWeight: vars.font.weightMedium,
  inlineSize: "fit-content",
  ":hover": {
    textDecoration: "underline",
  },
});

export const linkUnread = style({
  color: vars.color.foreground,
  textDecoration: "none",
  fontWeight: vars.font.weightBold,
  fontSize: vars.font.sizeMd,
  display: "inline-block",
  ":hover": {
    color: vars.color.primary,
    textDecoration: "underline",
  },
});

export const linkRead = style({
  color: "hsl(215 20% 35%)",
  textDecoration: "none",
  fontWeight: vars.font.weightNormal,
  fontSize: vars.font.sizeMd,
  display: "inline-block",
  ":hover": {
    color: vars.color.primary,
    textDecoration: "underline",
  },
});

export const typeBadge = style({
  display: "inline-block",
  fontSize: "0.75rem",
  fontWeight: vars.font.weightMedium,
  paddingBlock: "0.2rem",
  paddingInline: "0.5rem",
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.muted,
  color: vars.color.foreground,
  letterSpacing: "0.02em",
});

export const statusBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.35rem",
  fontSize: "0.75rem",
  fontWeight: vars.font.weightBold,
  paddingBlock: "0.25rem",
  paddingInline: "0.6rem",
  borderRadius: vars.radius.full,
  whiteSpace: "nowrap",
});

export const statusBadgeYeniUnread = style({
  backgroundColor: "hsl(142 76% 90%)",
  color: "hsl(142 76% 22%)",
  border: "1px solid hsl(142 71% 75%)",
});

export const statusBadgeYeniRead = style({
  backgroundColor: "hsl(215 20% 93%)",
  color: "hsl(215 20% 35%)",
  border: "1px solid hsl(215 16% 85%)",
});

export const statusBadgeInceleniyor = style({
  backgroundColor: "hsl(217 91% 94%)",
  color: "hsl(217 91% 35%)",
  border: "1px solid hsl(217 91% 85%)",
});

export const statusBadgeIletisimeGecildi = style({
  backgroundColor: "hsl(43 96% 90%)",
  color: "hsl(38 92% 28%)",
  border: "1px solid hsl(43 96% 80%)",
});

export const statusBadgeTamamlandi = style({
  backgroundColor: "hsl(215 16% 92%)",
  color: "hsl(215 16% 40%)",
  border: "1px solid hsl(215 16% 85%)",
});

export const countBadge = style({
  display: "inline-flex",
  alignItems: "center",
  fontSize: "0.8rem",
  fontWeight: vars.font.weightBold,
  color: "hsl(142 76% 22%)",
  backgroundColor: "hsl(142 76% 92%)",
  border: "1px solid hsl(142 71% 75%)",
  borderRadius: vars.radius.full,
  paddingBlock: "0.15rem",
  paddingInline: "0.6rem",
});

export const meta = style({
  color: vars.color.mutedForeground,
  fontSize: vars.font.sizeSm,
  whiteSpace: "nowrap",
});

export const pagination = style({
  display: "flex",
  gap: vars.space.sm,
  flexWrap: "wrap",
  alignItems: "center",
});

export const pageLink = style({
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.sm,
  textDecoration: "none",
  color: vars.color.foreground,
  inlineSize: "fit-content",
  ":hover": {
    backgroundColor: vars.color.muted,
  },
});
