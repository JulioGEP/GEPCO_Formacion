/* @ds-bundle: {"format":4,"namespace":"GEPCOFormaciNDesignSystem_bb6094","components":[{"name":"Accordion","sourcePath":"components/disclosure/Accordion.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"NormBadge","sourcePath":"components/display/Badge.jsx"},{"name":"CategoryCard","sourcePath":"components/display/CategoryCard.jsx"},{"name":"ProductCard","sourcePath":"components/display/ProductCard.jsx"},{"name":"SectionHeading","sourcePath":"components/display/SectionHeading.jsx"},{"name":"StatBlock","sourcePath":"components/display/StatBlock.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"SearchBar","sourcePath":"components/navigation/SearchBar.jsx"}],"sourceHashes":{"components/disclosure/Accordion.jsx":"a6e2fd65eb97","components/display/Badge.jsx":"89d77435ce16","components/display/CategoryCard.jsx":"ed2bbb8a1ab7","components/display/ProductCard.jsx":"8408d460e806","components/display/SectionHeading.jsx":"1b42b2b3dc36","components/display/StatBlock.jsx":"599530574481","components/forms/Button.jsx":"e4cc9f7dac4b","components/forms/Checkbox.jsx":"edd428e1551e","components/forms/IconButton.jsx":"c4b8830cb3b5","components/forms/Input.jsx":"594e4344f9c3","components/forms/Select.jsx":"f758eb91548f","components/navigation/SearchBar.jsx":"de7be450ef4d","ui_kits/website/BlogScreen.jsx":"251d21930ae5","ui_kits/website/CatalogScreen.jsx":"0a742396d61e","ui_kits/website/Chrome.jsx":"034cbe629c02","ui_kits/website/ContactScreen.jsx":"64799f7acdfd","ui_kits/website/CourseScreen.jsx":"fede0029f70f","ui_kits/website/HomeScreen.jsx":"1a61bb553636","ui_kits/website/NosotrosScreen.jsx":"8df3d4360b85","ui_kits/website/data.js":"8710ca251863"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GEPCOFormaciNDesignSystem_bb6094 = window.GEPCOFormaciNDesignSystem_bb6094 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/disclosure/Accordion.jsx
try { (() => {
function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen = []
}) {
  const [open, setOpen] = React.useState(new Set(defaultOpen));
  const toggle = i => {
    setOpen(prev => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) next.delete(i);else next.add(i);
      return next;
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      fontFamily: "var(--font-body)"
    }
  }, items.map((it, i) => {
    const isOpen = open.has(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "var(--surface-card)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggle(i),
      "aria-expanded": isOpen,
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        textAlign: "left",
        padding: "var(--space-4) var(--space-6)",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-display)",
        fontSize: "var(--text-lg)",
        fontWeight: "var(--weight-semibold)",
        color: isOpen ? "var(--color-brand)" : "var(--text-strong)"
      }
    }, /*#__PURE__*/React.createElement("span", null, it.q), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: "0 0 auto",
        width: "24px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-brand)",
        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform var(--duration-base) var(--ease-standard)",
        fontSize: "22px",
        lineHeight: 1
      }
    }, "+")), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: isOpen ? "600px" : "0",
        opacity: isOpen ? 1 : 0,
        overflow: "hidden",
        transition: "max-height var(--duration-base) var(--ease-standard), opacity var(--duration-base) var(--ease-standard)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 var(--space-6) var(--space-6)",
        fontSize: "var(--text-base)",
        lineHeight: "var(--leading-normal)",
        color: "var(--text-body)"
      }
    }, it.a)));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclosure/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
const tones = {
  brand: {
    bg: "var(--color-brand)",
    fg: "#fff",
    bd: "transparent"
  },
  dark: {
    bg: "var(--color-ink)",
    fg: "#fff",
    bd: "transparent"
  },
  soft: {
    bg: "var(--color-surface-muted)",
    fg: "var(--color-ink)",
    bd: "transparent"
  },
  outline: {
    bg: "transparent",
    fg: "var(--color-ink)",
    bd: "var(--border-strong, var(--border-hover))"
  },
  onDark: {
    bg: "rgba(255,255,255,0.12)",
    fg: "#fff",
    bd: "rgba(255,255,255,0.20)"
  },
  success: {
    bg: "var(--color-success)",
    fg: "#fff",
    bd: "transparent"
  },
  outStock: {
    bg: "var(--color-stock-out)",
    fg: "#fff",
    bd: "transparent"
  }
};

/** Small status / category pill (uppercase, tracked). */
function Badge({
  children,
  tone = "soft",
  dot = false
}) {
  const t = tones[tone] || tones.soft;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "0.10em",
      textTransform: "uppercase",
      lineHeight: 1,
      padding: "7px 11px",
      borderRadius: "var(--radius-sm)",
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      whiteSpace: "nowrap"
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: "currentColor",
      flex: "0 0 auto"
    }
  }), children);
}

