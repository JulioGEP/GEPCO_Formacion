import React from 'react';
import { cx } from '../../lib/cx.js';
import { IconButton } from './IconButton.jsx';

function CategoryCard({
  index,
  name,
  count,
  subcount,
  thumbs = [],
  href = '#',
  onClick,
}) {
  const meta = [
    count != null ? `${count} cursos` : null,
    subcount != null ? `${subcount} subcategorías` : null,
  ]
    .filter(Boolean)
    .join(' · ');
  const hasThumbs = thumbs.filter(Boolean).length > 0;
  return (
    <a
      href={href}
      onClick={onClick}
      className={cx(
        'flex flex-col no-underline font-body',
        'border border-[color:var(--border-default)] rounded-lg p-6 gap-5',
        'bg-surface-muted hover:bg-surface',
        'shadow-none hover:shadow-md hover:-translate-y-1',
        'transition duration-base ease-standard',
      )}
    >
      <div className="flex justify-between items-start">
        <span className="font-mono text-sm text-brand">
          {String(index).padStart(2, '0')}
        </span>
        <IconButton tone="dark" size="sm" label={`Ver ${name}`}>
          →
        </IconButton>
      </div>
      <div>
        <h3 className="m-[0_0_4px] font-display text-lg font-bold tracking-heading leading-snug text-strong">
          {name}
        </h3>
        {meta && <p className="m-0 text-sm text-subtle">{meta}</p>}
      </div>
      {hasThumbs && (
        <div className="grid grid-cols-[repeat(3,1fr)] gap-2 mt-auto">
          {[0, 1, 2].map((i) => {
            const t = thumbs.filter(Boolean)[i];
            return (
              <div
                key={i}
                className="h-[58px] bg-surface-tile border border-[color:var(--border-default)] rounded-md overflow-hidden"
              >
                {t && <img src={t} alt="" className="w-full h-full object-cover" />}
              </div>
            );
          })}
        </div>
      )}
    </a>
  );
}

export { CategoryCard };
