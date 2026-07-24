// GEPCO Formación — Home reestructurada según briefing SEO/UX:
// distribuidora de las 8 áreas, doble recorrido empresa / particular, diferenciales reales y prueba social nativa.
const { Button, IconButton, Badge, NormBadge, ProductCard, CategoryCard, SectionHeading, StatBlock, Input, Select, Checkbox } = window.GEPCOFormaciNDesignSystem_bb6094;
const D = window.GEPCO_DATA;
const Container = window.Container;
const HScroll = window.HScroll;

function FundaeChip({ onDark }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap", padding: "6px 12px", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", letterSpacing: "0.02em", background: onDark ? "rgba(255,255,255,0.12)" : "var(--color-brand-soft)", color: onDark ? "#fff" : "var(--color-brand)", border: onDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent" }}>
      <span aria-hidden="true" style={{ fontFamily: "var(--font-mono)", fontWeight: "var(--weight-bold)" }}>FUNDAE</span>
      Formación bonificable para empresas
    </span>
  );
}

function InCompanyChip() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap", padding: "6px 12px 6px 10px", borderRadius: "var(--radius-full)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", letterSpacing: "0.02em", background: "rgba(243,146,0,0.14)", color: "#fff", border: "1px solid rgba(243,146,0,0.55)" }}>
      <span aria-hidden="true" style={{ display: "inline-flex", color: "var(--color-accent)" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontWeight: "var(--weight-bold)", color: "var(--color-accent)" }}>IN COMPANY</span>
      Nos desplazamos a tus instalaciones
    </span>
  );
}

// Tarjeta de próxima convocatoria — recorrido particular (ver convocatorias)
function IntakeCard({ course, onNav }) {
  const facts = [
    { k: "Próxima fecha", v: "20/05/2025" },
    { k: "Sede", v: "Sabadell, Campo de Fuego" },
    { k: "Plazas", v: course.outOfStock ? "Lista de espera" : "Últimas 4" },
  ];
  return (
    <div style={{ background: "var(--surface-card)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)", overflow: "hidden" }}>
      <div style={{ position: "relative", aspectRatio: "16 / 9" }}>
        <img src={course.img} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", top: "14px", left: "14px", display: "flex", gap: "8px" }}>
          <Badge tone="brand">Convocatoria abierta</Badge>
          <NormBadge onDark>{course.norm}</NormBadge>
        </div>
      </div>
      <div style={{ padding: "var(--space-6)" }}>
        <span style={{ display: "block", marginBottom: "8px", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--color-brand)" }}>Para particulares y autónomos</span>
        <h3 style={{ margin: "0 0 14px", fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", lineHeight: "var(--leading-snug)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)" }}>{course.title}</h3>
        <dl style={{ margin: "0 0 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {facts.map((f) => (
            <div key={f.k} style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "var(--text-sm)", paddingBottom: "8px", borderBottom: "1px solid var(--border-default)" }}>
              <dt style={{ color: "var(--text-subtle)" }}>{f.k}</dt>
              <dd style={{ margin: 0, color: "var(--text-strong)", fontWeight: "var(--weight-semibold)", textAlign: "right" }}>{f.v}</dd>
            </div>
          ))}
        </dl>
        <Button variant="dark" block iconRight={<span>→</span>} onClick={() => onNav("abiertas")}>Ver convocatorias</Button>
      </div>
    </div>
  );
}

function Hero({ onNav }) {
  const heroCourse = D.courses.find((c) => c.id === "bombero-empresa") || D.courses[0];
  return (
    <section style={{ position: "relative", background: "var(--color-dark)", color: "#fff", overflow: "hidden" }}>
      <img src={D.hero} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.42 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(16,18,22,0.96) 0%, rgba(16,18,22,0.74) 52%, rgba(16,18,22,0.42) 100%)" }} />
      <Container style={{ position: "relative", padding: "var(--section-y) var(--container-padding)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.85fr", gap: "var(--space-16)", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "26px" }}>
              <Badge tone="brand" dot>Simulacros con fuego real</Badge>
              <Badge tone="onDark">Centro homologado ISPC</Badge>
            </div>
            <h1 style={{ margin: "0 0 22px", fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5.4vw, 4.25rem)", fontWeight: "var(--weight-extrabold)", lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-display)" }}>
              Formación en emergencias y <span style={{ color: "var(--color-brand)" }}>PRL</span> con simulacros reales.
            </h1>
            <p style={{ margin: "0 0 30px", fontSize: "var(--text-xl)", lineHeight: "var(--leading-normal)", color: "rgba(255,255,255,0.85)", maxWidth: "540px" }}>
              Formación práctica con fuego real, casa de humo y aforo máximo de 15 alumnos. Preparamos a empresas y profesionales en las 8 áreas de la seguridad y las emergencias.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "nowrap", alignItems: "stretch", marginBottom: "20px" }}>
              <Button variant="primary" size="lg" iconRight={<span>→</span>} onClick={() => onNav("contact")}>Solicita propuesta para tu empresa</Button>
              <Button variant="onDark" size="lg" onClick={() => onNav("abiertas")}>Ver convocatorias abiertas</Button>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "nowrap" }}>
              <FundaeChip onDark />
              <InCompanyChip />
            </div>
          </div>
          <IntakeCard course={heroCourse} onNav={onNav} />
        </div>
      </Container>
    </section>
  );
}

