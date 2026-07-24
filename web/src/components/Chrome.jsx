import React from 'react';
import { onNav, getParam } from '../lib/router.js';
import { cart } from '../lib/cart.js';
// Store-style chrome: two-row header (search + login) with mega-menus + dark footer
import { SearchBar, Button } from './ds/index.js';
import { DATA as D } from '../lib/data.js';
import { cx } from '../lib/cx.js';

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
    <span className="block mb-4 text-xs font-bold tracking-eyebrow uppercase text-brand">{children}</span>
  );
}

function SubLink({ s, onNav }) {
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onNav(s.go[0], s.go[1]); }}
      className="group inline-flex items-center gap-[7px] text-sm text-body hover:text-brand no-underline py-[2px] px-0 transition-colors duration-fast ease-standard">
      <span aria-hidden="true" className="text-brand font-bold text-xs translate-x-0 group-hover:translate-x-[3px] transition-transform duration-fast ease-standard">›</span>{s.t}
    </a>
  );
}

function SpecialtyItem({ it, onNav }) {
  return (
    <div>
      <a href="#" onClick={(e) => { e.preventDefault(); onNav("catalog", it.cat); }}
        className="group flex items-center gap-[11px] no-underline mb-[2px]">
        <span className="flex-none w-[36px] h-[36px] rounded-md flex items-center justify-center bg-brand-soft text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-fast ease-standard">
          <Icon name={it.icon} size={18} />
        </span>
        <span className="font-display text-sm font-bold tracking-heading uppercase text-strong group-hover:text-brand transition-colors duration-fast ease-standard">{it.name}</span>
      </a>
      <div className="flex flex-col pl-[47px]">
        {it.subs.map((s) => <SubLink key={s.t} s={s} onNav={onNav} />)}
      </div>
    </div>
  );
}

function CursosCol({ col, onNav }) {
  return (
    <div>
      <ColLabel>{col.title}</ColLabel>
      <div className="flex flex-col gap-4">
        {col.items.map((it) => <SpecialtyItem key={it.name} it={it} onNav={onNav} />)}
      </div>
    </div>
  );
}

function CursosMenu({ onNav }) {
  return (
    <div className="bg-surface rounded-xl overflow-hidden shadow-lg border border-border mt-[6px] w-[720px]">
      <div className="grid grid-cols-[1fr_1fr]">
        <div className="p-6"><CursosCol col={CURSOS.left} onNav={onNav} /></div>
        <div className="p-6 border-l border-border"><CursosCol col={CURSOS.right} onNav={onNav} /></div>
      </div>
    </div>
  );
}

function NosotrosRow({ it, onNav }) {
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onNav("nosotros"); }}
      className="group flex items-center gap-3 py-2 px-3 rounded-md no-underline text-strong bg-transparent hover:bg-surface-muted transition-colors duration-fast ease-standard">
      <span className="flex-none w-[36px] h-[36px] rounded-md bg-brand-soft text-brand group-hover:bg-brand group-hover:text-white flex items-center justify-center transition-colors duration-fast ease-standard">
        <Icon name={it.icon} size={18} />
      </span>
      <span className="flex-1 font-display text-sm font-bold tracking-heading uppercase text-strong group-hover:text-brand transition-colors duration-fast ease-standard">{it.name}</span>
      <span aria-hidden="true" className="text-brand text-[15px] font-bold translate-x-0 group-hover:translate-x-[3px] transition-transform duration-fast ease-standard">›</span>
    </a>
  );
}

function NosotrosMenu({ onNav }) {
  return (
    <div className="bg-surface rounded-xl overflow-hidden shadow-lg border border-border max-w-[420px] mt-[6px]">
      <div className="p-3">
        {NOSOTROS.map((it) => <NosotrosRow key={it.name} it={it} onNav={onNav} />)}
      </div>
    </div>
  );
}

function NavTrigger({ label, open, onEnter, onClick }) {
  return (
    <button type="button" onMouseEnter={onEnter} onFocus={onEnter} onClick={onClick} aria-expanded={open}
      className={cx("inline-flex items-center gap-2 py-[10px] px-[18px] rounded-md border-none cursor-pointer font-body text-base font-semibold text-strong transition-colors duration-fast ease-standard", open ? "bg-surface-muted" : "bg-transparent")}>
      {label}
      <span aria-hidden="true" className="text-[11px] text-subtle transition-transform duration-fast ease-standard" style={{ transform: open ? "rotate(180deg)" : "none" }}>▾</span>
    </button>
  );
}

function NavLink({ label, onClick }) {
  return (
    <a href="#" onClick={onClick}
      className="py-[10px] px-[18px] rounded-md font-body text-base font-semibold text-strong no-underline hover:bg-surface-muted transition-colors duration-fast ease-standard">{label}</a>
  );
}

