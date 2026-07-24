import React from 'react';
import { cx } from '../../lib/cx.js';

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
  return (
    <div className="flex flex-col gap-3 font-body">
      {items.map((it, i) => {
        const isOpen = open.has(i);
        return (
          <div key={i} className="bg-surface border border-border rounded-md overflow-hidden">
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className={cx(
                'w-full flex items-center justify-between gap-[16px] text-left py-4 px-6 bg-transparent border-none cursor-pointer font-display text-lg font-semibold',
                isOpen ? 'text-brand' : 'text-strong'
              )}
            >
              <span>{it.q}</span>
              <span
                className={cx(
                  'flex-none w-[24px] h-[24px] flex items-center justify-center text-brand text-[22px] leading-none transition-transform duration-base ease-standard',
                  isOpen ? 'rotate-45' : 'rotate-0'
                )}
              >+</span>
            </button>
            <div
              className="overflow-hidden"
              style={{
                maxHeight: isOpen ? "600px" : "0",
                opacity: isOpen ? 1 : 0,
                transition: "max-height var(--duration-base) var(--ease-standard), opacity var(--duration-base) var(--ease-standard)"
              }}
            >
              <div className="pt-0 px-6 pb-6 text-base leading-normal text-body">{it.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { Accordion };
