import React from 'react';
import { cx } from '../../lib/cx.js';

// Carrusel horizontal — una fila, flechas cuando desborda.
export function HScroll({ itemWidth, children }) {
  const ref = React.useRef(null);
  const [st, setSt] = React.useState({ l: false, r: false });
  const update = React.useCallback(() => {
    const el = ref.current; if (!el) return;
    setSt({ l: el.scrollLeft > 4, r: el.scrollLeft < el.scrollWidth - el.clientWidth - 4 });
  }, []);
  React.useEffect(() => {
    update();
    const el = ref.current; if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [update]);
  const page = (dir) => { const el = ref.current; if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" }); };
  const Arrow = ({ dir, show }) => (
    <button
      type="button"
      aria-label={dir < 0 ? "Anterior" : "Siguiente"}
      onClick={() => page(dir)}
      className={cx(
        'absolute top-[calc(50%_-_5px)] -translate-y-1/2 w-[48px] h-[48px] rounded-full border border-border bg-surface shadow-md cursor-pointer items-center justify-center text-[22px] leading-none text-strong z-[3]',
        show ? 'flex' : 'hidden'
      )}
      style={{ [dir < 0 ? "left" : "right"]: "-10px" }}
    >{dir < 0 ? "‹" : "›"}</button>
  );
  return (
    <div className="relative">
      <Arrow dir={-1} show={st.l} />
      <div ref={ref} className="gepco-hscroll flex gap-6 overflow-x-auto snap-x snap-proximity pb-[6px]">
        {React.Children.toArray(children).filter(Boolean).map((ch, i) => (
          <div key={i} className="snap-start" style={{ flex: `0 0 ${itemWidth}` }}>{ch}</div>
        ))}
      </div>
      <Arrow dir={1} show={st.r} />
    </div>
  );
}
