import React from 'react';

function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
  onDark = false
}) {
  const center = align === "center";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: center ? "center" : "flex-end",
      justifyContent: "space-between",
      gap: "var(--space-6)",
      flexWrap: "wrap",
      flexDirection: center ? "column" : "row",
      textAlign: center ? "center" : "left",
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: center ? "620px" : "700px"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginBottom: "12px",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: "var(--color-brand)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.875rem, 3.6vw, 2.5rem)",
      fontWeight: "var(--weight-extrabold)",
      lineHeight: "var(--leading-snug)",
      letterSpacing: "var(--tracking-display)",
      color: onDark ? "#fff" : "var(--text-strong)"
    }
  }, title, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, ".")), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "14px 0 0",
      fontSize: "var(--text-lg)",
      lineHeight: "var(--leading-normal)",
      color: onDark ? "var(--text-on-dark-muted)" : "var(--text-body)"
    }
  }, description)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      flexShrink: 0
    }
  }, actions));
}

export { SectionHeading };
