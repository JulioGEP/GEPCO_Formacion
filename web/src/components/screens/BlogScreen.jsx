import React from 'react';
import { onNav, getParam } from '../../lib/router.js';
// Blog — índice + plantilla de post individual
import { Button, Badge } from '../ds/index.js';
import { DATA as D } from '../../lib/data.js';
import { Container } from '../common/Container.jsx';
import { cx } from '../../lib/cx.js';

const fmtEUR = (n) => {
  const [int, dec] = Number(n).toFixed(2).split(".");
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + dec + " €";
};
const Stars = ({ n = 5 }) => (
  <span aria-label={n + " de 5 estrellas"} className="text-accent text-[15px] tracking-[2px] whitespace-nowrap">
    {"★★★★★".slice(0, n)}<span className="text-border-strong">{"★★★★★".slice(n)}</span>
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
      <section className="bg-dark text-white py-section">
        <Container>
          <span className="font-mono text-sm uppercase tracking-eyebrow text-brand">Recursos</span>
          <h1 className="m-[14px_0_0] font-display text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold tracking-display leading-tight">Blog<span className="text-brand">.</span></h1>
          <p className="m-[16px_0_0] text-lg text-white/[0.78] max-w-[620px]">Guías prácticas sobre emergencias, extinción de incendios, primeros auxilios y prevención de riesgos laborales.</p>
        </Container>
      </section>
      <Container className="py-section">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          {D.blog.map((p) => (
            <article key={p.id} onClick={() => onNav("post", p.id)} className="cursor-pointer bg-surface border border-border rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-[16/10] overflow-hidden"><img src={p.img} alt={p.title} className="w-full h-full object-cover" /></div>
              <div className="p-6">
                <span className="font-mono text-[11px] uppercase tracking-mono text-brand">{p.cat}</span>
                <h3 className="m-[10px_0_10px] font-display text-lg font-bold leading-snug tracking-heading text-strong">{p.title}</h3>
                <p className="m-[0_0_14px] text-sm leading-normal text-body">{p.excerpt}</p>
                <span className="text-sm font-bold text-ink">Leer artículo <span className="text-brand">→</span></span>
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
    <div className="fixed top-0 left-0 right-0 h-[4px] bg-transparent z-[90]">
      <div className="h-full bg-brand transition-[width] duration-[80ms] ease-linear" style={{ width: pct + "%" }} />
    </div>
  );
}

// Tarjeta de conversión — el curso que este artículo debe vender
function ConversionCard({ course, onNav, compact }) {
  const hasPrice = typeof course.price === "number";
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-md">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
        <span className="absolute top-[12px] left-[12px] bg-brand text-white font-mono text-[10px] font-bold tracking-mono uppercase p-[5px_9px] rounded-sm">{course.norm}</span>
      </div>
      <div className="p-6">
        <span className="block font-mono text-[10px] uppercase tracking-mono text-brand mb-[8px]">Curso recomendado</span>
        <h3 className="m-[0_0_12px] font-display text-lg font-bold leading-snug tracking-heading text-strong">{course.title}</h3>
        {hasPrice ? (
          <div className="flex items-baseline gap-[6px] mb-5">
            <span className="font-display text-2xl font-extrabold text-strong">{fmtEUR(course.price)}</span>
            <span className="text-sm text-subtle">/ alumno</span>
          </div>
        ) : (
          <div className="mb-5 flex items-center gap-[8px] text-sm font-semibold text-success">
            <span className="w-[8px] h-[8px] rounded-full bg-success" />Convocatorias abiertas
          </div>
        )}
        <div className="flex flex-col gap-3">
          <Button variant="primary" block size="lg" uppercase iconRight={<span>→</span>} onClick={() => onNav("course", course.id)}>Ver curso y fechas</Button>
          <Button variant="outline" block onClick={() => onNav("contact")}>Solicita propuesta</Button>
        </div>
        {!compact && (
          <ul className="m-[var(--space-6)_0_0] p-0 list-none grid gap-[8px]">
            {["Certificaciones oficiales", "Prácticas con fuego real", "Bonificable FUNDAE"].map((t) => (
              <li key={t} className="flex gap-[8px] text-sm text-body">
                <span className="text-success font-bold">✓</span>{t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function BlogPost({ postId: postIdProp }) {
  const postId = postIdProp || getParam("post");
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
    <h2 className="m-[var(--space-10)_0_var(--space-5)] font-display text-2xl font-bold tracking-heading leading-snug text-strong">{children}</h2>
  );
  const P = ({ children }) => (
    <p className="m-[0_0_var(--space-5)] text-lg leading-loose text-body">{children}</p>
  );

  return (
    <div className="pb-[72px]">
      <ReadingProgress />

      {/* HERO */}
      <section className="bg-dark text-white pt-section">
        <Container style={{ maxWidth: "820px" }}>
          <nav className="flex items-center gap-[8px] font-mono text-sm mb-[22px]">
            <button onClick={() => onNav("blog")} className="bg-transparent border-none text-brand cursor-pointer [font-family:inherit] [font-size:inherit] p-0">Blog</button>
            <span className="text-white/40">/</span>
            <span className="text-white/[0.65]">{post.cat}</span>
          </nav>
          <span className="font-mono text-[12px] uppercase tracking-mono text-brand">{post.cat}</span>
          <h1 className="m-[14px_0_20px] font-display text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-display leading-tight">{post.title}<span className="text-brand">.</span></h1>
          <div className="flex items-center gap-[18px] flex-wrap text-sm text-white/70 pb-8">
            <span className="font-semibold text-white">{meta.author}</span>
            <span>· {readMin} min de lectura</span>
            {meta.updated && <span>· Actualizado {meta.updated}</span>}
          </div>
        </Container>
        <Container className="pt-4" style={{ maxWidth: "1040px" }}>
          <img src={post.img} alt={post.title} className="w-full h-[clamp(240px,40vw,440px)] object-cover rounded-t-xl shadow-lg translate-y-px" />
        </Container>
      </section>

      {/* CUERPO + SIDEBAR DE CONVERSIÓN */}
      <Container className="py-section" style={{ maxWidth: "1040px" }}>
        <div className="blog-grid">
          <article>
            <p className="m-[0_0_var(--space-8)] text-xl leading-normal text-strong font-medium pl-[18px] border-l-4 border-l-brand">{post.excerpt}</p>

            {/* Puntos clave — retiene y da valor rápido */}
            <div className="m-[0_0_var(--space-6)] py-6 px-8 bg-surface-muted border border-border rounded-lg">
              <div className="font-mono text-[11px] uppercase tracking-mono text-brand mb-[12px]">Lo que vas a aprender</div>
              <ul className="m-0 p-0 list-none grid gap-[10px]">
                {article.takeaways.map((t, i) => (
                  <li key={i} className="flex gap-[10px] text-base leading-normal text-body">
                    <span className="text-brand font-bold">→</span>{t}
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
                  <div className="m-[var(--space-8)_0] py-6 px-8 bg-dark rounded-lg flex justify-between items-center gap-[20px] flex-wrap">
                    <div className="text-white">
                      <div className="font-display text-lg font-bold">¿Prefieres formarte con prácticas reales?</div>
                      <div className="text-sm text-white/70">{primary.title} — {primary.norm}</div>
                    </div>
                    <Button variant="primary" uppercase iconRight={<span>→</span>} onClick={() => onNav("course", primary.id)}>Ver el curso</Button>
                  </div>
                )}
              </React.Fragment>
            ))}

            <p className="m-[var(--space-6)_0_0] text-sm text-subtle italic">Contenido a título informativo. Consulta la normativa aplicable a tu caso o escríbenos: preparamos un plan de formación a medida.</p>
          </article>

          {/* SIDEBAR pegajoso */}
          <aside className="blog-side">
            <ConversionCard course={primary} onNav={onNav} />
            <div className="mt-6 p-6 bg-surface border border-border rounded-lg shadow-sm">
              <div className="font-display text-base font-bold text-strong mb-[6px]">¿Formas a un equipo?</div>
              <p className="m-[0_0_var(--space-4)] text-sm leading-normal text-body">Formación in company en toda la península, bonificable FUNDAE.</p>
              <Button variant="dark" block onClick={() => onNav("contact")}>Solicita una propuesta</Button>
            </div>
          </aside>
        </div>
      </Container>

      {/* DOBLE RECORRIDO — empresa / particular */}
      <section className="bg-surface border-t border-t-border py-section">
        <Container style={{ maxWidth: "1040px" }}>
          <div className="blog-dualrec grid grid-cols-[1fr_1fr] gap-6">
            {[
              { tag: "Empresas", h: "Forma a tu plantilla", p: "Diseñamos un plan a medida y lo impartimos en tus instalaciones o en las nuestras. Bonificable FUNDAE.", cta: "Solicita propuesta", act: () => onNav("contact"), v: "primary" },
              { tag: "Particulares", h: "Certifícate y accede al sector", p: "Consulta las convocatorias abiertas y reserva tu plaza en formaciones con certificación oficial.", cta: "Ver convocatorias", act: () => onNav("abiertas"), v: "outline" },
            ].map((c, i) => (
              <div key={i} className="p-8 bg-page border border-border rounded-lg flex flex-col gap-[12px]">
                <span className="font-mono text-[11px] uppercase tracking-mono text-brand">{c.tag}</span>
                <h3 className="m-0 font-display text-2xl font-extrabold tracking-display text-strong">{c.h}</h3>
                <p className="m-[0_0_var(--space-4)] text-base leading-normal text-body flex-1">{c.p}</p>
                <div><Button variant={c.v} uppercase iconRight={<span>→</span>} onClick={c.act}>{c.cta}</Button></div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PRUEBA SOCIAL — Google [PENDIENTE: reseñas reales] */}
      <section className="py-section">
        <Container style={{ maxWidth: "1040px" }}>
          <div className="flex items-center gap-[12px] mb-8">
            <Stars n={5} />
            <span className="text-sm text-subtle">{D.reviews.rating != null ? D.reviews.rating + " · " : ""}Opiniones verificadas en Google</span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {D.reviews.items.map((r, i) => (
              <figure key={i} className="m-0 bg-surface border border-border rounded-lg p-6 shadow-sm">
                <Stars n={r.stars} />
                <blockquote className="m-[12px_0_14px] text-base leading-normal text-body">{r.quote}</blockquote>
                <figcaption className="text-sm font-semibold text-strong">{r.author}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* ARTÍCULOS RELACIONADOS — retención on-site */}
      {otherPosts.length > 0 && (
        <section className="bg-surface border-t border-t-border py-section">
          <Container style={{ maxWidth: "1040px" }}>
            <h2 className="m-[0_0_var(--space-8)] font-display text-2xl font-extrabold tracking-display text-strong">Sigue leyendo<span className="text-brand">.</span></h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
              {otherPosts.map((p) => (
                <article key={p.id} onClick={() => onNav("post", p.id)} className="cursor-pointer bg-page border border-border rounded-lg overflow-hidden shadow-sm">
                  <div className="aspect-[16/10] overflow-hidden"><img src={p.img} alt={p.title} className="w-full h-full object-cover" /></div>
                  <div className="p-6">
                    <span className="font-mono text-[11px] uppercase tracking-mono text-brand">{p.cat}</span>
                    <h3 className="m-[10px_0_0] font-display text-lg font-bold leading-snug tracking-heading text-strong">{p.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA STICKY MÓVIL */}
      <div className="blog-mobilecta fixed bottom-0 left-0 right-0 z-[80] bg-surface border-t border-t-border shadow-[0_-6px_20px_rgba(0,0,0,0.1)] px-container py-[12px] items-center gap-[12px]">
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-mono uppercase tracking-mono text-brand">Curso recomendado</div>
          <div className="text-sm font-bold text-strong whitespace-nowrap overflow-hidden text-ellipsis">{typeof primary.price === "number" ? fmtEUR(primary.price) + " / alumno" : primary.norm}</div>
        </div>
        <Button variant="primary" uppercase onClick={() => onNav("course", primary.id)}>Ver curso</Button>
      </div>
    </div>
  );
}

export { BlogList, BlogPost };
