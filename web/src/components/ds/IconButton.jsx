import React from 'react';
import { cx } from '../../lib/cx.js';

const toneCls = {
  dark: 'bg-ink text-white border-transparent hover:bg-black',
  light: 'bg-white text-ink border-border hover:bg-surface-muted',
  ghost: 'bg-transparent text-ink border-border hover:bg-surface-muted',
  brand: 'bg-brand text-white border-transparent hover:bg-brand-strong',
};

const sizeCls = {
  sm: 'w-9 h-9 text-[16px]',
  md: 'w-11 h-11 text-[16px]',
  lg: 'w-[54px] h-[54px] text-[20px]',
};

function IconButton({ children, tone = 'dark', size = 'md', label, onClick, className, ...rest }) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cx(
        'inline-flex items-center justify-center flex-none rounded-full border cursor-pointer',
        'transition duration-base ease-standard hover:-translate-y-px',
        sizeCls[size] || sizeCls.md,
        toneCls[tone] || toneCls.dark,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export { IconButton };
