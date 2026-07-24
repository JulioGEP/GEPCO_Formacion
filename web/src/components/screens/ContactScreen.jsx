import React from 'react';
// Contacto — versión CRO: propuesta de valor, qué recibirás, prueba de confianza,
// formulario segmentado B2B, canales directos por sede y FAQ que resuelve objeciones.
import { Button, Input, Select, Checkbox, StatBlock, SectionHeading, Accordion, Badge } from '../ds/index.js';
import { DATA as D } from '../../lib/data.js';
import { Container } from '../common/Container.jsx';

const SEDES = [
  { city: "Sabadell (Barcelona)", addr: "C. Moratín, 100 · 08206 Sabadell", tel: "935 646 346", telHref: "+34935646346",
    maps: "https://maps.google.com/?q=C.+Morat%C3%ADn+100+Sabadell" },
  { city: "Madrid", addr: "C. Primavera, 1 · 28500 Arganda del Rey", tel: "916 263 818", telHref: "+34916263818",
    maps: "https://maps.google.com/?q=C.+Primavera+1+Arganda+del+Rey" },
];

const RECIBES = [
  "Propuesta formativa adaptada a tu perfil o empresa",
  "Calendario de fechas disponibles y sedes",
  "Presupuesto cerrado, sin compromiso",
  "Asesoramiento sobre certificación y normativa aplicable",
];

const FAQ = [
  { q: "¿Solicitar información tiene algún coste?", a: "No. Preparamos una propuesta y un presupuesto a medida de forma totalmente gratuita y sin compromiso. Solo reservas plaza cuando tú decides." },
  { q: "¿En cuánto tiempo respondéis?", a: "Un asesor te contacta en menos de 24 horas laborables con propuesta, fechas y presupuesto. Si tienes prisa, llámanos y lo resolvemos al momento." },
  { q: "¿Formáis en toda España?", a: "Sí. Impartimos en nuestras sedes de Sabadell y Arganda del Rey (Madrid), y desplazamos la formación in company a toda la península para empresas y grupos." },
  { q: "¿Los certificados son oficiales?", a: "Somos centro homologado por el ISPC. El Curso de Bombero/a de Empresa está certificado conforme al Decreto 374/1996, y emitimos certificación oficial en las formaciones que la contemplan." },
  { q: "¿Puedo formar solo a una persona o solo se hacen grupos de empresa?", a: "Ambas opciones. Tenemos convocatorias en abierto para autónomos y particulares, y también diseñamos formación cerrada a medida para equipos y empresas." },
];

function ChannelRow({ icon, label, value, href }) {
  const inner = (
    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <span aria-hidden="true" style={{ flex: "0 0 auto", width: "42px", height: "42px", borderRadius: "var(--radius-full)", background: "rgba(227,6,19,0.16)", color: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{icon}</span>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "rgba(255,255,255,0.55)" }}>{label}</div>
        <div style={{ fontSize: "var(--text-lg)", fontWeight: "var(--weight-semibold)", color: "#fff" }}>{value}</div>
      </div>
    </div>
  );
  return href
    ? <a href={href} style={{ textDecoration: "none", display: "block" }}>{inner}</a>
    : inner;
}