/** Technical spec chip in mono — EN norms, CE directives, refs. */
function NormBadge({
  children,
  onDark = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      fontWeight: "var(--weight-regular)",
      letterSpacing: "var(--tracking-mono)",
      lineHeight: 1,
      padding: "6px 9px",
      borderRadius: "6px",
      background: onDark ? "rgba(255,255,255,0.08)" : "var(--color-surface)",
      color: onDark ? "rgba(255,255,255,0.86)" : "var(--color-ink)",
      border: `1px solid ${onDark ? "rgba(255,255,255,0.18)" : "var(--border-default)"}`,
      whiteSpace: "nowrap"
    }
  }, children);
}
Object.assign(__ds_scope, { Badge, NormBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/SectionHeading.jsx
try { (() => {
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
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/display/StatBlock.jsx
try { (() => {
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
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
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
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
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
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
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
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/display/CategoryCard.jsx
try { (() => {
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
  }, String(index).padStart(2, "0")), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
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
Object.assign(__ds_scope, { CategoryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/CategoryCard.jsx", error: String((e && e.message) || e) }); }

// components/display/ProductCard.jsx
try { (() => {
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
  }, (recommended || badge) && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "brand"
  }, badge || "Recomendado"), norm && /*#__PURE__*/React.createElement(__ds_scope.NormBadge, {
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
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
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
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
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
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
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
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SearchBar.jsx
try { (() => {
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
Object.assign(__ds_scope, { SearchBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SearchBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BlogScreen.jsx
try { (() => {
// Blog — índice + plantilla de post individual
const {
  Button,
  Badge
} = window.GEPCOFormaciNDesignSystem_bb6094;
const D = window.GEPCO_DATA;
const Container = window.Container;

// [PENDIENTE: cuerpo real de los artículos — texto de muestra]
const BODY = ["En el sector de la seguridad industrial y las emergencias, la preparación marca la diferencia entre una intervención eficaz y un incidente grave. Este artículo resume las claves que todo responsable debería conocer.", "La normativa vigente establece requisitos concretos de mantenimiento, revisión y formación. Cumplirlos no solo evita sanciones: reduce el riesgo real para las personas y las instalaciones.", "Desde GEPCO Formación recomendamos revisar periódicamente los equipos, documentar cada inspección y formar al personal con prácticas reales. Si tienes dudas sobre tu caso concreto, escríbenos."];
function BlogList({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--color-dark)",
      color: "#fff",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      color: "var(--color-brand)"
    }
  }, "Recursos"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "14px 0 0",
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2.4rem,5vw,3.6rem)",
      fontWeight: "var(--weight-extrabold)",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-tight)"
    }
  }, "Blog", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      fontSize: "var(--text-lg)",
      color: "rgba(255,255,255,0.78)",
      maxWidth: "620px"
    }
  }, "Gu\xEDas pr\xE1cticas sobre emergencias, extinci\xF3n de incendios, primeros auxilios y prevenci\xF3n de riesgos laborales."))), /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--section-y) var(--container-padding)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "var(--space-6)"
    }
  }, D.blog.map(p => /*#__PURE__*/React.createElement("article", {
    key: p.id,
    onClick: () => onNav("post", p.id),
    style: {
      cursor: "pointer",
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "16 / 10",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: p.title,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--color-brand)"
    }
  }, p.cat), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "10px 0 10px",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--weight-bold)",
      lineHeight: "var(--leading-snug)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)"
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 14px",
      fontSize: "var(--text-sm)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-body)"
    }
  }, p.excerpt), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-bold)",
      color: "var(--color-ink)"
    }
  }, "Leer art\xEDculo ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, "\u2192"))))))));
}
function BlogPost({
  postId,
  onNav
}) {
  const post = D.blog.find(p => p.id === postId) || D.blog[0];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--color-dark)",
      color: "#fff",
      padding: "var(--section-y) 0 0"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      maxWidth: "820px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav("blog"),
    style: {
      background: "none",
      border: "none",
      color: "var(--color-brand)",
      cursor: "pointer",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      padding: 0,
      marginBottom: "20px"
    }
  }, "\u2190 Blog"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--color-brand)"
    }
  }, post.cat), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "14px 0 24px",
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2rem,4vw,3rem)",
      fontWeight: "var(--weight-extrabold)",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-tight)"
    }
  }, post.title, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, "."))), /*#__PURE__*/React.createElement(Container, {
    style: {
      maxWidth: "980px",
      paddingTop: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: post.img,
    alt: post.title,
    style: {
      width: "100%",
      height: "420px",
      objectFit: "cover",
      borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
      boxShadow: "var(--shadow-lg)",
      transform: "translateY(1px)"
    }
  }))), /*#__PURE__*/React.createElement(Container, {
    style: {
      maxWidth: "760px",
      padding: "var(--section-y) var(--container-padding)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 var(--space-6)",
      fontSize: "var(--text-xl)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-strong)",
      fontWeight: "var(--weight-medium)"
    }
  }, post.excerpt), BODY.map((para, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      margin: "0 0 var(--space-6)",
      fontSize: "var(--text-lg)",
      lineHeight: "var(--leading-loose)",
      color: "var(--text-body)"
    }
  }, para)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-10)",
      padding: "var(--space-8)",
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-lg)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--weight-bold)",
      color: "var(--text-strong)"
    }
  }, "\xBFNecesitas formar a tu equipo?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-body)"
    }
  }, "Te preparamos un plan a medida.")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    uppercase: true,
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192"),
    onClick: () => onNav("contact")
  }, "Pedir informaci\xF3n"))));
}
window.BlogList = BlogList;
window.BlogPost = BlogPost;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BlogScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CatalogScreen.jsx
try { (() => {
// Catálogo — cabecera + filtro de categorías + grid de formaciones
const {
  ProductCard,
  Button
} = window.GEPCOFormaciNDesignSystem_bb6094;
const D = window.GEPCO_DATA;
const Container = window.Container;
function CatalogScreen({
  filter,
  onNav
}) {
  const [active, setActive] = React.useState(filter || "all");
  React.useEffect(() => {
    setActive(filter || "all");
  }, [filter]);
  const cats = [{
    slug: "all",
    name: "Todas"
  }, ...D.categories];
  const list = active === "all" ? D.courses : D.courses.filter(c => c.cat === active);
  const catName = slug => (D.categories.find(c => c.slug === slug) || {}).name || "";
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--color-dark)",
      color: "#fff",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      color: "var(--color-brand)"
    }
  }, "Cat\xE1logo \xB7 ", list.length, " formaciones"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "14px 0 0",
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2.4rem,5vw,3.6rem)",
      fontWeight: "var(--weight-extrabold)",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-tight)"
    }
  }, active === "all" ? "Todas las formaciones" : catName(active), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      fontSize: "var(--text-lg)",
      color: "rgba(255,255,255,0.78)",
      maxWidth: "620px"
    }
  }, active === "all" ? "Cursos certificados en emergencias, extinción de incendios, primeros auxilios y prevención de riesgos laborales." : (D.categories.find(c => c.slug === active) || {}).blurb))), /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-10) var(--container-padding) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap"
    }
  }, cats.map(c => {
    const on = active === c.slug;
    return /*#__PURE__*/React.createElement("button", {
      key: c.slug,
      onClick: () => setActive(c.slug),
      style: {
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-semibold)",
        padding: "10px 18px",
        borderRadius: "var(--radius-full)",
        cursor: "pointer",
        border: `1px solid ${on ? "var(--color-ink)" : "var(--border-default)"}`,
        background: on ? "var(--color-ink)" : "var(--surface-card)",
        color: on ? "#fff" : "var(--text-body)",
        transition: "all var(--duration-base) var(--ease-standard)"
      }
    }, c.name);
  }))), /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-10) var(--container-padding) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "var(--space-6)"
    }
  }, list.map(c => /*#__PURE__*/React.createElement(ProductCard, {
    key: c.id,
    title: c.title,
    image: c.img,
    code: c.code,
    norm: c.norm,
    recommended: c.recommended,
    cover: true,
    bullets: c.bullets,
    ctaLabel: "Ver curso",
    onClick: e => {
      e.preventDefault();
      onNav("course", c.id);
    }
  })))));
}
window.CatalogScreen = CatalogScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CatalogScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
// Store-style chrome: two-row header (search + login) with mega-menus + dark footer
const {
  SearchBar
} = window.GEPCOFormaciNDesignSystem_bb6094;
const D = window.GEPCO_DATA;

