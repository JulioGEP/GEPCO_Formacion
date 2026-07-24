import React from 'react';
import { onNav, getParam } from '../lib/router.js';
import { cart } from '../lib/cart.js';
// Store-style chrome: two-row header (search + login) with mega-menus + dark footer
import { SearchBar, Button } from './ds/index.js';
import { DATA as D } from '../lib/data.js';

// --- Simple line icons (functional UI icons) ---
function Icon({ name, size = 22, stroke = 2 }) {
  const paths = {
    flame: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    siren: <><path d="M7 18v-6a5 5 0 0 1 10 0v6" /><path d="M4 21h16" /><path d="M12 2v2" /><path d="m4.2 6.2 1.4 1.4" /><path d="m19.8 6.2-1.4 1.4" /></>,
    mountain: <path d="m3 20 6.5-11 4 6 2.5-4L21 20z" />,
    heart: <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z" /><path d="M3.2 12h4l1.5-3 2 5 1.8-4 1.2 2h4.9" /></>,
    hardhat: <><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z" /><path d="M10 10V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4" /><path d="M4 16v-3a6 6 0 0 1 6-6" /><path d="M14 7a6 6 0 0 1 6 6v3" /></>,
    broadcast: <><circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48 0a6 6 0 0 1 0-8.49m11.31-2.83a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" /></>,
    building: <><rect x="5" y="2" width="14" height="20" rx="1.5" /><path d="M9 22v-4h6v4" /><path d="M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01" /></>,
    cap: <><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" /></>,
    shieldCheck: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>,
    ribbon: <><circle cx="12" cy="8" r="6" /><path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1" /></>,
  }[name];
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths}</svg>;
}

const CURSOS = {
  left: {
    title: "Especialidades",
    items: [
      { icon: "flame", name: "Incendios", cat: "extincion", subs: [{ t: "Extinción de Incendios", go: ["course", "extincion-basico"] }] },
      { icon: "shield", name: "Bomberos", cat: "bombero", subs: [{ t: "Bombero de Empresa", go: ["course", "bombero-empresa"] }] },
      { icon: "siren", name: "Emergencias", cat: "emergencias", subs: [{ t: "Jefe de Emergencia", go: ["course", "jefes-emergencia"] }, { t: "Plan de Autoprotección", go: ["catalog", "emergencias"] }] },
      { icon: "mountain", name: "Altura y Trabajos Verticales", cat: "prl", subs: [{ t: "Trabajos en Altura", go: ["course", "altura"] }, { t: "Trabajos Verticales", go: ["course", "verticales"] }] },
    ],
  },
  right: {
    title: "Otras formaciones",
    items: [
      { icon: "heart", name: "Primeros Auxilios", cat: "auxilios", subs: [{ t: "SVB y DEA", go: ["course", "svb-dea"] }] },
      { icon: "hardhat", name: "PRL", cat: "prl", subs: [{ t: "Espacios Confinados", go: ["course", "confinados"] }] },
      { icon: "broadcast", name: "Telco", cat: "prl", subs: [{ t: "Riesgo Eléctrico TELCO", go: ["catalog", "prl"] }] },
    ],
  },
};
const NOSOTROS = [
  { icon: "building", name: "Quiénes Somos" },
  { icon: "cap", name: "Equipo Docente" },
  { icon: "shieldCheck", name: "Instalaciones" },
  { icon: "ribbon", name: "Acreditaciones" },
];

function ColLabel({ children }) {
  return (
    <span style={{ display: "block", marginBottom: "var(--space-4)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--color-brand)" }}>{children}</span>
  );
}

function SubLink({ s, onNav }) {
  const [h, setH] = React.useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onNav(s.go[0], s.go[1]); }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "var(--text-sm)", color: h ? "var(--color-brand)" : "var(--text-body)", textDecoration: "none", padding: "2px 0", transition: "color var(--duration-fast) var(--ease-standard)" }}>
      <span aria-hidden="true" style={{ color: "var(--color-brand)", fontWeight: "var(--weight-bold)", fontSize: "var(--text-xs)", transform: h ? "translateX(3px)" : "none", transition: "transform var(--duration-fast) var(--ease-standard)" }}>›</span>{s.t}
    </a>
  );
}

