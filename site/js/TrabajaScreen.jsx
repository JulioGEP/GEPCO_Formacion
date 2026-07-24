// Trabaja con nosotros — captación de formadores / bomberos. Página atractiva:
// hero con propósito, motivos para unirse, y formulario con experiencia mínima,
// entornos de formación, adjuntar CV y envío. Sin backend (estado de éxito simulado).
const { Button, Input, Select, Checkbox, StatBlock, SectionHeading, Badge } = window.GEPCOFormaciNDesignSystem_bb6094;
const D = window.GEPCO_DATA;
const Container = window.Container;

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

function TrabajaScreen({ onNav }) {
  const [sent, setSent] = React.useState(false);
  const [accept, setAccept] = React.useState(false);
  const [cv, setCv] = React.useState(null);
  const [entornos, setEntornos] = React.useState([]);
  const fileRef = React.useRef(null);
  const toggleEntorno = (e) => setEntornos((prev) => prev.includes(e) ? prev.filter((x) => x !== e) : prev.concat(e));
  const eyebrow = { fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--color-brand)" };

  return (
    <div>
      {/* Hero */}
      <section style={{ position: "relative", background: "var(--color-dark)", color: "#fff", overflow: "hidden" }}>
        <img src={D.heroQuote} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.34 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(15,15,15,0.94), rgba(15,15,15,0.55))" }} />
        <Container style={{ position: "relative", padding: "var(--section-y) var(--container-padding)" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            <Badge tone="brand">Únete al equipo</Badge>
            <Badge tone="onDark" dot>Formadores y bomberos</Badge>
          </div>
          <h1 style={{ margin: "0 0 20px", fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-tight)", maxWidth: "860px" }}>Forma a quienes protegen. Trabaja con nosotros<span style={{ color: "var(--color-brand)" }}>.</span></h1>
          <p style={{ margin: "0 0 var(--space-8)", fontSize: "var(--text-xl)", color: "rgba(255,255,255,0.85)", maxWidth: "620px", lineHeight: "var(--leading-normal)" }}>Buscamos formadores, bomberos y técnicos de emergencia que quieran transmitir su experiencia en una escuela puntera en formación práctica. Déjanos tus datos y tu CV.</p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="primary" size="lg" uppercase iconRight={<span>→</span>} onClick={() => { const el = document.getElementById("form-trabaja"); if (el) window.scrollTo({ top: window.pageYOffset + el.getBoundingClientRect().top - 100, behavior: "smooth" }); }}>Enviar mi candidatura</Button>
          </div>
        </Container>
      </section>

      {/* Por qué unirte */}
      <section style={{ background: "var(--surface-card)", borderBottom: "1px solid var(--border-default)", padding: "var(--section-y) 0" }}>
        <Container>
          <SectionHeading eyebrow="Por qué unirte" title="Un sitio donde tu experiencia importa" />
          <div style={{ marginTop: "var(--space-10)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-8)" }}>
            {MOTIVOS.map((m) => (
              <div key={m.t} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span style={{ flex: "0 0 auto", width: "48px", height: "48px", borderRadius: "var(--radius-md)", background: "var(--color-brand-soft)", color: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{m.icon}</svg>
                </span>
                <div>
                  <h3 style={{ margin: "0 0 6px", fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", lineHeight: "var(--leading-snug)" }}>{m.t}</h3>
                  <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>{m.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Formulario */}
      <section id="form-trabaja" style={{ background: "var(--surface-sunken)", padding: "var(--section-y) 0 var(--space-24)" }}>
        <Container style={{ maxWidth: "820px" }}>
          <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-md)", padding: "var(--space-12)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "var(--space-8) 0" }}>
                <div style={{ width: "64px", height: "64px", margin: "0 auto var(--space-6)", borderRadius: "var(--radius-full)", background: "var(--color-brand-soft)", color: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "34px" }}>✓</div>
                <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)" }}>¡Candidatura recibida!<span style={{ color: "var(--color-brand)" }}>.</span></h2>
                <p style={{ margin: "0 0 var(--space-8)", fontSize: "var(--text-lg)", color: "var(--text-body)", lineHeight: "var(--leading-normal)" }}>Gracias por tu interés en formar parte de GEPCO. Revisaremos tu perfil y te contactaremos si encaja con nuestras necesidades.</p>
                <Button variant="outline" onClick={() => onNav("home")}>Volver al inicio</Button>
              </div>
            ) : (
              <React.Fragment>
                <span style={eyebrow}>Candidatura</span>
                <h2 style={{ margin: "10px 0 6px", fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)" }}>Cuéntanos sobre ti</h2>
                <p style={{ margin: "0 0 var(--space-8)", fontSize: "var(--text-base)", color: "var(--text-subtle)", lineHeight: "var(--leading-normal)" }}>Rellena el formulario y adjunta tu CV. Te responderemos por email.</p>
                <form onSubmit={(e) => { e.preventDefault(); if (accept) setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "var(--space-4)" }}>
                    <Input label="Nombre y apellidos *" placeholder="Tu nombre" />
                    <Input label="Email *" type="email" placeholder="tu@email.com" />
                    <Input label="Teléfono *" placeholder="+34 600 000 000" />
                    <Select label="Perfil *" placeholder="Elige una opción" options={["Formador/a", "Bombero/a", "Técnico/a de emergencias", "Técnico/a PRL", "Otro"]} />
                  </div>

                  <Select label="Experiencia mínima en formación o emergencias *" placeholder="Elige una opción" options={["Menos de 1 año", "1 a 3 años", "3 a 5 años", "Más de 5 años", "Más de 10 años"]} />

                  <div>
                    <div style={{ fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "12px" }}>¿En qué entornos estás formado/a? *</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px var(--space-6)" }}>
                      {ENTORNOS.map((e) => (
                        <Checkbox key={e} label={e} checked={entornos.includes(e)} onChange={() => toggleEntorno(e)} />
                      ))}
                    </div>
                  </div>

                  {/* Adjuntar CV */}
                  <div>
                    <div style={{ fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--text-subtle)", marginBottom: "10px" }}>Currículum (PDF o Word) *</div>
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCv(e.target.files && e.target.files[0] ? e.target.files[0].name : null)} style={{ display: "none" }} />
                    <button type="button" onClick={() => fileRef.current && fileRef.current.click()} style={{ width: "100%", display: "flex", alignItems: "center", gap: "14px", padding: "var(--space-5) var(--space-6)", borderRadius: "var(--radius-md)", border: `1px dashed ${cv ? "var(--color-brand)" : "var(--border-hover)"}`, background: cv ? "var(--color-brand-soft)" : "var(--surface-sunken)", cursor: "pointer", textAlign: "left" }}>
                      <span aria-hidden="true" style={{ flex: "0 0 auto", width: "40px", height: "40px", borderRadius: "var(--radius-md)", background: "var(--surface-card)", color: "var(--color-brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                      </span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "var(--text-base)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{cv || "Adjuntar mi CV"}</span>
                        <span style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>{cv ? "Archivo seleccionado · haz clic para cambiar" : "Haz clic para seleccionar el archivo"}</span>
                      </span>
                    </button>
                  </div>

                  <Input label="Cuéntanos brevemente tu experiencia (opcional)" placeholder="Trayectoria, certificaciones, disponibilidad…" />

                  <Checkbox checked={accept} onChange={(e) => setAccept(e.target.checked)} label={<span>He leído y acepto la <a href="#">Política de Privacidad</a> y autorizo el tratamiento de mis datos para procesos de selección.</span>} />
                  <Button type="submit" variant="primary" block size="lg" uppercase disabled={!accept} iconRight={<span>→</span>}>Enviar candidatura</Button>
                  <p style={{ margin: 0, textAlign: "center", fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>Tratamos tu candidatura de forma confidencial.</p>
                </form>
              </React.Fragment>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
window.TrabajaScreen = TrabajaScreen;
