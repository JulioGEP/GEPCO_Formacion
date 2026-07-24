// Nosotros — hero, propósito, stats, sedes, acreditación
const { Button, StatBlock, Badge } = window.GEPCOFormaciNDesignSystem_bb6094;
const D = window.GEPCO_DATA;
const Container = window.Container;

function NosotrosScreen({ onNav }) {
  return (
    <div>
      <section style={{ position: "relative", background: "var(--color-dark)", color: "#fff", overflow: "hidden" }}>
        <img src={D.heroQuote} alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(15,15,15,0.94), rgba(15,15,15,0.5))" }} />
        <Container style={{ position: "relative", padding: "var(--section-y) var(--container-padding)" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--color-brand)" }}>Nosotros</span>
          <h1 style={{ margin: "14px 0 20px", fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", lineHeight: "var(--leading-tight)", maxWidth: "820px" }}>Más de 15 años formando a quienes protegen<span style={{ color: "var(--color-brand)" }}>.</span></h1>
          <p style={{ margin: 0, fontSize: "var(--text-xl)", color: "rgba(255,255,255,0.82)", maxWidth: "620px", lineHeight: "var(--leading-normal)" }}>Somos una escuela de emergencias y PRL homologada por el ISPC. Formamos a profesionales y empresas con un enfoque práctico, instructores en activo y aforo reducido.</p>
        </Container>
      </section>

      <section style={{ background: "var(--surface-card)", padding: "var(--section-y) 0" }}>
        <Container style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-16)", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: "0 0 18px", fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)" }}>Nuestra misión<span style={{ color: "var(--color-brand)" }}>.</span></h2>
            <p style={{ margin: "0 0 14px", fontSize: "var(--text-lg)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>Garantizar la máxima seguridad y protección de trabajadores y empresas, asegurando una intervención correcta ante cualquier emergencia.</p>
            <p style={{ margin: "0 0 28px", fontSize: "var(--text-base)", lineHeight: "var(--leading-normal)", color: "var(--text-body)" }}>Diseñamos soluciones formativas efectivas y personalizadas para cada cliente, desde el particular hasta grandes equipos de empresa.</p>
            <div style={{ display: "flex", gap: "var(--space-12)", flexWrap: "wrap" }}>
              <StatBlock value="+15" label="Años de experiencia" />
              <StatBlock value="2" label="Sedes en España" />
              <StatBlock value="ISPC" label="Centro homologado" />
            </div>
          </div>
          <img src={D.hero} alt="Formación práctica en emergencias" style={{ width: "100%", height: "440px", objectFit: "cover", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)" }} />
        </Container>
      </section>

      <section style={{ background: "var(--surface-sunken)", padding: "var(--section-y) 0" }}>
        <Container>
          <span style={{ display: "block", marginBottom: "12px", fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)", letterSpacing: "var(--tracking-eyebrow)", textTransform: "uppercase", color: "var(--color-brand)" }}>Dónde estamos</span>
          <h2 style={{ margin: "0 0 var(--space-12)", fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: "var(--weight-extrabold)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)" }}>Dos sedes, cobertura en toda la península<span style={{ color: "var(--color-brand)" }}>.</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--space-6)" }}>
            {[
              { city: "Sabadell", addr: "C. Moratín, 100 · 08206 Sabadell, Barcelona", tel: "935 646 346" },
              { city: "Madrid", addr: "C. Primavera, 1 · 28500 Arganda del Rey, Madrid", tel: "916 263 818" },
            ].map((o) => (
              <div key={o.city} style={{ background: "var(--surface-card)", border: "1px solid var(--border-default)", borderRadius: "var(--radius-lg)", padding: "var(--space-8)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", textTransform: "uppercase", letterSpacing: "var(--tracking-eyebrow)", color: "var(--color-brand)", marginBottom: "12px" }}>{o.city}</div>
                <div style={{ fontSize: "var(--text-base)", color: "var(--text-body)", lineHeight: "var(--leading-normal)", marginBottom: "10px" }}>{o.addr}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "var(--text-strong)" }}>T. {o.tel}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "var(--space-12)", display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="primary" uppercase iconRight={<span>→</span>} onClick={() => onNav("catalog")}>Ver formaciones</Button>
            <Button variant="outline" onClick={() => onNav("contact")}>Pedir información</Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
window.NosotrosScreen = NosotrosScreen;
