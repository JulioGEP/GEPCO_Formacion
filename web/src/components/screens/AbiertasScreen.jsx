import React from 'react';
import { onNav, getParam } from '../../lib/router.js';
// Formaciones en abierto — convocatorias de 1 día abiertas a autónomos y empresas con pocos empleados.
// Página distinta del catálogo: formato agenda + acento naranja, foco en fecha/plaza individual.
import { Button, Badge, NormBadge, Select } from '../ds/index.js';
import { DATA as D } from '../../lib/data.js';
import { Container } from '../common/Container.jsx';
import { cx } from '../../lib/cx.js';
const fmtEUR2 = (n) => {
  const [int, dec] = Number(n).toFixed(2).split(".");
  return int.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + dec + " €";
};
const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
const MESES_L = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DIAS = ["L", "M", "X", "J", "V", "S", "D"];
const pd = (fecha) => { const [d, m, y] = fecha.split("/").map(Number); return { d, m, y, ord: y * 10000 + m * 100 + d }; };

// Ficha de una convocatoria — formato "fila de agenda" con tarjeta de fecha
function IntakeRow({ intake, course, onNav, compact }) {
  const [d, m] = intake.fecha.split("/");
  const mesAny = MESES[parseInt(m, 10) - 1] + " 20" + intake.fecha.slice(-2);
  const plazasTxt = intake.plazas <= 6 ? "Últimas " + intake.plazas + " plazas" : intake.plazas + " plazas disponibles";
  const plazasColor = intake.plazas <= 6 ? "var(--color-brand)" : "var(--text-subtle)";
  const priceEl = typeof intake.price === "number" ? (
    <div>
      <div className="font-display text-2xl font-extrabold text-strong leading-none">{fmtEUR2(intake.price)}</div>
      <div className="text-xs text-subtle">por persona</div>
    </div>
  ) : (
    <div className="text-sm text-subtle font-semibold">Consultar precio</div>
  );
  const sedeEl = (
    <span className="inline-flex items-center gap-[6px] text-sm text-body">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>{intake.sede}
    </span>
  );

  if (compact) {
    return (
      <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center gap-[12px] py-4 px-5 bg-accent text-white">
          <span className="font-display text-[2rem] font-extrabold leading-none">{d}</span>
          <span className="font-mono text-[12px] tracking-mono">{mesAny}</span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-[8px] mb-[8px] flex-wrap">
            <NormBadge>{course.norm}</NormBadge>{sedeEl}
          </div>
          <h3 className="mb-[8px] font-display text-lg font-bold tracking-heading leading-snug text-strong">{course.title}</h3>
          <div className="mb-5 text-sm font-semibold" style={{ color: plazasColor }}>{plazasTxt}</div>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {priceEl}
            <Button variant="primary" iconRight={<span>→</span>} onClick={() => onNav("course", course.id)}>Reserva tu plaza</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-stretch gap-0 bg-surface border border-border rounded-lg overflow-hidden shadow-sm">
      {/* Tarjeta de fecha (acento naranja) */}
      <div className="flex-[0_0_auto] w-[104px] bg-accent text-white flex flex-col items-center justify-center p-4">
        <span className="font-display text-[2.6rem] font-extrabold leading-none">{d}</span>
        <span className="font-mono text-[13px] tracking-mono mt-[4px]">{mesAny}</span>
      </div>
      {/* Detalle */}
      <div className="flex-1 min-w-0 flex items-center justify-between gap-6 flex-wrap py-5 px-6">
        <div className="min-w-0 flex-[1_1_220px]">
          <div className="flex items-center gap-[8px] mb-[8px] flex-wrap">
            <NormBadge>{course.norm}</NormBadge>{sedeEl}
          </div>
          <h3 className="m-0 font-display text-lg font-bold tracking-heading leading-snug text-strong">{course.title}</h3>
          <div className="mt-[8px] text-sm font-semibold" style={{ color: plazasColor }}>{plazasTxt}</div>
        </div>
        <div className="flex items-center gap-6 flex-[0_0_auto]">
          <div className="text-right">{priceEl}</div>
          <Button variant="primary" iconRight={<span>→</span>} onClick={() => onNav("course", course.id)}>Reserva tu plaza</Button>
        </div>
      </div>
    </div>
  );
}

function CalendarView({ intakes, courseOf, onNav }) {
  const months = intakes.map((i) => { const p = pd(i.fecha); return p.y * 12 + (p.m - 1); });
  const minM = months.length ? Math.min(...months) : new Date().getFullYear() * 12;
  const maxM = months.length ? Math.max(...months) : minM;
  const [cur, setCur] = React.useState(minM);
  const [sel, setSel] = React.useState(null);
  React.useEffect(() => { setCur((c) => Math.max(minM, Math.min(maxM, c))); setSel(null); }, [minM, maxM]);
  const y = Math.floor(cur / 12), m = (cur % 12) + 1;
  const byDay = {};
  intakes.forEach((it) => { const p = pd(it.fecha); if (p.y === y && p.m === m) (byDay[p.d] = byDay[p.d] || []).push(it); });
  const daysInMonth = new Date(y, m, 0).getDate();
  const offset = (new Date(y, m - 1, 1).getDay() + 6) % 7; // lunes primero
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const selList = sel && byDay[sel] ? byDay[sel] : [];
  const NavBtn = ({ dir, disabled }) => (
    <button type="button" aria-label={dir < 0 ? "Mes anterior" : "Mes siguiente"} disabled={disabled}
      onClick={() => { setCur((c) => c + dir); setSel(null); }}
      className={cx('w-[40px] h-[40px] rounded-full border border-border bg-surface text-[20px] leading-none text-strong', disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer opacity-100')}>{dir < 0 ? "‹" : "›"}</button>
  );
  return (
    <div className="ab-cal grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-8 items-start">
      <div className="bg-surface border border-border rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <NavBtn dir={-1} disabled={cur <= minM} />
          <div className="font-display text-xl font-extrabold text-strong">{MESES_L[m - 1]} {y}</div>
          <NavBtn dir={1} disabled={cur >= maxM} />
        </div>
        <div className="grid grid-cols-[repeat(7,1fr)] gap-[6px]">
          {DIAS.map((d, i) => <div key={"h" + i} className="text-center font-mono text-[11px] text-subtle py-[4px]">{d}</div>)}
          {cells.map((d, i) => {
            if (d === null) return <div key={"e" + i} />;
            const has = !!byDay[d];
            const on = sel === d;
            return (
              <button key={"d" + i} type="button" disabled={!has} onClick={() => setSel(d)}
                className="aspect-square rounded-md flex flex-col items-center justify-center gap-[3px] font-display text-base"
                style={{ cursor: has ? "pointer" : "default",
                  border: on ? "2px solid var(--color-accent)" : "1px solid " + (has ? "var(--color-accent)" : "transparent"),
                  background: has ? (on ? "var(--color-accent)" : "rgba(243,146,0,0.1)") : "transparent",
                  color: has ? (on ? "#fff" : "var(--text-strong)") : "var(--text-subtle)",
                  fontWeight: has ? "var(--weight-bold)" : "var(--weight-regular)" }}>
                {d}
                {has && <span className="w-[5px] h-[5px] rounded-full" style={{ background: on ? "#fff" : "var(--color-accent)" }} />}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        {selList.length ? (
          <div className="flex flex-col gap-4">
            {selList.map((it, i) => <IntakeRow key={i} intake={it} course={courseOf(it.courseId)} onNav={onNav} compact />)}
          </div>
        ) : (
          <div className="py-10 px-8 bg-surface border border-dashed border-border-strong rounded-lg text-center text-subtle">
            <div className="font-display text-lg font-bold text-strong mb-[6px]">Selecciona un día</div>
            <p className="m-0 text-sm leading-normal">Los días marcados en naranja tienen convocatorias abiertas. Púlsalos para ver el detalle.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AbiertasScreen() {
  const [sede, setSede] = React.useState("all");
  const [view, setView] = React.useState("list");
  const [courseSel, setCourseSel] = React.useState("Todas las formaciones");
  const courseOf = (id) => D.courses.find((c) => c.id === id) || {};
  const uniqCourses = Array.from(new Set(D.openIntakes.map((i) => i.courseId))).map(courseOf);
  const courseOptions = ["Todas las formaciones", ...uniqCourses.map((c) => c.title)];
  const intakes = D.openIntakes
    .filter((i) => sede === "all" || i.sede === sede)
    .filter((i) => courseSel === "Todas las formaciones" || courseOf(i.courseId).title === courseSel)
    .slice().sort((a, b) => pd(a.fecha).ord - pd(b.fecha).ord);
  const sedes = ["all", ...Array.from(new Set(D.openIntakes.map((i) => i.sede)))];
  const facts = [
    { t: "Fecha fija de 1 día", d: "Cada convocatoria se celebra en una fecha concreta. Eliges el día que te encaja." },
    { t: "Reserva por persona", d: "Pensadas para autónomos y empresas que forman a 1 o pocos empleados." },
    { t: "Certificación oficial", d: "Mismo rigor y acreditación que nuestras formaciones a medida." },
  ];

  return (
    <div>
      {/* HERO — acento naranja para diferenciar del catálogo */}
      <section className="relative bg-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(120%_140%_at_100%_0%,rgba(243,146,0,0.28)_0%,rgba(243,146,0,0)_55%)]" />
        <Container className="relative py-section">
          <span className="font-mono text-sm uppercase tracking-eyebrow text-accent">Convocatorias abiertas</span>
          <h1 className="mt-[14px] font-display text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold tracking-display leading-tight">
            Formaciones en abierto<span className="text-accent">.</span>
          </h1>
          <p className="mt-[16px] text-lg text-white/[0.82] max-w-[640px]">
            Sesiones de un día con fecha fija a las que puedes apuntarte de forma individual, sin necesidad de montar un grupo completo.
          </p>
        </Container>
      </section>

      {/* EXPLICACIÓN — qué es una formación en abierto */}
      <section className="bg-surface border-b border-b-border py-section">
        <Container>
          <div className="ab-explain grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-16 items-start">
            <div>
              <h2 className="mb-5 font-display text-3xl font-extrabold tracking-display text-strong">¿Qué es una formación en abierto?</h2>
              <p className="mb-4 text-lg leading-loose text-body">
                Una formación en abierto es una sesión que se celebra un día concreto y ese día está <strong className="text-strong">«abierto»</strong> a autónomos y a empresas que quieren formarse o formar a muy pocos empleados.
              </p>
              <p className="m-0 text-base leading-loose text-body">
                No todas nuestras formaciones se imparten en abierto: solo algunas convocatorias concretas. Si necesitas formar a un equipo o buscas un curso que no está aquí, lo diseñamos a medida para tu empresa.
              </p>
              <div className="flex gap-[12px] flex-wrap mt-8">
                <Button variant="dark" onClick={() => onNav("contact")}>Solicita formación a medida</Button>
                <Button variant="outline" onClick={() => onNav("catalog")}>Ver todo el catálogo</Button>
              </div>
            </div>
            <div className="grid gap-4">
              {facts.map((f, i) => (
                <div key={i} className="flex gap-4 py-5 px-6 bg-page border border-border rounded-lg">
                  <span className="flex-[0_0_auto] w-[34px] h-[34px] rounded-full bg-accent text-white flex items-center justify-center font-display font-bold text-base">{i + 1}</span>
                  <div>
                    <div className="font-display text-base font-bold text-strong mb-[3px]">{f.t}</div>
                    <div className="text-sm leading-normal text-body">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* AGENDA de convocatorias */}
      <Container className="py-section">
        <div className="flex items-baseline justify-between gap-6 flex-wrap mb-6">
          <h2 className="m-0 font-display text-3xl font-extrabold tracking-display text-strong">Próximas convocatorias<span className="text-accent">.</span></h2>
          <div className="inline-flex bg-surface-muted border border-border rounded-full p-[4px]">
            {[["list", "Lista"], ["calendar", "Calendario"]].map(([v, l]) => (
              <button key={v} onClick={() => setView(v)} className={cx(
                'py-[8px] px-[20px] rounded-full border-none cursor-pointer font-body text-sm font-semibold transition-all duration-base ease-standard',
                view === v ? 'bg-ink text-white' : 'bg-transparent text-body',
              )}>{l}</button>
            ))}
          </div>
        </div>
        <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
          <div className="min-w-[240px] flex-[0_1_360px]">
            <Select label="Formación" value={courseSel} onChange={(e) => setCourseSel(e.target.value)} options={courseOptions} />
          </div>
          <div className="flex gap-[8px] flex-wrap">
            {sedes.map((s) => {
              const on = sede === s;
              return (
                <button key={s} onClick={() => setSede(s)} className={cx(
                  'font-body text-sm font-semibold py-[8px] px-[16px] rounded-full cursor-pointer border transition-all duration-base ease-standard',
                  on ? 'border-ink bg-ink text-white' : 'border-border bg-surface text-body',
                )}>{s === "all" ? "Todas las sedes" : s}</button>
              );
            })}
          </div>
        </div>
        {intakes.length === 0 ? (
          <div className="p-10 text-center text-subtle bg-surface border border-dashed border-border-strong rounded-lg">No hay convocatorias que coincidan con el filtro.</div>
        ) : view === "list" ? (
          <div className="flex flex-col gap-4">
            {intakes.map((it, i) => <IntakeRow key={i} intake={it} course={courseOf(it.courseId)} onNav={onNav} />)}
          </div>
        ) : (
          <CalendarView intakes={intakes} courseOf={courseOf} onNav={onNav} />
        )}
        <p className="mt-8 text-sm text-subtle">Fechas y plazas orientativas. [PENDIENTE: gestión de convocatorias y disponibilidad desde el backend.]</p>
      </Container>

      {/* CTA empresa */}
      <section className="bg-dark text-white py-section">
        <Container>
          <div className="flex items-center justify-between gap-8 flex-wrap">
            <div className="max-w-[620px]">
              <h2 className="mb-[10px] font-display text-2xl font-extrabold tracking-display">¿No encuentras tu fecha o formas a un equipo?</h2>
              <p className="m-0 text-lg text-white/80">Organizamos la formación in company en tus instalaciones, con fechas a tu medida y bonificable FUNDAE.</p>
            </div>
            <Button variant="primary" size="lg" uppercase iconRight={<span>→</span>} onClick={() => onNav("contact")}>Solicita una propuesta</Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
export default AbiertasScreen;
