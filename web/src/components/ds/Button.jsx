import React from 'react';
import { cx } from '../../lib/cx.js';

const sizeCls = {
  sm: 'px-4 py-[10px] text-sm',
  md: 'px-[22px] py-[13px] text-base',
  lg: 'px-[30px] py-[17px] text-base',
};

const variantCls = {
  primary: 'bg-action-primary text-white border-transparent enabled:hover:bg-action-primary-hover',
  dark: 'bg-action-dark text-white border-transparent enabled:hover:bg-action-dark-hover',
  outline: 'bg-transparent text-ink border-border-strong enabled:hover:bg-surface-muted',
  onDark: 'bg-transparent text-white border-white/[0.28] enabled:hover:bg-white/10',
  solidLight: 'bg-white text-ink border-transparent enabled:hover:bg-[#f0f0f0]',
};

function Button({
  children,
  variant = 'primary',
  size = 'md',
  uppercase = false,
  block = false,
  disabled = false,
  iconRight,
  iconLeft,
  type = 'button',
  onClick,
  className,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cx(
        'items-center justify-center gap-[10px] font-body font-semibold leading-[1.1] text-center',
        // Móvil primero: los CTAs pueden ajustar el texto en pantallas estrechas
        // (evita desbordes); a partir de sm se mantiene en una sola línea.
        'max-w-full whitespace-normal sm:whitespace-nowrap',
        'rounded-md border cursor-pointer',
        'transition duration-base ease-standard enabled:hover:-translate-y-px',
        'disabled:cursor-not-allowed disabled:opacity-[0.45]',
        block ? 'flex w-full' : 'inline-flex w-auto',
        uppercase ? 'uppercase tracking-[0.08em]' : 'tracking-nav',
        sizeCls[size] || sizeCls.md,
        variantCls[variant] || variantCls.primary,
        className,
      )}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}

export { Button };
