import { style, globalStyle } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const wrapper = style({
  inlineSize: "100%",
  overflowX: "auto",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
});

export const table = style({
  inlineSize: "100%",
  borderCollapse: "collapse",
  fontSize: vars.font.sizeSm,
});

const MOBILE = `(max-width: ${breakpoints.md})`;


globalStyle(`${table} thead`, {
  "@media": { [MOBILE]: { display: "none" } },
});

globalStyle(`${table} tbody`, {
  "@media": { [MOBILE]: { display: "block" } },
});

globalStyle(`${table} tr`, {
  "@media": {
    [MOBILE]: {
      display: "block",
      borderBottom: `1px solid ${vars.color.border}`,
      padding: vars.space.sm,
    },
  },
});

globalStyle(`${table} td`, {
  "@media": {
    [MOBILE]: {
      display: "flex",
      justifyContent: "space-between",
      gap: vars.space.md,
      paddingBlock: vars.space.xs,
      paddingInline: 0,
      border: "none",
    },
  },
});

globalStyle(`${table} td::before`, {
  "@media": {
    [MOBILE]: {
      content: "attr(data-label)",
      fontWeight: vars.font.weightMedium,
      color: vars.color.mutedForeground,
    },
  },
});

export const nameCell = style({
  fontWeight: vars.font.weightMedium,
  color: vars.color.foreground,
});

export const slug = style({
  fontFamily: vars.font.mono,
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
});

export const empty = style({
  padding: vars.space.lg,
  color: vars.color.mutedForeground,
  textAlign: "center",
});
