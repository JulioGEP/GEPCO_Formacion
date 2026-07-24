// Formaciones en abierto — convocatorias de 1 día abiertas a autónomos y empresas con pocos empleados.
// Página distinta del catálogo: formato agenda + acento naranja, foco en fecha/plaza individual.
const { Button, Badge, NormBadge, Select } = window.GEPCOFormaciNDesignSystem_bb6094;
const D = window.GEPCO_DATA;
const Container = window.Container;
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
      <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-extrabold)", color: "var(--text-strong)", lineHeight: 1 }}>{fmtEUR2(intake.price)}</div>
      <div style={{ fontSize: "var(--text-xs)", color: "var(--text-subtle)" }}>por persona</div>
    </div>
  ) : (
    <div style={{ fontSize: "var(--text-sm)", color: "var(--text-subtle)", fontWeight: "var(--weight-semibold)" }}>Consultar precio</div>
  );
  const sedeEl = (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "var(--text-sm)", color: "var(--text-body)" }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>{intake.sede}
    </span>
  );

  if (compact) {
    return (
      <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "var(--space-4) var(--space-5)", background: "var(--color-accent)", color: "#fff" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: "var(--weight-extrabold)", lineHeight: 1 }}>{d}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "var(--tracking-mono)" }}>{mesAny}</span>
        </div>
        <div style={{ padding: "var(--space-5)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
            <NormBadge>{course.norm}</NormBadge>{sedeEl}
          </div>
          <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-heading)", lineHeight: "var(--leading-snug)", color: "var(--text-strong)" }}>{course.title}</h3>
          <div style={{ marginBottom: "var(--space-5)", fontSize: "var(--text-sm)", color: plazasColor, fontWeight: "var(--weight-semibold)" }}>{plazasTxt}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap" }}>
            {priceEl}
            <Button variant="primary" iconRight={<span>→</span>} onClick={() => onNav("course", course.id)}>Reserva tu plaza</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "stretch", gap: "0", background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
      {/* Tarjeta de fecha (acento naranja) */}
      <div style={{ flex: "0 0 auto", width: "104px", background: "var(--color-accent)", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "var(--space-4)" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "2.6rem", fontWeight: "var(--weight-extrabold)", lineHeight: 1 }}>{d}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "var(--tracking-mono)", marginTop: "4px" }}>{mesAny}</span>
      </div>
      {/* Detalle */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-6)", flexWrap: "wrap", padding: "var(--space-5) var(--space-6)" }}>
        <div style={{ minWidth: 0, flex: "1 1 220px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
            <NormBadge>{course.norm}</NormBadge>{sedeEl}
          </div>
          <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-heading)", lineHeight: "var(--leading-snug)", color: "var(--text-strong)" }}>{course.title}</h3>
          <div style={{ marginTop: "8px", fontSize: "var(--text-sm)", color: plazasColor, fontWeight: "var(--weight-semibold)" }}>{plazasTxt}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-6)", flex: "0 0 auto" }}>
          <div style={{ textAlign: "right" }}>{priceEl}</div>
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
      style={{ width: "40px", height: "40px", borderRadius: "var(--radius-full)", border: "1px solid var(--border-default)", background: "var(--surface-card)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, fontSize: "20px", lineHeight: 1, color: "var(--text-strong)" }}>{dir < 0 ? "‹" : "›"}</button>
  );
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(0,0.85fr)", gap: "var(--space-8)", alignItems: "start" }} className="ab-cal">
      <div style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)", boxShadow: "var(--shadow-sm)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "var(--space-5)" }}>
          <NavBtn dir={-1} disabled={cur <= minM} />
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: "var(--weight-extrabold)", color: "var(--text-strong)" }}>{MESES_L[m - 1]} {y}</div>
          <NavBtn dir={1} disabled={cur >= maxM} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
          {DIAS.map((d, i) => <div key={"h" + i} style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-subtle)", padding: "4px 0" }}>{d}</div>)}
          {cells.map((d, i) => {
            if (d === null) return <div key={"e" + i} />;
            const has = !!byDay[d];
            const on = sel === d;
            return (
              <button key={"d" + i} type="button" disabled={!has} onClick={() => setSel(d)}
                style={{ aspectRatio: "1 / 1", borderRadius: "var(--radius-md)", cursor: has ? "pointer" : "default",
                  border: on ? "2px solid var(--color-accent)" : "1px solid " + (has ? "var(--color-accent)" : "transparent"),
                  background: has ? (on ? "var(--color-accent)" : "rgba(243,146,0,0.1)") : "transparent",
                  color: has ? (on ? "#fff" : "var(--text-strong)") : "var(--text-subtle)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3px",
                  fontFamily: "var(--font-display)", fontWeight: has ? "var(--weight-bold)" : "var(--weight-regular)", fontSize: "var(--text-base)" }}>
                {d}
                {has && <span style={{ width: "5px", height: "5px", borderRadius: "var(--radius-full)", background: on ? "#fff" : "var(--color-accent)" }} />}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        {selList.length ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {selList.map((it, i) => <IntakeRow key={i} intake={it} course={courseOf(it.courseId)} onNav={onNav} compact />)}
          </div>
        ) : (
          <div style={{ padding: "var(--space-10) var(--space-8)", background: "var(--surface-card)", border: "1px dashed var(--border-hover)", borderRadius: "var(--radius-lg)", textAlign: "center", color: "var(--text-subtle)" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", marginBottom: "6px" }}>Selecciona un día</div>
            <p style={{ margin: 0, fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)" }}>Los días marcados en naranja tienen convocatorias abiertas. Púlsalos para ver el detalle.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AbiertasScreen({ onNav }) {
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
      <section style={{ position: "relative", background: "var(--color-dark)", color: "#fff", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 140% at 100% 0%, rgba(243,146,0,0.28) 0%, rgba(243,146,0,0) 55%)" }} />
        <Container style={{ position: "relative", padding: "var(--section-y) var(--container-padding)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--color-accent)" }}>Convocatorias abiertas</span>
          <h1 style={{ margin: "14px 0 0", fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem,5vw,3.6rem)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-tight)" }}>
            Formaciones en abierto<span style={{ color: "var(--color-accent)" }}>.</span>
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.82)", maxWidth: "640px" }}>
            Sesiones de un día con fecha fija a las que puedes apuntarte de forma individual, sin necesidad de montar un grupo completo.
          </p>
        </Container>
      </section>

      {/* EXPLICACIÓN — qué es una formación en abierto */}
      <section style={{ background: "var(--surface-card)", borderBottom: "1px solid var(--border-default)", padding: "var(--section-y) 0" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "var(--space-16)", alignItems: "start" }} className="ab-explain">
            <div>
              <h2 style={{ margin: "0 0 var(--space-5)", fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)" }}>¿Qué es una formación en abierto?</h2>
              <p style={{ margin: "0 0 var(--space-4)", fontSize: "var(--text-lg)", lineHeight: "var(--leading-loose)", color: "var(--text-body)" }}>
                Una formación en abierto es una sesión que se celebra un día concreto y ese día está <strong style={{ color: "var(--text-strong)" }}>«abierto»</strong> a autónomos y a empresas que quieren formarse o formar a muy pocos empleados.
              </p>
              <p style={{ margin: 0, fontSize: "var(--text-base)", lineHeight: "var(--leading-loose)", color: "var(--text-body)" }}>
                No todas nuestras formaciones se imparten en abierto: solo algunas convocatorias concretas. Si necesitas formar a un equipo o buscas un curso que no está aquí, lo diseñamos a medida para tu empresa.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "var(--space-8)" }}>
                <Button variant="dark" onClick={() => onNav("contact")}>Solicita formación a medida</Button>
                <Button variant="outline" onClick={() => onNav("catalog")}>Ver todo el catálogo</Button>
              </div>
            </div>
            <div style={{ display: "grid", gap: "var(--space-4)" }}>
              {facts.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: "var(--space-4)", padding: "var(--space-5) var(--space-6)", background: "var(--surface-page)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)" }}>
                  <span style={{ flex: "0 0 auto", width: "34px", height: "34px", borderRadius: "var(--radius-full)", background: "var(--color-accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: "var(--weight-bold)", fontSize: "var(--text-base)" }}>{i + 1}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-base)", fontWeight: "var(--weight-bold)", color: "var(--text-strong)", marginBottom: "3px" }}>{f.t}</div>
                    <div style={{ fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* AGENDA de convocatorias */}
      <Container style={{ padding: "var(--section-y) var(--container-padding)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-6)", flexWrap: "wrap", marginBottom: "var(--space-6)" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)" }}>Próximas convocatorias<span style={{ color: "var(--color-accent)" }}>.</span></h2>
          <div style={{ display: "inline-flex", background: "var(--surface-sunken)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-full)", padding: "4px" }}>
            {[["list", "Lista"], ["calendar", "Calendario"]].map(([v, l]) => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "8px 20px", borderRadius: "var(--radius-full)", border: "none", cursor: "pointer",
                fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)",
                background: view === v ? "var(--color-ink)" : "transparent", color: view === v ? "#fff" : "var(--text-body)",
                transition: "all var(--duration-base) var(--ease-standard)",
              }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-6)", flexWrap: "wrap", marginBottom: "var(--space-8)" }}>
          <div style={{ minWidth: "240px", flex: "0 1 360px" }}>
            <Select label="Formación" value={courseSel} onChange={(e) => setCourseSel(e.target.value)} options={courseOptions} />
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {sedes.map((s) => {
              const on = sede === s;
              return (
                <button key={s} onClick={() => setSede(s)} style={{
                  fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)",
                  padding: "8px 16px", borderRadius: "var(--radius-full)", cursor: "pointer",
                  border: `1px solid ${on ? "var(--color-ink)" : "var(--border-default)"}`,
                  background: on ? "var(--color-ink)" : "var(--surface-card)",
                  color: on ? "#fff" : "var(--text-body)", transition: "all var(--duration-base) var(--ease-standard)",
                }}>{s === "all" ? "Todas las sedes" : s}</button>
              );
            })}
          </div>
        </div>
        {intakes.length === 0 ? (
          <div style={{ padding: "var(--space-10)", textAlign: "center", color: "var(--text-subtle)", background: "var(--surface-card)", border: "1px dashed var(--border-hover)", borderRadius: "var(--radius-lg)" }}>No hay convocatorias que coincidan con el filtro.</div>
        ) : view === "list" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {intakes.map((it, i) => <IntakeRow key={i} intake={it} course={courseOf(it.courseId)} onNav={onNav} />)}
          </div>
        ) : (
          <CalendarView intakes={intakes} courseOf={courseOf} onNav={onNav} />
        )}
        <p style={{ margin: "var(--space-8) 0 0", fontSize: "var(--text-sm)", color: "var(--text-subtle)" }}>Fechas y plazas orientativas. [PENDIENTE: gestión de convocatorias y disponibilidad desde el backend.]</p>
      </Container>

      {/* CTA empresa */}
      <section style={{ background: "var(--color-dark)", color: "#fff", padding: "var(--section-y) 0" }}>
        <Container>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-8)", flexWrap: "wrap" }}>
            <div style={{ maxWidth: "620px" }}>
              <h2 style={{ margin: "0 0 10px", fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)" }}>¿No encuentras tu fecha o formas a un equipo?</h2>
              <p style={{ margin: 0, fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.8)" }}>Organizamos la formación in company en tus instalaciones, con fechas a tu medida y bonificable FUNDAE.</p>
            </div>
            <Button variant="primary" size="lg" uppercase iconRight={<span>→</span>} onClick={() => onNav("contact")}>Solicita una propuesta</Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
window.AbiertasScreen = AbiertasScreen;
