// Ficha de curso — ENFOQUE EMPRESA / IN COMPANY.
// Foco: captación de lead B2B (presupuesto a medida). La compra web individual queda
// como opción secundaria en un desplegable. Web sales residual.
const { Button, Input, Select, Badge, NormBadge, Accordion, StatBlock, ProductCard, IconButton } = window.GEPCOFormaciNDesignSystem_bb6094;
const D = window.GEPCO_DATA;
const Container = window.Container;
const fmtEUR = (n) => {
  const [int, dec] = Number(n).toFixed(2).split(".");
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + dec + " €";
};
const Stars = ({ n = 5 }) => (
  <span aria-label={n + " de 5 estrellas"} style={{ color: "var(--color-accent)", fontSize: "16px", letterSpacing: "2px", whiteSpace: "nowrap" }}>
    {"★★★★★".slice(0, n)}<span style={{ color: "var(--border-hover)" }}>{"★★★★★".slice(n)}</span>
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

function CourseScreen({ courseId, onNav }) {
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
  const stepBtn = { width: "44px", height: "44px", border: "none", background: "transparent", cursor: "pointer", fontSize: "20px", lineHeight: 1, color: "var(--text-strong)", flex: "0 0 auto" };

  const h2 = { margin: "0 0 var(--space-4)", fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)" };

  return (
    <div>
      {/* Hero B2B */}
      <section style={{ background: "var(--color-dark)", color: "#fff" }}>
        <Container style={{ padding: "var(--section-y) var(--container-padding)", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "var(--space-16)", alignItems: "center" }}>
          <div>
            <button onClick={() => onNav("catalog", course.cat)} style={{ background: "none", border: "none", color: "var(--color-brand)", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", padding: 0, marginBottom: "20px" }}>← {catName(course.cat)}</button>
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
              <Badge tone="brand">Formación in company</Badge>
              <Badge tone="onDark" dot>Bonificable FUNDAE</Badge>
              <NormBadge onDark>{course.norm}</NormBadge>
            </div>
            <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "rgba(255,255,255,0.6)", marginBottom: "12px" }}>Forma a tu equipo</span>
            <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,4.4vw,3.4rem)", fontWeight: "var(--weight-extrabold)", lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-display)" }}>{course.title}<span style={{ color: "var(--color-brand)" }}>.</span></h1>
            <p style={{ margin: "0 0 var(--space-8)", fontSize: "var(--text-lg)", lineHeight: "var(--leading-normal)", color: "rgba(255,255,255,0.82)", maxWidth: "520px" }}>{course.soloSede ? "Diseñamos esta formación a la medida de tu empresa, impartida en nuestras instalaciones especializadas, con contenido y fechas adaptados a tu equipo. Certificación oficial y bonificable a través de FUNDAE." : "Diseñamos esta formación a la medida de tu empresa: en vuestras instalaciones o en las nuestras, con contenido y fechas adaptados a tu equipo. Certificación oficial y bonificable a través de FUNDAE."}</p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Button variant="primary" size="lg" uppercase iconRight={<span>→</span>} onClick={scrollToLead}>Solicita propuesta para tu empresa</Button>
              <Button variant="onDark" size="lg" onClick={() => onNav("contact")}>Hablar con un asesor</Button>
            </div>
            <p style={{ margin: "16px 0 0", fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.6)" }}>Respuesta en menos de 24&nbsp;h · Sin compromiso</p>
          </div>
          <img src={course.img} alt={course.title} style={{ width: "100%", height: "420px", objectFit: "cover", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)" }} />
        </Container>
      </section>

      <Container style={{ padding: "var(--section-y) var(--container-padding)", display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "var(--space-16)", alignItems: "start" }}>
        {/* Main */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
          <div>
            <h2 style={h2}>Información básica<span style={{ color: "var(--color-brand)" }}>.</span></h2>
            <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border-default)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
              {[
                { k: "Certificación", v: course.norm },
                { k: "Horas de formación", v: course.hours || "A medida según programa" },
                { k: "Aforo máximo", v: "15 alumnos por grupo" },
                { k: "Modalidad", v: "In company · teórico-práctica" },
                { k: "Detalle", v: course.bullets[0], span: true },
              ].map((f) => (
                <div key={f.k} style={{ gridColumn: f.span ? "1 / -1" : "auto", background: "var(--surface-card)", padding: "var(--space-5) var(--space-6)" }}>
                  <dt style={{ fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-subtle)", marginBottom: "6px" }}>{f.k}</dt>
                  <dd style={{ margin: 0, fontSize: "var(--text-base)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)", lineHeight: "var(--leading-snug)" }}>{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 style={h2}>Descripción<span style={{ color: "var(--color-brand)" }}>.</span></h2>
            <p style={{ margin: "0 0 14px", fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>Esta formación prepara a tu equipo para organizar la respuesta, intervenir en emergencias, evaluar riesgos y aplicar las normas de seguridad necesarias en cada situación, con un enfoque eminentemente práctico.</p>
            <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>La adaptamos a vuestro sector y a los riesgos reales de vuestras instalaciones. Al finalizar, cada participante recibe la acreditación correspondiente y os acompañamos en el proceso de habilitación y renovación.</p>
          </div>
          <div>
            <h2 style={h2}>Plan de estudios<span style={{ color: "var(--color-brand)" }}>.</span></h2>
            <p style={{ margin: "0 0 var(--space-6)", fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>Formación teórico-práctica: combina fundamentos en aula con prácticas reales en campo de fuego y casa de humo.</p>
            <div style={{ display: "flex", height: "14px", borderRadius: "var(--radius-full)", overflow: "hidden", marginBottom: "10px" }}>
              <div style={{ flex: "0 0 20%", background: "var(--color-ink)" }} />
              <div style={{ flex: 1, background: "var(--color-brand)" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", fontSize: "var(--text-xs)", color: "var(--text-subtle)", marginBottom: "6px" }}>
              <span><strong style={{ color: "var(--text-strong)" }}>Teoría</strong> · aula y fundamentos</span>
              <span><strong style={{ color: "var(--color-brand)" }}>Práctica</strong> · campo de fuego y casa de humo</span>
            </div>
            <p style={{ margin: "0 0 var(--space-8)", fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}>Aprox. 20% teoría · 80% práctica.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--space-6)" }}>
              {[
                { key: "teoria", label: "Parte teórica", accent: "var(--color-ink)", soft: "var(--surface-sunken)",
                  icon: <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM19 3v16" />, items: [PLAN[0], PLAN[1]] },
                { key: "practica", label: "Parte práctica", accent: "var(--color-brand)", soft: "var(--color-brand-soft)",
                  icon: <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" />, items: [PLAN[2]] },
              ].map((t) => (
                <div key={t.key} style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-5)", paddingBottom: "var(--space-4)", borderBottom: "1px solid var(--border-default)" }}>
                    <span style={{ flex: "0 0 auto", width: "40px", height: "40px", borderRadius: "var(--radius-md)", background: t.soft, color: t.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{t.icon}</svg>
                    </span>
                    <div>
                      <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)" }}>{t.label}</h3>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-subtle)" }}>{t.items.length} {t.items.length === 1 ? "módulo" : "módulos"}</span>
                    </div>
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                    {t.items.map((it, i) => (
                      <li key={i}>
                        <div style={{ display: "flex", gap: "10px", alignItems: "baseline", marginBottom: "4px" }}>
                          <span aria-hidden="true" style={{ color: t.accent, fontWeight: "var(--weight-bold)" }}>›</span>
                          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", lineHeight: "var(--leading-snug)" }}>{it.q}</span>
                        </div>
                        <p style={{ margin: 0, paddingLeft: "20px", fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>{it.a}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky — captación de lead B2B */}
        <aside ref={leadRef} style={{ position: "sticky", top: "120px", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-md)", padding: "var(--space-8)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "var(--space-8) 0" }}>
                <div style={{ width: "56px", height: "56px", margin: "0 auto var(--space-4)", borderRadius: "var(--radius-full)", background: "var(--color-brand-soft)", color: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px" }}>✓</div>
                <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)" }}>Solicitud enviada</h3>
                <p style={{ margin: 0, fontSize: "var(--text-base)", color: "var(--text-body)", lineHeight: "var(--leading-normal)" }}>Un asesor preparará tu propuesta a medida y te contactará en menos de 24&nbsp;h.</p>
              </div>
            ) : (
              <React.Fragment>
                <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--color-brand)", marginBottom: "8px" }}>Presupuesto a medida</span>
                <h3 style={{ margin: "0 0 6px", fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", lineHeight: "var(--leading-snug)" }}>Solicita propuesta para tu empresa</h3>
                <p style={{ margin: "0 0 var(--space-6)", fontSize: "var(--text-sm)", color: "var(--text-subtle)", lineHeight: "var(--leading-normal)" }}>Te enviamos programa, calendario y presupuesto adaptados a tu equipo. Sin compromiso.</p>
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                  <Input label="Nombre *" placeholder="Tu nombre" />
                  <Input label="Empresa *" placeholder="Razón social" />
                  <Input label="Email *" type="email" placeholder="tu@empresa.com" />
                  <Input label="Teléfono *" placeholder="+34 600 000 000" />
                  <Input label="Nº aprox. de personas *" type="number" min="1" placeholder="Ej. 12" />
                  <Button type="submit" variant="primary" block size="lg" uppercase iconRight={<span>→</span>}>Solicitar propuesta</Button>
                  <p style={{ margin: 0, textAlign: "center", fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}>Respuesta en 24&nbsp;h · Bonificable FUNDAE · Sin compromiso</p>
                </form>
              </React.Fragment>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "var(--space-8)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--border-default)" }}>
              <StatBlock value="+2.400" label="Profesionales formados" />
              <StatBlock value="24 h" label="Respuesta" />
            </div>
          </div>

          {/* Opción secundaria con protagonismo: reserva individual (particulares / autónomos) */}
          <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
            <div style={{ height: "4px", background: "var(--color-ink)" }} />
            <button type="button" onClick={() => setOpenInd((o) => !o)} aria-expanded={openInd} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", textAlign: "left", padding: "var(--space-6)", background: "transparent", border: "none", cursor: "pointer" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span aria-hidden="true" style={{ flex: "0 0 auto", width: "42px", height: "42px", borderRadius: "var(--radius-md)", background: "var(--surface-sunken)", color: "var(--text-strong)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                </span>
                <span>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", lineHeight: "var(--leading-snug)" }}>Reserva individual online</span>
                  <span style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>Para particulares y autónomos</span>
                </span>
              </span>
              <span aria-hidden="true" style={{ flex: "0 0 auto", color: "var(--color-brand)", fontSize: "24px", lineHeight: 1, transform: openInd ? "rotate(45deg)" : "none", transition: "transform var(--duration-base) var(--ease-standard)" }}>+</span>
            </button>
            {openInd && (
              <div style={{ padding: "0 var(--space-6) var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                {typeof course.price === "number" ? (
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", padding: "var(--space-2) 0 var(--space-4)", borderTop: "1px solid var(--border-default)", marginTop: "var(--space-2)", paddingTop: "var(--space-5)" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem,3vw,2.25rem)", fontWeight: "var(--weight-extrabold)", color: "var(--text-strong)", lineHeight: 1 }}>{fmtEUR(course.price)}</span>
                    <span style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>/ alumno</span>
                  </div>
                ) : (
                  <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--text-subtle)", borderTop: "1px solid var(--border-default)", paddingTop: "var(--space-5)" }}>Precio disponible en convocatorias abiertas. Consulta fechas.</p>
                )}
                <Select label="Localización" placeholder="Elige una opción" value={sede} onChange={(e) => setSede(e.target.value)} options={["Sabadell", "Madrid"]} />
                <Select label="Fechas" placeholder="Elige una opción" value={fecha} onChange={(e) => setFecha(e.target.value)} options={["20/05/2025", "23/10/2025"]} />
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="alumnos" style={{ fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--text-subtle)" }}>Nº de plazas</label>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border-default)", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--surface-card)" }}>
                    <button type="button" aria-label="Restar plaza" onClick={() => setAlumnos((a) => Math.max(1, a - 1))} style={stepBtn}>−</button>
                    <input id="alumnos" type="number" min="1" value={alumnos} onChange={(e) => setAlumnos(Math.max(1, parseInt(e.target.value, 10) || 1))} aria-label="Número de plazas" style={{ flex: 1, minWidth: 0, textAlign: "center", border: "none", borderLeft: "1px solid var(--border-default)", borderRight: "1px solid var(--border-default)", padding: "10px 8px", fontFamily: "var(--font-mono)", fontSize: "var(--text-base)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", outline: "none", background: "transparent" }} />
                    <button type="button" aria-label="Sumar plaza" onClick={() => setAlumnos((a) => a + 1)} style={stepBtn}>+</button>
                  </div>
                </div>
                <Button variant="dark" block uppercase disabled={course.outOfStock} iconRight={<span>→</span>} onClick={() => { window.GEPCO_CART.add(course, { sede: sede || null, fecha: fecha || null, qty: alumnos }); setAdded(true); setTimeout(() => setAdded(false), 2500); }}>{course.outOfStock ? "Sin plazas" : "Añadir al carrito"}</Button>
                {added && <p role="status" style={{ margin: 0, textAlign: "center", fontSize: "var(--text-sm)", color: "var(--color-success)", fontWeight: "var(--weight-semibold)" }}>Añadido al carrito ✓</p>}
              </div>
            )}
          </div>
        </aside>
      </Container>

      {/* Por qué formar a tu equipo con GEPCO */}
      <section style={{ background: "var(--surface-card)", borderBottom: "1px solid var(--border-default)", padding: "var(--section-y) 0" }}>
        <Container>
          <span style={{ display: "block", marginBottom: "12px", fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--color-brand)" }}>Formación para empresas</span>
          <h2 style={{ margin: "0 0 var(--space-10)", fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", maxWidth: "760px", lineHeight: "var(--leading-snug)" }}>La forma más rentable de formar a todo tu equipo, a la vez<span style={{ color: "var(--color-brand)" }}>.</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-6)" }}>
            {ventajas.map((v) => (
              <div key={v.t} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span style={{ flex: "0 0 auto", width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "var(--color-brand-soft)", color: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{v.icon}</svg>
                </span>
                <div>
                  <h3 style={{ margin: "0 0 6px", fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", lineHeight: "var(--leading-snug)" }}>{v.t}</h3>
                  <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Opiniones — Google My Business [PENDIENTE: reseñas reales] */}
      <section style={{ background: "var(--surface-sunken)", borderTop: "1px solid var(--border-default)", padding: "var(--section-y) 0" }}>
        <Container>
          <span style={{ display: "block", marginBottom: "12px", fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--color-brand)" }}>Valoraciones en Google</span>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-6)", flexWrap: "wrap", marginBottom: "var(--space-10)" }}>
            <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)" }}>Opiniones<span style={{ color: "var(--color-brand)" }}>.</span></h2>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: "var(--weight-extrabold)", color: "var(--text-strong)", lineHeight: 1 }}>{D.reviews.rating != null ? String(D.reviews.rating).replace(".", ",") : "[PENDIENTE]"}</span>
              <div>
                <Stars n={5} />
                <div style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>{D.reviews.count != null ? D.reviews.count + " reseñas en Google" : "[PENDIENTE: nº de reseñas] en Google"}</div>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-6)" }}>
            {D.reviews.items.map((r, i) => (
              <figure key={i} style={{ margin: 0, background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <Stars n={r.stars} />
                <blockquote style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-strong)", flex: 1 }}>{r.quote}</blockquote>
                <figcaption style={{ fontSize: "var(--text-sm)" }}>
                  <span style={{ display: "block", fontWeight: "var(--weight-bold)", color: "var(--text-strong)" }}>{r.author}</span>
                  <span style={{ color: "var(--text-subtle)" }}>{r.date} · vía Google</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA final empresa */}
      <section style={{ background: "var(--color-dark)", color: "#fff", padding: "var(--section-y) 0" }}>
        <Container style={{ textAlign: "center" }}>
          <h2 style={{ margin: "0 auto var(--space-4)", fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", maxWidth: "720px", lineHeight: "var(--leading-snug)" }}>¿Formamos a tu equipo?<span style={{ color: "var(--color-brand)" }}>.</span></h2>
          <p style={{ margin: "0 auto var(--space-8)", fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.8)", maxWidth: "560px", lineHeight: "var(--leading-normal)" }}>Cuéntanos vuestras necesidades y preparamos una propuesta a medida, bonificable FUNDAE, en menos de 24&nbsp;h.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="primary" size="lg" uppercase iconRight={<span>→</span>} onClick={scrollToLead}>Solicita propuesta</Button>
            <Button variant="onDark" size="lg" onClick={() => onNav("contact")}>Contactar</Button>
          </div>
        </Container>
      </section>

      {/* Formaciones relacionadas */}
      {related.length > 0 && (
        <section style={{ background: "var(--surface-sunken)", padding: "var(--section-y) 0" }}>
          <Container>
            <h2 style={{ margin: "0 0 var(--space-10)", fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)" }}>Formaciones relacionadas<span style={{ color: "var(--color-brand)" }}>.</span></h2>
            <window.HScroll itemWidth="300px">
              {related.map((c) => (
                <ProductCard key={c.id} title={c.title} image={c.img} code={c.code} norm={c.norm} recommended={c.recommended} cover bullets={c.bullets} ctaLabel="Ver curso" onClick={(e) => { e.preventDefault(); onNav("course", c.id); }} />
              ))}
            </window.HScroll>
          </Container>
        </section>
      )}
    </div>
  );
}
window.CourseScreen = CourseScreen;
