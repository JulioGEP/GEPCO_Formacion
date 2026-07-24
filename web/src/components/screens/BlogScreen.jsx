import React from 'react';
import { onNav, getParam } from '../../lib/router.js';
// Blog — índice + plantilla de post individual
import { Button, Badge } from '../ds/index.js';
import { DATA as D } from '../../lib/data.js';
import { Container } from '../common/Container.jsx';

const fmtEUR = (n) => {
  const [int, dec] = Number(n).toFixed(2).split(".");
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + dec + " €";
};
const Stars = ({ n = 5 }) => (
  <span aria-label={n + " de 5 estrellas"} style={{ color: "var(--color-accent)", fontSize: "15px", letterSpacing: "2px", whiteSpace: "nowrap" }}>
    {"★★★★★".slice(0, n)}<span style={{ color: "var(--border-hover)" }}>{"★★★★★".slice(n)}</span>
  </span>
);

// CRO: cada artículo declara el curso que debe convertir + la familia relacionada.
// [PENDIENTE: revisar el mapping curso↔artículo con negocio]
const POSTMETA = {
  "epis-bomberos": { cat: "extincion", primary: "bombero-empresa", author: "Equipo técnico GEPCO", updated: "12/05/2025" },
  "normativa-desfibriladores": { cat: "auxilios", primary: "svb-dea", author: "Equipo técnico GEPCO", updated: "28/04/2025" },
  "contacto-electrico-indirecto": { cat: "prl", primary: "confinados", author: "Equipo técnico GEPCO", updated: "07/04/2025" },
};

