// Enrutado por slug (SEO). onNav(screen, param) navega a la URL canónica.
// Páginas fijas:
const PAGES = {
  home: "/",
  catalog: "/catalogo/",
  nosotros: "/nosotros/",
  contact: "/contacto/",
  checkout: "/checkout/",
  blog: "/blog/",
  abiertas: "/abiertas/",
  trabaja: "/trabaja/",
};

// Pantallas de detalle: una URL única por elemento.
function detailUrl(screen, param) {
  const slug = encodeURIComponent(param);
  if (screen === "course") return `/formacion/${slug}/`;
  if (screen === "post") return `/blog/${slug}/`;
  if (screen === "catalog") return `/catalogo/${slug}/`;
  return null;
}

export function onNav(screen, param) {
  if (typeof window === "undefined") return;
  let url;
  if (param && (screen === "course" || screen === "post" || screen === "catalog")) {
    url = detailUrl(screen, param);
  } else {
    url = PAGES[screen] || "/";
  }
  window.location.href = url;
}

export function getParam(k) {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(k);
}