// --- Simple line icons (functional UI icons) ---
function Icon({
  name,
  size = 22,
  stroke = 2
}) {
  const paths = {
    flame: /*#__PURE__*/React.createElement("path", {
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"
    }),
    shield: /*#__PURE__*/React.createElement("path", {
      d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    }),
    siren: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M7 18v-6a5 5 0 0 1 10 0v6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 21h16"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2v2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m4.2 6.2 1.4 1.4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m19.8 6.2-1.4 1.4"
    })),
    mountain: /*#__PURE__*/React.createElement("path", {
      d: "m3 20 6.5-11 4 6 2.5-4L21 20z"
    }),
    heart: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3.2 12h4l1.5-3 2 5 1.8-4 1.2 2h4.9"
    })),
    hardhat: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 10V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 16v-3a6 6 0 0 1 6-6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 7a6 6 0 0 1 6 6v3"
    })),
    broadcast: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16.24 7.76a6 6 0 0 1 0 8.49m-8.48 0a6 6 0 0 1 0-8.49m11.31-2.83a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"
    })),
    building: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "5",
      y: "2",
      width: "14",
      height: "20",
      rx: "1.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 22v-4h6v4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01"
    })),
    cap: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M22 10 12 5 2 10l10 5 10-5z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5"
    })),
    shieldCheck: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m9 12 2 2 4-4"
    })),
    ribbon: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "8",
      r: "6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8.2 13.9 7 22l5-3 5 3-1.2-8.1"
    }))
  }[name];
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, paths);
}
const CURSOS = {
  left: {
    title: "Especialidades",
    items: [{
      icon: "flame",
      name: "Incendios",
      cat: "extincion",
      subs: [{
        t: "Extinción de Incendios",
        go: ["course", "extincion-basico"]
      }]
    }, {
      icon: "shield",
      name: "Bomberos",
      cat: "bombero",
      subs: [{
        t: "Bombero de Empresa",
        go: ["course", "bombero-empresa"]
      }]
    }, {
      icon: "siren",
      name: "Emergencias",
      cat: "emergencias",
      subs: [{
        t: "Jefe de Emergencia",
        go: ["course", "jefes-emergencia"]
      }, {
        t: "Plan de Autoprotección",
        go: ["catalog", "emergencias"]
      }]
    }, {
      icon: "mountain",
      name: "Altura y Trabajos Verticales",
      cat: "prl",
      subs: [{
        t: "Trabajos en Altura",
        go: ["course", "altura"]
      }, {
        t: "Trabajos Verticales",
        go: ["course", "verticales"]
      }]
    }]
  },
  right: {
    title: "Otras formaciones",
    items: [{
      icon: "heart",
      name: "Primeros Auxilios",
      cat: "auxilios",
      subs: [{
        t: "SVB y DEA",
        go: ["course", "svb-dea"]
      }]
    }, {
      icon: "hardhat",
      name: "PRL",
      cat: "prl",
      subs: [{
        t: "Espacios Confinados",
        go: ["course", "confinados"]
      }]
    }, {
      icon: "broadcast",
      name: "Telco",
      cat: "prl",
      subs: [{
        t: "Riesgo Eléctrico TELCO",
        go: ["catalog", "prl"]
      }]
    }]
  }
};
const NOSOTROS = [{
  icon: "building",
  name: "Quiénes Somos"
}, {
  icon: "cap",
  name: "Equipo Docente"
}, {
  icon: "shieldCheck",
  name: "Instalaciones"
}, {
  icon: "ribbon",
  name: "Acreditaciones"
}];
function ColLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginBottom: "var(--space-4)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: "var(--color-brand)"
    }
  }, children);
}
function SubLink({
  s,
  onNav
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav(s.go[0], s.go[1]);
    },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      fontSize: "var(--text-sm)",
      color: h ? "var(--color-brand)" : "var(--text-body)",
      textDecoration: "none",
      padding: "2px 0",
      transition: "color var(--duration-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--color-brand)",
      fontWeight: "var(--weight-bold)",
      fontSize: "var(--text-xs)",
      transform: h ? "translateX(3px)" : "none",
      transition: "transform var(--duration-fast) var(--ease-standard)"
    }
  }, "\u203A"), s.t);
}
function SpecialtyItem({
  it,
  onNav
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("catalog", it.cat);
    },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "11px",
      textDecoration: "none",
      marginBottom: "2px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      width: "36px",
      height: "36px",
      borderRadius: "var(--radius-md)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: h ? "var(--color-brand)" : "var(--color-brand-soft)",
      color: h ? "#fff" : "var(--color-brand)",
      transition: "background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-heading)",
      textTransform: "uppercase",
      color: h ? "var(--color-brand)" : "var(--text-strong)",
      transition: "color var(--duration-fast) var(--ease-standard)"
    }
  }, it.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      paddingLeft: "47px"
    }
  }, it.subs.map(s => /*#__PURE__*/React.createElement(SubLink, {
    key: s.t,
    s: s,
    onNav: onNav
  }))));
}
function CursosCol({
  col,
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ColLabel, null, col.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, col.items.map(it => /*#__PURE__*/React.createElement(SpecialtyItem, {
    key: it.name,
    it: it,
    onNav: onNav
  }))));
}
function CursosMenu({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-xl)",
      overflow: "hidden",
      boxShadow: "var(--shadow-lg)",
      border: "1px solid var(--border-default)",
      marginTop: "6px",
      width: "720px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "4px",
      background: "linear-gradient(90deg, var(--color-brand), var(--color-accent))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(CursosCol, {
    col: CURSOS.left,
    onNav: onNav
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)",
      borderLeft: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement(CursosCol, {
    col: CURSOS.right,
    onNav: onNav
  }))));
}
function NosotrosRow({
  it,
  onNav
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("nosotros");
    },
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "8px var(--space-3)",
      borderRadius: "var(--radius-md)",
      textDecoration: "none",
      color: "var(--text-strong)",
      background: h ? "var(--surface-sunken)" : "transparent",
      transition: "background var(--duration-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      width: "36px",
      height: "36px",
      borderRadius: "var(--radius-md)",
      background: h ? "var(--color-brand)" : "var(--color-brand-soft)",
      color: h ? "#fff" : "var(--color-brand)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-heading)",
      textTransform: "uppercase",
      color: h ? "var(--color-brand)" : "var(--text-strong)",
      transition: "color var(--duration-fast) var(--ease-standard)"
    }
  }, it.name), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: "var(--color-brand)",
      fontSize: "15px",
      fontWeight: "var(--weight-bold)",
      transform: h ? "translateX(3px)" : "none",
      transition: "transform var(--duration-fast) var(--ease-standard)"
    }
  }, "\u203A"));
}
function NosotrosMenu({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-xl)",
      overflow: "hidden",
      boxShadow: "var(--shadow-lg)",
      border: "1px solid var(--border-default)",
      maxWidth: "420px",
      marginTop: "6px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "4px",
      background: "linear-gradient(90deg, var(--color-brand), var(--color-accent))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-3)"
    }
  }, NOSOTROS.map(it => /*#__PURE__*/React.createElement(NosotrosRow, {
    key: it.name,
    it: it,
    onNav: onNav
  }))));
}
function NavTrigger({
  label,
  open,
  onEnter,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onMouseEnter: onEnter,
    onFocus: onEnter,
    onClick: onClick,
    "aria-expanded": open,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 14px",
      borderRadius: "var(--radius-md)",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-strong)",
      background: open ? "var(--color-surface-muted)" : "transparent",
      transition: "background var(--duration-fast) var(--ease-standard)"
    }
  }, label, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: "11px",
      color: "var(--text-subtle)",
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform var(--duration-fast) var(--ease-standard)"
    }
  }, "\u25BE"));
}
function NavLink({
  label,
  onClick
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: onClick,
    onMouseEnter: e => e.currentTarget.style.background = "var(--color-surface-muted)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent",
    style: {
      padding: "8px 14px",
      borderRadius: "var(--radius-md)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-strong)",
      textDecoration: "none",
      transition: "background var(--duration-fast) var(--ease-standard)"
    }
  }, label);
}
function CollapsibleSearch() {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => {
      if (inputRef.current && !inputRef.current.value) setOpen(false);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      height: "42px",
      width: open ? "320px" : "42px",
      padding: open ? "0 16px" : "0",
      background: "var(--color-surface-muted)",
      border: "1px solid " + (open ? "var(--border-hover)" : "transparent"),
      borderRadius: "var(--radius-full)",
      overflow: "hidden",
      cursor: "text",
      transition: "width var(--duration-base) var(--ease-standard), padding var(--duration-base) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)"
    },
    onClick: () => {
      setOpen(true);
      if (inputRef.current) inputRef.current.focus();
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 auto",
      width: open ? "auto" : "42px",
      height: "42px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--text-subtle)"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m20 20-3.2-3.2"
  }))), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "text",
    placeholder: "Buscar formaci\xF3n, certificaci\xF3n\u2026",
    "aria-label": "Buscar",
    onBlur: () => {
      if (inputRef.current && !inputRef.current.value) setOpen(false);
    },
    style: {
      flex: 1,
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      color: "var(--text-strong)",
      opacity: open ? 1 : 0,
      transition: "opacity var(--duration-fast) var(--ease-standard)"
    }
  }));
}
function Navbar({
  onNav
}) {
  const [open, setOpen] = React.useState(null); // 'cursos' | 'nosotros' | null
  return /*#__PURE__*/React.createElement("header", {
    onMouseLeave: () => setOpen(null),
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-default)",
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "14px var(--container-padding)",
      display: "flex",
      alignItems: "center",
      gap: "28px"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav("home");
    },
    style: {
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: D.logoDark,
    alt: "GEPCO Formaci\xF3n",
    style: {
      height: "40px",
      objectFit: "contain"
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "4px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setOpen("cursos")
  }, /*#__PURE__*/React.createElement(NavTrigger, {
    label: "Cursos",
    open: open === "cursos",
    onEnter: () => setOpen("cursos"),
    onClick: () => onNav("catalog")
  })), /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setOpen("nosotros")
  }, /*#__PURE__*/React.createElement(NavTrigger, {
    label: "Nosotros",
    open: open === "nosotros",
    onEnter: () => setOpen("nosotros"),
    onClick: () => onNav("nosotros")
  })), /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setOpen(null)
  }, /*#__PURE__*/React.createElement(NavLink, {
    label: "Blog",
    onClick: e => {
      e.preventDefault();
      onNav("blog");
    }
  })), /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setOpen(null)
  }, /*#__PURE__*/React.createElement(NavLink, {
    label: "Contacto",
    onClick: e => {
      e.preventDefault();
      onNav("contact");
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      alignItems: "center",
      gap: "16px"
    },
    onMouseEnter: () => setOpen(null)
  }, /*#__PURE__*/React.createElement(CollapsibleSearch, null), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "1px",
      height: "26px",
      background: "var(--border-default)"
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "34px",
      height: "34px",
      borderRadius: "var(--radius-full)",
      background: "var(--color-brand)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21c0-4 4-6 8-6s8 2 8 6"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-body)",
      whiteSpace: "nowrap"
    }
  }, "Hola, ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-strong)",
      fontWeight: "var(--weight-semibold)"
    }
  }, "alumno/a"))))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "0 var(--container-padding)",
      display: "flex",
      justifyContent: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", null, open === "cursos" ? /*#__PURE__*/React.createElement(CursosMenu, {
    onNav: onNav
  }) : /*#__PURE__*/React.createElement(NosotrosMenu, {
    onNav: onNav
  })))));
}
function Footer() {
  const offices = [{
    city: "Sabadell",
    lines: ["C. Moratín, 100", "08206 Sabadell · Barcelona", "T. 935 646 346"]
  }, {
    city: "Madrid",
    lines: ["C. Primavera, 1", "28500 Arganda del Rey · Madrid", "T. 916 263 818"]
  }, {
    city: "Cádiz",
    lines: ["C. Hungría, 11 · Nave 1B", "11011 Cádiz", "T. 916 263 818"]
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--surface-inverse)",
      color: "var(--text-on-dark)",
      marginTop: "var(--section-y)",
      fontFamily: "var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "var(--space-20) var(--container-padding) var(--space-10)",
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
      gap: "var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: D.logoLight,
    alt: "GEPCO Formaci\xF3n",
    style: {
      height: "48px",
      objectFit: "contain",
      marginBottom: "18px"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-sm)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-on-dark-muted)",
      maxWidth: "300px"
    }
  }, "Escuela de Emergencias y PRL. Centro homologado por el ISPC. M\xE1s de 15 a\xF1os formando profesionales.")), offices.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.city
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      color: "var(--color-brand)",
      marginBottom: "12px"
    }
  }, o.city), o.lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontSize: "var(--text-sm)",
      color: "var(--text-on-dark-muted)",
      lineHeight: "var(--leading-loose)"
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-on-dark)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "var(--space-5) var(--container-padding)",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "12px",
      fontSize: "var(--text-xs)",
      color: "var(--text-on-dark-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "\xA9 2010\u20132024 \xB7 GEP&RISK 112 SL"), /*#__PURE__*/React.createElement("span", null, "Privacidad \xB7 Aviso Legal \xB7 T\xE9rminos y condiciones \xB7 Cookies"))));
}
Object.assign(window, {
  Navbar,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactScreen.jsx
try { (() => {
// Contacto — panel oscuro partido con formulario segmentado B2B
const {
  Button,
  Input,
  Select,
  Checkbox,
  StatBlock
} = window.GEPCOFormaciNDesignSystem_bb6094;
const D = window.GEPCO_DATA;
const Container = window.Container;
function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  const [accept, setAccept] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-card)",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-xl)",
      overflow: "hidden",
      display: "grid",
      gridTemplateColumns: "1fr 1.1fr",
      boxShadow: "var(--shadow-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--color-dark)",
      color: "#fff",
      padding: "var(--space-16)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      minHeight: "600px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: D.hero,
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(15,15,15,0.7), rgba(15,15,15,0.92))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      color: "var(--color-brand)"
    }
  }, "Contacto"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "12px 0 20px",
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2rem,3.6vw,3rem)",
      fontWeight: "var(--weight-extrabold)",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-tight)"
    }
  }, "Contacte con nosotros", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 40px",
      fontSize: "var(--text-lg)",
      lineHeight: "var(--leading-normal)",
      color: "rgba(255,255,255,0.8)",
      maxWidth: "420px"
    }
  }, "Rellena el formulario y un asesor se pondr\xE1 en contacto contigo con propuesta, calendario y presupuesto."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-10)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "24 h",
    label: "Respuesta media",
    onDark: true
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "3",
    label: "Sedes en Espa\xF1a",
    onDark: true
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--color-dark-soft)",
      color: "#fff",
      padding: "var(--space-16)"
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "var(--space-16) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "44px",
      marginBottom: "12px",
      color: "var(--color-success)"
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 8px",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-2xl)",
      fontWeight: "var(--weight-bold)"
    }
  }, "\xA1Gracias por tu mensaje!"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--text-on-dark-muted)"
    }
  }, "Se ha enviado correctamente. Te respondemos en menos de 24 h.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (accept) setSent(true);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    theme: "dark",
    label: "Nombre *",
    placeholder: "Tu nombre"
  }), /*#__PURE__*/React.createElement(Input, {
    theme: "dark",
    label: "Empresa",
    placeholder: "Raz\xF3n social"
  }), /*#__PURE__*/React.createElement(Input, {
    theme: "dark",
    label: "Email *",
    type: "email",
    placeholder: "tu@empresa.com"
  }), /*#__PURE__*/React.createElement(Input, {
    theme: "dark",
    label: "Tel\xE9fono *",
    placeholder: "+34 600 000 000"
  })), /*#__PURE__*/React.createElement(Select, {
    theme: "dark",
    label: "Solicitas informaci\xF3n como\u2026",
    placeholder: "Elige una opci\xF3n",
    options: ["Individual / Autónomo / Particular", "Empresa (menos de 5 personas)", "Empresa / Grupos / Formación adaptada"]
  }), /*#__PURE__*/React.createElement(Select, {
    theme: "dark",
    label: "Ubicaci\xF3n de la formaci\xF3n",
    placeholder: "Elige una opci\xF3n",
    options: ["Sabadell", "Madrid", "Resto Península (Sólo empresas)"]
  }), /*#__PURE__*/React.createElement(Input, {
    theme: "dark",
    label: "Observaciones (opcional)",
    placeholder: "Cu\xE9ntanos qu\xE9 necesitas"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    theme: "dark",
    checked: accept,
    onChange: e => setAccept(e.target.checked),
    label: /*#__PURE__*/React.createElement("span", null, "He le\xEDdo y acepto la ", /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        color: "#fff",
        textDecoration: "underline"
      }
    }, "Pol\xEDtica de Privacidad"), " y el ", /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        color: "#fff",
        textDecoration: "underline"
      }
    }, "Aviso Legal"), ".")
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "primary",
    size: "lg",
    uppercase: true,
    disabled: !accept,
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192")
  }, "Enviar solicitud"))))));
}
window.ContactScreen = ContactScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CourseScreen.jsx
try { (() => {
// Ficha de curso — hero, datos, descripción, plan (accordion), reserva sticky, relacionados
const {
  Button,
  Select,
  Badge,
  NormBadge,
  Accordion,
  StatBlock,
  ProductCard,
  IconButton
} = window.GEPCOFormaciNDesignSystem_bb6094;
const D = window.GEPCO_DATA;
const Container = window.Container;
const PLAN = [{
  q: "UF1 · Marco normativo y organización",
  a: "Decreto 374/1996, funciones del bombero/a de empresa, planes de autoprotección y coordinación con servicios públicos."
}, {
  q: "UF2 · Prevención y protección contra incendios",
  a: "Comportamiento del fuego, agentes extintores, instalaciones fijas y manuales, mantenimiento de equipos."
}, {
  q: "UF3 · Intervención y prácticas",
  a: "Técnicas de extinción, casa de humo, rescate y prácticas en Campo de Fuego. Evaluación teórico-práctica por UF."
}];
function CourseScreen({
  courseId,
  onNav
}) {
  const course = D.courses.find(c => c.id === courseId) || D.courses[0];
  const catName = slug => (D.categories.find(c => c.slug === slug) || {}).name || "";
  const related = D.courses.filter(c => c.cat === course.cat && c.id !== course.id).slice(0, 3);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--color-dark)",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--section-y) var(--container-padding)",
      display: "grid",
      gridTemplateColumns: "1.05fr 0.95fr",
      gap: "var(--space-16)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav("catalog", course.cat),
    style: {
      background: "none",
      border: "none",
      color: "var(--color-brand)",
      cursor: "pointer",
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      padding: 0,
      marginBottom: "20px"
    }
  }, "\u2190 ", catName(course.cat)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      marginBottom: "20px",
      flexWrap: "wrap"
    }
  }, course.recommended && /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "Recomendado"), course.outOfStock ? /*#__PURE__*/React.createElement(Badge, {
    tone: "onDark",
    dot: true
  }, "Sin plazas") : /*#__PURE__*/React.createElement(Badge, {
    tone: "onDark",
    dot: true
  }, "Plazas disponibles"), /*#__PURE__*/React.createElement(NormBadge, {
    onDark: true
  }, course.norm)), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "0 0 18px",
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2.2rem,4.4vw,3.4rem)",
      fontWeight: "var(--weight-extrabold)",
      lineHeight: "var(--leading-tight)",
      letterSpacing: "var(--tracking-display)"
    }
  }, course.title, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      color: "rgba(255,255,255,0.6)",
      marginBottom: "16px"
    }
  }, "REF \xB7 ", course.code), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-lg)",
      lineHeight: "var(--leading-normal)",
      color: "rgba(255,255,255,0.8)",
      maxWidth: "520px"
    }
  }, "Formaci\xF3n certificada conforme a la normativa vigente. Preparaci\xF3n te\xF3rica y pr\xE1ctica con instructores en activo y aforo reducido.")), /*#__PURE__*/React.createElement("img", {
    src: course.img,
    alt: course.title,
    style: {
      width: "100%",
      height: "380px",
      objectFit: "cover",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-lg)"
    }
  }))), /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--section-y) var(--container-padding)",
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr",
      gap: "var(--space-16)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 var(--space-6)",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-2xl)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)"
    }
  }, "Informaci\xF3n b\xE1sica", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, ".")), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1px",
      background: "var(--border-default)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, [{
    k: "Certificación",
    v: course.norm
  }, {
    k: "Aforo máximo",
    v: "15 alumnos"
  }, {
    k: "Modalidad",
    v: "Teórico-práctica"
  }, {
    k: "Detalle",
    v: course.bullets[0]
  }].map(f => /*#__PURE__*/React.createElement("div", {
    key: f.k,
    style: {
      background: "var(--surface-card)",
      padding: "var(--space-5) var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontSize: "var(--text-xs)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      color: "var(--text-subtle)",
      marginBottom: "6px"
    }
  }, f.k), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      fontSize: "var(--text-base)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-strong)",
      lineHeight: "var(--leading-snug)"
    }
  }, f.v))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 var(--space-4)",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-2xl)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)"
    }
  }, "Descripci\xF3n", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 14px",
      fontSize: "var(--text-base)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-body)"
    }
  }, "Esta formaci\xF3n prepara a los profesionales para organizar equipos, intervenir en emergencias, evaluar riesgos y aplicar las normas de seguridad necesarias en cada situaci\xF3n, con un enfoque eminentemente pr\xE1ctico."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-base)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-body)"
    }
  }, "Al finalizar recibir\xE1s la acreditaci\xF3n correspondiente. Nuestro equipo te acompa\xF1a en el proceso de habilitaci\xF3n y renovaci\xF3n.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 var(--space-6)",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-2xl)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)"
    }
  }, "Plan de estudios", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, ".")), /*#__PURE__*/React.createElement(Accordion, {
    defaultOpen: [0],
    items: PLAN
  }))), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "sticky",
      top: "168px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-md)",
      padding: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      marginBottom: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-xl)",
      fontWeight: "var(--weight-bold)",
      color: "var(--text-strong)"
    }
  }, "Reserva tu plaza."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      color: "var(--color-brand)"
    }
  }, course.norm)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Localizaci\xF3n",
    placeholder: "Elige una opci\xF3n",
    options: ["Sabadell", "Madrid"]
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Fechas",
    placeholder: "Elige una opci\xF3n",
    options: ["20/05/2025", "23/10/2025"]
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    size: "lg",
    uppercase: true,
    disabled: course.outOfStock,
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192")
  }, course.outOfStock ? "Sin plazas" : "Añadir al carrito"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    block: true,
    onClick: () => onNav("contact")
  }, "Solicita informaci\xF3n")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "var(--space-8)",
      paddingTop: "var(--space-6)",
      borderTop: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "+2.400",
    label: "Certificados"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "24 h",
    label: "Respuesta"
  }))))), related.length > 0 && /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-sunken)",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 var(--space-10)",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-2xl)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)"
    }
  }, "Formaciones relacionadas", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "var(--space-6)"
    }
  }, related.map(c => /*#__PURE__*/React.createElement(ProductCard, {
    key: c.id,
    title: c.title,
    image: c.img,
    code: c.code,
    norm: c.norm,
    recommended: c.recommended,
    cover: true,
    bullets: c.bullets,
    ctaLabel: "Ver curso",
    onClick: e => {
      e.preventDefault();
      onNav("course", c.id);
    }
  }))))));
}
window.CourseScreen = CourseScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CourseScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
// GEPCO Formación — Home (UX-led, GEP premium language, tightened)
const {
  Button,
  IconButton,
  Badge,
  NormBadge,
  ProductCard,
  CategoryCard,
  SectionHeading,
  StatBlock,
  Input,
  Select,
  Checkbox
} = window.GEPCOFormaciNDesignSystem_bb6094;
const D = window.GEPCO_DATA;
function Container({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "0 var(--container-padding)",
      ...style
    }
  }, children);
}
window.Container = Container;

