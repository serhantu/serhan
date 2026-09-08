// Shared minimal styling for CMS admin screens (Phase 7).

import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  display: "block",
  color: vars.color.adminText,
  fontFamily: vars.font.sans,
});

export const headerRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBlockEnd: vars.space.md,
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const buttonGroup = style({
  display: "flex",
  gap: vars.space.sm,
  flexWrap: "wrap",
});

export const table = style({
  inlineSize: "100%",
  borderCollapse: "collapse",
});

export const th = style({
  textAlign: "left",
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.sm,
  borderBlockEnd: `1px solid ${vars.color.adminBorder}`,
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminTextCaption,
});

export const td = style({
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.sm,
  color: vars.color.adminText,
});

export const rowSeparator = style({
  borderBlockEnd: `1px solid ${vars.color.adminBorderLight}`,
});

export const errorBox = style({
  padding: vars.space.md,
  backgroundColor: vars.color.adminAlertSoft,
  color: vars.color.adminAlertText,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.adminAlertBorder}`,
  marginBlockEnd: vars.space.md,
});

export const statusText = style({
  marginBlockEnd: vars.space.md,
});

export const field = style({
  marginBlockEnd: vars.space.md,
});

export const label = style({
  display: "block",
  marginBlockEnd: vars.space.xs,
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminText,
  inlineSize: "fit-content",
});

export const input = style({
  display: "block",
  inlineSize: "100%",
  marginBlockStart: vars.space.xs,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeMd,
  color: vars.color.adminText,
  backgroundColor: vars.color.adminSurface,
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  selectors: {
    "&:focus-visible": {
      outline: "none",
      borderColor: vars.color.adminPrimary,
      boxShadow: `0 0 0 1px ${vars.color.adminPrimary}`,
    },
  },
});

export const textarea = style([
  input,
  {
    resize: "vertical",
  },
]);

export const textareaShort = style({
  minBlockSize: "4rem",
});

export const textareaMid = style({
  minBlockSize: "6rem",
});

export const textareaTall = style({
  minBlockSize: "12rem",
});

export const buttonRow = style({
  display: "flex",
  gap: vars.space.md,
  flexWrap: "wrap",
});

export const deleteButton = style({
  backgroundColor: vars.color.adminAlertSoft,
  color: vars.color.adminAlertText,
  border: `1px solid ${vars.color.adminAlertBorder}`,
  borderRadius: vars.radius.sm,
  paddingBlock: vars.space.xs,
  paddingInline: vars.space.md,
  cursor: "pointer",
  inlineSize: "fit-content",
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeSm,
  transition: "all 0.15s ease",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.adminDangerBg,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminAlert}`,
      outlineOffset: "2px",
    },
  },
});

export const loading = style({
  padding: vars.space.md,
});

export const layout = style({
  display: "flex",
  gap: vars.space.md,
});

export const nav = style({
  inlineSize: "min(100%, 13rem)",
  flexShrink: 0,
  borderInlineEnd: `1px solid ${vars.color.adminBorder}`,
});

export const navList = style({
  listStyle: "none",
  padding: vars.space.md,
  margin: 0,
});

export const navItem = style({
  marginBlockEnd: vars.space.sm,
});

export const content = style({
  flex: 1,
  padding: vars.space.md,
});