// [PENDIENTE: cuerpo real de los artículos — texto de muestra estructurado para CRO]
const ARTICLE = {
  "epis-bomberos": {
    takeaways: [
      "Los EPI de intervención tienen vida útil y fecha de caducidad: revísalos antes y después de cada uso.",
      "La normativa exige registrar cada inspección y retirar el equipo dañado de forma inmediata.",
      "Un EPI mal mantenido da una falsa sensación de seguridad: la formación práctica es tan importante como el propio equipo.",
    ],
    sections: [
      { h: "Qué protege realmente un EPI de bombero", paras: [
        "El equipo de protección individual es la última barrera entre el profesional y un entorno hostil: calor radiante, llama directa, humos tóxicos y proyecciones. No es un uniforme, es un sistema.",
        "Cada capa —chaqueta, cubrepantalón, casco, guantes y botas— cumple una función térmica y mecánica concreta. Cuando una de ellas falla, todo el conjunto pierde eficacia." ] },
      { h: "Revisión y mantenimiento según la normativa", paras: [
        "La normativa vigente obliga a inspeccionar el EPI de forma periódica, documentar el estado y retirar cualquier pieza que presente cortes, quemaduras o pérdida de propiedades ignífugas.",
        "El lavado también está regulado: los tratamientos incorrectos degradan las barreras de humedad y reducen la protección real por debajo del umbral certificado." ] },
      { h: "Los errores más frecuentes (y cómo evitarlos)", paras: [
        "El fallo más habitual no es el equipo, sino su uso: colocación incompleta, mezcla de piezas de distintos niveles o desconocimiento de los límites del EPI ante determinados riesgos.",
        "Por eso trabajamos siempre con prácticas reales. Un profesional que ha entrenado con su equipo en condiciones controladas responde mejor cuando la situación es real." ] },
    ],
  },
  "normativa-desfibriladores": {
    takeaways: [
      "Cada vez más comunidades obligan a instalar un DEA en espacios con gran afluencia de público.",
      "No basta con tener el desfibrilador: la normativa exige personal formado y el registro del equipo.",
      "La supervivencia en una parada cardiaca cae ~10% por cada minuto sin desfibrilación.",
    ],
    sections: [
      { h: "Qué instalaciones están obligadas a tener un DEA", paras: [
        "La regulación de los espacios cardioprotegidos es autonómica, pero la tendencia es clara: centros deportivos, comerciales, de transporte y grandes centros de trabajo entran progresivamente en la obligación.",
        "Conocer si tu instalación está afectada evita sanciones y, sobre todo, prepara a tu organización para responder ante una emergencia cardiaca." ] },
      { h: "Formación y registro: los requisitos que se olvidan", paras: [
        "Instalar el aparato es solo el primer paso. La mayoría de normativas exigen que haya personal formado en SVB y uso del DEA, y que el equipo esté registrado ante la administración sanitaria.",
        "Sin personal habilitado, el desfibrilador pierde gran parte de su valor: la rapidez de uso es la variable que marca la diferencia." ] },
      { h: "Cómo afecta a tu empresa", paras: [
        "Más allá del cumplimiento, disponer de un espacio cardioprotegido con equipos formados es una decisión de responsabilidad y reputación.",
        "Formar a una parte de la plantilla en SVB y DEA es una inversión modesta con un impacto potencial enorme: salvar una vida." ] },
    ],
  },
  "contacto-electrico-indirecto": {
    takeaways: [
      "El contacto directo se produce con partes activas; el indirecto, con masas puestas accidentalmente en tensión.",
      "Cada tipo de contacto exige medidas de protección distintas: aislamiento y barreras frente a diferenciales y puestas a tierra.",
      "Los trabajos con riesgo eléctrico requieren personal formado y autorizado según el RD 614/2001.",
    ],
    sections: [
      { h: "Contacto directo e indirecto: la diferencia clave", paras: [
        "El contacto eléctrico directo ocurre cuando una persona toca una parte normalmente en tensión —un conductor desnudo, un borne—. El indirecto se da cuando toca una masa que se ha puesto en tensión por un fallo de aislamiento.",
        "Distinguirlos no es un tecnicismo: determina qué medida de protección es eficaz en cada caso." ] },
      { h: "Medidas de protección para cada caso", paras: [
        "Frente al contacto directo se actúa sobre la fuente: aislamiento, envolventes, barreras y distancias de seguridad. Frente al indirecto, sobre las consecuencias: puesta a tierra, diferenciales y separación de circuitos.",
        "La combinación correcta depende del tipo de instalación y del entorno de trabajo." ] },
      { h: "Formación obligatoria para trabajos eléctricos", paras: [
        "El RD 614/2001 exige que quien trabaja con riesgo eléctrico esté cualificado y autorizado. La formación teórico-práctica es el requisito de partida.",
        "Un equipo bien formado reconoce el riesgo antes de que se convierta en accidente." ] },
    ],
  },
};

function BlogList() {
  return (
    <div>
      <section style={{ background: "var(--color-dark)", color: "#fff", padding: "var(--section-y) 0" }}>
        <Container>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--color-brand)" }}>Recursos</span>
          <h1 style={{ margin: "14px 0 0", fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem,5vw,3.6rem)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-tight)" }}>Blog<span style={{ color: "var(--color-brand)" }}>.</span></h1>
          <p style={{ margin: "16px 0 0", fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.78)", maxWidth: "620px" }}>Guías prácticas sobre emergencias, extinción de incendios, primeros auxilios y prevención de riesgos laborales.</p>
        </Container>
      </section>
      <Container style={{ padding: "var(--section-y) var(--container-padding)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-6)" }}>
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
        </div>
      </Container>
    </div>
  );
}

// Barra de progreso de lectura — señal de engagement + ancla del CTA móvil
function ReadingProgress() {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "4px", background: "transparent", zIndex: 90 }}>
      <div style={{ height: "100%", width: pct + "%", background: "var(--color-brand)", transition: "width 80ms linear" }} />
    </div>
  );
}

