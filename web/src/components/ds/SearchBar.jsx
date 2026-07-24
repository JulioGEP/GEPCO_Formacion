import React from 'react';

function SearchBar({
  placeholder = "Buscar producto, marca o referencia…",
  kbd = "⌘K",
  onSubmit
}) {
  const [value, setValue] = React.useState("");
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSubmit && onSubmit(value);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flex: 1,
      background: "var(--color-surface-muted)",
      border: `1px solid ${focus ? "var(--color-ink)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-full)",
      padding: "0 18px",
      height: "52px",
      transition: "border-color var(--duration-base) var(--ease-standard)",
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--text-subtle)",
      fontSize: "18px",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m20 20-3-3"
  }))), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => setValue(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    placeholder: placeholder,
    "aria-label": "Buscar",
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-base)",
      color: "var(--text-strong)"
    }
  }), kbd && /*#__PURE__*/React.createElement("kbd", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      color: "var(--text-subtle)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "6px",
      padding: "3px 7px",
      lineHeight: 1
    }
  }, kbd));
}

export { SearchBar };
