import React from 'react';

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  dark: {
    bg: "var(--color-ink)",
    fg: "#fff",
    bd: "transparent",
    hbg: "#000"
  },
  light: {
    bg: "#fff",
    fg: "var(--color-ink)",
    bd: "var(--border-default)",
    hbg: "var(--color-surface-muted)"
  },
  ghost: {
    bg: "transparent",
    fg: "var(--color-ink)",
    bd: "var(--border-default)",
    hbg: "var(--color-surface-muted)"
  },
  brand: {
    bg: "var(--color-brand)",
    fg: "#fff",
    bd: "transparent",
    hbg: "var(--color-brand-strong)"
  }
};
const dims = {
  sm: 36,
  md: 44,
  lg: 54
};
function IconButton({
  children,
  tone = "dark",
  size = "md",
  label,
  onClick,
  style: styleProp,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const t = tones[tone] || tones.dark;
  const d = dims[size] || dims.md;
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: d + "px",
      height: d + "px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-full)",
      border: `1px solid ${t.bd}`,
      background: hover ? t.hbg : t.bg,
      color: t.fg,
      cursor: "pointer",
      fontSize: size === "lg" ? "20px" : "16px",
      transition: "background var(--duration-base) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)",
      transform: hover ? "translateY(-1px)" : "none",
      flex: "0 0 auto",
      ...styleProp
    }
  }, rest), children);
}

export { IconButton };
