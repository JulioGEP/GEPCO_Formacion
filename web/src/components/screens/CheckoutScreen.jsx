import React from 'react';
import { onNav, getParam } from '../../lib/router.js';
import { cart } from '../../lib/cart.js';
import { DATA as D } from '../../lib/data.js';
import { cx } from '../../lib/cx.js';
// Tramitar reserva — checkout: datos del comprador, datos fiscales (empresa/particular),
// datos de cada alumno según las plazas del carrito, y elección de pasarela de pago.
import { Button, Input, Select, Checkbox, SectionHeading, Badge } from '../ds/index.js';
import { Container } from '../common/Container.jsx';

function useCartItems() {
  const [items, setItems] = React.useState(cart ? cart.items() : []);
  React.useEffect(() => {
    if (!cart) return;
    const h = (e) => setItems((e && e.detail) || cart.items());
    window.addEventListener("cart:change", h);
    return () => window.removeEventListener("cart:change", h);
  }, []);
  return items;
}

const eyebrow = { fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--color-brand)" };
const card = "bg-surface border border-border rounded-lg p-8";

// Sedes físicas → dirección + Google Maps. La formación in company no tiene sede fija.
const SEDES_INFO = {
  sabadell: { name: "Sabadell (Barcelona)", addr: "C. Moratín, 100 · 08206 Sabadell, Barcelona", maps: "https://maps.google.com/?q=C.+Morat%C3%ADn+100+08206+Sabadell+Barcelona" },
  madrid: { name: "Arganda del Rey (Madrid)", addr: "C. Primavera, 1 · 28500 Arganda del Rey, Madrid", maps: "https://maps.google.com/?q=C.+Primavera+1+28500+Arganda+del+Rey+Madrid" },
};
function resolveSede(sede) {
  if (!sede) return null;
  const s = sede.toLowerCase();
  if (s.indexOf("sabadell") >= 0) return SEDES_INFO.sabadell;
  if (s.indexOf("madrid") >= 0 || s.indexOf("arganda") >= 0) return SEDES_INFO.madrid;
  return null;
}
function courseHora(id) {
  // Usa el DATA importado (alias D). Ojo: no redeclarar `const D` aquí —
  // sombrear el import provoca un ReferenceError (TDZ) que dejaba la página
  // de confirmación en blanco al pulsar «Confirmar reserva».
  const c = (D?.courses || []).find((x) => x.id === id);
  return (c && c.hora) || "08:00"; // hora por defecto de cada formación
}

const AVISOS = [
  { t: "Ven preparado", d: "Acude con ropa cómoda y calzado de seguridad. Sin el equipo adecuado no podrás realizar la parte práctica." },
  { t: "Puntualidad obligatoria", d: "La teoría se imparte antes que la práctica. Si llegas tarde no podrás acceder a la formación, no se emitirá el título y no se devolverá el importe: sin la teoría es muy difícil superar la práctica." },
  { t: "Si no superas las pruebas", d: "No se devuelve el importe. Podrás volver otro día a repetir las pruebas abonando el 50% de la formación en la nueva fecha." },
];

function StepHead({ n, title, desc }) {
  return (
    <div className="flex gap-4 items-start mb-6">
      <span aria-hidden="true" className="flex-none w-[34px] h-[34px] rounded-full bg-brand text-white font-display font-bold flex items-center justify-center text-base">{n}</span>
      <div>
        <h2 className="m-0 font-display text-xl font-bold text-strong leading-snug">{title}</h2>
        {desc && <p className="m-[4px_0_0] text-sm text-subtle leading-normal">{desc}</p>}
      </div>
    </div>
  );
}

function PayOption({ id, active, onSelect, title, desc, tag }) {
  return (
    <button type="button" onClick={() => onSelect(id)} aria-pressed={active}
      className={cx("text-left cursor-pointer flex items-center gap-3.5 p-[var(--space-5)_var(--space-6)] rounded-md bg-surface w-full border-2 transition-[border-color,box-shadow] duration-base ease-standard", active ? "border-brand shadow-focus" : "border-border shadow-none")}>
      <span aria-hidden="true" className={cx("flex-none w-5 h-5 rounded-full border-2 flex items-center justify-center", active ? "border-brand" : "border-border-strong")}>
        {active && <span className="w-2.5 h-2.5 rounded-full bg-brand" />}
      </span>
      <span className="flex-1">
        <span className="block font-display text-base font-semibold text-strong">{title}</span>
        <span className="block text-sm text-subtle mt-0.5">{desc}</span>
      </span>
      {tag && <Badge tone="soft">{tag}</Badge>}
    </button>
  );
}