function CollapsibleSearch() {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef(null);
  React.useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);
  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => { if (inputRef.current && !inputRef.current.value) setOpen(false); }}
      className="flex items-center gap-2 h-[48px] bg-surface-muted rounded-full overflow-hidden cursor-text border"
      style={{ width: open ? "360px" : "48px", padding: open ? "0 18px" : "0", borderColor: open ? "var(--border-hover)" : "transparent", transition: "width var(--duration-base) var(--ease-standard), padding var(--duration-base) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)" }}
      onClick={() => { setOpen(true); if (inputRef.current) inputRef.current.focus(); }}>
      <span className="flex-none h-[48px] flex items-center justify-center text-subtle" style={{ width: open ? "auto" : "48px" }} aria-hidden="true">
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg>
      </span>
      <input ref={inputRef} type="text" placeholder="Buscar formación, certificación…" aria-label="Buscar"
        onBlur={() => { if (inputRef.current && !inputRef.current.value) setOpen(false); }}
        className="flex-1 min-w-0 border-none [outline:none] bg-transparent font-body text-base text-strong transition-opacity duration-fast ease-standard" style={{ opacity: open ? 1 : 0 }} />
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
      className="relative w-[46px] h-[46px] rounded-full border-none bg-transparent cursor-pointer text-strong flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
      {count > 0 && <span className="absolute top-px right-px min-w-[18px] h-[18px] py-0 px-1 rounded-[9px] bg-brand text-white text-[11px] font-bold flex items-center justify-center font-mono">{count}</span>}
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
    <button type="button" onClick={onClick} aria-label={label} className="w-[30px] h-[30px] rounded-sm border border-border bg-surface cursor-pointer text-[18px] leading-none text-strong flex items-center justify-center p-0">{glyph}</button>
  );
  return (
    <div aria-hidden={!open} className={cx("fixed inset-0 z-[200]", open ? "pointer-events-auto" : "pointer-events-none")}>
      <div onClick={onClose} className="absolute inset-0 bg-[rgba(15,15,15,0.5)] transition-opacity duration-base ease-standard" style={{ opacity: open ? 1 : 0 }} />
      <aside role="dialog" aria-modal="true" aria-label="Carrito de formaciones"
        className="absolute top-0 right-0 h-full w-[min(420px,_92vw)] bg-page shadow-lg transition-transform duration-base ease-standard flex flex-col font-body"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}>
        <header className="flex items-center justify-between p-6 border-b border-border bg-surface">
          <h2 className="m-0 font-display text-xl font-bold text-strong">Tu carrito{count > 0 && <span className="text-brand"> ({count})</span>}</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar carrito" className="border-none bg-transparent text-[28px] leading-none cursor-pointer text-subtle">×</button>
        </header>
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4 text-subtle">
              <p className="mt-0 mx-0 mb-5 text-base">Tu carrito está vacío.</p>
              <Button variant="outline" onClick={() => { onClose(); onNav("catalog"); }}>Ver formaciones</Button>
            </div>
          ) : items.map((it) => (
            <div key={it.id} className="flex gap-4 bg-surface border border-border rounded-md p-4">
              <img src={it.img} alt="" className="w-[64px] h-[64px] object-cover rounded-sm flex-none" />
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm font-bold text-strong leading-snug mb-1">{it.title}</div>
                <div className="font-mono text-[11px] text-brand mb-2">{it.norm}{it.sede ? " \u00b7 " + it.sede : ""}{it.fecha ? " \u00b7 " + it.fecha : ""}</div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Step label="Restar alumno" glyph="−" onClick={() => set(it.id, it.qty - 1)} />
                    <span className="min-w-[20px] text-center font-mono text-sm text-strong">{it.qty}</span>
                    <Step label="Sumar alumno" glyph="+" onClick={() => set(it.id, it.qty + 1)} />
                    <span className="text-xs text-subtle">alumnos</span>
                  </div>
                  <button type="button" onClick={() => cart.remove(it.id)} className="border-none bg-transparent cursor-pointer text-sm text-subtle underline">Quitar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <footer className="p-6 border-t border-border bg-surface flex flex-col gap-4">
            <div className="flex justify-between items-baseline text-sm text-body">
              <span>Importe total</span>
              <span className="font-mono text-subtle">[PENDIENTE: precio]</span>
            </div>
            <p className="m-0 text-xs text-subtle leading-normal">El importe y las condiciones de pago se confirman al tramitar la reserva.</p>
            <Button variant="primary" block size="lg" uppercase iconRight={<span>→</span>} onClick={() => { onClose(); onNav("checkout"); }}>Tramitar reserva</Button>
            <button type="button" onClick={() => cart.clear()} className="border-none bg-transparent cursor-pointer text-sm text-subtle underline self-center">Vaciar carrito</button>
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
      className="sticky top-0 z-50 bg-surface border-b border-border font-body">
      <div className="max-w-container mx-auto py-[14px] px-container flex items-center gap-[28px]">
        <a href="#" onClick={(e) => { e.preventDefault(); onNav("home"); }} className="flex-none flex items-center">
          <img src={D.logoDark} alt="GEPCO Formación" className="h-[72px] object-contain scale-[1.2] origin-left ml-[-7px]" />
        </a>
        <nav className={cx("flex items-center gap-[6px] min-w-0", narrow ? "ml-3" : "ml-[28px]")}>
          <div onMouseEnter={() => setOpen("cursos")}>
            <NavTrigger label="Cursos" open={open === "cursos"} onEnter={() => setOpen("cursos")} onClick={() => onNav("catalog")} />
          </div>
          <div onMouseEnter={() => setOpen("nosotros")}>
            <NavTrigger label="Nosotros" open={open === "nosotros"} onEnter={() => setOpen("nosotros")} onClick={() => onNav("nosotros")} />
          </div>
          <div onMouseEnter={() => setOpen(null)}><NavLink label="Blog" onClick={(e) => { e.preventDefault(); onNav("blog"); }} /></div>
          <div onMouseEnter={() => setOpen(null)}><NavLink label="Contacto" onClick={(e) => { e.preventDefault(); onNav("contact"); }} /></div>
        </nav>
        <div className="ml-auto flex items-center gap-4" onMouseEnter={() => setOpen(null)}>
          <CollapsibleSearch />
          <CartButton onClick={() => setCartOpen(true)} />
          <span className="w-px h-[30px] bg-border" />
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-[10px] no-underline">
            <span className="w-[38px] h-[38px] rounded-full bg-brand text-white flex items-center justify-center" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
            </span>
            <span className={cx("text-base text-body whitespace-nowrap", narrow ? "hidden" : "inline")}>Hola, <strong className="text-strong font-semibold">alumno/a</strong></span>
          </a>
        </div>
      </div>
      {open && (
        <div className="absolute left-0 right-0 top-full">
          <div className="max-w-container mx-auto py-0 px-container flex justify-start">
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
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }}
      className="group inline-flex items-center gap-2 text-sm text-body hover:text-brand no-underline py-[3px] px-0 transition-colors duration-base ease-standard">
      <span aria-hidden="true" className="text-brand font-bold opacity-0 group-hover:opacity-100 translate-x-[-6px] group-hover:translate-x-0 mr-[-14px] group-hover:mr-0 transition-[opacity,transform] duration-base ease-standard">→</span>
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
  const colLabel = "font-body text-xs uppercase tracking-eyebrow text-brand font-bold mb-5";
  return (
    <footer className="bg-[#e8e6e2] text-strong border-t border-border font-body">
      <div className="max-w-container mx-auto pt-8 px-container pb-5 grid grid-cols-[1.7fr_1fr_1fr_1fr] gap-10">
        <div className="max-w-[320px]">
          <img src={D.logoDark} alt="GEPCO Formación" className="h-[72px] object-contain mb-[18px] scale-[1.2] origin-left ml-[-7px]" />
          <p className="mt-0 mx-0 mb-5 text-sm leading-normal text-body">Escuela de Emergencias y PRL. Centro homologado por el ISPC. Más de 15 años formando profesionales.</p>
          <button type="button" onClick={() => nav("contact")} className="inline-flex items-center gap-[10px] bg-brand text-white border-none rounded-md py-3 px-5 font-body text-sm font-semibold tracking-[0.04em] cursor-pointer">Solicita información <span aria-hidden="true">→</span></button>
        </div>
        <div>
          <div className={colLabel}>Formación</div>
          <div className="flex flex-col gap-[2px]">
            {links.map((l) => <FLink key={l.label} label={l.label} onClick={() => nav(l.go)} />)}
          </div>
        </div>
        {offices.map((o) => (
          <div key={o.city}>
            <div className={colLabel}>{o.city}</div>
            {o.lines.map((l, i) => <div key={i} className="text-sm text-body leading-loose">{l}</div>)}
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="max-w-container mx-auto py-4 px-container flex items-center gap-6 flex-wrap justify-center">
          <span className="font-body text-xs uppercase tracking-eyebrow text-subtle flex-none">Certificaciones y acreditaciones oficiales</span>
          <img src="/assets/logos-acreditacion-gris-g.png" alt="Acreditaciones: Gobierno de España, Policía Nacional, IRATA International, SEMICYUC, ISO 9001, DGT e Irudek" loading="lazy" className="flex-[0_1_520px] min-w-0 h-auto object-contain opacity-[0.85]" />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-container mx-auto py-3 px-container flex justify-between flex-wrap gap-3 text-xs text-subtle">
          <span className="font-body">© 2010–2024 · GEP&amp;RISK 112 SL</span>
          <span>Privacidad · Aviso Legal · Términos y condiciones · Cookies</span>
        </div>
      </div>
    </footer>
  );
}

export { Navbar, Footer };