function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  const [accept, setAccept] = React.useState(false);

  return (
    <div>
      {/* ---- Split hero: value prop + qué recibirás + canales · formulario ---- */}
      <section style={{ background: "var(--surface-card)", padding: "var(--section-y) 0" }}>
        <Container>
          <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1.05fr", boxShadow: "var(--shadow-lg)" }}>
            {/* Left — persuasión */}
            <div style={{ position: "relative", background: "var(--color-dark)", color: "#fff", padding: "var(--space-16)", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
              <img src={D.hero} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.28 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,15,15,0.72), rgba(15,15,15,0.94))" }} />
              <div style={{ position: "relative" }}>
                <h1 style={{ margin: "0 0 16px", fontFamily: "var(--font-display)", fontSize: "clamp(2rem,3.6vw,3rem)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-tight)" }}>Hablemos de tu formación<span style={{ color: "var(--color-brand)" }}>.</span></h1>
                <p style={{ margin: "0 0 26px", fontSize: "var(--text-lg)", lineHeight: "var(--leading-normal)", color: "rgba(255,255,255,0.82)", maxWidth: "440px" }}>Cuéntanos qué necesitas y un asesor te responde en menos de 24&nbsp;h. Sin compromiso.</p>

                {/* Qué recibirás — reduce la incertidumbre de rellenar el formulario */}
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "rgba(255,255,255,0.55)", marginBottom: "12px" }}>Qué recibirás</div>
                <ul style={{ listStyle: "none", margin: "0 0 30px", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {RECIBES.map((t) => (
                    <li key={t} style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "var(--text-base)", color: "rgba(255,255,255,0.9)", lineHeight: "var(--leading-normal)" }}>
                      <span aria-hidden="true" style={{ flex: "0 0 auto", color: "var(--color-brand)", fontWeight: "var(--weight-bold)", marginTop: "1px" }}>✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", gap: "var(--space-10)", flexWrap: "wrap" }}>
                  <StatBlock value="24 h" label="Respuesta media" onDark />
                  <StatBlock value="ISPC" label="Centro homologado" onDark />
                  <StatBlock value="+15" label="Años formando" onDark />
                  <StatBlock value="✓" label="Formación in company" onDark />
                </div>
              </div>
            </div>

            {/* Right — formulario */}
            <div style={{ background: "var(--color-dark-soft)", color: "#fff", padding: "var(--space-16)" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "var(--space-16) 0" }}>
                  <div style={{ fontSize: "44px", marginBottom: "12px", color: "var(--color-success)" }}>✓</div>
                  <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-bold)" }}>¡Gracias por tu mensaje!</h3>
                  <p style={{ margin: 0, color: "var(--text-on-dark-muted)" }}>Lo hemos recibido correctamente. Un asesor te responderá en menos de 24&nbsp;h con propuesta, fechas y presupuesto.</p>
                </div>
              ) : (
                <React.Fragment>
                  <h2 style={{ margin: "0 0 6px", fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-bold)" }}>Solicita información</h2>
                  <p style={{ margin: "0 0 var(--space-6)", fontSize: "var(--text-base)", color: "var(--text-on-dark-muted)" }}>Te preparamos una propuesta a medida en menos de 24&nbsp;h.</p>
                  <form onSubmit={(e) => { e.preventDefault(); if (accept) setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                      <Input theme="dark" label="Nombre *" placeholder="Tu nombre" />
                      <Input theme="dark" label="Empresa" placeholder="Razón social" />
                      <Input theme="dark" label="Email *" type="email" placeholder="tu@empresa.com" />
                      <Input theme="dark" label="Teléfono *" placeholder="+34 600 000 000" />
                    </div>
                    <Select theme="dark" label="Solicitas información como…" placeholder="Elige una opción" options={["Individual / Autónomo / Particular", "Empresa (menos de 5 personas)", "Empresa / Grupos / Formación adaptada"]} />
                    <Select theme="dark" label="Ubicación de la formación" placeholder="Elige una opción" options={["Sabadell", "Madrid", "Resto Península (Sólo empresas)"]} />
                    <Input theme="dark" label="Observaciones (opcional)" placeholder="Cuéntanos qué necesitas" />
                    <Checkbox theme="dark" checked={accept} onChange={(e) => setAccept(e.target.checked)} label={<span>He leído y acepto la <a href="#" style={{ color: "#fff", textDecoration: "underline" }}>Política de Privacidad</a> y el <a href="#" style={{ color: "#fff", textDecoration: "underline" }}>Aviso Legal</a>.</span>} />
                    <Button type="submit" variant="primary" size="lg" uppercase disabled={!accept} iconRight={<span>→</span>}>Enviar solicitud</Button>
                    <p style={{ margin: 0, textAlign: "center", fontSize: "var(--text-sm)", color: "var(--text-on-dark-muted)" }}>Respuesta en menos de 24&nbsp;h · Gratis y sin compromiso</p>
                  </form>
                </React.Fragment>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Por qué contactarnos — refuerza la decisión ---- */}
      <section style={{ background: "var(--surface-sunken)", padding: "var(--section-y) 0" }}>
        <Container>
          <SectionHeading eyebrow="Por qué GEPCO" title="Formación real, avalada y sin letra pequeña" align="center" />
          <div style={{ marginTop: "var(--space-12)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "var(--space-6)" }}>
            {D.diff.map((d) => (
              <div key={d.l} style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: "var(--space-8)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-extrabold)", color: "var(--color-brand)", letterSpacing: "var(--tracking-display)", marginBottom: "10px" }}>{d.v}</div>
                <div style={{ fontSize: "var(--text-base)", color: "var(--text-body)", lineHeight: "var(--leading-normal)" }}>{d.l}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- Canales directos por sede — para quien no quiere esperar ---- */}
      <section style={{ background: "var(--surface-card)", padding: "var(--section-y) 0" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-16)", alignItems: "stretch" }}>
            <div>
              <SectionHeading eyebrow="Prefieres hablar" title="Llámanos ahora mismo" />
              <p style={{ margin: "16px 0 var(--space-10)", fontSize: "var(--text-lg)", color: "var(--text-body)", lineHeight: "var(--leading-normal)", maxWidth: "460px" }}>Si tienes prisa o prefieres el trato directo, marca la sede más cercana. Horario de atención de lunes a viernes, 8:00–16:00.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                {SEDES.map((s) => (
                  <div key={s.city} style={{ background: "var(--surface-sunken)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: "var(--space-8)" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--color-brand)", marginBottom: "8px" }}>{s.city}</div>
                    <div style={{ fontSize: "var(--text-base)", color: "var(--text-body)", lineHeight: "var(--leading-normal)", marginBottom: "16px" }}>{s.addr}</div>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <Button variant="primary" size="sm" onClick={() => { window.location.href = "tel:" + s.telHref; }} iconLeft={<span aria-hidden="true">☎</span>}>{s.tel}</Button>
                      <Button variant="outline" size="sm" onClick={() => window.open(s.maps, "_blank", "noopener")}>Cómo llegar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Otros canales sobre panel oscuro */}
            <div style={{ position: "relative", background: "var(--color-dark)", color: "#fff", borderRadius: "var(--radius-xl)", overflow: "hidden", padding: "var(--space-16)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <img src={D.heroQuote} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.22 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(15,15,15,0.86), rgba(15,15,15,0.96))" }} />
              <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
                <div>
                  <Badge tone="soft">Atención directa</Badge>
                  <h3 style={{ margin: "16px 0 0", fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-bold)", lineHeight: "var(--leading-snug)" }}>Escríbenos por el canal que prefieras</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
                  <ChannelRow icon="✉" label="Email" value="info@gepcoformacion.es" href="mailto:info@gepcoformacion.es" />
                  <ChannelRow icon="✆" label="WhatsApp" value="Escríbenos por WhatsApp" href="https://wa.me/34935646346" />
                  <ChannelRow icon="⚲" label="Formación in company" value="Te visitamos en tus instalaciones" />
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "var(--space-6)", fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.6)", lineHeight: "var(--leading-normal)" }}>Cobertura en toda la península para empresas y grupos. Formamos a autónomos, particulares y equipos de empresa.</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- FAQ — resuelve objeciones antes de que frenen la conversión ---- */}
      <section style={{ background: "var(--surface-sunken)", padding: "var(--section-y) 0" }}>
        <Container style={{ maxWidth: "820px" }}>
          <SectionHeading eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas antes de empezar" align="center" />
          <div style={{ marginTop: "var(--space-12)" }}>
            <Accordion defaultOpen={[0]} items={FAQ} />
          </div>
        </Container>
      </section>
    </div>
  );
}
export default ContactScreen;
