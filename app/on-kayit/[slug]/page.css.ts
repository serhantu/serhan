import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const pageWrapper = style({
  minBlockSize: "100dvh",
  backgroundColor: vars.color.sandBg,
  color: vars.color.sandInk,
  fontFamily: vars.font.sans,
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBlock: "1rem",
  paddingInline: "1.25rem",
  borderBlockEnd: `1px solid ${vars.color.sandLine}`,
  position: "sticky",
  insetBlockStart: 0,
  backgroundColor: vars.color.sandBgTranslucent,
  backdropFilter: "blur(0.875rem)",
  zIndex: vars.zIndex.dropdown,
});

export const logoLink = style({
  display: "flex",
  alignItems: "center",
  gap: "0.625rem",
  textDecoration: "none",
  color: "inherit",
  inlineSize: "fit-content",
  ":hover": {
    opacity: 0.8,
  },
});

export const logoImg = style({
  blockSize: "1.6rem",
  inlineSize: "auto",
  filter: "none",
});

export const headerBadge = style({
  fontSize: "0.6875rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontWeight: vars.font.weightMedium,
  color: vars.color.sandInkSubtle,
  inlineSize: "fit-content",
});

export const main = style({
  inlineSize: "100%",
  maxInlineSize: "36rem",
  marginInline: "auto",
  paddingBlock: "1.5rem 2.5rem",
  paddingInline: "1.25rem",
  display: "flex",
  flexDirection: "column",
});

export const closedCard = style({
  display: "grid",
  gap: "1.25rem",
  textAlign: "center",
  paddingBlock: "3rem",
  paddingInline: "1.5rem",
  backgroundColor: vars.color.sandSurface,
  borderRadius: "1rem",
  border: `1px solid ${vars.color.sandLine}`,
  marginBlockStart: "2rem",
});

export const closedTitle = style({
  fontSize: "1.5rem",
  fontWeight: vars.font.weightBold,
  margin: 0,
  color: vars.color.sandInk,
});

export const closedText = style({
  fontSize: "0.9375rem",
  lineHeight: vars.font.lineNormal,
  color: vars.color.sandInkMuted,
  margin: 0,
});

export const footer = style({
  paddingBlock: "1.25rem",
  paddingInline: "1.25rem",
  borderBlockStart: `1px solid ${vars.color.sandLine}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  flexWrap: "wrap",
  backgroundColor: vars.color.sandBgFooter,
});

export const footerText = style({
  fontSize: "0.75rem",
  color: vars.color.sandInkSubtle,
});

export const footerActions = style({
  display: "flex",
  gap: "0.625rem",
  alignItems: "center",
});

export const footerCallLink = style({
  fontSize: "0.8125rem",
  fontWeight: vars.font.weightMedium,
  paddingBlock: "0.625rem",
  paddingInline: "1.125rem",
  borderRadius: vars.radius.full,
  border: `1px solid ${vars.color.sandLineStrong}`,
  color: vars.color.sandInk,
  textDecoration: "none",
  backgroundColor: "transparent",
  inlineSize: "fit-content",
  transition: "all 0.2s ease",
  ":hover": {
    borderColor: vars.color.sandLineFocus,
    backgroundColor: vars.color.sandInkJadeHover,
  },
});

export const footerWaLink = style({
  fontSize: "0.8125rem",
  fontWeight: vars.font.weightBold,
  paddingBlock: "0.625rem",
  paddingInline: "1.125rem",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.whatsapp,
  color: vars.color.whatsappInk,
  textDecoration: "none",
  inlineSize: "fit-content",
  transition: "opacity 0.2s ease",
  ":hover": {
    opacity: 0.9,
  },
});
