import React from 'react';
import { onNav, getParam } from '../../lib/router.js';
import { HScroll } from '../common/HScroll.jsx';
import { cart } from '../../lib/cart.js';
// Ficha de curso — ENFOQUE EMPRESA / IN COMPANY.
// Foco: captación de lead B2B (presupuesto a medida). La compra web individual queda
// como opción secundaria en un desplegable. Web sales residual.
import { Button, Input, Select, Badge, NormBadge, Accordion, StatBlock, ProductCard, IconButton } from '../ds/index.js';
import { DATA as D } from '../../lib/data.js';
import { Container } from '../common/Container.jsx';
import { cx } from '../../lib/cx.js';
const fmtEUR = (n) => {
  const [int, dec] = Number(n).toFixed(2).split(".");
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + dec + " €";
};
const Stars = ({ n = 5 }) => (
  <span aria-label={n + " de 5 estrellas"} className="text-accent text-[16px] tracking-[2px] whitespace-nowrap">
    {"★★★★★".slice(0, n)}<span className="text-border-strong">{"★★★★★".slice(n)}</span>
  </span>
);

const PLAN = [
  { q: "UF1 · Marco normativo y organización", a: "Decreto 374/1996, funciones del bombero/a de empresa, planes de autoprotección y coordinación con servicios públicos." },
  { q: "UF2 · Prevención y protección contra incendios", a: "Comportamiento del fuego, agentes extintores, instalaciones fijas y manuales, mantenimiento de equipos." },
  { q: "UF3 · Intervención y prácticas", a: "Técnicas de extinción, casa de humo, rescate y prácticas en Campo de Fuego. Evaluación teórico-práctica por UF." },
];

const IC = {
  local: <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />,
  sede: <path d="M12 22s7-6.13 7-12a7 7 0 1 0-14 0c0 5.87 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
  medida: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />,
  fundae: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  cert: <path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8.5 13.5L7 22l5-3 5 3-1.5-8.5" />,
  fuego: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" />,
  practica: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
  aforo: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
};
// Argumentos de venta según el curso: no todos se hacen en instalaciones del cliente,
// y solo las formaciones de fuego tienen prácticas con fuego real.
function buildVentajas(course) {
  const esFuego = course.cat === "extincion" || course.cat === "bombero";
  const ubicacion = course.soloSede
    ? { t: "En instalaciones especializadas", d: "Impartimos esta formación en nuestras instalaciones equipadas (campo de fuego, estructuras y material específico).", icon: IC.sede }
    : { t: "En vuestras instalaciones", d: "Podemos llevar la formación a tu empresa, sin desplazamientos ni paradas de producción innecesarias.", icon: IC.local };
  const practica = esFuego
    ? { t: "Prácticas con fuego real", d: "Casa de humo y campo de fuego. Formación eminentemente práctica, no solo teoría.", icon: IC.fuego }
    : { t: "Formación 100% práctica", d: "Prácticas reales con equipos y material profesional. Aprender haciendo, no solo teoría.", icon: IC.practica };
  return [
    ubicacion,
    { t: "Contenido y fechas a medida", d: "Adaptamos temario, duración y calendario a los turnos y necesidades reales de tu equipo.", icon: IC.medida },
    { t: "Bonificable FUNDAE", d: "Gestionamos la bonificación para que la formación tenga un coste reducido o incluso cero para tu empresa.", icon: IC.fundae },
    { t: "Certificación oficial", d: "Centro homologado ISPC. Certificados conforme a la normativa vigente para todo tu equipo.", icon: IC.cert },
    practica,
    { t: "Aforo reducido (máx. 15)", d: "Grupos pequeños para práctica real, seguridad y atención personalizada a cada alumno.", icon: IC.aforo },
  ];
}

