import React from 'react';
import { Badge, NormBadge } from './Badge.jsx';
import { IconButton } from './IconButton.jsx';
import { cx } from '../../lib/cx.js';

function ProductCard({
  title,
  image,
  code: refCode,
  norm,
  recommended = false,
  badge,
  bullets = [],
  cover = false,
  ctaLabel = "Ver producto",
  href = "#",
  onClick,
  onFav
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group flex flex-col no-underline bg-surface border border-border rounded-lg overflow-hidden font-body shadow-sm transition duration-base ease-standard hover:shadow-md hover:-translate-y-1"
    >
      <div
        className={cx(
          'relative overflow-hidden',
          cover
            ? 'aspect-[4/3] bg-surface-tile p-0'
            : 'aspect-square bg-[linear-gradient(160deg,#f7f7f8,#ececed)] p-[22px]'
        )}
      >
        <div className="absolute top-[16px] left-[16px] flex gap-[8px] items-center z-[2] flex-wrap">
          {(recommended || badge) && <Badge tone="brand">{badge || "Recomendado"}</Badge>}
          {norm && <NormBadge onDark={cover}>{norm}</NormBadge>}
        </div>
        <span
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onFav && onFav();
          }}
          className="absolute top-[14px] right-[14px] z-[2]"
        >
          <IconButton tone="light" size="sm" label="Añadir a favoritos">♥</IconButton>
        </span>
        {image && (
          <img
            src={image}
            alt={title}
            className={cx(
              'w-full h-full block transition-transform duration-base ease-standard group-hover:scale-105',
              cover ? 'object-cover mix-blend-normal' : 'object-contain mix-blend-multiply'
            )}
          />
        )}
      </div>
      <div className="flex flex-col gap-[10px] p-6 flex-1">
        {refCode && (
          <span className="font-mono text-[11px] tracking-mono text-subtle normal-case">REF · {refCode}</span>
        )}
        <h3 className="m-0 font-display text-lg font-bold leading-snug tracking-heading text-strong">{title}</h3>
        {bullets.length > 0 && (
          <p className="m-0 text-sm leading-normal text-body">{bullets.join(" · ")}{" ·"}</p>
        )}
        <span className="mt-auto pt-[8px] text-base font-bold text-ink inline-flex items-center gap-[8px]">
          {ctaLabel}
          <span className="text-brand transition-transform duration-base ease-standard group-hover:translate-x-1">→</span>
        </span>
      </div>
    </a>
  );
}

export { ProductCard };
