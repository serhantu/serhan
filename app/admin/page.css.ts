import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const page = style({
  display: "grid",
  gap: "1.125rem",
  minInlineSize: 0,
  inlineSize: "100%",
  maxInlineSize: "100%",
});

// KPI Cards
export const kpiGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 12rem), 1fr))",
  gap: "0.75rem",
  minInlineSize: 0,
});

export const kpiCard = style({
  display: "grid",
  gap: "0.625rem",
  padding: "1.125rem",
  background: vars.color.adminSurface,
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.75rem",
  minInlineSize: 0,
});

export const kpiLabel = style({
  fontFamily: vars.font.mono,
  fontSize: "0.65625rem",
  letterSpacing: "0.12em",
  color: vars.color.adminTextCaption,
  textTransform: "uppercase",
  margin: 0,
});

export const kpiValue = style({
  fontSize: "2.125rem",
  fontWeight: vars.font.weightBold,
  letterSpacing: "-0.04em",
  lineHeight: 1,
  margin: 0,
  color: vars.color.adminText,
});

export const kpiDeltaRow = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.375rem",
  fontSize: "0.75rem",
  color: vars.color.adminTextMuted,
});

export const kpiDot = style({
  inlineSize: "0.375rem",
  blockSize: "0.375rem",
  borderRadius: vars.radius.full,
  flexShrink: 0,
});

export const kpiDotGreen = style({
  background: vars.color.adminPrimary,
});

export const kpiDotAlert = style({
  background: vars.color.adminAlert,
});

export const kpiDotGray = style({
  background: vars.color.adminTextCaption,
});

// Middle Section: Chart + Tasks (1.5fr / 1fr)
export const middleGrid = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: "0.75rem",
  alignItems: "start",
  minInlineSize: 0,
  "@media": {
    [`(min-width: ${breakpoints.lg})`]: {
      gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)",
    },
  },
});

export const cardBox = style({
  background: vars.color.adminSurface,
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.75rem",
  overflow: "hidden",
});

export const cardHeader = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "0.75rem",
  paddingBlock: "1rem",
  paddingInline: "1.125rem",
  borderBlockEnd: `1px solid ${vars.color.adminBorder}`,
});

export const cardTitle = style({
  fontSize: "0.9375rem",
  fontWeight: vars.font.weightBold,
  color: vars.color.adminText,
  margin: 0,
});

export const cardHeaderMeta = style({
  fontFamily: vars.font.mono,
  fontSize: "0.6875rem",
  color: vars.color.adminTextCaption,
});

export const cardHeaderLink = style({
  fontSize: "0.8125rem",
  color: vars.color.adminPrimary,
  textDecoration: "none",
  fontWeight: vars.font.weightMedium,
  selectors: {
    "&:hover": {
      color: vars.color.adminPrimaryHover,
      textDecoration: "underline",
    },
  },
});

// Chart Grid
export const chartContainer = style({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "0.625rem",
  alignItems: "end",
  paddingBlock: "1.375rem 0.875rem",
  paddingInline: "1.125rem",
  blockSize: "11.875rem",
});

export const chartCol = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "0.5rem",
  blockSize: "100%",
});

export const chartVal = style({
  fontFamily: vars.font.mono,
  fontSize: "0.6875rem",
  color: vars.color.adminTextMuted,
});

export const chartBar = style({
  inlineSize: "100%",
  borderRadius: "0.3125rem 0.3125rem 0 0",
  transition: "block-size 0.4s ease, background 0.2s ease",
  minBlockSize: "0.5rem",
});

export const chartBarNormal = style({
  background: vars.color.adminChartInactive,
});

export const chartBarPeak = style({
  background: vars.color.adminPrimary,
});

export const chartBarHeights = [
  style({ blockSize: "0.875rem" }),
  style({ blockSize: "1.5rem" }),
  style({ blockSize: "2.25rem" }),
  style({ blockSize: "3rem" }),
  style({ blockSize: "3.75rem" }),
  style({ blockSize: "4.5rem" }),
  style({ blockSize: "5.25rem" }),
  style({ blockSize: "6rem" }),
];

export const chartDay = style({
  fontFamily: vars.font.mono,
  fontSize: "0.65625rem",
  color: vars.color.adminTextSubtle,
});

// Tasks List
export const taskList = style({
  display: "grid",
});

export const taskItem = style({
  display: "grid",
  gridTemplateColumns: "0.5rem 1fr auto",
  gap: "0.75rem",
  alignItems: "center",
  paddingBlock: "0.875rem",
  paddingInline: "1.125rem",
  borderBlockEnd: `1px solid ${vars.color.adminBorderLight}`,
  selectors: {
    "&:last-child": {
      borderBlockEnd: "none",
    },
  },
});

export const taskDetails = style({
  display: "grid",
  gap: "0.125rem",
  minInlineSize: 0,
});

export const taskTitle = style({
  fontSize: "0.84375rem",
  color: vars.color.adminText,
  fontWeight: vars.font.weightNormal,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const taskMeta = style({
  fontSize: "0.71875rem",
  color: vars.color.adminTextCaption,
});

export const taskTime = style({
  fontFamily: vars.font.mono,
  fontSize: "0.6875rem",
  color: vars.color.adminTextCaption,
});

// Recent Requests List
export const recentTable = style({
  display: "grid",
});

export const recentRow = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "0.5rem 0.875rem",
  alignItems: "center",
  paddingBlock: "0.875rem",
  paddingInline: "1.125rem",
  borderBlockEnd: `1px solid ${vars.color.adminBorderLight}`,
  textDecoration: "none",
  color: "inherit",
  transition: "background 0.15s ease",
  selectors: {
    "&:hover": {
      background: vars.color.adminSurfaceSoft,
    },
    "&:last-child": {
      borderBlockEnd: "none",
    },
  },
  "@media": {
    [`(min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: "6.5rem minmax(0, 1.2fr) minmax(0, 1fr) auto",
    },
  },
});

export const recentRef = style({
  fontFamily: vars.font.mono,
  fontSize: "0.6875rem",
  color: vars.color.adminTextMuted,
});

export const recentName = style({
  fontSize: "0.875rem",
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminText,
  minInlineSize: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const recentSchool = style({
  fontSize: "0.78125rem",
  color: vars.color.adminTextCaption,
  minInlineSize: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const statusBadge = style({
  justifySelf: "start",
  fontSize: "0.71875rem",
  paddingBlock: "0.25rem",
  paddingInline: "0.625rem",
  borderRadius: vars.radius.full,
  fontWeight: vars.font.weightMedium,
});

export const statusBadgeAlert = style({
  background: vars.color.adminAlertSoft,
  color: vars.color.adminAlertText,
});

export const statusBadgeSuccess = style({
  background: vars.color.adminPrimarySoft,
  color: vars.color.adminPrimary,
});

export const emptyState = style({
  padding: "1.5rem",
  color: vars.color.adminTextCaption,
  fontSize: "0.875rem",
});
