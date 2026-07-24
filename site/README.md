# GEPCO Formación — Sitio web (maquetación estática)

Sitio estático multipágina montado sobre el **design system GEPCO** (tokens + componentes reutilizados, sin reinventar). Listo para subir a GitHub y desplegar en Netlify como HTML estático.

> **Nota de entorno:** este workspace genera HTML/JS estático, no un proyecto Astro real. La estructura reproduce el *file-based routing* pedido (ES en la raíz, CA bajo `/ca/`) con archivos `.html`. Migrar a Astro es directo: cada `.html` → una página `.astro`, y los `.jsx` de `js/` → componentes/islas.

## Estructura

```
site/
  index.html          Home
  catalogo.html       Listado de categoría / catálogo (?cat=slug)
  curso.html          Ficha de curso / producto (?curso=id) — enfoque EMPRESA / in company
  abiertas.html       Convocatorias en abierto (sesiones sueltas para particulares/autónomos)
  nosotros.html       Nosotros
  contacto.html       Contacto (CRO: propuesta de valor + canales + FAQ)
  checkout.html       Tramitar reserva (datos comprador + fiscales + alumnos + pago)
  trabaja.html        Trabaja con nosotros (captación de formadores/bomberos + CV)
  blog.html           Blog — índice
  blog-post.html      Blog — post individual (?post=id)
  ca/index.html       Estructura CA lista · [PENDIENTE: traducción]
  assets/             Imágenes locales: logos de clientes (assets/logos/) y sellos de acreditación
  ds/                 Design system (tokens + styles + bundle) — copiado del DS
  js/
    common.jsx        Container, HScroll (carrusel) y router onNav/getParam
    cart.js           Carrito simulado en cliente (localStorage)
    Chrome.jsx        Navbar + Footer (rediseñado, claro) + carrito (botón, contador, drawer)
    data.js           Datos del catálogo, sedes, logos, diferenciales, reseñas
    HomeScreen.jsx    Home (hero, áreas, prueba social con carrusel de logos, acreditaciones)
    CatalogScreen.jsx / CourseScreen.jsx / NosotrosScreen.jsx /
    ContactScreen.jsx / CheckoutScreen.jsx / TrabajaScreen.jsx /
    AbiertasScreen.jsx / BlogScreen.jsx
```

## Enrutado (js/common.jsx → onNav)

`onNav(screen, param)` mapea a los `.html`. Pantallas registradas: `home, catalog, course, nosotros, contact, checkout, blog, post, abiertas, trabaja`. Al crear una página nueva: añade su entrada aquí, crea el `.html` (copia de otra página, cambiando `<title>`/meta y el `<script src>` + nombre del componente en `mount()`), y su `Screen.jsx` en `js/`.

**Toda página `.html` que monte formularios con inputs en grid debe incluir `*{box-sizing:border-box}` en su `<style>`** (los `Input`/`Select` del DS usan `width:100%` + padding y, sin el reset, desbordan la caja). Usa además `gridTemplateColumns: "minmax(0,1fr) …"` en rejillas de inputs.

## Componentes nuevos o modificados

**Nuevos**
- `js/cart.js` — store del carrito en `localStorage` (`add/remove/setQty/clear/count/on`). Sin lógica de pago real.
- `js/common.jsx` — `Container`, `HScroll` (carrusel horizontal con flechas) y router `onNav`/`getParam`.
- `js/CheckoutScreen.jsx` — **Tramitar reserva**: datos del comprador, datos fiscales (conmutador Empresa / Autónomo-Particular), un bloque de alumno (nombre/apellidos/DNI) por plaza del carrito, selección de pasarela (Tarjeta/PayPal/Bizum) y resumen sticky. Estado de éxito con localizador, dirección de sede + Google Maps, hora del curso (`course.hora`, por defecto 08:00) y avisos (ropa/calzado, puntualidad, no superar pruebas, certificado en 48 h).
- `js/TrabajaScreen.jsx` — **Trabaja con nosotros**: captación de formadores/bomberos. Hero, motivos para unirse, y formulario con experiencia mínima, entornos de formación (checkboxes), adjuntar CV y consentimiento. Envío simulado.
- `assets/logos/` — 24 logos reales de clientes; `assets/logos-nos-acreditan-*.png` (color, Home) y `assets/logos-acreditacion-gris-g.png` (gris, footer).

