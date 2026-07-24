import React from 'react';
import { cx } from '../../lib/cx.js';

function Checkbox({ label, checked, defaultChecked, onChange, theme = 'light', id, ...rest }) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const dark = theme === 'dark';
  const boxId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-').slice(0, 24) : undefined);
  return (
    <label
      htmlFor={boxId}
      className={cx(
        'flex items-start gap-3 font-body text-sm cursor-pointer leading-normal',
        dark ? 'text-on-dark-muted' : 'text-body',
      )}
    >
      <span
        className={cx(
          'flex-none w-5 h-5 mt-px rounded-[6px] border flex items-center justify-center',
          'transition duration-fast ease-standard',
          on
            ? 'bg-brand border-brand'
            : dark
              ? 'bg-dark-tile border-[color:var(--border-on-dark)]'
              : 'bg-surface border-border-strong',
        )}
      >
        {on && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6.2L4.6 8.8L10 3.2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input
        id={boxId}
        type="checkbox"
        checked={on}
        onChange={(e) => {
          if (!isControlled) setInternal(e.target.checked);
          onChange && onChange(e);
        }}
        className="absolute opacity-0 w-0 h-0"
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
}

export { Checkbox };
