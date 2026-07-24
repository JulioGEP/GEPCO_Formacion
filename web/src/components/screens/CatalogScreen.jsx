import React from 'react';
import { onNav, getParam } from '../../lib/router.js';
// Catálogo — cabecera + filtro de categorías + grid de formaciones
import { ProductCard, Button } from '../ds/index.js';
import { DATA as D } from '../../lib/data.js';
import { Container } from '../common/Container.jsx';
import { cx } from '../../lib/cx.js';

function CatalogScreen() {
  const filter = getParam("cat");
  const [active, setActive] = React.useState(filter || "all");
  React.useEffect(() => { setActive(filter || "all"); }, [filter]);
  const cats = [{ slug: "all", name: "Todas" }, ...D.categories];
  const list = active === "all" ? D.courses : D.courses.filter((c) => c.cat === active);
  const catName = (slug) => (D.categories.find((c) => c.slug === slug) || {}).name || "";

  return (
    <div>
      {/* Header band */}
      <section className="bg-dark text-white py-section">
        <Container>
          <span className="font-mono text-sm uppercase tracking-eyebrow text-brand">Catálogo · {list.length} formaciones</span>
          <h1 className="mt-3.5 mx-0 mb-0 font-display text-[clamp(2.4rem,5vw,3.6rem)] font-extrabold tracking-display leading-tight">
            {active === "all" ? "Todas las formaciones" : catName(active)}<span className="text-brand">.</span>
          </h1>
          <p className="mt-4 mx-0 mb-0 text-lg text-white/[0.78] max-w-[620px]">
            {active === "all" ? "Cursos certificados en emergencias, extinción de incendios, primeros auxilios y prevención de riesgos laborales." : (D.categories.find((c) => c.slug === active) || {}).blurb}
          </p>
        </Container>
      </section>

      {/* Filter chips */}
      <Container className="pt-10">
        <div className="flex gap-2.5 flex-wrap">
          {cats.map((c) => {
            const on = active === c.slug;
            return (
              <button key={c.slug} onClick={() => setActive(c.slug)} className={cx(
                "font-body text-sm font-semibold py-2.5 px-[18px] rounded-full cursor-pointer border transition-all duration-base ease-standard",
                on ? "border-ink bg-ink text-white" : "border-border bg-surface text-body"
              )}>{c.name}</button>
            );
          })}
        </div>
      </Container>

      {/* Grid */}
      <Container className="pt-10">
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(260px,_1fr))] gap-6">
          {list.map((c) => (
            <ProductCard key={c.id} title={c.title} image={c.img} code={c.code} norm={c.norm} recommended={c.recommended} cover
              bullets={c.bullets} ctaLabel="Ver curso" onClick={(e) => { e.preventDefault(); onNav("course", c.id); }} />
          ))}
        </div>
      </Container>
    </div>
  );
}
export default CatalogScreen;