function CheckoutScreen() {
  const items = useCartItems();
  const [tipo, setTipo] = React.useState("empresa");
  const [pago, setPago] = React.useState("tarjeta");
  const [accept, setAccept] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const totalAlumnos = items.reduce((n, i) => n + i.qty, 0);

  // ---- Reserva confirmada ----
  if (sent) {
    const ref = "GEP-" + String(Date.now()).slice(-6);
    const row = "flex gap-2.5 text-base leading-normal";
    const rowLabel = "flex-[0_0_96px] font-mono text-xs uppercase tracking-eyebrow text-subtle pt-[3px]";
    return (
      <section className="bg-surface-muted p-[var(--section-y)_0_var(--space-24)]">
        <Container style={{ maxWidth: "760px" }}>
          {/* Cabecera confirmación */}
          <div className="bg-surface border border-border rounded-lg p-[var(--space-12)_var(--space-10)] text-center">
            <div className="w-16 h-16 m-[0_auto_var(--space-6)] rounded-full bg-brand-soft text-brand flex items-center justify-center text-[34px]">✓</div>
            <h1 className="m-[0_0_12px] font-display text-3xl font-extrabold tracking-display text-strong">Reserva recibida<span className="text-brand">.</span></h1>
            <p className="m-0 text-lg text-body leading-normal">Hemos registrado tu reserva. Aquí tienes todos los detalles y las instrucciones para el día de la formación.</p>
            <div className="mt-6 inline-flex items-center gap-2.5 p-[8px_16px] rounded-full bg-surface-muted border border-border">
              <span className="font-mono text-xs uppercase tracking-eyebrow text-subtle">Localizador</span>
              <span className="font-mono text-sm font-semibold text-brand">{ref}</span>
            </div>
          </div>

          {/* Detalle por formación */}
          <div className="mt-6 flex flex-col gap-6">
            {items.map((it) => {
              const sede = resolveSede(it.sede);
              return (
                <div key={it.id} className={card}>
                  <div className="flex gap-4 items-start mb-6">
                    <img src={it.img} alt="" className="w-16 h-16 object-cover rounded-sm flex-none" />
                    <div>
                      <h2 className="m-[0_0_4px] font-display text-lg font-bold text-strong leading-snug">{it.title}</h2>
                      <div className="font-mono text-[11px] text-brand">{it.norm} · {it.qty} {it.qty === 1 ? "plaza" : "plazas"}</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 border-t border-border pt-5">
                    <div className={row}><span className={rowLabel}>Fecha</span><span className="text-strong font-semibold">{it.fecha || "Por confirmar por email"}</span></div>
                    <div className={row}><span className={rowLabel}>Hora</span><span className="text-strong font-semibold">{courseHora(it.id)} h · presentación 15 min antes</span></div>
                    <div className={row}>
                      <span className={rowLabel}>Sede</span>
                      <span>
                        {sede ? (
                          <React.Fragment>
                            <span className="block text-strong font-semibold">{sede.name}</span>
                            <span className="block text-body m-[2px_0_6px]">{sede.addr}</span>
                            <a href={sede.maps} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand no-underline">Cómo llegar (Google Maps) <span aria-hidden="true">→</span></a>
                          </React.Fragment>
                        ) : (
                          <span className="text-body">Formación in company · te confirmamos la dirección por email.</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Antes de venir — avisos importantes */}
          <div className="bg-surface rounded-lg p-8 mt-6 border border-brand">
            <div className="flex items-center gap-3 mb-6">
              <span aria-hidden="true" className="flex-none w-[34px] h-[34px] rounded-full bg-brand text-white flex items-center justify-center font-display font-bold text-[20px]">!</span>
              <h2 className="m-0 font-display text-xl font-bold text-strong">Importante antes de venir</h2>
            </div>
            <div className="flex flex-col gap-5">
              {AVISOS.map((a) => (
                <div key={a.t} className="flex gap-3.5 items-start">
                  <span aria-hidden="true" className="flex-none text-brand font-bold text-lg leading-[1.3]">›</span>
                  <div>
                    <div className="font-display text-base font-bold text-strong mb-0.5">{a.t}</div>
                    <div className="text-base text-body leading-normal">{a.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificado */}
          <div className="bg-surface border border-border rounded-lg p-8 mt-6 flex gap-3.5 items-start">
            <span aria-hidden="true" className="flex-none text-brand font-bold text-lg mt-px">✓</span>
            <div>
              <div className="font-display text-base font-bold text-strong mb-0.5">Tu certificado</div>
              <div className="text-base text-body leading-normal">Una vez superada la formación, recibirás el certificado por email y en tu perfil de la web en un máximo de <strong>48&nbsp;horas hábiles</strong>.</div>
            </div>
          </div>

          <p className="m-[var(--space-8)_0_var(--space-6)] text-center text-sm text-subtle">Te hemos enviado un email con esta misma información. Si tienes cualquier duda, contacta con nosotros.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button variant="primary" uppercase iconRight={<span>→</span>} onClick={() => { cart && cart.clear(); onNav("catalog"); }}>Ver más formaciones</Button>
            <Button variant="outline" onClick={() => onNav("contact")}>Contactar</Button>
          </div>
        </Container>
      </section>
    );
  }

  // ---- Carrito vacío ----
  if (items.length === 0) {
    return (
      <section className="bg-surface-muted p-[var(--section-y)_0] min-h-[60vh] flex items-center">
        <Container style={{ maxWidth: "560px" }}>
          <div className="bg-surface border border-border rounded-lg p-16 text-center">
            <h1 className="m-[0_0_12px] font-display text-2xl font-extrabold text-strong">Tu carrito está vacío</h1>
            <p className="m-[0_0_var(--space-8)] text-base text-body">Añade una formación al carrito para tramitar tu reserva.</p>
            <Button variant="primary" uppercase iconRight={<span>→</span>} onClick={() => onNav("catalog")}>Ver formaciones</Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <div>
      <section className="bg-surface-muted p-[var(--section-y)_0_var(--space-24)]">
        <Container>
          <div className="mb-10">
            <h1 className="m-0 font-display text-[clamp(1.75rem,3vw,2.4rem)] font-extrabold tracking-display leading-tight text-strong">Tramitar reserva<span className="text-brand">.</span></h1>
            <p className="m-[10px_0_0] text-lg text-body max-w-[620px] leading-normal">Completa los datos de facturación y de los alumnos.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (accept) setSent(true); }}
            className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-10 items-start">

            {/* ---- Columna izquierda: pasos ---- */}
            <div className="flex flex-col gap-6">

              {/* 1. Comprador */}
              <div className={card}>
                <StepHead n="1" title="Datos de quien realiza la reserva" desc="Persona de contacto para la gestión de la reserva." />
                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4">
                  <Input label="Nombre *" placeholder="Nombre" />
                  <Input label="Apellidos *" placeholder="Apellidos" />
                  <Input label="Email *" type="email" placeholder="tu@empresa.com" />
                  <Input label="Teléfono *" placeholder="+34 600 000 000" />
                </div>
              </div>

              {/* 2. Datos fiscales */}
              <div className={card}>
                <StepHead n="2" title="Datos fiscales" desc="Para la emisión de la factura." />
                <div role="tablist" aria-label="Tipo de cliente" className="inline-flex gap-1 p-1 bg-surface-muted border border-border rounded-md mb-6">
                  {[["empresa", "Empresa"], ["particular", "Autónomo / Particular"]].map(([id, lbl]) => (
                    <button key={id} type="button" role="tab" aria-selected={tipo === id} onClick={() => setTipo(id)}
                      className={cx("cursor-pointer border-none rounded-sm p-[9px_18px] font-body text-sm font-semibold transition-[background] duration-base ease-standard", tipo === id ? "bg-brand text-white" : "bg-transparent text-body")}>{lbl}</button>
                  ))}
                </div>
                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4">
                  {tipo === "empresa" ? (
                    <React.Fragment>
                      <div className="col-span-full"><Input label="Razón social *" placeholder="Empresa, S.L." /></div>
                      <Input label="CIF *" placeholder="B12345678" />
                      <Input label="Persona de contacto fiscal" placeholder="Departamento / nombre" />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Input label="Nombre y apellidos *" placeholder="Nombre fiscal" />
                      <Input label="NIF / DNI *" placeholder="12345678A" />
                    </React.Fragment>
                  )}
                  <div className="col-span-full"><Input label="Dirección fiscal *" placeholder="Calle, número, piso" /></div>
                  <Input label="Código postal *" placeholder="08000" />
                  <Input label="Población *" placeholder="Ciudad" />
                  <Input label="Provincia *" placeholder="Provincia" />
                  <Input label="País" placeholder="España" defaultValue="España" />
                </div>
              </div>

              {/* 3. Alumnos */}
              <div className={card}>
                <StepHead n="3" title="Datos de los alumnos" desc={`${totalAlumnos} ${totalAlumnos === 1 ? "plaza reservada" : "plazas reservadas"}. Indica los datos de cada asistente.`} />
                <div className="flex flex-col gap-6">
                  {items.map((it) => (
                    <div key={it.id}>
                      <div className="flex items-center gap-2.5 mb-4 pb-2.5 border-b border-border">
                        <span className="font-display text-base font-bold text-strong">{it.title}</span>
                        <span className="font-mono text-[11px] text-brand">{it.norm}{it.sede ? " · " + it.sede : ""}{it.fecha ? " · " + it.fecha : ""}</span>
                      </div>
                      <div className="flex flex-col gap-5">
                        {Array.from({ length: it.qty }).map((_, i) => (
                          <div key={i}>
                            <div className="font-mono text-xs uppercase tracking-eyebrow text-subtle mb-2.5">Alumno {i + 1}</div>
                            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4">
                              <Input label="Nombre *" placeholder="Nombre" />
                              <Input label="Apellidos *" placeholder="Apellidos" />
                              <Input label="DNI *" placeholder="12345678A" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Pago */}
              <div className={card}>
                <StepHead n="4" title="Método de pago" desc="Elige cómo quieres pagar. No se realiza ningún cargo hasta confirmar la reserva." />
                <div className="flex flex-col gap-3">
                  <PayOption id="tarjeta" active={pago === "tarjeta"} onSelect={setPago} title="Tarjeta de crédito / débito" desc="Visa, Mastercard · pago seguro" tag="Recomendado" />
                  <PayOption id="paypal" active={pago === "paypal"} onSelect={setPago} title="PayPal" desc="Paga con tu cuenta PayPal" />
                  <PayOption id="bizum" active={pago === "bizum"} onSelect={setPago} title="Bizum" desc="Pago inmediato desde el móvil" />
                </div>
              </div>
            </div>

            {/* ---- Columna derecha: resumen sticky ---- */}
            <aside className="sticky top-6 flex flex-col gap-4">
              <div className={card}>
                <h2 className="m-[0_0_var(--space-6)] font-display text-xl font-bold text-strong">Resumen de la reserva</h2>
                <div className="flex flex-col gap-4 mb-6">
                  {items.map((it) => (
                    <div key={it.id} className="flex gap-3">
                      <img src={it.img} alt="" className="w-14 h-14 object-cover rounded-sm flex-none" />
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-sm font-bold text-strong leading-snug">{it.title}</div>
                        <div className="font-mono text-[11px] text-brand m-[3px_0]">{it.norm}{it.sede ? " · " + it.sede : ""}{it.fecha ? " · " + it.fecha : ""}</div>
                        <div className="text-xs text-subtle">{it.qty} {it.qty === 1 ? "alumno" : "alumnos"}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-5 flex flex-col gap-2.5">
                  <div className="flex justify-between text-sm text-body"><span>Plazas</span><span className="font-mono">{totalAlumnos}</span></div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-display font-bold text-strong">Importe total</span>
                    <span className="font-mono text-sm text-subtle">[PENDIENTE: precio]</span>
                  </div>
                  <p className="m-0 text-xs text-subtle leading-normal">El importe definitivo (IVA incluido) se confirma por email antes de cualquier cargo.</p>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-lg p-6 flex flex-col gap-5">
                <Checkbox checked={accept} onChange={(e) => setAccept(e.target.checked)} label={<span>He leído y acepto la <a href="#">Política de Privacidad</a>, el <a href="#">Aviso Legal</a> y las condiciones de reserva.</span>} />
                <Button type="submit" variant="primary" block size="lg" uppercase disabled={!accept} iconRight={<span>→</span>}>Confirmar reserva</Button>
                <ul className="list-none m-0 p-0 flex flex-col gap-2">
                  {["Sin cargo hasta confirmar la reserva", "Respuesta y factura en menos de 24 h", "Centro homologado ISPC"].map((t) => (
                    <li key={t} className="flex gap-2.5 items-start text-xs text-subtle leading-normal">
                      <span aria-hidden="true" className="text-brand font-bold">✓</span><span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </form>
        </Container>
      </section>
    </div>
  );
}
export default CheckoutScreen;
