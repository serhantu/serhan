import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/tokens.css";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});

export const dropzone = style({
  border: `2px dashed ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: vars.space.xl,
  textAlign: "center",
  cursor: "pointer",
  transition: "border-color 0.15s, background 0.15s",
  selectors: {
    "&:hover": {
      borderColor: vars.color.primary,
      background: vars.color.muted,
    },
  },
});

export const dropzoneActive = style({
  borderColor: vars.color.primary,
  background: vars.color.accent,
});

export const dropzoneDisabled = style({
  opacity: 0.6,
  cursor: "not-allowed",
});

export const label = style({
  fontSize: vars.font.sizeSm,
  color: vars.color.mutedForeground,
});

export const preview = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  padding: vars.space.sm,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  background: vars.color.muted,
});

export const previewImage = style({
  width: "4rem",
  height: "4rem",
  objectFit: "cover",
  borderRadius: vars.radius.sm,
});

export const previewInfo = style({
  flex: 1,
  minWidth: 0,
});

export const previewUrl = style({
  fontSize: vars.font.sizeXs,
  color: vars.color.mutedForeground,
  wordBreak: "break-all",
});

export const removeButton = style({
  background: "none",
  border: "none",
  color: vars.color.danger,
  cursor: "pointer",
  fontSize: vars.font.sizeSm,
  fontWeight: vars.font.weightMedium,
  padding: vars.space.xs,
  borderRadius: vars.radius.sm,
  selectors: {
    "&:hover": { background: vars.color.dangerBg },
  },
});

export const errorText = style({
  color: vars.color.danger,
  fontSize: vars.font.sizeSm,
});

export const progressBar = style({
  width: "100%",
  height: "0.25rem",
  background: vars.color.muted,
  borderRadius: vars.radius.full,
  overflow: "hidden",
});

export const progressFill = style({
  height: "100%",
  background: vars.color.primary,
  transition: "width 0.2s",
});
