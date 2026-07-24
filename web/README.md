# GEPCO Formación — Astro estático + Tailwind

Web en **Astro (SSG) + Vite** con **JSX precompilado**, enrutado por ficheros e **islas React**, y **Tailwind** como sistema de estilos con los **tokens del design system mapeados al `theme`**. Solo front (sin lógica de negocio todavía). El diseño se conserva: cada utilidad de Tailwind resuelve al mismo token `var(--*)` que usaban los estilos originales.

## Requisitos y arranque

```bash
npm install
npm run dev       # desarrollo (http://localhost:4321)
npm run build     # build estático → dist/
npm run preview   # sirve dist/ para comprobar
```

- Astro `^4`, `@astrojs/react`, `react` / `react-dom` 18, `@astrojs/tailwind` + `tailwindcss` `^3`. Salida **estática (SSG)**.
- Sin React/Babel por CDN: todo se transpila en build con Vite/esbuild.

## Estructura

```
web/
  astro.config.mjs         SSG + integraciones React y Tailwind (site: gepcoformacion.es)
  tailwind.config.mjs      Tailwind: cada utilidad mapeada a un token var(--*); preflight off
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
      cx.js                une clases condicionales (alternativa mínima a clsx)
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
3. **Estilos con Tailwind mapeado a tokens.** Cada utilidad resuelve a un token (`bg-brand`→`var(--color-brand)`, `rounded-lg`→`var(--radius-lg)`, `text-ink`, `shadow-md`, `font-display`…). No hardcodees valores: usa la utilidad con nombre y, si no existe, el arbitrario con la var (`p-[var(--space-5)]`). Lo no expresable con utilidades (resets, `@keyframes` del marquee, scrollbar de `HScroll`, layout responsive del blog) vive en `public/global.css`.
4. Color rojo `--color-brand` lidera, naranja `--color-accent` puntúa; fotografía real; sin emoji. (Ver detalle en el README del sitio original.)

## Estilos: Tailwind + tokens

`tailwind.config.mjs` mapea cada utilidad al token CSS correspondiente, así que **usar Tailwind = usar los tokens**, sin poder salirte de la identidad:

- **Color:** `bg-brand` / `bg-brand-strong` / `bg-accent` / `bg-ink` / `bg-surface` / `bg-surface-muted` / `bg-page` / `bg-dark`; texto `text-strong` / `text-body` / `text-subtle` / `text-on-dark` / `text-brand`; borde `border-border` / `border-border-strong`; acciones `bg-action-primary` (+`-hover`), `bg-action-dark`.
- **Tipografía:** `font-display` / `font-body` / `font-mono` (todas Poppins); tamaño `text-xs…text-4xl`, `text-display`; peso `font-semibold` / `font-bold` / `font-extrabold`; `tracking-heading` / `tracking-eyebrow`; `leading-tight` / `leading-snug` / `leading-normal`.
- **Forma / elevación / motion:** `rounded-sm|md|lg|xl|full`, `shadow-sm|md|lg|focus`, `duration-fast|base`, `ease-standard`.
- **Espaciado:** la escala por defecto de Tailwind ya equivale a los `--space-*` (`p-4`=16px, `gap-6`=24px…); además `py-section` (`--section-y`), `px-container`, `max-w-container`.
- **Reglas:** *preflight desactivado* (`corePlugins.preflight=false`) para no alterar el reset propio; hover que dependía de `!disabled` → `enabled:hover:`; hover de padre→hijo → `group` + `group-hover:`.

Estado de la conversión: **todo el código está en Tailwind** — los 13 componentes de `ds/`, los comunes (`Container`, `HScroll`), `Chrome.jsx` y las 9 pantallas de `screens/`. Solo quedan estilos `style={{…}}` inline donde el valor es **dinámico en runtime** (estado/props): drawer y buscador de `Chrome`, celdas del calendario de `AbiertasScreen`, barra de progreso de lectura del `BlogScreen`, `maxHeight` animado del `Accordion`, `flex`/offset de `HScroll` y overrides puntuales de ancho en `Container`. Eso es correcto: no son expresables como clases estáticas.

Paridad verificada con regresión visual (Playwright + pixelmatch): las 11 páginas renderizan **idénticas al pixel** respecto a la maquetación original antes de Tailwind.

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