// Horizontal scroll carousel — single row, never wraps; arrows appear when overflowing
function HScroll({
  itemWidth,
  children
}) {
  const ref = React.useRef(null);
  const [st, setSt] = React.useState({
    l: false,
    r: false
  });
  const update = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setSt({
      l: el.scrollLeft > 4,
      r: el.scrollLeft < el.scrollWidth - el.clientWidth - 4
    });
  }, []);
  React.useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", update, {
      passive: true
    });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);
  const page = dir => {
    const el = ref.current;
    if (el) el.scrollBy({
      left: dir * el.clientWidth * 0.85,
      behavior: "smooth"
    });
  };
  const Arrow = ({
    dir,
    show
  }) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": dir < 0 ? "Anterior" : "Siguiente",
    onClick: () => page(dir),
    style: {
      position: "absolute",
      top: "calc(50% - 5px)",
      [dir < 0 ? "left" : "right"]: "-10px",
      transform: "translateY(-50%)",
      width: "48px",
      height: "48px",
      borderRadius: "var(--radius-full)",
      border: "1px solid var(--border-default)",
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-md)",
      cursor: "pointer",
      display: show ? "flex" : "none",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
      lineHeight: 1,
      color: "var(--text-strong)",
      zIndex: 3
    }
  }, dir < 0 ? "\u2039" : "\u203A");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(Arrow, {
    dir: -1,
    show: st.l
  }), /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "gepco-hscroll",
    style: {
      display: "flex",
      gap: "var(--space-6)",
      overflowX: "auto",
      scrollSnapType: "x proximity",
      paddingBottom: "6px"
    }
  }, React.Children.toArray(children).filter(Boolean).map((ch, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: `0 0 ${itemWidth}`,
      scrollSnapAlign: "start"
    }
  }, ch))), /*#__PURE__*/React.createElement(Arrow, {
    dir: 1,
    show: st.r
  }));
}
window.HScroll = HScroll;

