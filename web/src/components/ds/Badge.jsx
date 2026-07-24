import React from 'react';
import { cx } from '../../lib/cx.js';

const toneCls = {
  brand: 'bg-brand text-white border-transparent',
  dark: 'bg-ink text-white border-transparent',
  soft: 'bg-surface-muted text-ink border-transparent',
  outline: 'bg-transparent text-ink border-[color:var(--border-strong,var(--border-hover))]',
  onDark: 'bg-white/[0.12] text-white border-white/20',
  success: 'bg-success text-white border-transparent',
  outStock: 'bg-[var(--color-stock-out)] text-white border-transparent',
};

/** Small status / category pill (uppercase, tracked). */
function Badge({ children, tone = 'soft', dot = false }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-[7px] font-body text-xs font-semibold tracking-[0.10em] uppercase leading-none py-[7px] px-[11px] rounded-sm border whitespace-nowrap',
        toneCls[tone] || toneCls.soft,
      )}
    >
      {dot && <span className="w-[7px] h-[7px] rounded-full bg-current flex-none" />}
      {children}
    </span>
  );
}

/** Technical spec chip in mono — EN norms, CE directives, refs. */
function NormBadge({ children, onDark = false }) {
  return (
    <span
      className={cx(
        'inline-flex items-center font-mono text-[11px] font-normal tracking-mono leading-none py-[6px] px-[9px] rounded-[6px] border whitespace-nowrap',
        onDark
          ? 'bg-white/[0.08] text-white/[0.86] border-white/[0.18]'
          : 'bg-surface text-ink border-[color:var(--border-default)]',
      )}
    >
      {children}
    </span>
  );
}

export { Badge, NormBadge };
