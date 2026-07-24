// Catálogo — cabecera + filtro de categorías + grid de formaciones
const { ProductCard, Button } = window.GEPCOFormaciNDesignSystem_bb6094;
const D = window.GEPCO_DATA;
const Container = window.Container;

function CatalogScreen({ filter, onNav }) {
  const [active, setActive] = React.useState(filter || "all");
  React.useEffect(() => { setActive(filter || "all"); }, [filter]);
  const cats = [{ slug: "all", name: "Todas" }, ...D.categories];
  const list = active === "all" ? D.courses : D.courses.filter((c) => c.cat === active);
  const catName = (slug) => (D.categories.find((c) => c.slug === slug) || {}).name || "";

  return (
    <div>
      {/* Header band */}
      <section style={{ background: "var(--color-dark)", color: "#fff", padding: "var(--section-y) 0" }}>
        <Container>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--color-brand)" }}>Catálogo · {list.length} formaciones</span>
          <h1 style={{ margin: "14px 0 0", fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem,5vw,3.6rem)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-tight)" }}>
            {active === "all" ? "Todas las formaciones" : catName(active)}<span style={{ color: "var(--color-brand)" }}>.</span>
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: "var(--text-lg)", color: "rgba(255,255,255,0.78)", maxWidth: "620px" }}>
            {active === "all" ? "Cursos certificados en emergencias, extinción de incendios, primeros auxilios y prevención de riesgos laborales." : (D.categories.find((c) => c.slug === active) || {}).blurb}
          </p>
        </Container>
      </section>

      {/* Filter chips */}
      <Container style={{ padding: "var(--space-10) var(--container-padding) 0" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {cats.map((c) => {
            const on = active === c.slug;
            return (
              <button key={c.slug} onClick={() => setActive(c.slug)} style={{
                fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)",
                padding: "10px 18px", borderRadius: "var(--radius-full)", cursor: "pointer",
                border: `1px solid ${on ? "var(--color-ink)" : "var(--border-default)"}`,
                background: on ? "var(--color-ink)" : "var(--surface-card)",
                color: on ? "#fff" : "var(--text-body)", transition: "all var(--duration-base) var(--ease-standard)",
              }}>{c.name}</button>
            );
          })}
        </div>
      </Container>

      {/* Grid */}
      <Container style={{ padding: "var(--space-10) var(--container-padding) 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "var(--space-6)" }}>
          {list.map((c) => (
            <ProductCard key={c.id} title={c.title} image={c.img} code={c.code} norm={c.norm} recommended={c.recommended} cover
              bullets={c.bullets} ctaLabel="Ver curso" onClick={(e) => { e.preventDefault(); onNav("course", c.id); }} />
          ))}
        </div>
      </Container>
    </div>
  );
}
window.CatalogScreen = CatalogScreen;
