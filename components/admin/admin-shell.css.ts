import { style } from "@vanilla-extract/css";
import { vars, breakpoints } from "@/styles/tokens.css";

export const layout = style({
  minBlockSize: "100dvh",
  background: vars.color.adminBg,
  color: vars.color.adminText,
  fontFamily: vars.font.sans,
  display: "grid",
  gridTemplateColumns: "1fr",
  "@media": {
    [`(min-width: ${breakpoints.lg})`]: {
      gridTemplateColumns: "15.75rem 1fr",
    },
  },
});

// Desktop Sidebar (Rail)
export const sidebar = style({
  display: "none",
  background: vars.color.adminSurface,
  borderInlineEnd: `1px solid ${vars.color.adminBorder}`,
  position: "sticky",
  insetBlockStart: 0,
  blockSize: "100dvh",
  zIndex: vars.zIndex.sticky,
  "@media": {
    [`(min-width: ${breakpoints.lg})`]: {
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
    },
  },
});

export const brandArea = style({
  paddingBlock: "1.25rem 1rem",
  paddingInline: "1.125rem",
  borderBlockEnd: `1px solid ${vars.color.adminBorder}`,
  display: "grid",
  gap: "0.75rem",
});

export const brandLogo = style({
  inlineSize: "100%",
  maxInlineSize: "10.5rem",
  blockSize: "auto",
  display: "block",
});

export const brandSubtitle = style({
  fontFamily: vars.font.mono,
  fontSize: "0.625rem",
  letterSpacing: "0.14em",
  color: vars.color.adminTextCaption,
  textTransform: "uppercase",
  fontWeight: vars.font.weightMedium,
});

export const navList = style({
  display: "grid",
  alignContent: "start",
  gap: "0.125rem",
  paddingBlock: "0.875rem",
  paddingInline: "0.75rem",
  overflowY: "auto",
});