// Formación práctica que marca la diferencia — diferenciales confirmados
function DiffBand() {
  return (
    <section style={{ background: "var(--surface-card)", borderBottom: "1px solid var(--border-default)", padding: "var(--section-y) 0" }}>
      <Container>
        <SectionHeading eyebrow="Por qué somos distintos" title="Formación práctica que marca la diferencia" />
        <div style={{ marginTop: "var(--space-10)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-6)" }}>
          {D.diff.map((d, i) => (
            <div key={i} style={{ background: "var(--surface-sunken)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: "var(--space-8)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", color: "var(--color-brand)", lineHeight: 1.05, marginBottom: "12px" }}>{d.v}</div>
              <div style={{ fontSize: "var(--text-base)", color: "var(--text-body)", lineHeight: "var(--leading-snug)" }}>{d.l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "var(--space-10)", paddingTop: "var(--space-8)", borderTop: "1px solid var(--border-default)" }}>
          <p style={{ margin: "0 0 var(--space-6)", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-subtle)", textAlign: "center" }}>Certificaciones y acreditaciones oficiales</p>
          <img src="assets/logos-nos-acreditan-gepcoformacion.png" alt="Acreditaciones: Generalitat de Catalunya, Institut de Seguretat Pública de Catalunya, Policía Nacional, IRATA, SEMICYUC, ISO 9001, DGT, Irudek y Gobierno de España (Ministerio de Educación y Formación Profesional)" style={{ display: "block", width: "100%", maxWidth: "760px", height: "auto", margin: "0 auto" }} />
        </div>
      </Container>
    </section>
  );
}

// Tarjeta de área — foto + nombre real como texto de enlace
function AreaCard({ area, onNav }) {
  const [h, setH] = React.useState(false);
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onNav("catalog", area.cat); }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: "relative", display: "block", borderRadius: "var(--radius-lg)", overflow: "hidden", textDecoration: "none", boxShadow: h ? "var(--shadow-md)" : "var(--shadow-sm)", transform: h ? "translateY(-4px)" : "none", transition: "transform var(--duration-base) var(--ease-standard), box-shadow var(--duration-base) var(--ease-standard)", minHeight: "300px" }}>
      <img src={area.img} alt={area.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: h ? "scale(1.05)" : "none", transition: "transform var(--duration-slow) var(--ease-standard)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,18,22,0.15) 0%, rgba(16,18,22,0.85) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "var(--space-6)", color: "#fff" }}>
        <h3 style={{ margin: "0 0 4px", fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-heading)", lineHeight: "var(--leading-snug)" }}>{area.name}</h3>
        {area.note && <span style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.75)", lineHeight: "var(--leading-snug)" }}>{area.note}</span>}
        <span style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)", color: "#fff" }}>
          Ver formaciones <span aria-hidden="true" style={{ color: "var(--color-brand)", transform: h ? "translateX(4px)" : "none", transition: "transform var(--duration-fast) var(--ease-standard)" }}>→</span>
        </span>
      </div>
    </a>
  );
}

function Areas({ onNav }) {
  return (
    <section style={{ background: "var(--surface-page)", padding: "var(--section-y) 0" }}>
      <Container>
        <SectionHeading eyebrow="Explora por área" title="Nuestras áreas de formación"
          actions={<Button variant="outline" onClick={() => onNav("catalog")}>Ver todo el catálogo</Button>} />
        <div style={{ marginTop: "var(--space-10)" }}>
          <HScroll itemWidth="340px">
            {D.areas.map((a) => <AreaCard key={a.name} area={a} onNav={onNav} />)}
          </HScroll>
        </div>
      </Container>
    </section>
  );
}

// Formamos a tu equipo — in company / Safety Day + formulario corto empresa
function Empresa({ onNav }) {
  const [accept, setAccept] = React.useState(false);
  const bullets = [
    "Formación in company en tus instalaciones o en nuestros campos de prácticas.",
    "Safety Day y jornadas a medida para equipos.",
    "Propuesta, calendario y presupuesto cerrado en 24 h.",
  ];
  return (
    <section style={{ background: "var(--surface-page)", padding: "0 0 var(--section-y)" }}>
      <Container>
        <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", boxShadow: "var(--shadow-lg)" }}>
          <div style={{ position: "relative", background: "var(--color-dark)", color: "#fff", padding: "var(--space-12)", minHeight: "560px", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
            <img src={D.heroQuote} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.32 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(16,18,22,0.72), rgba(16,18,22,0.94))" }} />
            <div style={{ position: "relative" }}>
              <span style={{ display: "block", marginBottom: "16px", fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--color-brand)" }}>Formamos a tu equipo</span>
              <h2 style={{ margin: "0 0 22px", fontFamily: "var(--font-display)", fontSize: "clamp(1.9rem, 3.2vw, 2.75rem)", fontWeight: "var(--weight-extrabold)", lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-display)" }}>Diseñamos el plan a medida de tu empresa.</h2>
              <ul style={{ margin: "0 0 28px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
                {bullets.map((b, i) => (
                  <li key={i} style={{ display: "flex", gap: "12px", fontSize: "var(--text-lg)", lineHeight: "var(--leading-snug)", color: "var(--text-on-dark-muted)" }}>
                    <span aria-hidden="true" style={{ color: "var(--color-brand)", fontWeight: "var(--weight-bold)" }}>→</span>{b}
                  </li>
                ))}
              </ul>
              <FundaeChip onDark />
              <p style={{ margin: "14px 0 0", fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.6)", maxWidth: "420px", lineHeight: "var(--leading-normal)" }}>Te informamos de cómo bonificar la formación a través de FUNDAE. La gestión del trámite la realiza tu empresa.</p>
            </div>
          </div>
          <div style={{ background: "var(--color-dark-soft)", color: "#fff", padding: "var(--space-12)" }}>
            <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-heading)" }}>Cuéntanos qué necesitas.</h3>
            <p style={{ margin: "0 0 22px", fontSize: "var(--text-sm)", color: "var(--text-on-dark-muted)" }}>Respondemos en menos de 24 h con una propuesta a medida.</p>
            <form onSubmit={(e) => { e.preventDefault(); if (accept) onNav("contact"); }} style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
              <Input theme="dark" label="Empresa" placeholder="Razón social" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                <Select theme="dark" label="Empleados a formar" placeholder="Elige un rango" options={["1 a 5", "6 a 20", "21 a 50", "Más de 50"]} />
                <Select theme="dark" label="Área de interés" placeholder="Elige un área" options={D.areas.map((a) => a.name)} />
              </div>
              <Input theme="dark" label="Email o teléfono de contacto" placeholder="tu@empresa.com" />
              <Checkbox theme="dark" checked={accept} onChange={(e) => setAccept(e.target.checked)} label={<span>Acepto la <a href="contacto.html" style={{ color: "#fff", textDecoration: "underline" }}>Política de Privacidad</a>.</span>} />
              <Button type="submit" variant="primary" size="lg" disabled={!accept} iconRight={<span>→</span>}>Solicitar propuesta</Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Empresas que confían en nosotros — testimonios + logos, HTML nativo. [PENDIENTE: contenido real]
function SocialProof() {
  return (
    <section style={{ background: "var(--surface-sunken)", padding: "var(--section-y) 0" }}>
      <Container>
        <SectionHeading title="Empresas que confían en nosotros" />
        <div style={{ marginTop: "var(--space-10)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-6)" }}>
          {D.testimonios.map((t, i) => (
            <figure key={i} style={{ margin: 0, background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              <span aria-hidden="true" style={{ fontFamily: "var(--font-display)", fontSize: "48px", lineHeight: 0.5, color: "var(--color-brand)", height: "24px" }}>&ldquo;</span>
              <blockquote style={{ margin: 0, fontSize: "var(--text-lg)", lineHeight: "var(--leading-normal)", color: "var(--text-strong)", fontStyle: "italic" }}>{t.quote}</blockquote>
              <figcaption style={{ marginTop: "auto", fontSize: "var(--text-sm)" }}>
                <span style={{ display: "block", fontWeight: "var(--weight-bold)", color: "var(--text-strong)" }}>{t.author}</span>
                <span style={{ color: "var(--text-subtle)" }}>{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div style={{ marginTop: "var(--space-12)" }}>
          <p style={{ margin: "0 0 var(--space-6)", fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--text-subtle)", textAlign: "center" }}>Confían en nosotros</p>
          <div className="gepco-marquee-mask" style={{ overflow: "hidden" }}>
            <div className="gepco-marquee-track">
              {D.logosClientesList.concat(D.logosClientesList).map((l, i) => (
                <div key={i} style={{ flex: "0 0 auto", width: "170px", height: "84px", margin: "0 var(--space-2)", borderRadius: "var(--radius-md)", background: "var(--surface-card)", border: "1px solid var(--border-default)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 var(--space-6)" }}>
                  <img src={l.src} alt={i < D.logosClientesList.length ? l.alt : ""} aria-hidden={i >= D.logosClientesList.length ? "true" : undefined} loading="lazy" style={{ maxWidth: "100%", maxHeight: "48px", objectFit: "contain", filter: "grayscale(1)", opacity: 0.75 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Por qué elegir GEPCO + Sobre GEPCO (instalaciones e instructores)
function PorQue({ onNav }) {
  return (
    <section style={{ background: "var(--surface-card)", padding: "var(--section-y) 0" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-16)", alignItems: "center" }}>
          <div>
            <SectionHeading eyebrow="Por qué elegir GEPCO" title="Trayectoria, instalaciones e instructores en activo" />
            <p style={{ margin: "var(--space-6) 0 var(--space-8)", fontSize: "var(--text-lg)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>Somos una escuela de emergencias y PRL con más de 15 años formando profesionales, campos de prácticas propios e instructores en activo en los servicios de emergencia.</p>
            <div style={{ display: "flex", gap: "var(--space-12)", flexWrap: "wrap", marginBottom: "var(--space-8)" }}>
              <StatBlock value="+15" label="Años de experiencia" />
              <StatBlock value="2" label="Sedes en España" />
              <StatBlock value="ISPC" label="Centro homologado" />
            </div>
            <Button variant="dark" iconRight={<span>→</span>} onClick={() => onNav("nosotros")}>Saber más sobre nosotros</Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
            {[
              { t: "Nuestras instalaciones", img: D.courses.find((c) => c.id === "campo-fuego").img, d: "Campo de fuego, casa de humo y espacios de práctica reales." },
              { t: "Nuestros instructores", img: D.courses.find((c) => c.id === "jefes-emergencia").img, d: "Profesionales en activo de emergencias y PRL." },
            ].map((c) => (
              <div key={c.t} style={{ background: "var(--surface-sunken)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
                <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}><img src={c.img} alt={c.t} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
                <div style={{ padding: "var(--space-5)" }}>
                  <h3 style={{ margin: "0 0 6px", fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)" }}>{c.t}</h3>
                  <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: "var(--leading-snug)" }}>{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function BlogPreview({ onNav }) {
  return (
    <section style={{ background: "var(--surface-sunken)", padding: "var(--section-y) 0" }}>
      <Container>
        <SectionHeading eyebrow="Recursos" title="Últimos artículos del blog"
          actions={<Button variant="outline" onClick={() => onNav("blog")}>Ver todos los artículos</Button>} />
        <div style={{ marginTop: "var(--space-10)" }}>
          <HScroll itemWidth="360px">
          {D.blog.map((p) => (
            <article key={p.id} onClick={() => onNav("post", p.id)} style={{ cursor: "pointer", background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ aspectRatio: "16 / 10", overflow: "hidden" }}><img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
              <div style={{ padding: "var(--space-6)" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "var(--tracking-mono)", color: "var(--color-brand)" }}>{p.cat}</span>
                <h3 style={{ margin: "10px 0 10px", fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", lineHeight: "var(--leading-snug)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)" }}>{p.title}</h3>
                <p style={{ margin: "0 0 14px", fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>{p.excerpt}</p>
                <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)", color: "var(--color-ink)" }}>Leer artículo <span style={{ color: "var(--color-brand)" }}>→</span></span>
              </div>
            </article>
          ))}
          </HScroll>
        </div>
      </Container>
    </section>
  );
}

function HomeScreen({ onNav }) {
  return (
    <div>
      <Hero onNav={onNav} />
      <DiffBand />
      <Areas onNav={onNav} />
      <Empresa onNav={onNav} />
      <SocialProof />
      <PorQue onNav={onNav} />
      <BlogPreview onNav={onNav} />
    </div>
  );
}
window.HomeScreen = HomeScreen;
