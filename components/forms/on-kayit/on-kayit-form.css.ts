import { style, globalStyle } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const formWrap = style({
  inlineSize: "100%",
  display: "flex",
  flexDirection: "column",
});

export const stepsBar = style({
  display: "flex",
  gap: "0.375rem",
  marginBlockEnd: "1.5rem",
});

export const stepBarItem = style({
  flex: 1,
  blockSize: "0.1875rem",
  borderRadius: "0.1875rem",
  backgroundColor: vars.color.sandLineSubtle,
  transition: "background-color 0.3s ease",
});

export const stepBarActive = style({
  backgroundColor: vars.color.sandAccent,
});

export const schoolBadge = style({
  paddingBlock: "1rem",
  paddingInline: "1.125rem",
  borderRadius: "0.875rem",
  backgroundColor: vars.color.sandAccentSoft,
  border: `1px solid ${vars.color.sandLineSubtle}`,
  display: "grid",
  gap: "0.3125rem",
  marginBlockEnd: "1.625rem",
});

export const schoolBadgeKicker = style({
  fontSize: "0.625rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontWeight: vars.font.weightMedium,
  color: vars.color.sandInkSubtle,
});

export const schoolBadgeName = style({
  fontSize: "1.125rem",
  fontWeight: vars.font.weightBold,
  color: vars.color.sandInk,
  margin: 0,
});

export const schoolBadgeDistrict = style({
  fontSize: "0.75rem",
  color: vars.color.sandInkSubtle,
});

export const schoolBadgeAddress = style({
  display: "flex",
  alignItems: "flex-start",
  gap: "0.375rem",
  fontSize: "0.8125rem",
  lineHeight: 1.45,
  color: vars.color.sandInkMuted,
  marginBlockStart: "0.25rem",
});

export const schoolBadgePinIcon = style({
  flexShrink: 0,
  inlineSize: "0.875rem",
  blockSize: "0.875rem",
  marginBlockStart: "0.125rem",
  color: vars.color.sandInkSubtle,
});

export const schoolBadgeMapLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.375rem",
  fontSize: "0.75rem",
  fontWeight: vars.font.weightMedium,
  color: vars.color.sandAccent,
  textDecoration: "none",
  paddingBlock: "0.3125rem",
  paddingInline: "0.625rem",
  borderRadius: "0.5rem",
  backgroundColor: vars.color.sandCardBg,
  border: `1px solid ${vars.color.sandLine}`,
  inlineSize: "fit-content",
  marginBlockStart: "0.375rem",
  transition: "all 0.2s ease",
  ":hover": {
    borderColor: vars.color.sandAccent,
    backgroundColor: vars.color.sandSurface,
  },
});

export const stepHeading = style({
  fontSize: "1.625rem",
  fontWeight: vars.font.weightBold,
  letterSpacing: "-0.02em",
  marginBlockStart: 0,
  marginBlockEnd: "0.375rem",
  marginInline: 0,
  lineHeight: 1.2,
  color: vars.color.sandInk,
});

export const stepDesc = style({
  fontSize: "0.875rem",
  lineHeight: 1.55,
  marginBlockStart: 0,
  marginBlockEnd: "1.5rem",
  marginInline: 0,
  color: vars.color.sandInkMuted,
});

export const fieldsGrid = style({
  display: "grid",
  gap: "0.875rem",
});

export const rowTwoCols = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "0.75rem",
  "@media": {
    [`screen and (max-width: ${breakpoints.sm})`]: {
      gridTemplateColumns: "1fr",
    },
  },
});

export const fieldLabel = style({
  display: "grid",
  gap: "0.375rem",
});

export const labelText = style({
  fontSize: "0.75rem",
  fontWeight: vars.font.weightMedium,
  letterSpacing: "0.02em",
  color: vars.color.sandInk,
});

export const requiredMark = style({
  color: vars.color.sandError,
});

export const input = style({
  fontSize: "0.9375rem",
  paddingBlock: "0.8125rem",
  paddingInline: "0.875rem",
  borderRadius: "0.75rem",
  border: `1px solid ${vars.color.sandLine}`,
  backgroundColor: vars.color.sandCardBg,
  color: vars.color.sandInk,
  inlineSize: "100%",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  ":focus": {
    outline: "none",
    borderColor: vars.color.sandAccent,
    boxShadow: `0 0 0 1px ${vars.color.sandAccent}`,
  },
  "::placeholder": {
    color: vars.color.sandInkFaint,
  },
});

export const inputInvalid = style({
  borderColor: vars.color.sandError,
});

export const fieldError = style({
  fontSize: "0.75rem",
  color: vars.color.sandError,
});

export const textarea = style({
  fontSize: "0.9375rem",
  paddingBlock: "0.8125rem",
  paddingInline: "0.875rem",
  borderRadius: "0.75rem",
  border: `1px solid ${vars.color.sandLine}`,
  backgroundColor: vars.color.sandCardBg,
  color: vars.color.sandInk,
  inlineSize: "100%",
  resize: "vertical",
  lineHeight: 1.5,
  fontFamily: vars.font.sans,
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  ":focus": {
    outline: "none",
    borderColor: vars.color.sandAccent,
    boxShadow: `0 0 0 1px ${vars.color.sandAccent}`,
  },
  "::placeholder": {
    color: vars.color.sandInkFaint,
  },
});

export const select = style({
  fontSize: "0.9375rem",
  paddingBlock: "0.8125rem",
  paddingInline: "0.875rem",
  borderRadius: "0.75rem",
  border: `1px solid ${vars.color.sandLine}`,
  backgroundColor: vars.color.sandCardBg,
  color: vars.color.sandInk,
  inlineSize: "100%",
  cursor: "pointer",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  ":focus": {
    outline: "none",
    borderColor: vars.color.sandAccent,
    boxShadow: `0 0 0 1px ${vars.color.sandAccent}`,
  },
});

