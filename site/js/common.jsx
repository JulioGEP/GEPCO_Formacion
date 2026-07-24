// Shared helpers loaded on every page: layout container, horizontal carousel, router, URL params.

function Container({ children, style }) {
  return <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--container-padding)", ...style }}>{children}</div>;
}
window.Container = Container;

// Horizontal scroll carousel — single row, never wraps; arrows appear when overflowing
function HScroll({ itemWidth, children }) {
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
    <button type="button" aria-label={dir < 0 ? "Anterior" : "Siguiente"} onClick={() => page(dir)}
      style={{ position: "absolute", top: "calc(50% - 5px)", [dir < 0 ? "left" : "right"]: "-10px", transform: "translateY(-50%)", width: "48px", height: "48px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-default)", background: "var(--surface-card)", boxShadow: "var(--shadow-md)", cursor: "pointer", display: show ? "flex" : "none", alignItems: "center", justifyContent: "center", fontSize: "22px", lineHeight: 1, color: "var(--text-strong)", zIndex: 3 }}>{dir < 0 ? "\u2039" : "\u203A"}</button>
  );
  return (
    <div style={{ position: "relative" }}>
      <Arrow dir={-1} show={st.l} />
      <div ref={ref} className="gepco-hscroll" style={{ display: "flex", gap: "var(--space-6)", overflowX: "auto", scrollSnapType: "x proximity", paddingBottom: "6px" }}>
        {React.Children.toArray(children).filter(Boolean).map((ch, i) => (
          <div key={i} style={{ flex: `0 0 ${itemWidth}`, scrollSnapAlign: "start" }}>{ch}</div>
        ))}
      </div>
      <Arrow dir={1} show={st.r} />
    </div>
  );
}
window.HScroll = HScroll;

// File-based router: onNav(screen, param) navigates to the matching static page.
window.onNav = function (screen, param) {
  const page = {
    home: "index.html", catalog: "catalogo.html", course: "curso.html",
    nosotros: "nosotros.html", contact: "contacto.html", blog: "blog.html", post: "blog-post.html",
    abiertas: "abiertas.html", checkout: "checkout.html", trabaja: "trabaja.html",
  }[screen] || "index.html";
  const key = { catalog: "cat", course: "curso", post: "post" }[screen];
  window.location.href = page + (param && key ? "?" + key + "=" + encodeURIComponent(param) : "");
};
window.getParam = (k) => new URLSearchParams(window.location.search).get(k);
