import React from 'react';
import { onNav, getParam } from '../../lib/router.js';
import { cart } from '../../lib/cart.js';
import { DATA as D } from '../../lib/data.js';
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
const card = { background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: "var(--space-8)" };

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
  const D = D || {};
  const c = (D.courses || []).find((x) => x.id === id);
  return (c && c.hora) || "08:00"; // hora por defecto de cada formación
}

const AVISOS = [
  { t: "Ven preparado", d: "Acude con ropa cómoda y calzado de seguridad. Sin el equipo adecuado no podrás realizar la parte práctica." },
  { t: "Puntualidad obligatoria", d: "La teoría se imparte antes que la práctica. Si llegas tarde no podrás acceder a la formación, no se emitirá el título y no se devolverá el importe: sin la teoría es muy difícil superar la práctica." },
  { t: "Si no superas las pruebas", d: "No se devuelve el importe. Podrás volver otro día a repetir las pruebas abonando el 50% de la formación en la nueva fecha." },
];

function StepHead({ n, title, desc }) {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "var(--space-6)" }}>
      <span aria-hidden="true" style={{ flex: "0 0 auto", width: "34px", height: "34px", borderRadius: "var(--radius-full)", background: "var(--color-brand)", color: "#fff", fontFamily: "var(--font-display)", fontWeight: "var(--weight-bold)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "var(--text-base)" }}>{n}</span>
      <div>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", lineHeight: "var(--leading-snug)" }}>{title}</h2>
        {desc && <p style={{ margin: "4px 0 0", fontSize: "var(--text-sm)", color: "var(--text-subtle)", lineHeight: "var(--leading-normal)" }}>{desc}</p>}
      </div>
    </div>
  );
}