// Tarjeta de conversión — el curso que este artículo debe vender
function ConversionCard({ course, onNav, compact }) {
  const hasPrice = typeof course.price === "number";
  return (
    <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
      <div style={{ position: "relative", aspectRatio: "16 / 9", overflow: "hidden" }}>
        <img src={course.img} alt={course.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <span style={{ position: "absolute", top: "12px", left: "12px", background: "var(--color-brand)", color: "#fff", fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-mono)", textTransform: "uppercase", padding: "5px 9px", borderRadius: "var(--radius-sm)" }}>{course.norm}</span>
      </div>
      <div style={{ padding: "var(--space-6)" }}>
        <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "var(--tracking-mono)", color: "var(--color-brand)", marginBottom: "8px" }}>Curso recomendado</span>
        <h3 style={{ margin: "0 0 12px", fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", lineHeight: "var(--leading-snug)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)" }}>{course.title}</h3>
        {hasPrice ? (
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "var(--space-5)" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-extrabold)", color: "var(--text-strong)" }}>{fmtEUR(course.price)}</span>
            <span style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>/ alumno</span>
          </div>
        ) : (
          <div style={{ marginBottom: "var(--space-5)", display: "flex", alignItems: "center", gap: "8px", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", color: "var(--color-success)" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "var(--radius-full)", background: "var(--color-success)" }} />Convocatorias abiertas
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
          <Button variant="primary" block size="lg" uppercase iconRight={<span>→</span>} onClick={() => onNav("course", course.id)}>Ver curso y fechas</Button>
          <Button variant="outline" block onClick={() => onNav("contact")}>Solicita propuesta</Button>
        </div>
        {!compact && (
          <ul style={{ margin: "var(--space-6) 0 0", padding: 0, listStyle: "none", display: "grid", gap: "8px" }}>
            {["Certificaciones oficiales", "Prácticas con fuego real", "Bonificable FUNDAE"].map((t) => (
              <li key={t} style={{ display: "flex", gap: "8px", fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
                <span style={{ color: "var(--color-success)", fontWeight: "var(--weight-bold)" }}>✓</span>{t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function BlogPost() {
  const postId = getParam("post");
  const post = D.blog.find((p) => p.id === postId) || D.blog[0];
  const meta = POSTMETA[post.id] || { cat: "extincion", primary: "bombero-empresa", author: "Equipo técnico GEPCO", updated: "" };
  const primary = D.courses.find((c) => c.id === meta.primary) || D.courses[0];
  const article = ARTICLE[post.id] || ARTICLE["epis-bomberos"];
  const related = D.courses.filter((c) => c.cat === meta.cat && c.id !== primary.id).slice(0, 3);
  const otherPosts = D.blog.filter((p) => p.id !== post.id);
  // tiempo de lectura estimado
  const words = (post.excerpt + " " + article.sections.map((s) => s.h + " " + s.paras.join(" ")).join(" ")).split(/\s+/).length;
  const readMin = Math.max(3, Math.round(words / 200));

  const H2 = ({ children }) => (
    <h2 style={{ margin: "var(--space-10) 0 var(--space-5)", fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-heading)", lineHeight: "var(--leading-snug)", color: "var(--text-strong)" }}>{children}</h2>
  );
  const P = ({ children }) => (
    <p style={{ margin: "0 0 var(--space-5)", fontSize: "var(--text-lg)", lineHeight: "var(--leading-loose)", color: "var(--text-body)" }}>{children}</p>
  );

  return (
    <div style={{ paddingBottom: "72px" }}>
      <ReadingProgress />

      {/* HERO */}
      <section style={{ background: "var(--color-dark)", color: "#fff", padding: "var(--section-y) 0 0" }}>
        <Container style={{ maxWidth: "820px" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", marginBottom: "22px" }}>
            <button onClick={() => onNav("blog")} style={{ background: "none", border: "none", color: "var(--color-brand)", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", padding: 0 }}>Blog</button>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.65)" }}>{post.cat}</span>
          </nav>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "var(--tracking-mono)", color: "var(--color-brand)" }}>{post.cat}</span>
          <h1 style={{ margin: "14px 0 20px", fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-tight)" }}>{post.title}<span style={{ color: "var(--color-brand)" }}>.</span></h1>
          <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap", fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.7)", paddingBottom: "var(--space-8)" }}>
            <span style={{ fontWeight: "var(--weight-semibold)", color: "#fff" }}>{meta.author}</span>
            <span>· {readMin} min de lectura</span>
            {meta.updated && <span>· Actualizado {meta.updated}</span>}
          </div>
        </Container>
        <Container style={{ maxWidth: "1040px", paddingTop: "var(--space-4)" }}>
          <img src={post.img} alt={post.title} style={{ width: "100%", height: "clamp(240px, 40vw, 440px)", objectFit: "cover", borderRadius: "var(--radius-xl) var(--radius-xl) 0 0", boxShadow: "var(--shadow-lg)", transform: "translateY(1px)" }} />
        </Container>
      </section>

      {/* CUERPO + SIDEBAR DE CONVERSIÓN */}
      <Container style={{ maxWidth: "1040px", padding: "var(--section-y) var(--container-padding)" }}>
        <div className="blog-grid">
          <article>
            <p style={{ margin: "0 0 var(--space-8)", fontSize: "var(--text-xl)", lineHeight: "var(--leading-normal)", color: "var(--text-strong)", fontWeight: "var(--weight-medium)", paddingLeft: "18px", borderLeft: "4px solid var(--color-brand)" }}>{post.excerpt}</p>

            {/* Puntos clave — retiene y da valor rápido */}
            <div style={{ margin: "0 0 var(--space-6)", padding: "var(--space-6) var(--space-8)", background: "var(--surface-sunken)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "var(--tracking-mono)", color: "var(--color-brand)", marginBottom: "12px" }}>Lo que vas a aprender</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "10px" }}>
                {article.takeaways.map((t, i) => (
                  <li key={i} style={{ display: "flex", gap: "10px", fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>
                    <span style={{ color: "var(--color-brand)", fontWeight: "var(--weight-bold)" }}>→</span>{t}
                  </li>
                ))}
              </ul>
            </div>

            {article.sections.map((s, i) => (
              <React.Fragment key={i}>
                <H2>{s.h}</H2>
                {s.paras.map((p, j) => <P key={j}>{p}</P>)}
                {/* CTA contextual a mitad de artículo */}
                {i === 0 && (
                  <div style={{ margin: "var(--space-8) 0", padding: "var(--space-6) var(--space-8)", background: "var(--color-dark)", borderRadius: "var(--radius-lg)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                    <div style={{ color: "#fff" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)" }}>¿Prefieres formarte con prácticas reales?</div>
                      <div style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.7)" }}>{primary.title} — {primary.norm}</div>
                    </div>
                    <Button variant="primary" uppercase iconRight={<span>→</span>} onClick={() => onNav("course", primary.id)}>Ver el curso</Button>
                  </div>
                )}
              </React.Fragment>
            ))}

            <p style={{ margin: "var(--space-6) 0 0", fontSize: "var(--text-sm)", color: "var(--text-subtle)", fontStyle: "italic" }}>Contenido a título informativo. Consulta la normativa aplicable a tu caso o escríbenos: preparamos un plan de formación a medida.</p>
          </article>

          {/* SIDEBAR pegajoso */}
          <aside className="blog-side">
            <ConversionCard course={primary} onNav={onNav} />
            <div style={{ marginTop: "var(--space-6)", padding: "var(--space-6)", background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", marginBottom: "6px" }}>¿Formas a un equipo?</div>
              <p style={{ margin: "0 0 var(--space-4)", fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>Formación in company en toda la península, bonificable FUNDAE.</p>
              <Button variant="dark" block onClick={() => onNav("contact")}>Solicita una propuesta</Button>
            </div>
          </aside>
        </div>
      </Container>

      {/* DOBLE RECORRIDO — empresa / particular */}
      <section style={{ background: "var(--surface-card)", borderTop: "1px solid var(--border-default)", padding: "var(--section-y) 0" }}>
        <Container style={{ maxWidth: "1040px" }}>
          <div className="blog-dualrec" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-6)" }}>
            {[
              { tag: "Empresas", h: "Forma a tu plantilla", p: "Diseñamos un plan a medida y lo impartimos en tus instalaciones o en las nuestras. Bonificable FUNDAE.", cta: "Solicita propuesta", act: () => onNav("contact"), v: "primary" },
              { tag: "Particulares", h: "Certifícate y accede al sector", p: "Consulta las convocatorias abiertas y reserva tu plaza en formaciones con certificación oficial.", cta: "Ver convocatorias", act: () => onNav("abiertas"), v: "outline" },
            ].map((c, i) => (
              <div key={i} style={{ padding: "var(--space-8)", background: "var(--surface-page)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", gap: "12px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "var(--tracking-mono)", color: "var(--color-brand)" }}>{c.tag}</span>
                <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)" }}>{c.h}</h3>
                <p style={{ margin: "0 0 var(--space-4)", fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-body)", flex: 1 }}>{c.p}</p>
                <div><Button variant={c.v} uppercase iconRight={<span>→</span>} onClick={c.act}>{c.cta}</Button></div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PRUEBA SOCIAL — Google [PENDIENTE: reseñas reales] */}
      <section style={{ padding: "var(--section-y) 0" }}>
        <Container style={{ maxWidth: "1040px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-8)" }}>
            <Stars n={5} />
            <span style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>{D.reviews.rating != null ? D.reviews.rating + " · " : ""}Opiniones verificadas en Google</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--space-6)" }}>
            {D.reviews.items.map((r, i) => (
              <figure key={i} style={{ margin: 0, background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)", boxShadow: "var(--shadow-sm)" }}>
                <Stars n={r.stars} />
                <blockquote style={{ margin: "12px 0 14px", fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>{r.quote}</blockquote>
                <figcaption style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", color: "var(--text-strong)" }}>{r.author}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* ARTÍCULOS RELACIONADOS — retención on-site */}
      {otherPosts.length > 0 && (
        <section style={{ background: "var(--surface-card)", borderTop: "1px solid var(--border-default)", padding: "var(--section-y) 0" }}>
          <Container style={{ maxWidth: "1040px" }}>
            <h2 style={{ margin: "0 0 var(--space-8)", fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)" }}>Sigue leyendo<span style={{ color: "var(--color-brand)" }}>.</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-6)" }}>
              {otherPosts.map((p) => (
                <article key={p.id} onClick={() => onNav("post", p.id)} style={{ cursor: "pointer", background: "var(--surface-page)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ aspectRatio: "16 / 10", overflow: "hidden" }}><img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
                  <div style={{ padding: "var(--space-6)" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "var(--tracking-mono)", color: "var(--color-brand)" }}>{p.cat}</span>
                    <h3 style={{ margin: "10px 0 0", fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", lineHeight: "var(--leading-snug)", letterSpacing: "var(--tracking-heading)", color: "var(--text-strong)" }}>{p.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA STICKY MÓVIL */}
      <div className="blog-mobilecta" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 80, background: "var(--surface-card)", borderTop: "1px solid var(--border-default)", boxShadow: "0 -6px 20px rgba(0,0,0,0.1)", padding: "12px var(--container-padding)", alignItems: "center", gap: "12px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "var(--tracking-mono)", color: "var(--color-brand)" }}>Curso recomendado</div>
          <div style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{typeof primary.price === "number" ? fmtEUR(primary.price) + " / alumno" : primary.norm}</div>
        </div>
        <Button variant="primary" uppercase onClick={() => onNav("course", primary.id)}>Ver curso</Button>
      </div>
    </div>
  );
}

export { BlogList, BlogPost };