function SpecialtyItem({ it, onNav }) {
  const [h, setH] = React.useState(false);
  return (
    <div>
      <a href="#" onClick={(e) => { e.preventDefault(); onNav("catalog", it.cat); }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ display: "flex", alignItems: "center", gap: "11px", textDecoration: "none", marginBottom: "2px" }}>
        <span style={{ flex: "0 0 auto", width: "36px", height: "36px", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", background: h ? "var(--color-brand)" : "var(--color-brand-soft)", color: h ? "#fff" : "var(--color-brand)", transition: "background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)" }}>
          <Icon name={it.icon} size={18} />
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-heading)", textTransform: "uppercase", color: h ? "var(--color-brand)" : "var(--text-strong)", transition: "color var(--duration-fast) var(--ease-standard)" }}>{it.name}</span>
      </a>
      <div style={{ display: "flex", flexDirection: "column", paddingLeft: "47px" }}>
        {it.subs.map((s) => <SubLink key={s.t} s={s} onNav={onNav} />)}
      </div>
    </div>
  );
}

function CursosCol({ col, onNav }) {
  return (
    <div>
      <ColLabel>{col.title}</ColLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
        {col.items.map((it) => <SpecialtyItem key={it.name} it={it} onNav={onNav} />)}
      </div>
    </div>
  );
}

function CursosMenu({ onNav }) {
  return (
    <div style={{ background: "var(--surface-card)", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", border: "1px solid var(--border-default)", marginTop: "6px", width: "720px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ padding: "var(--space-6)" }}><CursosCol col={CURSOS.left} onNav={onNav} /></div>
        <div style={{ padding: "var(--space-6)", borderLeft: "1px solid var(--border-default)" }}><CursosCol col={CURSOS.right} onNav={onNav} /></div>
      </div>
    </div>
  );
}

function NosotrosRow({ it, onNav }) {
  const [h, setH] = React.useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onNav("nosotros"); }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px var(--space-3)", borderRadius: "var(--radius-md)", textDecoration: "none", color: "var(--text-strong)", background: h ? "var(--surface-sunken)" : "transparent", transition: "background var(--duration-fast) var(--ease-standard)" }}>
      <span style={{ flex: "0 0 auto", width: "36px", height: "36px", borderRadius: "var(--radius-md)", background: h ? "var(--color-brand)" : "var(--color-brand-soft)", color: h ? "#fff" : "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)" }}>
        <Icon name={it.icon} size={18} />
      </span>
      <span style={{ flex: 1, fontFamily: "var(--font-display)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-heading)", textTransform: "uppercase", color: h ? "var(--color-brand)" : "var(--text-strong)", transition: "color var(--duration-fast) var(--ease-standard)" }}>{it.name}</span>
      <span aria-hidden="true" style={{ color: "var(--color-brand)", fontSize: "15px", fontWeight: "var(--weight-bold)", transform: h ? "translateX(3px)" : "none", transition: "transform var(--duration-fast) var(--ease-standard)" }}>›</span>
    </a>
  );
}

function NosotrosMenu({ onNav }) {
  return (
    <div style={{ background: "var(--surface-card)", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)", border: "1px solid var(--border-default)", maxWidth: "420px", marginTop: "6px" }}>
      <div style={{ padding: "var(--space-3)" }}>
        {NOSOTROS.map((it) => <NosotrosRow key={it.name} it={it} onNav={onNav} />)}
      </div>
    </div>
  );
}

function NavTrigger({ label, open, onEnter, onClick }) {
  return (
    <button type="button" onMouseEnter={onEnter} onFocus={onEnter} onClick={onClick} aria-expanded={open}
      style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "var(--radius-md)", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "var(--text-base)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)", background: open ? "var(--color-surface-muted)" : "transparent", transition: "background var(--duration-fast) var(--ease-standard)" }}>
      {label}
      <span aria-hidden="true" style={{ fontSize: "11px", color: "var(--text-subtle)", transform: open ? "rotate(180deg)" : "none", transition: "transform var(--duration-fast) var(--ease-standard)" }}>▾</span>
    </button>
  );
}

function NavLink({ label, onClick }) {
  return (
    <a href="#" onClick={onClick} onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-surface-muted)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      style={{ padding: "10px 18px", borderRadius: "var(--radius-md)", fontFamily: "var(--font-body)", fontSize: "var(--text-base)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)", textDecoration: "none", transition: "background var(--duration-fast) var(--ease-standard)" }}>{label}</a>
  );
}

