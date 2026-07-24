import React from 'react';
import { IconButton } from './IconButton.jsx';

function CategoryCard({
  index,
  name,
  count,
  subcount,
  thumbs = [],
  href = "#",
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const meta = [count != null ? `${count} cursos` : null, subcount != null ? `${subcount} subcategorías` : null].filter(Boolean).join(" · ");
  const hasThumbs = thumbs.filter(Boolean).length > 0;
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      textDecoration: "none",
      background: hover ? "var(--surface-card)" : "var(--surface-sunken)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-6)",
      gap: "var(--space-5)",
      boxShadow: hover ? "var(--shadow-md)" : "none",
      transform: hover ? "translateY(-4px)" : "none",
      transition: "transform var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard), background var(--duration-base) var(--ease-standard)",
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      color: "var(--color-brand)"
    }
  }, String(index).padStart(2, "0")), /*#__PURE__*/React.createElement(IconButton, {
    tone: "dark",
    size: "sm",
    label: `Ver ${name}`
  }, "\u2192")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 4px",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-heading)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-strong)"
    }
  }, name), meta && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      color: "var(--text-subtle)"
    }
  }, meta)), hasThumbs && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "8px",
      marginTop: "auto"
    }
  }, [0, 1, 2].map(i => {
    const t = thumbs.filter(Boolean)[i];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        height: "58px",
        background: "var(--surface-tile)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden"
      }
    }, t && /*#__PURE__*/React.createElement("img", {
      src: t,
      alt: "",
      style: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    }));
  })));
}

export { CategoryCard };
