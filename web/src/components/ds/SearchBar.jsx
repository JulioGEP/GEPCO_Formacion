import React from 'react';
import { cx } from '../../lib/cx.js';

function SearchBar({ placeholder = 'Buscar producto, marca o referencia…', kbd = '⌘K', onSubmit }) {
  const [value, setValue] = React.useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit && onSubmit(value);
      }}
      className={cx(
        'flex items-center gap-3 flex-1 font-body',
        'bg-surface-muted border border-border focus-within:border-ink rounded-full',
        'px-[18px] py-0 h-[52px] transition duration-base ease-standard',
      )}
    >
      <span aria-hidden="true" className="inline-flex text-subtle text-[18px]">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3-3" />
        </svg>
      </span>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar"
        className="flex-1 border-none [outline:none] bg-transparent font-body text-base text-strong"
      />
      {kbd && (
        <kbd className="font-mono text-[12px] text-subtle bg-surface border border-border rounded-[6px] px-[7px] py-[3px] leading-none">
          {kbd}
        </kbd>
      )}
    </form>
  );
}

export { SearchBar };