function PayOption({ id, active, onSelect, title, desc, tag }) {
  return (
    <button type="button" onClick={() => onSelect(id)} aria-pressed={active}
      style={{ textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "14px", padding: "var(--space-5) var(--space-6)", borderRadius: "var(--radius-md)", background: "var(--surface-card)", border: `2px solid ${active ? "var(--color-brand)" : "var(--border-default)"}`, boxShadow: active ? "var(--shadow-focus)" : "none", transition: "border-color var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)", width: "100%" }}>
      <span aria-hidden="true" style={{ flex: "0 0 auto", width: "20px", height: "20px", borderRadius: "var(--radius-full)", border: `2px solid ${active ? "var(--color-brand)" : "var(--border-hover)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {active && <span style={{ width: "10px", height: "10px", borderRadius: "var(--radius-full)", background: "var(--color-brand)" }} />}
      </span>
      <span style={{ flex: 1 }}>
        <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)" }}>{title}</span>
        <span style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--text-subtle)", marginTop: "2px" }}>{desc}</span>
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
    const row = { display: "flex", gap: "10px", fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)" };
    const rowLabel = { flex: "0 0 96px", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-subtle)", paddingTop: "3px" };
    return (
      <section style={{ background: "var(--surface-sunken)", padding: "var(--section-y) 0 var(--space-24)" }}>
        <Container style={{ maxWidth: "760px" }}>
          {/* Cabecera confirmación */}
          <div style={{ ...card, textAlign: "center", padding: "var(--space-12) var(--space-10)" }}>
            <div style={{ width: "64px", height: "64px", margin: "0 auto var(--space-6)", borderRadius: "var(--radius-full)", background: "var(--color-brand-soft, rgba(227,6,19,0.12))", color: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "34px" }}>✓</div>
            <h1 style={{ margin: "0 0 12px", fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)" }}>Reserva recibida<span style={{ color: "var(--color-brand)" }}>.</span></h1>
            <p style={{ margin: 0, fontSize: "var(--text-lg)", color: "var(--text-body)", lineHeight: "var(--leading-normal)" }}>Hemos registrado tu reserva. Aquí tienes todos los detalles y las instrucciones para el día de la formación.</p>
            <div style={{ marginTop: "var(--space-6)", display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 16px", borderRadius: "var(--radius-full)", background: "var(--surface-sunken)", border: "1px solid var(--border-default)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-subtle)" }}>Localizador</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", color: "var(--color-brand)" }}>{ref}</span>
            </div>
          </div>

          {/* Detalle por formación */}
          <div style={{ marginTop: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            {items.map((it) => {
              const sede = resolveSede(it.sede);
              return (
                <div key={it.id} style={card}>
                  <div style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start", marginBottom: "var(--space-6)" }}>
                    <img src={it.img} alt="" style={{ width: "64px", height: "64px", objectFit: "cover", borderRadius: "var(--radius-sm)", flex: "0 0 auto" }} />
                    <div>
                      <h2 style={{ margin: "0 0 4px", fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", lineHeight: "var(--leading-snug)" }}>{it.title}</h2>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-brand)" }}>{it.norm} · {it.qty} {it.qty === 1 ? "plaza" : "plazas"}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", borderTop: "1px solid var(--border-default)", paddingTop: "var(--space-5)" }}>
                    <div style={row}><span style={rowLabel}>Fecha</span><span style={{ color: "var(--text-strong)", fontWeight: "var(--weight-semibold)" }}>{it.fecha || "Por confirmar por email"}</span></div>
                    <div style={row}><span style={rowLabel}>Hora</span><span style={{ color: "var(--text-strong)", fontWeight: "var(--weight-semibold)" }}>{courseHora(it.id)} h · presentación 15 min antes</span></div>
                    <div style={row}>
                      <span style={rowLabel}>Sede</span>
                      <span>
                        {sede ? (
                          <React.Fragment>
                            <span style={{ display: "block", color: "var(--text-strong)", fontWeight: "var(--weight-semibold)" }}>{sede.name}</span>
                            <span style={{ display: "block", color: "var(--text-body)", margin: "2px 0 6px" }}>{sede.addr}</span>
                            <a href={sede.maps} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", color: "var(--color-brand)", textDecoration: "none" }}>Cómo llegar (Google Maps) <span aria-hidden="true">→</span></a>
                          </React.Fragment>
                        ) : (
                          <span style={{ color: "var(--text-body)" }}>Formación in company · te confirmamos la dirección por email.</span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Antes de venir — avisos importantes */}
          <div style={{ ...card, marginTop: "var(--space-6)", borderColor: "var(--color-brand)", borderWidth: "1px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-6)" }}>
              <span aria-hidden="true" style={{ flex: "0 0 auto", width: "34px", height: "34px", borderRadius: "var(--radius-full)", background: "var(--color-brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: "var(--weight-bold)", fontSize: "20px" }}>!</span>
              <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)" }}>Importante antes de venir</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
              {AVISOS.map((a) => (
                <div key={a.t} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <span aria-hidden="true" style={{ flex: "0 0 auto", color: "var(--color-brand)", fontWeight: "var(--weight-bold)", fontSize: "var(--text-lg)", lineHeight: "1.3" }}>›</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", marginBottom: "2px" }}>{a.t}</div>
                    <div style={{ fontSize: "var(--text-base)", color: "var(--text-body)", lineHeight: "var(--leading-normal)" }}>{a.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificado */}
          <div style={{ ...card, marginTop: "var(--space-6)", display: "flex", gap: "14px", alignItems: "flex-start", background: "var(--surface-card)" }}>
            <span aria-hidden="true" style={{ flex: "0 0 auto", color: "var(--color-brand)", fontWeight: "var(--weight-bold)", fontSize: "var(--text-lg)", marginTop: "1px" }}>✓</span>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", marginBottom: "2px" }}>Tu certificado</div>
              <div style={{ fontSize: "var(--text-base)", color: "var(--text-body)", lineHeight: "var(--leading-normal)" }}>Una vez superada la formación, recibirás el certificado por email y en tu perfil de la web en un máximo de <strong>48&nbsp;horas hábiles</strong>.</div>
            </div>
          </div>

          <p style={{ margin: "var(--space-8) 0 var(--space-6)", textAlign: "center", fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>Te hemos enviado un email con esta misma información. Si tienes cualquier duda, contacta con nosotros.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
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
      <section style={{ background: "var(--surface-sunken)", padding: "var(--section-y) 0", minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <Container style={{ maxWidth: "560px" }}>
          <div style={{ ...card, textAlign: "center", padding: "var(--space-16)" }}>
            <h1 style={{ margin: "0 0 12px", fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-extrabold)", color: "var(--text-strong)" }}>Tu carrito está vacío</h1>
            <p style={{ margin: "0 0 var(--space-8)", fontSize: "var(--text-base)", color: "var(--text-body)" }}>Añade una formación al carrito para tramitar tu reserva.</p>
            <Button variant="primary" uppercase iconRight={<span>→</span>} onClick={() => onNav("catalog")}>Ver formaciones</Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <div>
      <section style={{ background: "var(--surface-sunken)", padding: "var(--section-y) 0 var(--space-24)" }}>
        <Container>
          <div style={{ marginBottom: "var(--space-10)" }}>
            <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem,3vw,2.4rem)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-tight)", color: "var(--text-strong)" }}>Tramitar reserva<span style={{ color: "var(--color-brand)" }}>.</span></h1>
            <p style={{ margin: "10px 0 0", fontSize: "var(--text-lg)", color: "var(--text-body)", maxWidth: "620px", lineHeight: "var(--leading-normal)" }}>Completa los datos de facturación y de los alumnos.</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (accept) setSent(true); }}
            style={{ display: "grid", gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)", gap: "var(--space-10)", alignItems: "start" }}>

            {/* ---- Columna izquierda: pasos ---- */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>

              {/* 1. Comprador */}
              <div style={card}>
                <StepHead n="1" title="Datos de quien realiza la reserva" desc="Persona de contacto para la gestión de la reserva." />
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "var(--space-4)" }}>
                  <Input label="Nombre *" placeholder="Nombre" />
                  <Input label="Apellidos *" placeholder="Apellidos" />
                  <Input label="Email *" type="email" placeholder="tu@empresa.com" />
                  <Input label="Teléfono *" placeholder="+34 600 000 000" />
                </div>
              </div>

              {/* 2. Datos fiscales */}
              <div style={card}>
                <StepHead n="2" title="Datos fiscales" desc="Para la emisión de la factura." />
                <div role="tablist" aria-label="Tipo de cliente" style={{ display: "inline-flex", gap: "4px", padding: "4px", background: "var(--surface-sunken)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", marginBottom: "var(--space-6)" }}>
                  {[["empresa", "Empresa"], ["particular", "Autónomo / Particular"]].map(([id, lbl]) => (
                    <button key={id} type="button" role="tab" aria-selected={tipo === id} onClick={() => setTipo(id)}
                      style={{ cursor: "pointer", border: "none", borderRadius: "var(--radius-sm)", padding: "9px 18px", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", background: tipo === id ? "var(--color-brand)" : "transparent", color: tipo === id ? "#fff" : "var(--text-body)", transition: "background var(--duration-base) var(--ease-standard)" }}>{lbl}</button>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "var(--space-4)" }}>
                  {tipo === "empresa" ? (
                    <React.Fragment>
                      <div style={{ gridColumn: "1 / -1" }}><Input label="Razón social *" placeholder="Empresa, S.L." /></div>
                      <Input label="CIF *" placeholder="B12345678" />
                      <Input label="Persona de contacto fiscal" placeholder="Departamento / nombre" />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Input label="Nombre y apellidos *" placeholder="Nombre fiscal" />
                      <Input label="NIF / DNI *" placeholder="12345678A" />
                    </React.Fragment>
                  )}
                  <div style={{ gridColumn: "1 / -1" }}><Input label="Dirección fiscal *" placeholder="Calle, número, piso" /></div>
                  <Input label="Código postal *" placeholder="08000" />
                  <Input label="Población *" placeholder="Ciudad" />
                  <Input label="Provincia *" placeholder="Provincia" />
                  <Input label="País" placeholder="España" defaultValue="España" />
                </div>
              </div>

              {/* 3. Alumnos */}
              <div style={card}>
                <StepHead n="3" title="Datos de los alumnos" desc={`${totalAlumnos} ${totalAlumnos === 1 ? "plaza reservada" : "plazas reservadas"}. Indica los datos de cada asistente.`} />
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                  {items.map((it) => (
                    <div key={it.id}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "var(--space-4)", paddingBottom: "10px", borderBottom: "1px solid var(--border-default)" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)" }}>{it.title}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-brand)" }}>{it.norm}{it.sede ? " · " + it.sede : ""}{it.fecha ? " · " + it.fecha : ""}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                        {Array.from({ length: it.qty }).map((_, i) => (
                          <div key={i}>
                            <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-subtle)", marginBottom: "10px" }}>Alumno {i + 1}</div>
                            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)", gap: "var(--space-4)" }}>
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
              <div style={card}>
                <StepHead n="4" title="Método de pago" desc="Elige cómo quieres pagar. No se realiza ningún cargo hasta confirmar la reserva." />
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                  <PayOption id="tarjeta" active={pago === "tarjeta"} onSelect={setPago} title="Tarjeta de crédito / débito" desc="Visa, Mastercard · pago seguro" tag="Recomendado" />
                  <PayOption id="paypal" active={pago === "paypal"} onSelect={setPago} title="PayPal" desc="Paga con tu cuenta PayPal" />
                  <PayOption id="bizum" active={pago === "bizum"} onSelect={setPago} title="Bizum" desc="Pago inmediato desde el móvil" />
                </div>
              </div>
            </div>

            {/* ---- Columna derecha: resumen sticky ---- */}
            <aside style={{ position: "sticky", top: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div style={card}>
                <h2 style={{ margin: "0 0 var(--space-6)", fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)" }}>Resumen de la reserva</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
                  {items.map((it) => (
                    <div key={it.id} style={{ display: "flex", gap: "12px" }}>
                      <img src={it.img} alt="" style={{ width: "56px", height: "56px", objectFit: "cover", borderRadius: "var(--radius-sm)", flex: "0 0 auto" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", lineHeight: "var(--leading-snug)" }}>{it.title}</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-brand)", margin: "3px 0" }}>{it.norm}{it.sede ? " · " + it.sede : ""}{it.fecha ? " · " + it.fecha : ""}</div>
                        <div style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}>{it.qty} {it.qty === 1 ? "alumno" : "alumnos"}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid var(--border-default)", paddingTop: "var(--space-5)", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-sm)", color: "var(--text-body)" }}><span>Plazas</span><span style={{ fontFamily: "var(--font-mono)" }}>{totalAlumnos}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)" }}>Importe total</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>[PENDIENTE: precio]</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "var(--text-xs)", color: "var(--text-subtle)", lineHeight: "var(--leading-normal)" }}>El importe definitivo (IVA incluido) se confirma por email antes de cualquier cargo.</p>
                </div>
              </div>

              <div style={{ ...card, padding: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                <Checkbox checked={accept} onChange={(e) => setAccept(e.target.checked)} label={<span>He leído y acepto la <a href="#">Política de Privacidad</a>, el <a href="#">Aviso Legal</a> y las condiciones de reserva.</span>} />
                <Button type="submit" variant="primary" block size="lg" uppercase disabled={!accept} iconRight={<span>→</span>}>Confirmar reserva</Button>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["Sin cargo hasta confirmar la reserva", "Respuesta y factura en menos de 24 h", "Centro homologado ISPC"].map((t) => (
                    <li key={t} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "var(--text-xs)", color: "var(--text-subtle)", lineHeight: "var(--leading-normal)" }}>
                      <span aria-hidden="true" style={{ color: "var(--color-brand)", fontWeight: "var(--weight-bold)" }}>✓</span><span>{t}</span>
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