function CourseScreen({ courseId: courseIdProp }) {
  const courseId = courseIdProp || getParam("curso");
  const course = D.courses.find((c) => c.id === courseId) || D.courses[0];
  const ventajas = buildVentajas(course);
  const catName = (slug) => (D.categories.find((c) => c.slug === slug) || {}).name || "";
  let related = D.courses.filter((c) => c.cat === course.cat && c.id !== course.id);
  related = related.concat(D.courses.filter((c) => c.id !== course.id && c.cat !== course.cat)).slice(0, 8);

  // Lead B2B
  const [sent, setSent] = React.useState(false);
  const leadRef = React.useRef(null);
  const scrollToLead = () => {
    const el = leadRef.current;
    if (el) window.scrollTo({ top: window.pageYOffset + el.getBoundingClientRect().top - 120, behavior: "smooth" });
  };

  // Reserva individual (secundaria)
  const [openInd, setOpenInd] = React.useState(true);
  const [sede, setSede] = React.useState("");
  const [fecha, setFecha] = React.useState("");
  const [alumnos, setAlumnos] = React.useState(1);
  const [added, setAdded] = React.useState(false);
  const stepBtn = "w-[44px] h-[44px] border-none bg-transparent cursor-pointer text-[20px] leading-none text-strong flex-none";

  const h2 = "m-[0_0_var(--space-4)] font-display text-2xl font-bold tracking-heading text-strong";

  return (
    <div>
      {/* Hero B2B */}
      <section className="bg-dark text-white">
        <Container className="p-[var(--section-y)_var(--container-padding)] grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          <div>
            <button onClick={() => onNav("catalog", course.cat)} className="bg-transparent border-none text-brand cursor-pointer font-mono text-sm p-0 mb-[20px]">← {catName(course.cat)}</button>
            <div className="flex gap-[8px] mb-[20px] flex-wrap">
              <Badge tone="brand">Formación in company</Badge>
              <Badge tone="onDark" dot>Bonificable FUNDAE</Badge>
              <NormBadge onDark>{course.norm}</NormBadge>
            </div>
            <span className="block font-mono text-sm uppercase tracking-eyebrow text-white/[0.6] mb-[12px]">Forma a tu equipo</span>
            <h1 className="m-[0_0_18px] font-display text-[clamp(2.2rem,4.4vw,3.4rem)] font-extrabold leading-tight tracking-display">{course.title}<span className="text-brand">.</span></h1>
            <p className="m-[0_0_var(--space-8)] text-lg leading-normal text-white/[0.82] max-w-[520px]">{course.soloSede ? "Diseñamos esta formación a la medida de tu empresa, impartida en nuestras instalaciones especializadas, con contenido y fechas adaptados a tu equipo. Certificación oficial y bonificable a través de FUNDAE." : "Diseñamos esta formación a la medida de tu empresa: en vuestras instalaciones o en las nuestras, con contenido y fechas adaptados a tu equipo. Certificación oficial y bonificable a través de FUNDAE."}</p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-[12px]">
              <Button variant="primary" size="lg" uppercase className="max-sm:whitespace-normal text-center" iconRight={<span>→</span>} onClick={scrollToLead}>Solicita propuesta para tu empresa</Button>
              <Button variant="onDark" size="lg" className="max-sm:whitespace-normal text-center" onClick={() => onNav("contact")}>Hablar con un asesor</Button>
            </div>
            <p className="m-[16px_0_0] text-sm text-white/[0.6]">Respuesta en menos de 24&nbsp;h · Sin compromiso</p>
          </div>
          <img src={course.img} alt={course.title} className="w-full h-[260px] sm:h-[420px] object-cover rounded-xl shadow-lg" />
        </Container>
      </section>

      <Container className="p-[var(--section-y)_var(--container-padding)] grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 items-start">
        {/* Main */}
        <div className="flex flex-col gap-12">
          <div>
            <h2 className={h2}>Información básica<span className="text-brand">.</span></h2>
            <dl className="m-0 grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-border border border-border rounded-lg overflow-hidden">
              {[
                { k: "Certificación", v: course.norm },
                { k: "Horas de formación", v: course.hours || "A medida según programa" },
                { k: "Aforo máximo", v: "15 alumnos por grupo" },
                { k: "Modalidad", v: "In company · teórico-práctica" },
                { k: "Detalle", v: course.bullets[0], span: true },
              ].map((f) => (
                <div key={f.k} className={cx("bg-surface p-[var(--space-5)_var(--space-6)]", f.span && "col-span-full")}>
                  <dt className="text-xs uppercase tracking-eyebrow text-subtle mb-[6px]">{f.k}</dt>
                  <dd className="m-0 text-base font-semibold text-strong leading-snug">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className={h2}>Descripción<span className="text-brand">.</span></h2>
            <p className="m-[0_0_14px] text-base leading-normal text-body">Esta formación prepara a tu equipo para organizar la respuesta, intervenir en emergencias, evaluar riesgos y aplicar las normas de seguridad necesarias en cada situación, con un enfoque eminentemente práctico.</p>
            <p className="m-0 text-base leading-normal text-body">La adaptamos a vuestro sector y a los riesgos reales de vuestras instalaciones. Al finalizar, cada participante recibe la acreditación correspondiente y os acompañamos en el proceso de habilitación y renovación.</p>
          </div>
          <div>
            <h2 className={h2}>Plan de estudios<span className="text-brand">.</span></h2>
            <p className="m-[0_0_var(--space-6)] text-base leading-normal text-body">Formación teórico-práctica: combina fundamentos en aula con prácticas reales en campo de fuego y casa de humo.</p>
            <div className="flex h-[14px] rounded-full overflow-hidden mb-[10px]">
              <div className="flex-[0_0_20%] bg-ink" />
              <div className="flex-1 bg-brand" />
            </div>
            <div className="flex justify-between flex-wrap gap-[8px] text-xs text-subtle mb-[6px]">
              <span><strong className="text-strong">Teoría</strong> · aula y fundamentos</span>
              <span><strong className="text-brand">Práctica</strong> · campo de fuego y casa de humo</span>
            </div>
            <p className="m-[0_0_var(--space-8)] text-xs text-subtle">Aprox. 20% teoría · 80% práctica.</p>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] gap-6">
              {[
                { key: "teoria", label: "Parte teórica", accent: "var(--color-ink)", soft: "var(--surface-sunken)",
                  icon: <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM19 3v16" />, items: [PLAN[0], PLAN[1]] },
                { key: "practica", label: "Parte práctica", accent: "var(--color-brand)", soft: "var(--color-brand-soft)",
                  icon: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" />, items: [PLAN[2]] },
              ].map((t) => (
                <div key={t.key} className="bg-surface border border-border rounded-lg p-6">
                  <div className="flex items-center gap-[12px] mb-5 pb-4 border-b border-border">
                    <span className="flex-none w-[40px] h-[40px] rounded-md flex items-center justify-center" style={{ background: t.soft, color: t.accent }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{t.icon}</svg>
                    </span>
                    <div>
                      <h3 className="m-0 font-display text-lg font-bold text-strong">{t.label}</h3>
                      <span className="font-mono text-[11px] uppercase tracking-eyebrow text-subtle">{t.items.length} {t.items.length === 1 ? "módulo" : "módulos"}</span>
                    </div>
                  </div>
                  <ul className="m-0 p-0 list-none flex flex-col gap-5">
                    {t.items.map((it, i) => (
                      <li key={i}>
                        <div className="flex gap-[10px] items-baseline mb-[4px]">
                          <span aria-hidden="true" className="font-bold" style={{ color: t.accent }}>›</span>
                          <span className="font-display text-base font-bold text-strong leading-snug">{it.q}</span>
                        </div>
                        <p className="m-0 pl-[20px] text-sm leading-normal text-body">{it.a}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky — captación de lead B2B */}
        <aside ref={leadRef} className="lg:sticky lg:top-[120px] flex flex-col gap-4">
          <div className="bg-surface border border-border rounded-xl shadow-md p-8">
            {sent ? (
              <div className="text-center p-[var(--space-8)_0]">
                <div className="w-[56px] h-[56px] m-[0_auto_var(--space-4)] rounded-full bg-brand-soft text-brand flex items-center justify-center text-[30px]">✓</div>
                <h3 className="m-[0_0_8px] font-display text-xl font-bold text-strong">Solicitud enviada</h3>
                <p className="m-0 text-base text-body leading-normal">Un asesor preparará tu propuesta a medida y te contactará en menos de 24&nbsp;h.</p>
              </div>
            ) : (
              <React.Fragment>
                <span className="block font-mono text-xs uppercase tracking-eyebrow text-brand mb-[8px]">Presupuesto a medida</span>
                <h3 className="m-[0_0_6px] font-display text-xl font-bold text-strong leading-snug">Solicita propuesta para tu empresa</h3>
                <p className="m-[0_0_var(--space-6)] text-sm text-subtle leading-normal">Te enviamos programa, calendario y presupuesto adaptados a tu equipo. Sin compromiso.</p>
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
                  <Input label="Nombre *" placeholder="Tu nombre" />
                  <Input label="Empresa *" placeholder="Razón social" />
                  <Input label="Email *" type="email" placeholder="tu@empresa.com" />
                  <Input label="Teléfono *" placeholder="+34 600 000 000" />
                  <Input label="Nº aprox. de personas *" type="number" min="1" placeholder="Ej. 12" />
                  <Button type="submit" variant="primary" block size="lg" uppercase iconRight={<span>→</span>}>Solicitar propuesta</Button>
                  <p className="m-0 text-center text-xs text-subtle">Respuesta en 24&nbsp;h · Bonificable FUNDAE · Sin compromiso</p>
                </form>
              </React.Fragment>
            )}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <StatBlock value="+2.400" label="Profesionales formados" />
              <StatBlock value="24 h" label="Respuesta" />
            </div>
          </div>

          {/* Opción secundaria con protagonismo: reserva individual (particulares / autónomos) */}
          <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="h-[4px] bg-ink" />
            <button type="button" onClick={() => setOpenInd((o) => !o)} aria-expanded={openInd} className="w-full flex items-center justify-between gap-[12px] text-left p-6 bg-transparent border-none cursor-pointer">
              <span className="flex items-center gap-[14px]">
                <span aria-hidden="true" className="flex-none w-[42px] h-[42px] rounded-md bg-surface-muted text-strong flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                </span>
                <span>
                  <span className="block font-display text-lg font-bold text-strong leading-snug">Reserva individual online</span>
                  <span className="block text-sm text-subtle">Para particulares y autónomos</span>
                </span>
              </span>
              <span aria-hidden="true" className="flex-none text-brand text-[24px] leading-none transition-transform duration-base ease-standard" style={{ transform: openInd ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            {openInd && (
              <div className="p-[0_var(--space-6)_var(--space-6)] flex flex-col gap-4">
                {typeof course.price === "number" ? (
                  <div className="flex items-baseline gap-[8px] border-t border-border mt-2 p-[var(--space-5)_0_var(--space-4)]">
                    <span className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold text-strong leading-none">{fmtEUR(course.price)}</span>
                    <span className="text-sm text-subtle">/ alumno</span>
                  </div>
                ) : (
                  <p className="m-0 text-sm text-subtle border-t border-border pt-5">Precio disponible en convocatorias abiertas. Consulta fechas.</p>
                )}
                <Select label="Localización" placeholder="Elige una opción" value={sede} onChange={(e) => setSede(e.target.value)} options={["Sabadell", "Madrid"]} />
                <Select label="Fechas" placeholder="Elige una opción" value={fecha} onChange={(e) => setFecha(e.target.value)} options={["20/05/2025", "23/10/2025"]} />
                <div className="flex flex-col gap-[8px]">
                  <label htmlFor="alumnos" className="text-xs font-semibold tracking-eyebrow uppercase text-subtle">Nº de plazas</label>
                  <div className="flex items-center border border-border rounded-md overflow-hidden bg-surface">
                    <button type="button" aria-label="Restar plaza" onClick={() => setAlumnos((a) => Math.max(1, a - 1))} className={stepBtn}>−</button>
                    <input id="alumnos" type="number" min="1" value={alumnos} onChange={(e) => setAlumnos(Math.max(1, parseInt(e.target.value, 10) || 1))} aria-label="Número de plazas" className="flex-1 min-w-0 text-center border-x border-y-0 border-border p-[10px_8px] font-mono text-base font-bold text-strong [outline:none] bg-transparent" />
                    <button type="button" aria-label="Sumar plaza" onClick={() => setAlumnos((a) => a + 1)} className={stepBtn}>+</button>
                  </div>
                </div>
                <Button variant="dark" block uppercase disabled={course.outOfStock} iconRight={<span>→</span>} onClick={() => { cart.add(course, { sede: sede || null, fecha: fecha || null, qty: alumnos }); setAdded(true); setTimeout(() => setAdded(false), 2500); }}>{course.outOfStock ? "Sin plazas" : "Añadir al carrito"}</Button>
                {added && <p role="status" className="m-0 text-center text-sm text-success font-semibold">Añadido al carrito ✓</p>}
              </div>
            )}
          </div>
        </aside>
      </Container>

      {/* Por qué formar a tu equipo con GEPCO */}
      <section className="bg-surface border-b border-border p-[var(--section-y)_0]">
        <Container>
          <span className="block mb-[12px] text-sm font-bold tracking-eyebrow uppercase text-brand">Formación para empresas</span>
          <h2 className="m-[0_0_var(--space-10)] font-display text-3xl font-extrabold tracking-display text-strong max-w-[760px] leading-snug">La forma más rentable de formar a todo tu equipo, a la vez<span className="text-brand">.</span></h2>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-6">
            {ventajas.map((v) => (
              <div key={v.t} className="flex gap-[16px] items-start">
                <span className="flex-none w-[48px] h-[48px] rounded-md bg-brand-soft text-brand flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{v.icon}</svg>
                </span>
                <div>
                  <h3 className="m-[0_0_6px] font-display text-lg font-bold text-strong leading-snug">{v.t}</h3>
                  <p className="m-0 text-base leading-normal text-body">{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Opiniones — Google My Business [PENDIENTE: reseñas reales] */}
      <section className="bg-surface-muted border-t border-border p-[var(--section-y)_0]">
        <Container>
          <span className="block mb-[12px] text-sm font-bold tracking-eyebrow uppercase text-brand">Valoraciones en Google</span>
          <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
            <h2 className="m-0 font-display text-3xl font-extrabold tracking-display text-strong">Opiniones<span className="text-brand">.</span></h2>
            <div className="flex items-center gap-[14px] flex-wrap min-w-0">
              <span className="font-display text-3xl font-extrabold text-strong leading-none">{D.reviews.rating != null ? String(D.reviews.rating).replace(".", ",") : "[PENDIENTE]"}</span>
              <div className="min-w-0">
                <Stars n={5} />
                <div className="text-sm text-subtle">{D.reviews.count != null ? D.reviews.count + " reseñas en Google" : "[PENDIENTE: nº de reseñas] en Google"}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-6">
            {D.reviews.items.map((r, i) => (
              <figure key={i} className="m-0 bg-surface border border-border rounded-lg p-8 flex flex-col gap-4">
                <Stars n={r.stars} />
                <blockquote className="m-0 text-base leading-normal text-strong flex-1">{r.quote}</blockquote>
                <figcaption className="text-sm">
                  <span className="block font-bold text-strong">{r.author}</span>
                  <span className="text-subtle">{r.date} · vía Google</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA final empresa */}
      <section className="bg-dark text-white p-[var(--section-y)_0]">
        <Container className="text-center">
          <h2 className="m-[0_auto_var(--space-4)] font-display text-3xl font-extrabold tracking-display max-w-[720px] leading-snug">¿Formamos a tu equipo?<span className="text-brand">.</span></h2>
          <p className="m-[0_auto_var(--space-8)] text-lg text-white/[0.8] max-w-[560px] leading-normal">Cuéntanos vuestras necesidades y preparamos una propuesta a medida, bonificable FUNDAE, en menos de 24&nbsp;h.</p>
          <div className="flex gap-[12px] justify-center flex-wrap">
            <Button variant="primary" size="lg" uppercase iconRight={<span>→</span>} onClick={scrollToLead}>Solicita propuesta</Button>
            <Button variant="onDark" size="lg" onClick={() => onNav("contact")}>Contactar</Button>
          </div>
        </Container>
      </section>

      {/* Formaciones relacionadas */}
      {related.length > 0 && (
        <section className="bg-surface-muted p-[var(--section-y)_0]">
          <Container>
            <h2 className="m-[0_0_var(--space-10)] font-display text-2xl font-bold tracking-heading text-strong">Formaciones relacionadas<span className="text-brand">.</span></h2>
            <HScroll itemWidth="300px">
              {related.map((c) => (
                <ProductCard key={c.id} title={c.title} image={c.img} code={c.code} norm={c.norm} recommended={c.recommended} cover bullets={c.bullets} ctaLabel="Ver curso" onClick={(e) => { e.preventDefault(); onNav("course", c.id); }} />
              ))}
            </HScroll>
          </Container>
        </section>
      )}
    </div>
  );
}
export default CourseScreen;
