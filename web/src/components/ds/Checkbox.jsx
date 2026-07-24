import React from 'react';

function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  theme = "light",
  id,
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const dark = theme === "dark";
  const boxId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-").slice(0, 24) : undefined);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: boxId,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      color: dark ? "var(--text-on-dark-muted)" : "var(--text-body)",
      cursor: "pointer",
      lineHeight: "var(--leading-normal)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      width: "20px",
      height: "20px",
      marginTop: "1px",
      borderRadius: "6px",
      border: `1px solid ${on ? "var(--color-brand)" : dark ? "var(--border-on-dark)" : "var(--border-hover)"}`,
      background: on ? "var(--color-brand)" : dark ? "var(--color-dark-tile)" : "var(--surface-card)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)"
    }
  }, on && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 6.2L4.6 8.8L10 3.2",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), /*#__PURE__*/React.createElement("input", _extends({
    id: boxId,
    type: "checkbox",
    checked: on,
    onChange: e => {
      if (!isControlled) setInternal(e.target.checked);
      onChange && onChange(e);
    },
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", null, label));
}

export { Checkbox };
