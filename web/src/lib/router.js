// Router por ficheros adaptado a Astro. onNav(screen, param) navega a la ruta correspondiente.
const PAGES = {
  home: "/", catalog: "/catalogo", course: "/curso", nosotros: "/nosotros",
  contact: "/contacto", checkout: "/checkout", blog: "/blog", post: "/blog-post",
  abiertas: "/abiertas", trabaja: "/trabaja",
};
const KEY = { catalog: "cat", course: "curso", post: "post" };

export function onNav(screen, param) {
  if (typeof window === "undefined") return;
  const page = PAGES[screen] || "/";
  const key = KEY[screen];
  window.location.href = page + (param && key ? "?" + key + "=" + encodeURIComponent(param) : "");
}

export function getParam(k) {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(k);
}
