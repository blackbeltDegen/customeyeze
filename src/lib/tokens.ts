import type { CSSProperties } from "react";

export const colors = {
  bg: "#13131E",
  bgAlt: "#0F0F18",
  cardBg: "#1D1D2C",
  border: "#2A2A3E",
  accent: "#4CAF50",
  text: "#FFFFFF",
  textMuted: "#7A7A9A",
  textDim: "#4A4A6A",
};

export const radius = {
  card: 20,
  pill: 999,
};

export const card: CSSProperties = {
  backgroundColor: colors.cardBg,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.card,
};