// Hero conversion card — ONE next intake, not a duplicate grid
function IntakeCard({
  course,
  onNav
}) {
  const facts = [{
    k: "Próxima fecha",
    v: "20 May 2025"
  }, {
    k: "Sede",
    v: "Sabadell · Campo de Fuego"
  }, {
    k: "Plazas",
    v: course.outOfStock ? "Lista de espera" : "Últimas 4"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-lg)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "16 / 9"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: course.img,
    alt: course.title,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "14px",
      left: "14px",
      display: "flex",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "M\xE1s solicitado"), /*#__PURE__*/React.createElement(NormBadge, {
    onDark: true
  }, course.norm))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 14px",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--weight-bold)",
      lineHeight: "var(--leading-snug)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)"
    }
  }, course.title), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: "0 0 18px",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, facts.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.k,
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: "12px",
      fontSize: "var(--text-sm)",
      paddingBottom: "8px",
      borderBottom: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      color: "var(--text-subtle)"
    }
  }, f.k), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      color: "var(--text-strong)",
      fontWeight: "var(--weight-semibold)",
      textAlign: "right"
    }
  }, f.v)))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192"),
    onClick: () => onNav("course", course.id)
  }, "Ver curso y reservar")));
}
function Hero({
  onNav
}) {
  const heroCourse = D.courses.find(c => c.id === "bombero-empresa") || D.courses[0];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "var(--color-dark)",
      color: "#fff",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: D.hero,
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.42
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(100deg, rgba(16,18,22,0.96) 0%, rgba(16,18,22,0.74) 52%, rgba(16,18,22,0.42) 100%)"
    }
  }), /*#__PURE__*/React.createElement(Container, {
    style: {
      position: "relative",
      padding: "var(--section-y) var(--container-padding)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.3fr 0.85fr",
      gap: "var(--space-16)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginBottom: "26px"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand",
    dot: true
  }, "Plazas abiertas"), /*#__PURE__*/React.createElement(Badge, {
    tone: "onDark"
  }, "Centro homologado ISPC")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "0 0 22px",
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2.5rem, 5.4vw, 4.25rem)",
      fontWeight: "var(--weight-extrabold)",
      lineHeight: "var(--leading-tight)",
      letterSpacing: "var(--tracking-display)"
    }
  }, "Forma a tu equipo en emergencias y ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, "PRL"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 32px",
      fontSize: "var(--text-xl)",
      lineHeight: "var(--leading-normal)",
      color: "rgba(255,255,255,0.85)",
      maxWidth: "520px"
    }
  }, "Cursos certificados en extinci\xF3n de incendios, bombero de empresa, primeros auxilios y prevenci\xF3n de riesgos. Formaci\xF3n pr\xE1ctica para empresas y profesionales."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192"),
    onClick: () => onNav("catalog")
  }, "Ver formaciones"), /*#__PURE__*/React.createElement(Button, {
    variant: "onDark",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\u2706"),
    onClick: () => onNav("contact")
  }, "Pedir propuesta a medida"))), /*#__PURE__*/React.createElement(IntakeCard, {
    course: heroCourse,
    onNav: onNav
  }))));
}