**Modificados**
- `js/Chrome.jsx` — **carrito** (`CartButton` + `CartDrawer`, CTA "Tramitar reserva" → `checkout`). **Footer rediseñado**: fondo gris propio `#e8e6e2` (distinto al de las secciones para diferenciarse), tipografía Poppins en todo (incl. copyright), columna de enlaces navegables (incluye "Trabaja con nosotros"), CTA "Solicita información", sedes y franja compacta de sellos de acreditación + legal.
- `js/HomeScreen.jsx` — `Container`/`HScroll` desde `common.jsx`; **carrusel automático de logos de clientes** (marquee, grayscale, pausa al hover — keyframes en `index.html`); imagen de acreditaciones en color; campo "Empleados a formar".
- `js/CourseScreen.jsx` — ficha **reorientada a empresa / in company**: hero B2B, bloque "Formación para empresas" (argumentos **condicionales por curso**: fuego real solo en cursos de fuego; "en vuestras instalaciones" salvo `course.soloSede`), tarjeta lateral de **captación de lead** (presupuesto a medida) con la reserva individual online degradada a desplegable. Plan de estudios 20% teoría / 80% práctica. "Formaciones relacionadas" en carrusel lateral (`HScroll`).
- `js/ContactScreen.jsx` — **CRO**: propuesta de valor + "qué recibirás", banda de motivos, canales directos por sede (tel/WhatsApp/Maps) y FAQ que resuelve objeciones.
- `js/data.js` — `logosClientesList`, `course.hora`, `course.soloSede`, diferenciales (`diff`: FUNDAE, Toda España e/islas…).

Ningún componente del design system (`ds/`) fue tocado; solo se compusieron.

## Líneas visuales que debe mantener el proyecto

Toda página nueva (o cualquier bloque que se monte) debe respetar estas reglas para conservar la identidad de GEPCO Formación. Fuente de verdad: `src/styles/tokens.css` — **nunca hardcodees valores**, usa siempre los tokens.

