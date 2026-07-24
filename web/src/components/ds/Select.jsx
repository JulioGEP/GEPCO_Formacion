import React from 'react';

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  placeholder,
  theme = "light",
  id,
  value,
  onChange,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const dark = theme === "dark";
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      fontFamily: "var(--font-body)"
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selectId,
    style: {
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: dark ? "var(--text-on-dark-muted)" : "var(--text-subtle)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selectId,
    value: value,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: "none",
      WebkitAppearance: "none",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      color: dark ? "#fff" : "var(--text-strong)",
      background: dark ? "var(--color-dark-tile)" : "var(--surface-card)",
      padding: "14px 44px 14px 16px",
      borderRadius: "var(--radius-md)",
      border: `1px solid ${focus ? dark ? "rgba(255,255,255,0.55)" : "var(--color-ink)" : dark ? "var(--border-on-dark)" : "var(--border-default)"}`,
      outline: "none",
      boxShadow: focus && !dark ? "var(--shadow-focus)" : "none",
      transition: "border-color var(--duration-base) var(--ease-standard)",
      width: "100%",
      cursor: "pointer"
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lbl = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lbl);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: dark ? "rgba(255,255,255,0.6)" : "var(--text-subtle)",
      fontSize: "12px"
    }
  }, "\u25BE")));
}

export { Select };