// Slim trust bar — real proof, replaces scattered stat blocks
function TrustBar() {
  const items = [{
    v: "ISPC",
    l: "Centro homologado"
  }, {
    v: "+15 años",
    l: "Formando profesionales"
  }, {
    v: "3 sedes",
    l: "Sabadell · Madrid · Cádiz"
  }, {
    v: "24 h",
    l: "Respuesta a solicitudes"
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      padding: "var(--space-8) var(--container-padding)",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "var(--space-6)"
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement(StatBlock, {
    key: i,
    value: it.v,
    label: it.l
  }))));
}
function Categorias({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-page)",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Explora por \xE1rea",
    title: `Encuentra tu formación en ${D.categories.length} áreas`,
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      onClick: () => onNav("catalog")
    }, "Ver todo el cat\xE1logo")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement(HScroll, {
    itemWidth: "300px"
  }, D.categories.map((cat, i) => {
    const thumbs = D.courses.filter(c => c.cat === cat.slug).slice(0, 3).map(c => c.img);
    return /*#__PURE__*/React.createElement(CategoryCard, {
      key: cat.slug,
      index: i + 1,
      name: cat.name,
      count: cat.count,
      subcount: cat.subcount,
      thumbs: thumbs,
      onClick: e => {
        e.preventDefault();
        onNav("catalog", cat.slug);
      }
    });
  })))));
}
function MasSolicitadas({
  onNav
}) {
  const list = D.courses.filter(c => c.recommended && c.id !== "bombero-empresa");
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-sunken)",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "M\xE1s solicitadas",
    title: "Formaciones destacadas de la temporada",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      onClick: () => onNav("catalog")
    }, "Ver todas")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement(HScroll, {
    itemWidth: "280px"
  }, list.map(c => /*#__PURE__*/React.createElement(ProductCard, {
    key: c.id,
    title: c.title,
    image: c.img,
    code: c.code,
    norm: c.norm,
    recommended: c.recommended,
    cover: true,
    bullets: c.bullets.slice(0, 2),
    ctaLabel: "Ver curso",
    onClick: e => {
      e.preventDefault();
      onNav("course", c.id);
    }
  }))))));
}
function Presupuesto({
  onNav
}) {
  const [accept, setAccept] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-page)",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--radius-xl)",
      overflow: "hidden",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      boxShadow: "var(--shadow-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--color-dark)",
      color: "#fff",
      padding: "var(--space-12)",
      minHeight: "520px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: D.heroQuote,
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.32
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(16,18,22,0.72), rgba(16,18,22,0.94))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginBottom: "16px",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: "var(--color-brand)"
    }
  }, "Formaci\xF3n para empresas"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 18px",
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)",
      fontWeight: "var(--weight-extrabold)",
      lineHeight: "var(--leading-tight)",
      letterSpacing: "var(--tracking-display)"
    }
  }, "Dise\xF1amos el plan a medida de tu empresa."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 32px",
      fontSize: "var(--text-lg)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-on-dark-muted)",
      maxWidth: "420px"
    }
  }, "Cu\xE9ntanos sector, n\xFAmero de personas y normativa aplicable. Te respondemos con propuesta, calendario y presupuesto cerrado."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-10)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "24 h",
    label: "Respuesta media",
    onDark: true
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "In company",
    label: "En tus instalaciones",
    onDark: true
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--color-dark-soft)",
      color: "#fff",
      padding: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 22px",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-2xl)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-heading)"
    }
  }, "P\xEDdenos una propuesta."), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (accept) onNav("contact");
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    theme: "dark",
    label: "Nombre",
    placeholder: "Tu nombre"
  }), /*#__PURE__*/React.createElement(Input, {
    theme: "dark",
    label: "Empresa",
    placeholder: "Raz\xF3n social"
  }), /*#__PURE__*/React.createElement(Input, {
    theme: "dark",
    label: "Email",
    type: "email",
    placeholder: "tu@empresa.com"
  }), /*#__PURE__*/React.createElement(Input, {
    theme: "dark",
    label: "Tel\xE9fono",
    placeholder: "+34 600 000 000"
  })), /*#__PURE__*/React.createElement(Select, {
    theme: "dark",
    label: "Solicitas como\u2026",
    placeholder: "Elige una opci\xF3n",
    options: ["Individual / Autónomo / Particular", "Empresa (menos de 5 personas)", "Empresa / Grupos / Formación adaptada"]
  }), /*#__PURE__*/React.createElement(Checkbox, {
    theme: "dark",
    checked: accept,
    onChange: e => setAccept(e.target.checked),
    label: /*#__PURE__*/React.createElement("span", null, "Acepto la ", /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        color: "#fff",
        textDecoration: "underline"
      }
    }, "Pol\xEDtica de Privacidad"), ".")
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "primary",
    size: "lg",
    disabled: !accept,
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192")
  }, "Enviar solicitud"))))));
}
function BlogPreview({
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-sunken)",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Recursos",
    title: "Desde el blog",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      onClick: () => onNav("blog")
    }, "Ver todos los art\xEDculos")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement(HScroll, {
    itemWidth: "360px"
  }, D.blog.map(p => /*#__PURE__*/React.createElement("article", {
    key: p.id,
    onClick: () => onNav("post", p.id),
    style: {
      cursor: "pointer",
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "16 / 10",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: p.title,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-mono)",
      color: "var(--color-brand)"
    }
  }, p.cat), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "10px 0 10px",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--weight-bold)",
      lineHeight: "var(--leading-snug)",
      letterSpacing: "var(--tracking-heading)",
      color: "var(--text-strong)"
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 14px",
      fontSize: "var(--text-sm)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-body)"
    }
  }, p.excerpt), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-bold)",
      color: "var(--color-ink)"
    }
  }, "Leer art\xEDculo ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, "\u2192")))))))));
}
function HomeScreen({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
    onNav: onNav
  }), /*#__PURE__*/React.createElement(TrustBar, null), /*#__PURE__*/React.createElement(Categorias, {
    onNav: onNav
  }), /*#__PURE__*/React.createElement(MasSolicitadas, {
    onNav: onNav
  }), /*#__PURE__*/React.createElement(Presupuesto, {
    onNav: onNav
  }), /*#__PURE__*/React.createElement(BlogPreview, {
    onNav: onNav
  }));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/NosotrosScreen.jsx