### 1. Color
- **Rojo corporativo `--color-brand` (#e30613)** = acción e identidad. Lidera. Hover al `--color-brand-strong`.
- **Naranja `--color-accent` (#f39200)** = acento (emergencias, destacados, chip IN COMPANY, estrellas de reseñas). Solo puntúa, no lidera.
- Máximo **1–2 hues de marca por vista**: el rojo manda, el naranja acompaña.
- Texto: `--text-strong` (ink) → `--text-body` → `--text-subtle`. Fondos: `--surface-page` (gris cálido), tarjetas `--surface-card` (blanco), secciones alternas `--surface-sunken`. Paneles B2B/hero oscuros con `--color-dark` y texto `--text-on-dark`.

### 2. Tipografía
- **Poppins** en todo: `--font-display` para titulares, hero, métricas y cifras; `--font-body` para el resto; `--font-mono` solo para eyebrows/refs técnicos.
- Titulares en **negrita (700/800)** con tracking negativo (`--tracking-display`/`--tracking-heading`). Los `SectionHeading` llevan **punto final rojo** automático.
- Cuerpo 16px a 1.5 de interlineado. Eyebrows y captions de stats en **MAYÚSCULAS**.
- Cifras grandes responsive con `clamp()` para que no rompan en móvil.

### 3. Espaciado, ritmo y layout
- Escala `--space-*`: 2–4 controles/badges; 6–8 tarjetas y grids; 12–24 wrappers de sección y hero.
- Contenido en `--container-max` centrado, con `--container-padding` de margen lateral mínimo.
- Ritmo vertical generoso entre secciones (`--section-y`). Mobile-first.
- Layouts con **flex/grid + gap**, nunca márgenes sueltos ni whitespace.

### 4. Forma, profundidad y motion
- Radios: `--radius-sm` controles/badges, `--radius-md` tarjetas/formularios, `--radius-lg`/`--radius-xl` bloques media y destacados. Chips de filtro `--radius-full`. Nada de tarjetas tipo píldora.
- Sombras `--shadow-sm/md/lg`: tarjetas blancas que flotan sobre gris claro. **Hover de tarjeta** = `translateY(-4px)` + `--shadow-md` + leve zoom de imagen.
- Motion contenido: 120–200 ms en `--ease-standard`. Sin rebotes ni animaciones largas.

### 5. Imagen e iconografía
- Fotografía **real de acción** (fuego, humo, EPI, entornos industriales), a todo color. Sobre imagen, **overlay degradado de ink** para legibilidad del texto blanco.
- Sin ilustración dibujada, sin texturas, sin degradados azulados/morados.
- Iconografía mínima: marcas Unicode ("→", "+", "×", "›") y, si hace falta un set, **outline de trazo fino** (Lucide/Heroicons outline). Los **sellos de acreditación** (ISPC/Generalitat, ISO, DGT, IRATA…) son activos de marca, no decoración.
- **Sin emoji.** Nunca.

### 6. Contenido y voz
- Español (es_ES). Trato de **tú** al lector ("Reserva tu plaza", "Fórmate") y **nosotros** para la empresa.
- Autoridad y certificación: "oficial", "homologado", "ISPC", "Decreto 374/1996".
- Números en formato español: miles con punto, decimales con coma ("1.950,00 €"), horas "350 Horas", fechas DD/MM/YYYY.
- Formas inclusivas con barra ("Bombero/a de empresa").
- **No inventar** precios, cifras, acreditaciones ni datos de contacto: dejar `[PENDIENTE: ...]`.

### 7. Reglas para montar páginas nuevas
1. Importar los tokens una sola vez desde el layout raíz; consumir siempre `var(--*)`.
2. Componer con los componentes existentes; si falta una variante, **extender** el componente, no duplicar ni meter estilos ad-hoc.
3. No copiar clases/markup del WordPress original.
4. No añadir color, tamaño o sombra nuevos sin incorporarlos antes a `tokens.css`.
5. SEO por página: `title`, `meta description`, `canonical`, Open Graph y `hreflang` ES/CA.
6. Accesibilidad: foco visible, contraste AA, `prefers-reduced-motion`, `alt` en imágenes, jerarquía correcta de headings.

## Cumplimiento por página
- **SEO:** cada página tiene `title`, `meta description`, `canonical`, Open Graph y `hreflang` ES/CA (+ `x-default`).
- **Accesibilidad:** foco visible por teclado, `prefers-reduced-motion`, `alt`/`aria` en imágenes decorativas, jerarquía de headings, drawer con rol de diálogo y cierre con Esc.
- **Responsive:** mobile-first heredado de los componentes del DS.
- **Rendimiento:** HTML estático. *(React + Babel se cargan por CDN para reutilizar los componentes del DS tal cual; para producción conviene precompilar — ver Pendientes.)*

## PENDIENTES (recopilados para completar)

1. **Precios / ecommerce real.** El carrito no muestra importes: `[PENDIENTE: precio]` por curso y en el total. No se ha inventado ningún precio, stock ni pasarela de pago. El botón "Tramitar reserva" deriva al formulario de contacto.
2. **Traducción CA.** `ca/index.html` es un marcador; falta traducir todas las páginas al catalán. La estructura hreflang/`/ca/` ya está lista.
3. **URLs canónicas reales de cursos y posts.** Se usan rutas de archivo (`curso.html?curso=…`, `blog-post.html?post=…`). El sitio real usa slugs (`/formacion/<slug>/`). Ajustar canonical/hreflang al esquema definitivo.
4. **Cuerpo real de los artículos de blog** (`js/BlogScreen.jsx` → `BODY`): texto de muestra marcado como pendiente.
5. **Cifras/estadísticas** (certificados, contadores): valores plausibles heredados del kit — confirmar los reales.
6. **Imágenes y fotografía** se referencian desde el CDN de `gepcoformacion.es` (offline no garantizado). **Logos de clientes y sellos de acreditación ya son locales** en `assets/`. Para producción, descargar también la fotografía a `assets/`.
7. **Datos de convocatorias** (fechas, sedes, aforo) en la ficha de curso son de ejemplo — sustituir por los reales.
8. **Precompilar JSX** (build) en lugar de Babel en el navegador para producción.

### Específicos de la Home (según briefing SEO/UX)
9. **Testimonios reales de empresas cliente** (`js/data.js` → `testimonios`): 3 citas + autor/cargo/empresa, hoy marcadas `[PENDIENTE]`. Deben ser HTML nativo (ya lo son) y contenido real.
10. **Logos de clientes** — ya integrados (24 reales en `assets/logos/`, carrusel en la Home). Revisar que estén todos los que procede y sus `alt`.
15. **Envíos de formularios simulados.** Contacto, checkout y "Trabaja con nosotros" muestran estado de éxito en cliente pero no envían nada. Conectar a un endpoint/email real (y el adjunto de CV) en producción.
16. **"Trabaja con nosotros"** enlazada solo desde el footer. Decidir si va también en el menú superior.
17. **Datos de sedes en checkout/contacto** (Sabadell, Arganda del Rey) y el email/WhatsApp usados son los conocidos o placeholders razonables — confirmar los reales.
11. **Páginas propias de área.** "Altura y Trabajos Verticales" y "TELCO" no tienen categoría propia en el catálogo; hoy enlazan a PRL. Definir si tendrán página de área propia y ajustar el enlace (el briefing pide que cada área enlace a su página con el nombre real como texto de enlace).
12. **FUNDAE:** el texto dice "formación bonificable" y aclara que "la gestión del trámite la realiza tu empresa" (nunca prometemos gestionarlo). Revisar wording legal con vosotros.
13. **Diferenciales y cifras** ("+15 años", "2 sedes", aforo 15, fuego real, cobertura península) confirmados por el briefing; el resto de cifras del sitio siguen siendo de ejemplo.
14. **Schema Organization + 2 sedes** añadido en `index.html`. Falta `sameAs` (RRSS) y, si procede, `telephone`/`email` por sede (no inventados).
