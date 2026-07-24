import React from 'react';

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    padding: "10px 16px",
    fontSize: "var(--text-sm)"
  },
  md: {
    padding: "13px 22px",
    fontSize: "var(--text-base)"
  },
  lg: {
    padding: "17px 30px",
    fontSize: "var(--text-base)"
  }
};
const variants = {
  primary: {
    bg: "var(--action-primary)",
    fg: "#fff",
    bd: "transparent",
    hbg: "var(--action-primary-hover)"
  },
  dark: {
    bg: "var(--action-dark)",
    fg: "#fff",
    bd: "transparent",
    hbg: "var(--action-dark-hover)"
  },
  outline: {
    bg: "transparent",
    fg: "var(--color-ink)",
    bd: "var(--border-strong, var(--border-hover))",
    hbg: "var(--color-surface-muted)"
  },
  onDark: {
    bg: "transparent",
    fg: "#fff",
    bd: "rgba(255,255,255,0.28)",
    hbg: "rgba(255,255,255,0.10)"
  },
  solidLight: {
    bg: "#fff",
    fg: "var(--color-ink)",
    bd: "transparent",
    hbg: "#f0f0f0"
  }
};
function Button({
  children,
  variant = "primary",
  size = "md",
  uppercase = false,
  block = false,
  disabled = false,
  iconRight,
  iconLeft,
  type = "button",
  onClick,
  style: styleProp,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  const style = {
    display: block ? "flex" : "inline-flex",
    width: block ? "100%" : "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontFamily: "var(--font-body)",
    fontWeight: "var(--weight-semibold)",
    lineHeight: 1.1,
    fontSize: s.fontSize,
    padding: s.padding,
    textTransform: uppercase ? "uppercase" : "none",
    letterSpacing: uppercase ? "0.08em" : "var(--tracking-nav)",
    borderRadius: "var(--radius-md)",
    border: `1px solid ${v.bd}`,
    background: hover && !disabled ? v.hbg : v.bg,
    color: v.fg,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    whiteSpace: "nowrap",
    transition: "background var(--duration-base) var(--ease-standard), border-color var(--duration-base) var(--ease-standard), transform var(--duration-fast) var(--ease-standard)",
    transform: hover && !disabled ? "translateY(-1px)" : "none",
    ...styleProp
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    style: style,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), iconLeft, children, iconRight);
}

export { Button };
