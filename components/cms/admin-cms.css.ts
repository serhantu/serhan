// Shared minimal styling for CMS admin screens (Phase 7).

import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const page = style({
  display: "block",
  color: vars.color.foreground,
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
  borderBottom: `1px solid ${vars.color.border}`,
  fontWeight: vars.font.weightMedium,
});

export const td = style({
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.sm,
});

export const rowSeparator = style({
  borderBottom: `1px solid ${vars.color.border}`,
});

export const errorBox = style({
  padding: vars.space.md,
  backgroundColor: vars.color.dangerBg,
  color: vars.color.danger,
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.danger}`,
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
  inlineSize: "fit-content",
});

export const input = style({
  display: "block",
  inlineSize: "100%",
  marginBlockStart: vars.space.xs,
  paddingBlock: vars.space.sm,
  paddingInline: vars.space.md,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  fontFamily: vars.font.sans,
  fontSize: vars.font.sizeMd,
  color: vars.color.foreground,
  backgroundColor: vars.color.background,
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
  backgroundColor: vars.color.dangerBg,
  color: vars.color.danger,
  border: `1px solid ${vars.color.danger}`,
  inlineSize: "fit-content",
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
  borderInlineEnd: `1px solid ${vars.color.border}`,
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