try { (() => {
// Nosotros — hero, propósito, stats, sedes, acreditación
const {
  Button,
  StatBlock,
  Badge
} = window.GEPCOFormaciNDesignSystem_bb6094;
const D = window.GEPCO_DATA;
const Container = window.Container;
function NosotrosScreen({
  onNav
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "var(--color-dark)",
      color: "#fff",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: D.heroQuote,
    alt: "",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(100deg, rgba(15,15,15,0.94), rgba(15,15,15,0.5))"
    }
  }), /*#__PURE__*/React.createElement(Container, {
    style: {
      position: "relative",
      padding: "var(--section-y) var(--container-padding)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      color: "var(--color-brand)"
    }
  }, "Nosotros"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "14px 0 20px",
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2.4rem,5vw,4rem)",
      fontWeight: "var(--weight-extrabold)",
      letterSpacing: "var(--tracking-display)",
      lineHeight: "var(--leading-tight)",
      maxWidth: "820px"
    }
  }, "M\xE1s de 15 a\xF1os formando a quienes protegen", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-xl)",
      color: "rgba(255,255,255,0.82)",
      maxWidth: "620px",
      lineHeight: "var(--leading-normal)"
    }
  }, "Somos una escuela de emergencias y PRL homologada por el ISPC. Formamos a profesionales y empresas con un enfoque pr\xE1ctico, instructores en activo y aforo reducido."))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-card)",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-16)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 18px",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-3xl)",
      fontWeight: "var(--weight-extrabold)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)"
    }
  }, "Nuestra misi\xF3n", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 14px",
      fontSize: "var(--text-lg)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-body)"
    }
  }, "Garantizar la m\xE1xima seguridad y protecci\xF3n de trabajadores y empresas, asegurando una intervenci\xF3n correcta ante cualquier emergencia."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 28px",
      fontSize: "var(--text-base)",
      lineHeight: "var(--leading-normal)",
      color: "var(--text-body)"
    }
  }, "Dise\xF1amos soluciones formativas efectivas y personalizadas para cada cliente, desde el particular hasta grandes equipos de empresa."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-12)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "+15",
    label: "A\xF1os de experiencia"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "3",
    label: "Sedes en Espa\xF1a"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "ISPC",
    label: "Centro homologado"
  }))), /*#__PURE__*/React.createElement("img", {
    src: D.hero,
    alt: "Formaci\xF3n pr\xE1ctica en emergencias",
    style: {
      width: "100%",
      height: "440px",
      objectFit: "cover",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-lg)"
    }
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--surface-sunken)",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginBottom: "12px",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: "var(--color-brand)"
    }
  }, "D\xF3nde estamos"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 var(--space-12)",
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-3xl)",
      fontWeight: "var(--weight-extrabold)",
      letterSpacing: "var(--tracking-display)",
      color: "var(--text-strong)"
    }
  }, "Tres sedes, cobertura nacional", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--color-brand)"
    }
  }, ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "var(--space-6)"
    }
  }, [{
    city: "Sabadell",
    addr: "C. Moratín, 100 · 08206 Sabadell, Barcelona",
    tel: "935 646 346"
  }, {
    city: "Madrid",
    addr: "C. Primavera, 1 · 28500 Arganda del Rey, Madrid",
    tel: "916 263 818"
  }, {
    city: "Cádiz",
    addr: "C. Hungría, 11 · Nave 1B · 11011 Cádiz",
    tel: "916 263 818"
  }].map(o => /*#__PURE__*/React.createElement("div", {
    key: o.city,
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-eyebrow)",
      color: "var(--color-brand)",
      marginBottom: "12px"
    }
  }, o.city), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-base)",
      color: "var(--text-body)",
      lineHeight: "var(--leading-normal)",
      marginBottom: "10px"
    }
  }, o.addr), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-sm)",
      color: "var(--text-strong)"
    }
  }, "T. ", o.tel)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-12)",
      display: "flex",
      gap: "12px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    uppercase: true,
    iconRight: /*#__PURE__*/React.createElement("span", null, "\u2192"),
    onClick: () => onNav("catalog")
  }, "Ver formaciones"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => onNav("contact")
  }, "Pedir informaci\xF3n")))));
}
window.NosotrosScreen = NosotrosScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/NosotrosScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
// GEPCO Formación — catalog data (real titles + images from gepcoformacion.es), GEP Commerce visual model
const CDN = "https://gepcoformacion.es/wp-content/uploads";
window.GEPCO_DATA = {
  categories: [{
    slug: "extincion",
    name: "Extinción de incendios",
    count: 6,
    subcount: 1,
    blurb: "Cursos teórico-prácticos, de nivel básico a avanzado, para actuar con eficacia ante el fuego."
  }, {
    slug: "bombero",
    name: "Bombero de empresa",
    count: 5,
    subcount: 1,
    blurb: "Formación oficial ISPC y renovación de la habilitación de Bombero/a de Empresa."
  }, {
    slug: "auxilios",
    name: "Primeros auxilios",
    count: 2,
    subcount: 1,
    blurb: "SVB, DEA y soporte vital con certificación oficial."
  }, {
    slug: "emergencias",
    name: "Emergencias",
    count: 3,
    subcount: 1,
    blurb: "Gestión de emergencias, jefes de intervención y equipos de respiración autónoma."
  }, {
    slug: "prl",
    name: "Prevención de Riesgos Laborales",
    count: 9,
    subcount: 5,
    blurb: "Espacios confinados, trabajos en altura, carretilla, andamios y TELCO."
  }, {
    slug: "medida",
    name: "Formación a medida",
    count: 2,
    subcount: 2,
    blurb: "Safety Day, Team Building y planes adaptados para empresas."
  }],
  courses: [{
    id: "bombero-empresa",
    title: "Curso Oficial de Bombero/a de Empresa",
    cat: "bombero",
    featured: true,
    recommended: true,
    code: "gepco-bombero-empresa-ispc",
    norm: "ISPC · 350 H",
    bullets: ["240 h presenciales + 110 online", "Certificación oficial ISPC", "Decreto 374/1996"],
    img: CDN + "/2025/03/Bomberos1-941x1024.jpeg"
  }, {
    id: "campo-fuego",
    title: "Curso avanzado en Campo de Fuego",
    cat: "extincion",
    outOfStock: true,
    featured: true,
    recommended: true,
    code: "gepco-campo-de-fuego",
    norm: "AVANZADO",
    bullets: ["Casa de humo y rescate", "Fuego real controlado", "Aforo 15 alumnos"],
    img: CDN + "/2024/09/campo-de-fuego-gepco-formacion-00.jpg"
  }, {
    id: "extincion-basico",
    title: "Curso de extinción de incendios",
    cat: "extincion",
    recommended: true,
    code: "gepco-extincion-basico",
    norm: "BÁSICO",
    bullets: ["Teórico-práctico", "Uso de extintor y BIE", "Certificado"],
    img: CDN + "/2024/02/extincion-fuego-basico-gepco-formacion-w.jpg"
  }, {
    id: "svb-dea",
    title: "Curso SVB y DEA (certificación oficial)",
    cat: "auxilios",
    recommended: true,
    code: "gepco-svb-dea-oficial",
    norm: "SVB + DEA",
    bullets: ["Soporte Vital Básico", "Desfibrilador DEA/DESA", "Certificación oficial"],
    img: CDN + "/2024/04/primeros-auxiliso-DEA-DESA-gepco-formacion-h-scaled.jpg"
  }, {
    id: "jefes-emergencia",
    title: "Curso Jefes de Emergencia y de Intervención",
    cat: "emergencias",
    recommended: true,
    code: "gepco-jefes-emergencia",
    norm: "PAU",
    bullets: ["Coordinación de equipos", "Planes de autoprotección", "Liderazgo en emergencia"],
    img: CDN + "/2024/02/Curso-Jefes-de-Emergencia.webp"
  }, {
    id: "era",
    title: "Curso Equipo de Respiración Autónomo (ERA)",
    cat: "emergencias",
    code: "gepco-era",
    norm: "ERA",
    bullets: ["Equipos autónomos", "Atmósferas peligrosas", "Práctica guiada"],
    img: CDN + "/2024/04/curso-emergencias-gepco-formacion.jpg"
  }, {
    id: "confinados",
    title: "Curso Espacios Confinados",
    cat: "prl",
    recommended: true,
    code: "gepco-espacios-confinados",
    norm: "PRL",
    bullets: ["Prevención y rescate", "Acceso limitado", "Normativa vigente"],
    img: CDN + "/2024/04/curso-de-espacios-confinados.webp"
  }, {
    id: "altura",
    title: "Curso de Trabajos en Altura",
    cat: "prl",
    code: "gepco-trabajos-altura",
    norm: "RD 2177/2004",
    bullets: ["Sistemas anticaídas", "EPI de altura", "Práctica en estructura"],
    img: CDN + "/2024/04/curso-especializado-telco-gepco-formacion.jpg"
  }, {
    id: "carretilla",
    title: "Curso Carretilla Elevadora",
    cat: "prl",
    code: "gepco-carretilla-elevadora",
    norm: "UNE 58451",
    bullets: ["Manejo seguro", "Teórico + práctico", "Carnet acreditativo"],
    img: CDN + "/2024/04/curso-carretilla-elevadora-gepco-formacion.jpg"
  }, {
    id: "riesgo-quimico",
    title: "Curso Riesgo Químico NBQ",
    cat: "extincion",
    code: "gepco-riesgo-quimico-nbq",
    norm: "NBQ",
    bullets: ["Productos peligrosos", "Autoprotección", "Descontaminación"],
    img: CDN + "/2024/04/riesgo-quimico-gepco-formacion.jpg"
  }, {
    id: "verticales",
    title: "Curso de Trabajos Verticales",
    cat: "prl",
    code: "gepco-trabajos-verticales",
    norm: "PRL",
    bullets: ["Técnicas de cuerda", "Rescate en suspensión", "Práctica real"],
    img: CDN + "/2024/04/curso-trabajos-verticales-gepco-formacion.jpg"
  }, {
    id: "andamios",
    title: "Curso montaje y desmontaje de Andamios",
    cat: "prl",
    code: "gepco-andamios",
    norm: "PRL",
    bullets: ["Montaje seguro", "Inspección", "Normativa"],
    img: CDN + "/2024/02/montage-andamios-gepco-formacion.jpg"
  }, {
    id: "safety-day",
    title: "Safety Day — jornada de seguridad",
    cat: "medida",
    recommended: true,
    code: "gepco-safety-day",
    norm: "A MEDIDA",
    bullets: ["Jornada in company", "Talleres prácticos", "Para equipos"],
    img: CDN + "/2024/04/Cursos-de-formacion-de-emergencia-a-medida.webp"
  }, {
    id: "team-building",
    title: "Team Building — Seguridad esencial",
    cat: "medida",
    code: "gepco-team-building",
    norm: "A MEDIDA",
    bullets: ["Trabajo en equipo", "Emergencias simuladas", "Para empresas"],
    img: CDN + "/2024/02/avanzado-en-lucha-contra-incendios.webp"
  }],
  blog: [{
    id: "epis-bomberos",
    title: "Mantenimiento y uso profesional de EPIs de bomberos",
    cat: "Extinción de incendios",
    excerpt: "Los EPI son la primera línea de protección en el sector de la seguridad industrial y las emergencias.",
    img: CDN + "/2024/03/EPIs-revisados-y-puestos-3.jpeg"
  }, {
    id: "normativa-desfibriladores",
    title: "Normativa sobre desfibriladores (DEA) en España",
    cat: "Primeros auxilios",
    excerpt: "Qué instalaciones deben disponer de un DEA/DESA y cómo afecta a tu empresa.",
    img: CDN + "/2024/03/Que-instalaciones-deben-tener-un-DESA-o-desfibrilador-min-11.jpg"
  }, {
    id: "contacto-electrico-indirecto",
    title: "Diferencia entre el contacto eléctrico directo e indirecto",
    cat: "PRL",
    excerpt: "Guía práctica para responsables de seguridad que trabajan con instalaciones eléctricas.",
    img: CDN + "/2024/04/curso-riesgo-electrico-gepco-formacion.jpg"
  }],
  logoDark: CDN + "/2024/02/logo-GEPCO-Formacion.png",
  logoLight: CDN + "/2024/03/LOGO-FOOTER-GEPCO.png",
  hero: CDN + "/2025/03/Bomberos4.jpg",
  heroQuote: CDN + "/2025/03/emergency-management-bushfire.jpg",
  ispc: CDN + "/2025/03/logo-ISPC-Generalitat.png",
  // Company stats — [PENDIENTE: cifras reales]
  stats: [{
    value: "34",
    label: "Formaciones en catálogo"
  }, {
    value: "6",
    label: "Áreas de especialidad"
  }, {
    value: "24 h",
    label: "Respuesta a solicitudes"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.NormBadge = __ds_scope.NormBadge;

__ds_ns.CategoryCard = __ds_scope.CategoryCard;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.SearchBar = __ds_scope.SearchBar;

})();
