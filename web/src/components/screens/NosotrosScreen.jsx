import React from 'react';
import { onNav, getParam } from '../../lib/router.js';
// Nosotros — hero, propósito, stats, sedes, acreditación
import { Button, StatBlock, Badge } from '../ds/index.js';
import { DATA as D } from '../../lib/data.js';
import { Container } from '../common/Container.jsx';
import { cx } from '../../lib/cx.js';

function NosotrosScreen() {
  return (
    <div>
      <section className="relative bg-dark text-white overflow-hidden">
        <img src={D.heroQuote} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.4]" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,_rgba(15,15,15,0.94),_rgba(15,15,15,0.5))]" />
        <Container className="relative py-section">
          <span className="font-mono text-sm uppercase tracking-eyebrow text-brand">Nosotros</span>
          <h1 className="m-[14px_0_20px] font-display text-[clamp(2.4rem,5vw,4rem)] font-extrabold tracking-display leading-tight max-w-[820px]">Más de 15 años formando a quienes protegen<span className="text-brand">.</span></h1>
          <p className="m-0 text-xl text-white/[0.82] max-w-[620px] leading-normal">Somos una escuela de emergencias y PRL homologada por el ISPC. Formamos a profesionales y empresas con un enfoque práctico, instructores en activo y aforo reducido.</p>
        </Container>
      </section>

      <section className="bg-surface py-section">
        <Container className="grid grid-cols-[1fr_1fr] gap-16 items-center">
          <div>
            <h2 className="m-[0_0_18px] font-display text-3xl font-extrabold tracking-display text-strong">Nuestra misión<span className="text-brand">.</span></h2>
            <p className="m-[0_0_14px] text-lg leading-normal text-body">Garantizar la máxima seguridad y protección de trabajadores y empresas, asegurando una intervención correcta ante cualquier emergencia.</p>
            <p className="m-[0_0_28px] text-base leading-normal text-body">Diseñamos soluciones formativas efectivas y personalizadas para cada cliente, desde el particular hasta grandes equipos de empresa.</p>
            <div className="flex gap-12 flex-wrap">
              <StatBlock value="+15" label="Años de experiencia" />
              <StatBlock value="2" label="Sedes en España" />
              <StatBlock value="ISPC" label="Centro homologado" />
            </div>
          </div>
          <img src={D.hero} alt="Formación práctica en emergencias" className="w-full h-[440px] object-cover rounded-xl shadow-lg" />
        </Container>
      </section>

      <section className="bg-surface-muted py-section">
        <Container>
          <span className="block mb-[12px] text-sm font-bold tracking-eyebrow uppercase text-brand">Dónde estamos</span>
          <h2 className="m-[0_0_var(--space-12)] font-display text-3xl font-extrabold tracking-display text-strong">Dos sedes, cobertura en toda la península<span className="text-brand">.</span></h2>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(260px,_1fr))] gap-6">
            {[
              { city: "Sabadell", addr: "C. Moratín, 100 · 08206 Sabadell, Barcelona", tel: "935 646 346" },
              { city: "Madrid", addr: "C. Primavera, 1 · 28500 Arganda del Rey, Madrid", tel: "916 263 818" },
            ].map((o) => (
              <div key={o.city} className="bg-surface border border-border rounded-lg p-8">
                <div className="font-mono text-xs uppercase tracking-eyebrow text-brand mb-[12px]">{o.city}</div>
                <div className="text-base text-body leading-normal mb-[10px]">{o.addr}</div>
                <div className="font-mono text-sm text-strong">T. {o.tel}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex gap-[12px] flex-wrap">
            <Button variant="primary" uppercase iconRight={<span>→</span>} onClick={() => onNav("catalog")}>Ver formaciones</Button>
            <Button variant="outline" onClick={() => onNav("contact")}>Pedir información</Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
export default NosotrosScreen;
