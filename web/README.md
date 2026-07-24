# GEPCO Formación — Astro (build real)

Migración del sitio estático (React 18 + Babel en el navegador) a un **proyecto Astro + Vite** con **JSX precompilado**, enrutado por ficheros e **islas React**. El diseño es idéntico: mismo DOM, mismos estilos inline, mismos tokens. Es una migración de build, no un rediseño.

## Requisitos y arranque

```bash
npm install
npm run dev       # desarrollo (http://localhost:4321)
npm run build     # build estático → dist/
npm run preview   # sirve dist/ para comprobar
```

- Astro `^4`, `@astrojs/react`, `react` / `react-dom` 18. Salida **estática (SSG)**.
- Sin React/Babel por CDN: todo se transpila en build con Vite/esbuild.

## Estructura

```
gepco-astro/
  astro.config.mjs         SSG + integración React (site: gepcoformacion.es)
  package.json             scripts dev/build/preview
  tsconfig.json            strict + jsx react
  public/
    ds/                    tokens (colors, typography, spacing, effects, fonts) + styles.css
    global.css             resets, foco, scrollbar HScroll, keyframes del marquee y layout del blog
    assets/                logos de clientes (assets/logos/) + sellos de acreditación
  src/
    layouts/Base.astro     <head> (SEO, OG, hreflang, tokens, fuentes) + Navbar/Footer + <slot/>
    pages/                 enrutado por ficheros (ES en raíz, CA en ca/)
      index.astro  catalogo.astro  curso.astro  abiertas.astro  nosotros.astro
      contacto.astro  checkout.astro  trabaja.astro  blog.astro  blog-post.astro  ca/index.astro
    components/
      Chrome.jsx           Navbar + Footer + carrito (drawer, contador)
      common/              Container.jsx, HScroll.jsx (carrusel)
      ds/                  FUENTE editable del design system (13 componentes) + index.js (barrel)
      screens/             una pantalla React por página (islas)
    lib/
      data.js              datos (export const DATA) — antes window.GEPCO_DATA
      cart.js              carrito localStorage (export const cart) — clave gepco_cart_v1, evento cart:change
      router.js            onNav(screen,param) + getParam(k) adaptados a rutas Astro
```

## Islas React (hidratación)

Cada pantalla es una isla montada desde su página:

- `client:load` — pantallas seguras para SSR/SEO (render no toca `window`): **Home, Nosotros, Contacto, Trabaja, Abiertas, Blog (índice)** y el **Navbar/Footer**.
- `client:only="react"` — pantallas que dependen del navegador en el render (leen `localStorage` o `URLSearchParams`): **Catálogo** (`?cat`), **Curso** (`?curso` + carrito), **Checkout** (carrito) y **Blog-post** (`?post`).

> Los parámetros de URL se leen con `getParam()` dentro de la propia isla (cliente); `onNav()` navega por `window.location`. Por eso esas vistas son `client:only`.

## Design system: FUENTE editable

`src/components/ds/` contiene la **fuente limpia** (no bundle) de: **Accordion, Badge, NormBadge, SectionHeading, StatBlock, Button, Checkbox, IconButton, CategoryCard, ProductCard, Input, Select, SearchBar**. API y render idénticos a los del sitio original. Se importan por barrel:

```js
import { Button, ProductCard, SectionHeading } from '../ds/index.js';
```

## Reglas visuales (innegociables)

1. **Tokens = única fuente de verdad** en `public/ds/tokens/*.css`. Nunca hardcodees valores: usa `var(--*)`.
2. **Poppins en TODO** (`--font-display`, `--font-body`, `--font-mono`), cargada desde Google Fonts (`public/ds/tokens/fonts.css`, pesos 400–800). *(Se sustituyó el Sora/Hanken/Space Mono del token original por Poppins, que es la fuente de la marca GEPCO.)*
3. Estilos **inline** en cada componente, idénticos al original. Lo no expresable inline (resets, `@keyframes` del marquee, scrollbar de `HScroll`, layout responsive del blog) vive en `public/global.css`.
4. Color rojo `--color-brand` lidera, naranja `--color-accent` puntúa; fotografía real; sin emoji. (Ver detalle en el README del sitio original.)

## Añadir una página nueva

1. Crea `src/components/screens/MiPantalla.jsx` (isla React; importa DS de `../ds/index.js`, datos de `../../lib/data.js`, `onNav`/`getParam` de `../../lib/router.js`).
2. Registra la ruta en `src/lib/router.js` (`PAGES`), y crea `src/pages/mi-pagina.astro` con `<Base title/description/path>` montando la isla (`client:load` o `client:only="react"` según dependa del navegador).
3. Formularios con inputs en grid: usa `gridTemplateColumns: "minmax(0,1fr) …"` (el reset `*{box-sizing:border-box}` ya está en `global.css`).

## PENDIENTES heredados (no inventar datos)

- **Precios / ecommerce**: `[PENDIENTE: precio]` por curso y en totales; sin pasarela real. Checkout/contacto/trabaja **muestran estado de éxito pero no envían** — conectar endpoint/email (y el adjunto de CV).
- **Traducción CA**: `src/pages/ca/index.astro` es un placeholder; estructura y hreflang listos.
- **Slugs reales**: hoy rutas planas (`/curso?curso=…`, `/blog-post?post=…`). El sitio real usa `/formacion/<slug>/` — ajustar router, canonical y hreflang al esquema definitivo.
- **Cuerpos del blog, testimonios, cifras y fechas/sedes de convocatorias**: valores de ejemplo marcados `[PENDIENTE]`.
- **Fotografía** referenciada desde el CDN `gepcoformacion.es`; logos y sellos ya son locales en `public/assets/`. Para producción, descargar también la fotografía.
- **"Trabaja con nosotros"** enlazada solo desde el footer; decidir si va en el menú superior.
- **JSON-LD Organization** incluido en la home; falta `sameAs` (RRSS) y `telephone`/`email` por sede (no inventados).
