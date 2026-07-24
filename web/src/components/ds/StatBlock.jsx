import React from 'react';

/** Big figure + label — hero / proof metrics. */
function StatBlock({
  value,
  label,
  onDark = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.6rem, 2.6vw, 2.25rem)",
      fontWeight: "var(--weight-extrabold)",
      lineHeight: 1,
      letterSpacing: "var(--tracking-display)",
      color: onDark ? "#fff" : "var(--color-ink)"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      lineHeight: 1.3,
      color: onDark ? "var(--text-on-dark-muted)" : "var(--text-subtle)"
    }
  }, label));
}

export { StatBlock };
