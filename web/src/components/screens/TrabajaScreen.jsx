import React from 'react';
import { onNav, getParam } from '../../lib/router.js';
// Trabaja con nosotros — captación de formadores / bomberos. Página atractiva:
// hero con propósito, motivos para unirse, y formulario con experiencia mínima,
// entornos de formación, adjuntar CV y envío. Sin backend (estado de éxito simulado).
import { Button, Input, Select, Checkbox, StatBlock, SectionHeading, Badge } from '../ds/index.js';
import { DATA as D } from '../../lib/data.js';
import { cx } from '../../lib/cx.js';
import { Container } from '../common/Container.jsx';

const MOTIVOS = [
  { t: "Formación real, no PowerPoint", d: "Fuego real, casa de humo y campos de práctica propios. Aquí se enseña haciendo.", icon: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" /> },
  { t: "Instructores en activo", d: "Trabajarás junto a bomberos y técnicos de emergencia en ejercicio, no solo docentes.", icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /> },
  { t: "Proyectos por toda la península", d: "Formaciones in company para empresas de todos los sectores. Variedad y recorrido real.", icon: <path d="M12 22s7-6.13 7-12a7 7 0 1 0-14 0c0 5.87 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" /> },
  { t: "Formación continua", d: "Te acompañamos en tu habilitación, renovación y especialización. Crecemos contigo.", icon: <path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8.5 13.5L7 22l5-3 5 3-1.5-8.5" /> },
];

const ENTORNOS = [
  "Extinción de incendios", "Rescate", "Espacios confinados", "Trabajos en altura / verticales",
  "Primeros auxilios (SVB/DEA)", "Riesgo químico / NBQ", "PRL", "Industria / petroquímica",
];

function TrabajaScreen() {
  const [sent, setSent] = React.useState(false);
  const [accept, setAccept] = React.useState(false);
  const [cv, setCv] = React.useState(null);
  const [entornos, setEntornos] = React.useState([]);
  const fileRef = React.useRef(null);
  const toggleEntorno = (e) => setEntornos((prev) => prev.includes(e) ? prev.filter((x) => x !== e) : prev.concat(e));
  const eyebrow = "font-mono text-sm uppercase tracking-eyebrow text-brand";

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-dark text-white overflow-hidden">
        <img src={D.heroQuote} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.34]" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,_rgba(15,15,15,0.94),_rgba(15,15,15,0.55))]" />
        <Container className="relative p-[var(--section-y)_var(--container-padding)]">
          <div className="flex gap-2 mb-5 flex-wrap">
            <Badge tone="brand">Únete al equipo</Badge>
            <Badge tone="onDark" dot>Formadores y bomberos</Badge>
          </div>
          <h1 className="m-[0_0_20px] font-display text-[clamp(2.4rem,5vw,4rem)] font-extrabold tracking-display leading-tight max-w-[860px]">Forma a quienes protegen. Trabaja con nosotros<span className="text-brand">.</span></h1>
          <p className="m-[0_0_var(--space-8)] text-xl text-white/[0.85] max-w-[620px] leading-normal">Buscamos formadores, bomberos y técnicos de emergencia que quieran transmitir su experiencia en una escuela puntera en formación práctica. Déjanos tus datos y tu CV.</p>
          <div className="flex gap-3 flex-wrap">
            <Button variant="primary" size="lg" uppercase iconRight={<span>→</span>} onClick={() => { const el = document.getElementById("form-trabaja"); if (el) window.scrollTo({ top: window.pageYOffset + el.getBoundingClientRect().top - 100, behavior: "smooth" }); }}>Enviar mi candidatura</Button>
          </div>
        </Container>
      </section>

      {/* Por qué unirte */}
      <section className="bg-surface border-b border-border p-[var(--section-y)_0]">
        <Container>
          <SectionHeading eyebrow="Por qué unirte" title="Un sitio donde tu experiencia importa" />
          <div className="mt-10 grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-8">
            {MOTIVOS.map((m) => (
              <div key={m.t} className="flex gap-4 items-start">
                <span className="flex-none w-12 h-12 rounded-md bg-brand-soft text-brand flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{m.icon}</svg>
                </span>
                <div>
                  <h3 className="m-[0_0_6px] font-display text-lg font-bold text-strong leading-snug">{m.t}</h3>
                  <p className="m-0 text-base leading-normal text-body">{m.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Formulario */}
      <section id="form-trabaja" className="bg-surface-muted p-[var(--section-y)_0_var(--space-24)]">
        <Container style={{ maxWidth: "820px" }}>
          <div className="bg-surface border border-border rounded-xl shadow-md p-12">
            {sent ? (
              <div className="text-center p-[var(--space-8)_0]">
                <div className="w-16 h-16 m-[0_auto_var(--space-6)] rounded-full bg-brand-soft text-brand flex items-center justify-center text-[34px]">✓</div>
                <h2 className="m-[0_0_12px] font-display text-3xl font-extrabold tracking-display text-strong">¡Candidatura recibida!<span className="text-brand">.</span></h2>
                <p className="m-[0_0_var(--space-8)] text-lg text-body leading-normal">Gracias por tu interés en formar parte de GEPCO. Revisaremos tu perfil y te contactaremos si encaja con nuestras necesidades.</p>
                <Button variant="outline" onClick={() => onNav("home")}>Volver al inicio</Button>
              </div>
            ) : (
              <React.Fragment>
                <span className={eyebrow}>Candidatura</span>
                <h2 className="m-[10px_0_6px] font-display text-2xl font-bold text-strong">Cuéntanos sobre ti</h2>
                <p className="m-[0_0_var(--space-8)] text-base text-subtle leading-normal">Rellena el formulario y adjunta tu CV. Te responderemos por email.</p>
                <form onSubmit={(e) => { e.preventDefault(); if (accept) setSent(true); }} className="flex flex-col gap-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4">
                    <Input label="Nombre y apellidos *" placeholder="Tu nombre" />
                    <Input label="Email *" type="email" placeholder="tu@email.com" />
                    <Input label="Teléfono *" placeholder="+34 600 000 000" />
                    <Select label="Perfil *" placeholder="Elige una opción" options={["Formador/a", "Bombero/a", "Técnico/a de emergencias", "Técnico/a PRL", "Otro"]} />
                  </div>

                  <Select label="Experiencia mínima en formación o emergencias *" placeholder="Elige una opción" options={["Menos de 1 año", "1 a 3 años", "3 a 5 años", "Más de 5 años", "Más de 10 años"]} />

                  <div>
                    <div className="text-xs font-semibold tracking-eyebrow uppercase text-subtle mb-3">¿En qué entornos estás formado/a? *</div>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-[10px_var(--space-6)]">
                      {ENTORNOS.map((e) => (
                        <Checkbox key={e} label={e} checked={entornos.includes(e)} onChange={() => toggleEntorno(e)} />
                      ))}
                    </div>
                  </div>

                  {/* Adjuntar CV */}
                  <div>
                    <div className="text-xs font-semibold tracking-eyebrow uppercase text-subtle mb-2.5">Currículum (PDF o Word) *</div>
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCv(e.target.files && e.target.files[0] ? e.target.files[0].name : null)} className="hidden" />
                    <button type="button" onClick={() => fileRef.current && fileRef.current.click()} className={cx("w-full flex items-center gap-3.5 p-[var(--space-5)_var(--space-6)] rounded-md cursor-pointer text-left border border-dashed", cv ? "border-brand bg-brand-soft" : "border-border-strong bg-surface-muted")}>
                      <span aria-hidden="true" className="flex-none w-10 h-10 rounded-md bg-surface text-brand flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-body text-base font-semibold text-strong whitespace-nowrap overflow-hidden text-ellipsis">{cv || "Adjuntar mi CV"}</span>
                        <span className="block text-sm text-subtle">{cv ? "Archivo seleccionado · haz clic para cambiar" : "Haz clic para seleccionar el archivo"}</span>
                      </span>
                    </button>
                  </div>

                  <Input label="Cuéntanos brevemente tu experiencia (opcional)" placeholder="Trayectoria, certificaciones, disponibilidad…" />

                  <Checkbox checked={accept} onChange={(e) => setAccept(e.target.checked)} label={<span>He leído y acepto la <a href="#">Política de Privacidad</a> y autorizo el tratamiento de mis datos para procesos de selección.</span>} />
                  <Button type="submit" variant="primary" block size="lg" uppercase disabled={!accept} iconRight={<span>→</span>}>Enviar candidatura</Button>
                  <p className="m-0 text-center text-sm text-subtle">Tratamos tu candidatura de forma confidencial.</p>
                </form>
              </React.Fragment>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
export default TrabajaScreen;
