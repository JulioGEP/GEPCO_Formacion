import React from 'react';

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

export { Accordion };
