import React from 'react';
import { cx } from '../../lib/cx.js';

/** Big figure + label — hero / proof metrics. */
function StatBlock({ value, label, onDark = false }) {
  return (
    <div className="flex flex-col gap-1 font-body">
      <span
        className={cx(
          'font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-extrabold leading-none tracking-display',
          onDark ? 'text-white' : 'text-ink',
        )}
      >
        {value}
      </span>
      <span
        className={cx(
          'text-sm leading-[1.3]',
          onDark ? 'text-on-dark-muted' : 'text-subtle',
        )}
      >
        {label}
      </span>
    </div>
  );
}

export { StatBlock };