globalStyle(`${select} option`, {
  backgroundColor: vars.color.sandCardBg,
  color: vars.color.sandInk,
});

export const kvkkRow = style({
  display: "flex",
  gap: "0.75rem",
  alignItems: "flex-start",
  paddingBlock: "0.875rem",
  paddingInline: "0.875rem",
  borderRadius: "0.75rem",
  border: `1px solid ${vars.color.sandLine}`,
  cursor: "pointer",
  backgroundColor: vars.color.sandCardTranslucent,
  transition: "border-color 0.2s ease",
  ":hover": {
    borderColor: vars.color.sandLineStrong,
  },
});

export const checkbox = style({
  inlineSize: "1.2rem",
  blockSize: "1.2rem",
  accentColor: vars.color.sandAccent,
  flexShrink: 0,
  marginBlockStart: "0.1rem",
});

export const kvkkText = style({
  fontSize: "0.75rem",
  lineHeight: 1.5,
  color: vars.color.sandInk,
});

export const btnRow = style({
  display: "flex",
  gap: "0.625rem",
  marginBlockStart: "1.5rem",
});

export const btnPrimary = style({
  flex: 1,
  fontFamily: vars.font.sans,
  fontSize: "0.9375rem",
  fontWeight: vars.font.weightBold,
  paddingBlock: "0.9375rem",
  paddingInline: "1.5rem",
  borderRadius: vars.radius.full,
  border: "none",
  cursor: "pointer",
  backgroundColor: vars.color.sandAccent,
  color: vars.color.sandAccentInk,
  transition: "opacity 0.2s ease, transform 0.1s ease",
  ":hover": {
    opacity: 0.92,
  },
  ":active": {
    transform: "scale(0.99)",
  },
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const btnSecondary = style({
  fontFamily: vars.font.sans,
  fontSize: "0.9375rem",
  fontWeight: vars.font.weightMedium,
  paddingBlock: "0.9375rem",
  paddingInline: "1.5rem",
  borderRadius: vars.radius.full,
  cursor: "pointer",
  backgroundColor: vars.color.sandCardBg,
  color: vars.color.sandInk,
  border: `1px solid ${vars.color.sandLineMedium}`,
  inlineSize: "fit-content",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
  ":hover": {
    borderColor: vars.color.sandLineHover,
    backgroundColor: vars.color.sandInkJadePressed,
  },
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export const formError = style({
  marginBlockStart: "0.875rem",
  paddingBlock: "0.75rem",
  paddingInline: "0.875rem",
  borderRadius: "0.75rem",
  fontSize: "0.8125rem",
  lineHeight: 1.5,
  backgroundColor: vars.color.sandErrorBg,
  color: vars.color.sandError,
  border: `1px solid ${vars.color.sandErrorLine}`,
});

export const honeypot = style({
  position: "absolute",
  insetInlineStart: "-999rem",
  inlineSize: "0.0625rem",
  blockSize: "0.0625rem",
  opacity: 0,
  pointerEvents: "none",
});

// Success state styles
export const successWrap = style({
  display: "grid",
  gap: "1.25rem",
  justifyItems: "center",
  textAlign: "center",
  paddingBlock: "2.5rem",
  paddingInline: 0,
});

export const successIcon = style({
  inlineSize: "4rem",
  blockSize: "4rem",
  borderRadius: vars.radius.full,
  display: "grid",
  placeItems: "center",
  fontSize: "1.875rem",
  backgroundColor: vars.color.sandAccent,
  color: vars.color.sandAccentInk,
  fontWeight: vars.font.weightBold,
});

export const successTitle = style({
  fontSize: "1.875rem",
  fontWeight: vars.font.weightBold,
  letterSpacing: "-0.02em",
  margin: 0,
  lineHeight: 1.15,
  color: vars.color.sandInk,
});

export const successText = style({
  fontSize: "0.9375rem",
  lineHeight: 1.6,
  margin: 0,
  maxInlineSize: "24rem",
  color: vars.color.sandInkMuted,
});

export const refBox = style({
  paddingBlock: "1rem",
  paddingInline: "1.375rem",
  borderRadius: "0.875rem",
  border: `1px dashed ${vars.color.sandLineDashed}`,
  display: "grid",
  gap: "0.25rem",
  backgroundColor: vars.color.sandCardBg,
});

export const refKicker = style({
  fontSize: "0.6875rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: vars.color.sandInkSubtle,
});

export const refCode = style({
  fontSize: "1.5rem",
  fontWeight: vars.font.weightBold,
  letterSpacing: "0.05em",
  color: vars.color.sandAccent,
});

export const waButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.625rem",
  fontSize: "0.875rem",
  fontWeight: vars.font.weightBold,
  paddingBlock: "0.875rem",
  paddingInline: "1.5rem",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.whatsapp,
  color: vars.color.whatsappInk,
  textDecoration: "none",
  inlineSize: "fit-content",
  transition: "opacity 0.2s ease, transform 0.1s ease",
  ":hover": {
    opacity: 0.9,
  },
  ":active": {
    transform: "scale(0.99)",
  },
});

export const homeLink = style({
  fontSize: "0.8125rem",
  textDecoration: "none",
  color: vars.color.sandInkSubtle,
  inlineSize: "fit-content",
  transition: "opacity 0.2s ease",
  ":hover": {
    opacity: 0.9,
  },
});
