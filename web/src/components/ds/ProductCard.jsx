import React from 'react';
import { Badge, NormBadge } from './Badge.jsx';
import { IconButton } from './IconButton.jsx';

function ProductCard({
  title,
  image,
  code: refCode,
  norm,
  recommended = false,
  badge,
  bullets = [],
  cover = false,
  ctaLabel = "Ver producto",
  href = "#",
  onClick,
  onFav
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      textDecoration: "none",
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
      transform: hover ? "translateY(-4px)" : "none",
      transition: "transform var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)",
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: cover ? "4 / 3" : "1 / 1",
      background: cover ? "var(--color-surface-tile)" : "linear-gradient(160deg,#f7f7f8,#ececed)",
      padding: cover ? 0 : "22px",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "16px",
      left: "16px",
      display: "flex",
      gap: "8px",
      alignItems: "center",
      zIndex: 2,
      flexWrap: "wrap"
    }
  }, (recommended || badge) && /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, badge || "Recomendado"), norm && /*#__PURE__*/React.createElement(NormBadge, {
    onDark: cover
  }, norm)), /*#__PURE__*/React.createElement("span", {
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      onFav && onFav();
    },
    style: {
      position: "absolute",
      top: "14px",
      right: "14px",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    tone: "light",
    size: "sm",
    label: "A\xF1adir a favoritos"
  }, "\u2665")), image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: title,
    style: {
      width: "100%",
      height: "100%",
      objectFit: cover ? "cover" : "contain",
      display: "block",
      mixBlendMode: cover ? "normal" : "multiply",
      transform: hover ? "scale(1.05)" : "scale(1)",
      transition: "transform var(--duration-base) var(--ease-standard)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "var(--space-6)",
      flex: 1
    }
  }, refCode && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--text-subtle)",
      textTransform: "none"
    }
  }, "REF \xB7 ", refCode), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--weight-bold)",
      lineHeight: "var(--leading-snug)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)"
    }
  }, title), bullets.length > 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-body)"
    }
  }, bullets.join(" · "), " \xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: "auto",
      paddingTop: "8px",
      fontSize: "var(--text-base)",
      fontWeight: "var(--weight-bold)",
      color: "var(--color-ink)",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px"
    }
  }, ctaLabel, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)",
      transform: hover ? "translateX(4px)" : "none",
      transition: "transform var(--duration-base) var(--ease-standard)"
    }
  }, "\u2192"))));
}

export { ProductCard };
