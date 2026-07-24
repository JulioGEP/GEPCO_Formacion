import React from 'react';

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  error,
  theme = "light",
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const dark = theme === "dark";
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      fontFamily: "var(--font-body)"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: dark ? "var(--text-on-dark-muted)" : "var(--text-subtle)"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      color: dark ? "#fff" : "var(--text-strong)",
      background: dark ? "var(--color-dark-tile)" : "var(--surface-card)",
      padding: "14px 16px",
      borderRadius: "var(--radius-md)",
      border: `1px solid ${error ? "var(--color-danger)" : focus ? dark ? "rgba(255,255,255,0.55)" : "var(--color-ink)" : dark ? "var(--border-on-dark)" : "var(--border-default)"}`,
      outline: "none",
      boxShadow: focus && !dark ? "var(--shadow-focus)" : "none",
      transition: "border-color var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)",
      width: "100%"
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-xs)",
      color: error ? "var(--color-danger)" : dark ? "var(--text-on-dark-muted)" : "var(--text-subtle)"
    }
  }, error || hint));
}

export { Input };
