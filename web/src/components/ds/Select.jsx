import React from 'react';
import { cx } from '../../lib/cx.js';

function Select({ label, options = [], placeholder, theme = 'light', id, value, onChange, className, ...rest }) {
  const dark = theme === 'dark';
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className="flex flex-col gap-2 font-body">
      {label && (
        <label
          htmlFor={selectId}
          className={cx(
            'text-xs font-semibold tracking-eyebrow uppercase',
            dark ? 'text-on-dark-muted' : 'text-subtle',
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className={cx(
            'appearance-none [-webkit-appearance:none] font-body text-base w-full cursor-pointer',
            'py-[14px] pr-[44px] pl-4 rounded-md border [outline:none]',
            'transition duration-base ease-standard',
            dark ? 'text-white bg-dark-tile' : 'text-strong bg-surface',
            dark
              ? 'border-[color:var(--border-on-dark)] focus:border-white/[0.55]'
              : 'border-border focus:border-ink',
            !dark && 'focus:shadow-focus',
            className,
          )}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => {
            const val = typeof o === 'string' ? o : o.value;
            const lbl = typeof o === 'string' ? o : o.label;
            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
        <span
          className={cx(
            'absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[12px]',
            dark ? 'text-white/60' : 'text-subtle',
          )}
        >
          {'▾'}
        </span>
      </div>
    </div>
  );
}

export { Select };