function CollapsibleSearch() {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef(null);
  React.useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);
  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => { if (inputRef.current && !inputRef.current.value) setOpen(false); }}
      style={{ display: "flex", alignItems: "center", gap: "8px", height: "48px", width: open ? "360px" : "48px", padding: open ? "0 18px" : "0", background: "var(--color-surface-muted)", border: "1px solid " + (open ? "var(--border-hover)" : "transparent"), borderRadius: "var(--radius-full)", overflow: "hidden", cursor: "text", transition: "width var(--duration-base) var(--ease-standard), padding var(--duration-base) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)" }}
      onClick={() => { setOpen(true); if (inputRef.current) inputRef.current.focus(); }}>
      <span style={{ flex: "0 0 auto", width: open ? "auto" : "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-subtle)" }} aria-hidden="true">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg>
      </span>
      <input ref={inputRef} type="text" placeholder="Buscar formación, certificación…" aria-label="Buscar"
        onBlur={() => { if (inputRef.current && !inputRef.current.value) setOpen(false); }}
        style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--text-strong)", opacity: open ? 1 : 0, transition: "opacity var(--duration-fast) var(--ease-standard)" }} />
    </div>
  );
}

// --- Carrito (simulado, cliente) ---
function useCart() {
  const [items, setItems] = React.useState(cart ? cart.items() : []);
  React.useEffect(() => {
    if (!cart) return;
    cart.on(setItems);
    setItems(cart.items());
  }, []);
  return items;
}