export const navItem = style({
  display: "grid",
  gridTemplateColumns: "1.625rem 1fr auto",
  gap: "0.625rem",
  alignItems: "center",
  textDecoration: "none",
  paddingBlock: "0.6875rem",
  paddingInline: "0.75rem",
  borderRadius: "0.5rem",
  fontSize: "0.90625rem",
  transition: "background 0.18s ease, color 0.18s ease",
  color: vars.color.adminTextBody,
  fontWeight: vars.font.weightNormal,
  selectors: {
    "&:hover": {
      background: vars.color.adminSurfaceSoft,
      color: vars.color.adminText,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const navItemActive = style({
  background: vars.color.adminPrimarySoft,
  color: vars.color.adminPrimary,
  fontWeight: vars.font.weightBold,
  selectors: {
    "&:hover": {
      background: vars.color.adminPrimarySoft,
      color: vars.color.adminPrimary,
    },
  },
});

export const navIndex = style({
  fontFamily: vars.font.mono,
  fontSize: "0.625rem",
  opacity: 0.65,
});

export const navBadge = style({
  minInlineSize: "1.375rem",
  textAlign: "center",
  fontFamily: vars.font.mono,
  fontSize: "0.65625rem",
  paddingBlock: "0.125rem",
  paddingInline: "0.375rem",
  borderRadius: vars.radius.full,
  background: vars.color.adminSurfaceSoft,
  color: vars.color.adminTextCaption,
});

export const navBadgeAlert = style({
  background: vars.color.adminAlert,
  color: vars.color.adminPrimaryForeground,
  fontWeight: vars.font.weightBold,
});

// Profile Area
export const profileArea = style({
  paddingBlock: "0.875rem 1.125rem",
  paddingInline: "1rem",
  borderBlockStart: `1px solid ${vars.color.adminBorder}`,
  display: "grid",
  gap: "0.625rem",
});

export const profileRow = style({
  display: "grid",
  gridTemplateColumns: "2.125rem 1fr",
  gap: "0.625rem",
  alignItems: "center",
});

export const profileAvatar = style({
  inlineSize: "2.125rem",
  blockSize: "2.125rem",
  borderRadius: "0.5rem",
  display: "grid",
  placeItems: "center",
  background: vars.color.adminPrimary,
  color: vars.color.adminPrimaryForeground,
  fontSize: "0.8125rem",
  fontWeight: vars.font.weightBold,
});

export const profileDetails = style({
  display: "grid",
  gap: "0.0625rem",
  minInlineSize: 0,
});

export const profileName = style({
  fontSize: "0.8125rem",
  fontWeight: vars.font.weightMedium,
  color: vars.color.adminText,
});

export const profileEmail = style({
  fontSize: "0.6875rem",
  color: vars.color.adminTextCaption,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const logoutButton = style({
  inlineSize: "100%",
  paddingBlock: "0.5625rem",
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.5rem",
  background: vars.color.adminSurface,
  fontSize: "0.78125rem",
  cursor: "pointer",
  color: vars.color.adminTextMuted,
  transition: "background 0.18s ease, color 0.18s ease",
  selectors: {
    "&:hover": {
      background: vars.color.adminSurfaceSoft,
      color: vars.color.adminText,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

// Main Column
export const mainColumn = style({
  display: "grid",
  gridTemplateRows: "auto 1fr",
  minInlineSize: 0,
});

// Sticky Topbar
export const topbar = style({
  position: "sticky",
  insetBlockStart: 0,
  zIndex: vars.zIndex.sticky,
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "0.875rem",
  alignItems: "center",
  paddingBlock: "0.75rem",
  paddingInline: "clamp(0.875rem, 3vw, 1.75rem)",
  background: vars.color.adminTopbarBg,
  backdropFilter: "blur(0.625rem)",
  borderBlockEnd: `1px solid ${vars.color.adminBorder}`,
});

export const topbarLeft = style({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  minInlineSize: 0,
});

export const hamburgerButton = style({
  display: "grid",
  placeItems: "center",
  inlineSize: "2.125rem",
  blockSize: "2.125rem",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  padding: 0,
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
  "@media": {
    [`(min-width: ${breakpoints.lg})`]: {
      display: "none",
    },
  },
});

export const topbarMobileLogo = style({
  display: "block",
  blockSize: "1.625rem",
  inlineSize: "auto",
  "@media": {
    [`(min-width: ${breakpoints.lg})`]: {
      display: "none",
    },
  },
});

export const pageTitleGroup = style({
  display: "grid",
  gap: "0.0625rem",
  minInlineSize: 0,
});

export const pageTitle = style({
  fontSize: "clamp(1.0625rem, 2.2vw, 1.375rem)",
  fontWeight: vars.font.weightBold,
  letterSpacing: "-0.02em",
  lineHeight: 1.15,
  margin: 0,
  color: vars.color.adminText,
});

export const pageSubtitle = style({
  fontSize: "0.78125rem",
  color: vars.color.adminTextCaption,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  margin: 0,
});

export const topbarRight = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  justifyContent: "flex-end",
});

export const searchForm = style({
  display: "none",
  alignItems: "center",
  gap: "0.5rem",
  paddingBlock: "0.5rem",
  paddingInline: "0.75rem",
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.5rem",
  background: vars.color.adminSurface,
  minInlineSize: "13.75rem",
  "@media": {
    [`(min-width: ${breakpoints.xl})`]: {
      display: "flex",
    },
  },
});

export const searchIcon = style({
  fontFamily: vars.font.mono,
  fontSize: "0.75rem",
  color: vars.color.adminTextSubtle,
});

export const searchInput = style({
  inlineSize: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  fontSize: "0.84375rem",
  fontFamily: vars.font.sans,
  color: vars.color.adminText,
  selectors: {
    "&::placeholder": {
      color: vars.color.adminTextSubtle,
    },
  },
});

export const notifButton = style({
  position: "relative",
  inlineSize: "2.25rem",
  blockSize: "2.25rem",
  border: `1px solid ${vars.color.adminBorder}`,
  borderRadius: "0.5rem",
  background: vars.color.adminSurface,
  cursor: "pointer",
  fontSize: "0.875rem",
  display: "grid",
  placeItems: "center",
  color: vars.color.adminText,
  textDecoration: "none",
  transition: "background 0.18s ease",
  selectors: {
    "&:hover": {
      background: vars.color.adminSurfaceSoft,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

export const notifBadge = style({
  position: "absolute",
  insetBlockStart: "-0.3125rem",
  insetInlineEnd: "-0.3125rem",
  minInlineSize: "1.125rem",
  blockSize: "1.125rem",
  display: "grid",
  placeItems: "center",
  borderRadius: vars.radius.full,
  background: vars.color.adminAlert,
  color: vars.color.adminPrimaryForeground,
  fontFamily: vars.font.mono,
  fontSize: "0.625rem",
  fontWeight: vars.font.weightBold,
  paddingInline: "0.25rem",
});

export const actionButton = style({
  paddingBlock: "0.5625rem",
  paddingInline: "1rem",
  border: "none",
  borderRadius: "0.5rem",
  background: vars.color.adminPrimary,
  color: vars.color.adminPrimaryForeground,
  fontSize: "0.8125rem",
  fontWeight: vars.font.weightMedium,
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.375rem",
  inlineSize: "fit-content",
  transition: "background 0.18s ease",
  selectors: {
    "&:hover": {
      background: vars.color.adminPrimaryHover,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});

// Main Content Wrapper
export const contentWrapper = style({
  paddingBlock: "clamp(1rem, 2.6vw, 1.75rem)",
  paddingInline: "clamp(1rem, 2.6vw, 1.75rem)",
  display: "grid",
  alignContent: "start",
  gap: "1.125rem",
  minInlineSize: 0,
});

// Mobile Drawer
export const mobileDrawer = style({
  position: "fixed",
  inset: 0,
  zIndex: vars.zIndex.modal,
  display: "grid",
  gridTemplateColumns: "minmax(0, 18.75rem) 1fr",
});

export const mobileDrawerContent = style({
  background: vars.color.adminSurface,
  borderInlineEnd: `1px solid ${vars.color.adminBorder}`,
  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  overflowY: "auto",
});

export const mobileDrawerHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBlock: "1rem 0.875rem",
  paddingInline: "1rem",
  borderBlockEnd: `1px solid ${vars.color.adminBorder}`,
});

export const mobileDrawerBackdrop = style({
  background: vars.color.adminBackdrop,
  cursor: "pointer",
});

export const mobileDrawerClose = style({
  inlineSize: "2rem",
  blockSize: "2rem",
  border: "none",
  background: "transparent",
  fontSize: "1.3125rem",
  cursor: "pointer",
  color: vars.color.adminText,
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${vars.color.adminPrimary}`,
      outlineOffset: "2px",
    },
  },
});
