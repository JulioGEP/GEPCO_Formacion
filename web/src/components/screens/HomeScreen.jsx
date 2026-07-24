import React from 'react';
import { onNav, getParam } from '../../lib/router.js';
// GEPCO Formación — Home reestructurada según briefing SEO/UX:
// distribuidora de las 8 áreas, doble recorrido empresa / particular, diferenciales reales y prueba social nativa.
import { Button, IconButton, Badge, NormBadge, ProductCard, CategoryCard, SectionHeading, StatBlock, Input, Select, Checkbox } from '../ds/index.js';
import { DATA as D } from '../../lib/data.js';
import { Container } from '../common/Container.jsx';
import { HScroll } from '../common/HScroll.jsx';
import { cx } from '../../lib/cx.js';

function FundaeChip({ onDark }) {
  return (
    <span className={cx("inline-flex items-center gap-2 whitespace-nowrap py-1.5 px-3 rounded-full text-xs font-semibold tracking-[0.02em] border", onDark ? "bg-white/[0.12] text-white border-white/[0.2]" : "bg-brand-soft text-brand border-transparent")}>
      <span aria-hidden="true" className="font-mono font-bold">FUNDAE</span>
      Formación bonificable para empresas
    </span>
  );
}

function InCompanyChip() {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap py-1.5 pr-3 pl-2.5 rounded-full text-xs font-semibold tracking-[0.02em] text-white border border-[rgba(243,146,0,0.55)] bg-[rgba(243,146,0,0.14)]">
      <span aria-hidden="true" className="inline-flex text-accent">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
      </span>
      <span className="font-mono font-bold text-accent">IN COMPANY</span>
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
    <div className="bg-surface rounded-xl shadow-lg overflow-hidden">
      <div className="relative aspect-[16/9]">
        <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute top-3.5 left-3.5 flex gap-2">
          <Badge tone="brand">Convocatoria abierta</Badge>
          <NormBadge onDark>{course.norm}</NormBadge>
        </div>
      </div>
      <div className="p-6">
        <span className="block mb-2 font-mono text-[11px] uppercase tracking-eyebrow text-brand">Para particulares y autónomos</span>
        <h3 className="mt-0 mx-0 mb-3.5 font-display text-lg font-bold leading-snug tracking-heading text-strong">{course.title}</h3>
        <dl className="mt-0 mx-0 mb-[18px] flex flex-col gap-2">
          {facts.map((f) => (
            <div key={f.k} className="flex justify-between gap-3 text-sm pb-2 border-b border-border">
              <dt className="text-subtle">{f.k}</dt>
              <dd className="m-0 text-strong font-semibold text-right">{f.v}</dd>
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
    <section className="relative bg-dark text-white overflow-hidden">
      <img src={D.hero} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.42]" />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,_rgba(16,18,22,0.96)_0%,_rgba(16,18,22,0.74)_52%,_rgba(16,18,22,0.42)_100%)]" />
      <Container className="relative py-section">
        <div className="grid grid-cols-[1.3fr_0.85fr] gap-16 items-center">
          <div>
            <div className="flex gap-2.5 flex-wrap mb-[26px]">
              <Badge tone="brand" dot>Simulacros con fuego real</Badge>
              <Badge tone="onDark">Centro homologado ISPC</Badge>
            </div>
            <h1 className="mt-0 mx-0 mb-[22px] font-display text-[clamp(2.5rem,5.4vw,4.25rem)] font-extrabold leading-tight tracking-display">
              Formación en emergencias y <span className="text-brand">PRL</span> con simulacros reales.
            </h1>
            <p className="mt-0 mx-0 mb-[30px] text-xl leading-normal text-white/[0.85] max-w-[540px]">
              Formación práctica con fuego real, casa de humo y aforo máximo de 15 alumnos. Preparamos a empresas y profesionales en las 8 áreas de la seguridad y las emergencias.
            </p>
            <div className="flex gap-3 flex-nowrap items-stretch mb-5">
              <Button variant="primary" size="lg" iconRight={<span>→</span>} onClick={() => onNav("contact")}>Solicita propuesta para tu empresa</Button>
              <Button variant="onDark" size="lg" onClick={() => onNav("abiertas")}>Ver convocatorias abiertas</Button>
            </div>
            <div className="flex gap-2.5 flex-nowrap">
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
    <section className="bg-surface border-b border-border py-section">
      <Container>
        <SectionHeading eyebrow="Por qué somos distintos" title="Formación práctica que marca la diferencia" />
        <div className="mt-10 grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-6">
          {D.diff.map((d, i) => (
            <div key={i} className="bg-surface-muted border border-border rounded-lg p-8">
              <div className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold tracking-display text-brand leading-[1.05] mb-3">{d.v}</div>
              <div className="text-base text-body leading-snug">{d.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-8 border-t border-border">
          <p className="mt-0 mx-0 mb-6 font-mono text-xs uppercase tracking-eyebrow text-subtle text-center">Certificaciones y acreditaciones oficiales</p>
          <img src="/assets/logos-nos-acreditan-gepcoformacion.png" alt="Acreditaciones: Generalitat de Catalunya, Institut de Seguretat Pública de Catalunya, Policía Nacional, IRATA, SEMICYUC, ISO 9001, DGT, Irudek y Gobierno de España (Ministerio de Educación y Formación Profesional)" className="block w-full max-w-[760px] h-auto mx-auto my-0" />
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
      className={cx("relative block rounded-lg overflow-hidden no-underline min-h-[300px] transition-[transform,box-shadow] duration-base ease-standard", h ? "shadow-md -translate-y-1" : "shadow-sm translate-y-0")}>
      <img src={area.img} alt={area.name} className={cx("absolute inset-0 w-full h-full object-cover transition-transform duration-[var(--duration-slow)] ease-standard", h ? "scale-105" : "scale-100")} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(16,18,22,0.15)_0%,_rgba(16,18,22,0.85)_100%)]" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <h3 className="mt-0 mx-0 mb-1 font-display text-xl font-bold tracking-heading leading-snug">{area.name}</h3>
        {area.note && <span className="text-xs text-white/[0.75] leading-snug">{area.note}</span>}
        <span className="mt-2.5 inline-flex items-center gap-2 text-sm font-bold text-white">
          Ver formaciones <span aria-hidden="true" className={cx("text-brand transition-transform duration-fast ease-standard", h ? "translate-x-1" : "translate-x-0")}>→</span>
        </span>
      </div>
    </a>
  );
}

function Areas({ onNav }) {
  return (
    <section className="bg-page py-section">
      <Container>
        <SectionHeading eyebrow="Explora por área" title="Nuestras áreas de formación"
          actions={<Button variant="outline" onClick={() => onNav("catalog")}>Ver todo el catálogo</Button>} />
        <div className="mt-10">
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
    <section className="bg-page pb-section">
      <Container>
        <div className="rounded-xl overflow-hidden grid grid-cols-[1fr_1fr] shadow-lg">
          <div className="relative bg-dark text-white p-12 min-h-[560px] flex flex-col justify-center overflow-hidden">
            <img src={D.heroQuote} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.32]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(16,18,22,0.72),_rgba(16,18,22,0.94))]" />
            <div className="relative">
              <span className="block mb-4 text-sm font-bold tracking-eyebrow uppercase text-brand">Formamos a tu equipo</span>
              <h2 className="mt-0 mx-0 mb-[22px] font-display text-[clamp(1.9rem,3.2vw,2.75rem)] font-extrabold leading-tight tracking-display">Diseñamos el plan a medida de tu empresa.</h2>
              <ul className="mt-0 mx-0 mb-7 p-0 list-none flex flex-col gap-3.5">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-lg leading-snug text-on-dark-muted">
                    <span aria-hidden="true" className="text-brand font-bold">→</span>{b}
                  </li>
                ))}
              </ul>
              <FundaeChip onDark />
              <p className="mt-3.5 mx-0 mb-0 text-sm text-white/[0.6] max-w-[420px] leading-normal">Te informamos de cómo bonificar la formación a través de FUNDAE. La gestión del trámite la realiza tu empresa.</p>
            </div>
          </div>
          <div className="bg-dark-soft text-white p-12">
            <h3 className="mt-0 mx-0 mb-2 font-display text-2xl font-bold tracking-heading">Cuéntanos qué necesitas.</h3>
            <p className="mt-0 mx-0 mb-[22px] text-sm text-on-dark-muted">Respondemos en menos de 24 h con una propuesta a medida.</p>
            <form onSubmit={(e) => { e.preventDefault(); if (accept) onNav("contact"); }} className="flex flex-col gap-5">
              <Input theme="dark" label="Empresa" placeholder="Razón social" />
              <div className="grid grid-cols-[1fr_1fr] gap-4">
                <Select theme="dark" label="Empleados a formar" placeholder="Elige un rango" options={["1 a 5", "6 a 20", "21 a 50", "Más de 50"]} />
                <Select theme="dark" label="Área de interés" placeholder="Elige un área" options={D.areas.map((a) => a.name)} />
              </div>
              <Input theme="dark" label="Email o teléfono de contacto" placeholder="tu@empresa.com" />
              <Checkbox theme="dark" checked={accept} onChange={(e) => setAccept(e.target.checked)} label={<span>Acepto la <a href="contacto.html" className="text-white underline">Política de Privacidad</a>.</span>} />
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
    <section className="bg-surface-muted py-section">
      <Container>
        <SectionHeading title="Empresas que confían en nosotros" />
        <div className="mt-10 grid grid-cols-[repeat(auto-fit,_minmax(280px,_1fr))] gap-6">
          {D.testimonios.map((t, i) => (
            <figure key={i} className="m-0 bg-surface border border-border rounded-lg p-8 flex flex-col gap-6">
              <span aria-hidden="true" className="font-display text-[48px] leading-[0.5] text-brand h-6">&ldquo;</span>
              <blockquote className="m-0 text-lg leading-normal text-strong italic">{t.quote}</blockquote>
              <figcaption className="mt-auto text-sm">
                <span className="block font-bold text-strong">{t.author}</span>
                <span className="text-subtle">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12">
          <p className="mt-0 mx-0 mb-6 font-mono text-xs uppercase tracking-eyebrow text-subtle text-center">Confían en nosotros</p>
          <div className="gepco-marquee-mask overflow-hidden">
            <div className="gepco-marquee-track">
              {D.logosClientesList.concat(D.logosClientesList).map((l, i) => (
                <div key={i} className="flex-none flex items-center justify-center w-[170px] h-[84px] mx-2 my-0 rounded-md bg-surface border border-border px-6 py-0">
                  <img src={l.src} alt={i < D.logosClientesList.length ? l.alt : ""} aria-hidden={i >= D.logosClientesList.length ? "true" : undefined} loading="lazy" className="max-w-full max-h-12 object-contain grayscale opacity-[0.75]" />
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
    <section className="bg-surface py-section">
      <Container>
        <div className="grid grid-cols-[1fr_1fr] gap-16 items-center">
          <div>
            <SectionHeading eyebrow="Por qué elegir GEPCO" title="Trayectoria, instalaciones e instructores en activo" />
            <p className="mt-6 mx-0 mb-8 text-lg leading-normal text-body">Somos una escuela de emergencias y PRL con más de 15 años formando profesionales, campos de prácticas propios e instructores en activo en los servicios de emergencia.</p>
            <div className="flex gap-12 flex-wrap mb-8">
              <StatBlock value="+15" label="Años de experiencia" />
              <StatBlock value="2" label="Sedes en España" />
              <StatBlock value="ISPC" label="Centro homologado" />
            </div>
            <Button variant="dark" iconRight={<span>→</span>} onClick={() => onNav("nosotros")}>Saber más sobre nosotros</Button>
          </div>
          <div className="grid grid-cols-[1fr_1fr] gap-4">
            {[
              { t: "Nuestras instalaciones", img: D.courses.find((c) => c.id === "campo-fuego").img, d: "Campo de fuego, casa de humo y espacios de práctica reales." },
              { t: "Nuestros instructores", img: D.courses.find((c) => c.id === "jefes-emergencia").img, d: "Profesionales en activo de emergencias y PRL." },
            ].map((c) => (
              <div key={c.t} className="bg-surface-muted border border-border rounded-lg overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden"><img src={c.img} alt={c.t} className="w-full h-full object-cover" /></div>
                <div className="p-5">
                  <h3 className="mt-0 mx-0 mb-1.5 font-display text-base font-bold text-strong">{c.t}</h3>
                  <p className="m-0 text-sm text-body leading-snug">{c.d}</p>
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
    <section className="bg-surface-muted py-section">
      <Container>
        <SectionHeading eyebrow="Recursos" title="Últimos artículos del blog"
          actions={<Button variant="outline" onClick={() => onNav("blog")}>Ver todos los artículos</Button>} />
        <div className="mt-10">
          <HScroll itemWidth="360px">
          {D.blog.map((p) => (
            <article key={p.id} onClick={() => onNav("post", p.id)} className="cursor-pointer bg-surface border border-border rounded-lg overflow-hidden shadow-sm">
              <div className="aspect-[16/10] overflow-hidden"><img src={p.img} alt={p.title} className="w-full h-full object-cover" /></div>
              <div className="p-6">
                <span className="font-mono text-[11px] uppercase tracking-mono text-brand">{p.cat}</span>
                <h3 className="mt-2.5 mx-0 mb-2.5 font-display text-lg font-bold leading-snug tracking-heading text-strong">{p.title}</h3>
                <p className="mt-0 mx-0 mb-3.5 text-sm leading-normal text-body">{p.excerpt}</p>
                <span className="text-sm font-bold text-ink">Leer artículo <span className="text-brand">→</span></span>
              </div>
            </article>
          ))}
          </HScroll>
        </div>
      </Container>
    </section>
  );
}

function HomeScreen() {
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
export default HomeScreen;
