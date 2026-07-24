import React from 'react';
import { cx } from '../../lib/cx.js';

function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  align = 'left',
  onDark = false,
}) {
  const center = align === 'center';
  return (
    <div
      className={cx(
        'flex justify-between gap-6 flex-wrap font-body',
        center ? 'items-center flex-col text-center' : 'items-end flex-row text-left',
      )}
    >
      <div className={center ? 'max-w-[620px]' : 'max-w-[700px]'}>
        {eyebrow && (
          <span className="block mb-3 text-sm font-bold tracking-eyebrow uppercase text-brand">
            {eyebrow}
          </span>
        )}
        <h2
          className={cx(
            'm-0 font-display text-[clamp(1.875rem,3.6vw,2.5rem)] font-extrabold leading-snug tracking-display',
            onDark ? 'text-white' : 'text-strong',
          )}
        >
          {title}
          <span className="text-brand">.</span>
        </h2>
        {description && (
          <p
            className={cx(
              'm-[14px_0_0] text-lg leading-normal',
              onDark ? 'text-on-dark-muted' : 'text-body',
            )}
          >
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex gap-[10px] items-center shrink-0">{actions}</div>
      )}
    </div>
  );
}

export { SectionHeading };
