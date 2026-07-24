import React from 'react';
import { cx } from '../../lib/cx.js';

function Input({ label, hint, error, theme = 'light', id, className, ...rest }) {
  const dark = theme === 'dark';
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className="flex flex-col gap-2 font-body">
      {label && (
        <label
          htmlFor={inputId}
          className={cx(
            'text-xs font-semibold tracking-eyebrow uppercase',
            dark ? 'text-on-dark-muted' : 'text-subtle',
          )}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cx(
          'font-body text-base w-full py-[14px] px-4 rounded-md border [outline:none]',
          'transition duration-base ease-standard',
          dark ? 'text-white bg-dark-tile' : 'text-strong bg-surface',
          error
            ? 'border-danger'
            : dark
              ? 'border-[color:var(--border-on-dark)] focus:border-white/[0.55]'
              : 'border-border focus:border-ink',
          !dark && 'focus:shadow-focus',
          className,
        )}
        {...rest}
      />
      {(hint || error) && (
        <span
          className={cx(
            'text-xs',
            error ? 'text-danger' : dark ? 'text-on-dark-muted' : 'text-subtle',
          )}
        >
          {error || hint}
        </span>
      )}
    </div>
  );
}

export { Input };