function CartButton({ onClick }) {
  const items = useCart();
  const count = items.reduce((n, i) => n + i.qty, 0);
  return (
    <button type="button" onClick={onClick} aria-label={`Abrir carrito, ${count} formaciones`}
      style={{ position: "relative", width: "46px", height: "46px", borderRadius: "var(--radius-full)", border: "none", background: "transparent", cursor: "pointer", color: "var(--text-strong)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
      {count > 0 && <span style={{ position: "absolute", top: "1px", right: "1px", minWidth: "18px", height: "18px", padding: "0 4px", borderRadius: "9px", background: "var(--color-brand)", color: "#fff", fontSize: "11px", fontWeight: "var(--weight-bold)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)" }}>{count}</span>}
    </button>
  );
}

function CartDrawer({ open, onClose, onNav }) {
  const items = useCart();
  const count = items.reduce((n, i) => n + i.qty, 0);
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  const set = (id, q) => cart.setQty(id, q);
  const Step = ({ label, glyph, onClick }) => (
    <button type="button" onClick={onClick} aria-label={label} style={{ width: "30px", height: "30px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-default)", background: "var(--surface-card)", cursor: "pointer", fontSize: "18px", lineHeight: 1, color: "var(--text-strong)", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>{glyph}</button>
  );
  return (
    <div aria-hidden={!open} style={{ position: "fixed", inset: 0, zIndex: 200, pointerEvents: open ? "auto" : "none" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(15,15,15,0.5)", opacity: open ? 1 : 0, transition: "opacity var(--duration-base) var(--ease-standard)" }} />
      <aside role="dialog" aria-modal="true" aria-label="Carrito de formaciones"
        style={{ position: "absolute", top: 0, right: 0, height: "100%", width: "min(420px, 92vw)", background: "var(--surface-page)", boxShadow: "var(--shadow-lg)", transform: open ? "translateX(0)" : "translateX(100%)", transition: "transform var(--duration-base) var(--ease-standard)", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)" }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "var(--space-6)", borderBottom: "1px solid var(--border-default)", background: "var(--surface-card)" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)" }}>Tu carrito{count > 0 && <span style={{ color: "var(--color-brand)" }}> ({count})</span>}</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar carrito" style={{ border: "none", background: "transparent", fontSize: "28px", lineHeight: 1, cursor: "pointer", color: "var(--text-subtle)" }}>×</button>
        </header>
        <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "var(--space-16) var(--space-4)", color: "var(--text-subtle)" }}>
              <p style={{ margin: "0 0 20px", fontSize: "var(--text-base)" }}>Tu carrito está vacío.</p>
              <Button variant="outline" onClick={() => { onClose(); onNav("catalog"); }}>Ver formaciones</Button>
            </div>
          ) : items.map((it) => (
            <div key={it.id} style={{ display: "flex", gap: "var(--space-4)", background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", padding: "var(--space-4)" }}>
              <img src={it.img} alt="" style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "var(--radius-sm)", flex: "0 0 auto" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", lineHeight: "var(--leading-snug)", marginBottom: "4px" }}>{it.title}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-brand)", marginBottom: "8px" }}>{it.norm}{it.sede ? " \u00b7 " + it.sede : ""}{it.fecha ? " \u00b7 " + it.fecha : ""}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Step label="Restar alumno" glyph="−" onClick={() => set(it.id, it.qty - 1)} />
                    <span style={{ minWidth: "20px", textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--text-strong)" }}>{it.qty}</span>
                    <Step label="Sumar alumno" glyph="+" onClick={() => set(it.id, it.qty + 1)} />
                    <span style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}>alumnos</span>
                  </div>
                  <button type="button" onClick={() => cart.remove(it.id)} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: "var(--text-sm)", color: "var(--text-subtle)", textDecoration: "underline" }}>Quitar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <footer style={{ padding: "var(--space-6)", borderTop: "1px solid var(--border-default)", background: "var(--surface-card)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
              <span>Importe total</span>
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-subtle)" }}>[PENDIENTE: precio]</span>
            </div>
            <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--text-subtle)", lineHeight: "var(--leading-normal)" }}>El importe y las condiciones de pago se confirman al tramitar la reserva.</p>
            <Button variant="primary" block size="lg" uppercase iconRight={<span>→</span>} onClick={() => { onClose(); onNav("checkout"); }}>Tramitar reserva</Button>
            <button type="button" onClick={() => cart.clear()} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: "var(--text-sm)", color: "var(--text-subtle)", textDecoration: "underline", alignSelf: "center" }}>Vaciar carrito</button>
          </footer>
        )}
      </aside>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = React.useState(null); // 'cursos' | 'nosotros' | null
  const [cartOpen, setCartOpen] = React.useState(false);
  const [w, setW] = React.useState(typeof window !== "undefined" ? window.innerWidth : 1280);
  React.useEffect(() => { const on = () => setW(window.innerWidth); window.addEventListener("resize", on); return () => window.removeEventListener("resize", on); }, []);
  const narrow = w < 1060;
  return (
    <header onMouseLeave={() => setOpen(null)}
      style={{ position: "sticky", top: 0, zIndex: 50, background: "var(--surface-card)", borderBottom: "1px solid var(--border-default)", fontFamily: "var(--font-body)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "14px var(--container-padding)", display: "flex", alignItems: "center", gap: "28px" }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNav("home"); }} style={{ flex: "0 0 auto", display: "flex", alignItems: "center" }}>
          <img src={D.logoDark} alt="GEPCO Formación" style={{ height: "72px", objectFit: "contain", transform: "scale(1.2)", transformOrigin: "left center", marginLeft: "-7px" }} />
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: narrow ? "12px" : "28px", minWidth: 0 }}>
          <div onMouseEnter={() => setOpen("cursos")}>
            <NavTrigger label="Cursos" open={open === "cursos"} onEnter={() => setOpen("cursos")} onClick={() => onNav("catalog")} />
          </div>
          <div onMouseEnter={() => setOpen("nosotros")}>
            <NavTrigger label="Nosotros" open={open === "nosotros"} onEnter={() => setOpen("nosotros")} onClick={() => onNav("nosotros")} />
          </div>
          <div onMouseEnter={() => setOpen(null)}><NavLink label="Blog" onClick={(e) => { e.preventDefault(); onNav("blog"); }} /></div>
          <div onMouseEnter={() => setOpen(null)}><NavLink label="Contacto" onClick={(e) => { e.preventDefault(); onNav("contact"); }} /></div>
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "16px" }} onMouseEnter={() => setOpen(null)}>
          <CollapsibleSearch />
          <CartButton onClick={() => setCartOpen(true)} />
          <span style={{ width: "1px", height: "30px", background: "var(--border-default)" }} />
          <a href="#" onClick={(e) => e.preventDefault()} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <span style={{ width: "38px", height: "38px", borderRadius: "var(--radius-full)", background: "var(--color-brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
            </span>
            <span style={{ fontSize: "var(--text-base)", color: "var(--text-body)", whiteSpace: "nowrap", display: narrow ? "none" : "inline" }}>Hola, <strong style={{ color: "var(--text-strong)", fontWeight: "var(--weight-semibold)" }}>alumno/a</strong></span>
          </a>
        </div>
      </div>
      {open && (
        <div style={{ position: "absolute", left: 0, right: 0, top: "100%" }}>
          <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--container-padding)", display: "flex", justifyContent: "flex-start" }}>
            <div>
              {open === "cursos" ? <CursosMenu onNav={onNav} /> : <NosotrosMenu onNav={onNav} />}
            </div>
          </div>
        </div>
      )}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onNav={onNav} />
    </header>
  );
}

