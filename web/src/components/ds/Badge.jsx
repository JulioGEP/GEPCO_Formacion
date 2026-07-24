import React from 'react';

const tones = {
  brand: {
    bg: "var(--color-brand)",
    fg: "#fff",
    bd: "transparent"
  },
  dark: {
    bg: "var(--color-ink)",
    fg: "#fff",
    bd: "transparent"
  },
  soft: {
    bg: "var(--color-surface-muted)",
    fg: "var(--color-ink)",
    bd: "transparent"
  },
  outline: {
    bg: "transparent",
    fg: "var(--color-ink)",
    bd: "var(--border-strong, var(--border-hover))"
  },
  onDark: {
    bg: "rgba(255,255,255,0.12)",
    fg: "#fff",
    bd: "rgba(255,255,255,0.20)"
  },
  success: {
    bg: "var(--color-success)",
    fg: "#fff",
    bd: "transparent"
  },
  outStock: {
    bg: "var(--color-stock-out)",
    fg: "#fff",
    bd: "transparent"
  }
};

/** Small status / category pill (uppercase, tracked). */
function Badge({
  children,
  tone = "soft",
  dot = false
}) {
  const t = tones[tone] || tones.soft;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "0.10em",
      textTransform: "uppercase",
      lineHeight: 1,
      padding: "7px 11px",
      borderRadius: "var(--radius-sm)",
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      whiteSpace: "nowrap"
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: "currentColor",
      flex: "0 0 auto"
    }
  }), children);
}

/** Technical spec chip in mono — EN norms, CE directives, refs. */
function NormBadge({
  children,
  onDark = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      fontWeight: "var(--weight-regular)",
      letterSpacing: "var(--tracking-mono)",
      lineHeight: 1,
      padding: "6px 9px",
      borderRadius: "6px",
      background: onDark ? "rgba(255,255,255,0.08)" : "var(--color-surface)",
      color: onDark ? "rgba(255,255,255,0.86)" : "var(--color-ink)",
      border: `1px solid ${onDark ? "rgba(255,255,255,0.18)" : "var(--border-default)"}`,
      whiteSpace: "nowrap"
    }
  }, children);
}

export { Badge, NormBadge };
