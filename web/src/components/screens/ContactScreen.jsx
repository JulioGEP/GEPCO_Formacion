import React from 'react';
// Contacto — versión CRO: propuesta de valor, qué recibirás, prueba de confianza,
// formulario segmentado B2B, canales directos por sede y FAQ que resuelve objeciones.
import { Button, Input, Select, Checkbox, StatBlock, SectionHeading, Accordion, Badge } from '../ds/index.js';
import { DATA as D } from '../../lib/data.js';
import { Container } from '../common/Container.jsx';
import { cx } from '../../lib/cx.js';

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
    <div className="flex items-center gap-[14px]">
      <span aria-hidden="true" className="flex-[0_0_auto] w-[42px] h-[42px] rounded-full bg-[rgba(227,6,19,0.16)] text-brand flex items-center justify-center text-[20px]">{icon}</span>
      <div>
        <div className="font-mono text-xs uppercase tracking-eyebrow text-white/[0.55]">{label}</div>
        <div className="text-lg font-semibold text-white">{value}</div>
      </div>
    </div>
  );
  return href
    ? <a href={href} className="no-underline block">{inner}</a>
    : inner;
}

function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  const [accept, setAccept] = React.useState(false);

  return (
    <div>
      {/* ---- Split hero: value prop + qué recibirás + canales · formulario ---- */}
      <section className="bg-surface py-section">
        <Container>
          <div className="rounded-xl overflow-hidden grid grid-cols-[1fr_1.05fr] shadow-lg">
            {/* Left — persuasión */}
            <div className="relative bg-dark text-white p-16 overflow-hidden flex flex-col justify-start">
              <img src={D.hero} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.28]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,15,15,0.72),rgba(15,15,15,0.94))]" />
              <div className="relative">
                <h1 className="mb-[16px] font-display text-[clamp(2rem,3.6vw,3rem)] font-extrabold tracking-display leading-tight">Hablemos de tu formación<span className="text-brand">.</span></h1>
                <p className="mb-[26px] text-lg leading-normal text-white/[0.82] max-w-[440px]">Cuéntanos qué necesitas y un asesor te responde en menos de 24&nbsp;h. Sin compromiso.</p>

                {/* Qué recibirás — reduce la incertidumbre de rellenar el formulario */}
                <div className="font-mono text-xs uppercase tracking-eyebrow text-white/[0.55] mb-[12px]">Qué recibirás</div>
                <ul className="list-none mb-[30px] p-0 flex flex-col gap-[10px]">
                  {RECIBES.map((t) => (
                    <li key={t} className="flex gap-[12px] items-start text-base text-white/90 leading-normal">
                      <span aria-hidden="true" className="flex-[0_0_auto] text-brand font-bold mt-px">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-10 flex-wrap">
                  <StatBlock value="24 h" label="Respuesta media" onDark />
                  <StatBlock value="ISPC" label="Centro homologado" onDark />
                  <StatBlock value="+15" label="Años formando" onDark />
                  <StatBlock value="✓" label="Formación in company" onDark />
                </div>
              </div>
            </div>

            {/* Right — formulario */}
            <div className="bg-dark-soft text-white p-16">
              {sent ? (
                <div className="text-center py-16">
                  <div className="text-[44px] mb-[12px] text-success">✓</div>
                  <h3 className="mb-[8px] font-display text-2xl font-bold">¡Gracias por tu mensaje!</h3>
                  <p className="m-0 text-on-dark-muted">Lo hemos recibido correctamente. Un asesor te responderá en menos de 24&nbsp;h con propuesta, fechas y presupuesto.</p>
                </div>
              ) : (
                <React.Fragment>
                  <h2 className="mb-[6px] font-display text-2xl font-bold">Solicita información</h2>
                  <p className="mb-6 text-base text-on-dark-muted">Te preparamos una propuesta a medida en menos de 24&nbsp;h.</p>
                  <form onSubmit={(e) => { e.preventDefault(); if (accept) setSent(true); }} className="flex flex-col gap-5">
                    <div className="grid grid-cols-[1fr_1fr] gap-4">
                      <Input theme="dark" label="Nombre *" placeholder="Tu nombre" />
                      <Input theme="dark" label="Empresa" placeholder="Razón social" />
                      <Input theme="dark" label="Email *" type="email" placeholder="tu@empresa.com" />
                      <Input theme="dark" label="Teléfono *" placeholder="+34 600 000 000" />
                    </div>
                    <Select theme="dark" label="Solicitas información como…" placeholder="Elige una opción" options={["Individual / Autónomo / Particular", "Empresa (menos de 5 personas)", "Empresa / Grupos / Formación adaptada"]} />
                    <Select theme="dark" label="Ubicación de la formación" placeholder="Elige una opción" options={["Sabadell", "Madrid", "Resto Península (Sólo empresas)"]} />
                    <Input theme="dark" label="Observaciones (opcional)" placeholder="Cuéntanos qué necesitas" />
                    <Checkbox theme="dark" checked={accept} onChange={(e) => setAccept(e.target.checked)} label={<span>He leído y acepto la <a href="#" className="text-white underline">Política de Privacidad</a> y el <a href="#" className="text-white underline">Aviso Legal</a>.</span>} />
                    <Button type="submit" variant="primary" size="lg" uppercase disabled={!accept} iconRight={<span>→</span>}>Enviar solicitud</Button>
                    <p className="m-0 text-center text-sm text-on-dark-muted">Respuesta en menos de 24&nbsp;h · Gratis y sin compromiso</p>
                  </form>
                </React.Fragment>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Por qué contactarnos — refuerza la decisión ---- */}
      <section className="bg-surface-muted py-section">
        <Container>
          <SectionHeading eyebrow="Por qué GEPCO" title="Formación real, avalada y sin letra pequeña" align="center" />
          <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6">
            {D.diff.map((d) => (
              <div key={d.l} className="bg-surface border border-border rounded-lg p-8">
                <div className="font-display text-2xl font-extrabold text-brand tracking-display mb-[10px]">{d.v}</div>
                <div className="text-base text-body leading-normal">{d.l}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- Canales directos por sede — para quien no quiere esperar ---- */}
      <section className="bg-surface py-section">
        <Container>
          <div className="grid grid-cols-[1fr_1fr] gap-16 items-stretch">
            <div>
              <SectionHeading eyebrow="Prefieres hablar" title="Llámanos ahora mismo" />
              <p className="mt-[16px] mb-10 text-lg text-body leading-normal max-w-[460px]">Si tienes prisa o prefieres el trato directo, marca la sede más cercana. Horario de atención de lunes a viernes, 8:00–16:00.</p>
              <div className="flex flex-col gap-6">
                {SEDES.map((s) => (
                  <div key={s.city} className="bg-surface-muted border border-border rounded-lg p-8">
                    <div className="font-mono text-xs uppercase tracking-eyebrow text-brand mb-[8px]">{s.city}</div>
                    <div className="text-base text-body leading-normal mb-[16px]">{s.addr}</div>
                    <div className="flex gap-[10px] flex-wrap">
                      <Button variant="primary" size="sm" onClick={() => { window.location.href = "tel:" + s.telHref; }} iconLeft={<span aria-hidden="true">☎</span>}>{s.tel}</Button>
                      <Button variant="outline" size="sm" onClick={() => window.open(s.maps, "_blank", "noopener")}>Cómo llegar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Otros canales sobre panel oscuro */}
            <div className="relative bg-dark text-white rounded-xl overflow-hidden p-16 flex flex-col justify-center">
              <img src={D.heroQuote} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.22]" />
              <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(15,15,15,0.86),rgba(15,15,15,0.96))]" />
              <div className="relative flex flex-col gap-8">
                <div>
                  <Badge tone="soft">Atención directa</Badge>
                  <h3 className="mt-[16px] font-display text-2xl font-bold leading-snug">Escríbenos por el canal que prefieras</h3>
                </div>
                <div className="flex flex-col gap-6">
                  <ChannelRow icon="✉" label="Email" value="info@gepcoformacion.es" href="mailto:info@gepcoformacion.es" />
                  <ChannelRow icon="✆" label="WhatsApp" value="Escríbenos por WhatsApp" href="https://wa.me/34935646346" />
                  <ChannelRow icon="⚲" label="Formación in company" value="Te visitamos en tus instalaciones" />
                </div>
                <div className="border-t border-t-white/[0.12] pt-6 text-sm text-white/60 leading-normal">Cobertura en toda la península para empresas y grupos. Formamos a autónomos, particulares y equipos de empresa.</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- FAQ — resuelve objeciones antes de que frenen la conversión ---- */}
      <section className="bg-surface-muted py-section">
        <Container style={{ maxWidth: "820px" }}>
          <SectionHeading eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas antes de empezar" align="center" />
          <div className="mt-12">
            <Accordion defaultOpen={[0]} items={FAQ} />
          </div>
        </Container>
      </section>
    </div>
  );
}
export default ContactScreen;