function FLink({ label, onClick }) {
  const [h, setH] = React.useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "var(--text-sm)", color: h ? "var(--color-brand)" : "var(--text-body)", textDecoration: "none", padding: "3px 0", transition: "color var(--duration-base) var(--ease-standard)" }}>
      <span aria-hidden="true" style={{ color: "var(--color-brand)", fontWeight: "var(--weight-bold)", opacity: h ? 1 : 0, transform: h ? "translateX(0)" : "translateX(-6px)", transition: "opacity var(--duration-base) var(--ease-standard), transform var(--duration-base) var(--ease-standard)", marginRight: h ? 0 : "-14px" }}>→</span>
      {label}
    </a>
  );
}

function Footer() {
  const nav = onNav;
  const offices = [
    { city: "Sabadell", lines: ["C. Moratín, 100", "08206 Sabadell · Barcelona", "T. 935 646 346"] },
    { city: "Madrid", lines: ["C. Primavera, 1", "28500 Arganda del Rey · Madrid", "T. 916 263 818"] },
  ];
  const links = [
    { label: "Cursos", go: "catalog" },
    { label: "Convocatorias abiertas", go: "abiertas" },
    { label: "Sobre nosotros", go: "nosotros" },
    { label: "Blog", go: "blog" },
    { label: "Contacto", go: "contact" },
    { label: "Trabaja con nosotros", go: "trabaja" },
  ];
  const colLabel = { fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--color-brand)", fontWeight: "var(--weight-bold)", marginBottom: "var(--space-5)" };
  return (
    <footer style={{ background: "#e8e6e2", color: "var(--text-strong)", borderTop: "1px solid var(--border-default)", fontFamily: "var(--font-body)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--space-8) var(--container-padding) var(--space-5)", display: "grid", gridTemplateColumns: "1.7fr 1fr 1fr 1fr", gap: "var(--space-10)" }}>
        <div style={{ maxWidth: "320px" }}>
          <img src={D.logoDark} alt="GEPCO Formación" style={{ height: "72px", objectFit: "contain", marginBottom: "18px", transform: "scale(1.2)", transformOrigin: "left center", marginLeft: "-7px" }} />
          <p style={{ margin: "0 0 var(--space-5)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>Escuela de Emergencias y PRL. Centro homologado por el ISPC. Más de 15 años formando profesionales.</p>
          <button type="button" onClick={() => nav("contact")} style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "var(--color-brand)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", padding: "12px 20px", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", letterSpacing: "0.04em", cursor: "pointer" }}>Solicita información <span aria-hidden="true">→</span></button>
        </div>
        <div>
          <div style={colLabel}>Formación</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {links.map((l) => <FLink key={l.label} label={l.label} onClick={() => nav(l.go)} />)}
          </div>
        </div>
        {offices.map((o) => (
          <div key={o.city}>
            <div style={colLabel}>{o.city}</div>
            {o.lines.map((l, i) => <div key={i} style={{ fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: "var(--leading-loose)" }}>{l}</div>)}
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--border-default)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--space-4) var(--container-padding)", display: "flex", alignItems: "center", gap: "var(--space-6)", flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-subtle)", flex: "0 0 auto" }}>Certificaciones y acreditaciones oficiales</span>
          <img src="/assets/logos-acreditacion-gris-g.png" alt="Acreditaciones: Gobierno de España, Policía Nacional, IRATA International, SEMICYUC, ISO 9001, DGT e Irudek" loading="lazy" style={{ flex: "0 1 520px", minWidth: 0, height: "auto", objectFit: "contain", opacity: 0.85 }} />
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border-default)" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "var(--space-3) var(--container-padding)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}>
          <span style={{ fontFamily: "var(--font-body)" }}>© 2010–2024 · GEP&amp;RISK 112 SL</span>
          <span>Privacidad · Aviso Legal · Términos y condiciones · Cookies</span>
        </div>
      </div>
    </footer>
  );
}

export { Navbar, Footer };
