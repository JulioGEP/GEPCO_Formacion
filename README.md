# GEPCO_Formacion

Base de design system para reconstruir una web nueva a partir de la identidad visual de GEPCO Formación.

## Estado actual

Esta iteración implementa únicamente la **Tarea 0 — Extracción de tokens**. La fuente de verdad está en [`src/styles/tokens.css`](src/styles/tokens.css); los componentes Astro y la ruta `/design-system` deben construirse después de validar estos tokens.

## Cómo se usa la identidad visual

La identidad visual se normaliza en **CSS custom properties** para evitar copiar el markup o las clases del page builder original. Cualquier componente futuro debe consumir estos tokens, no valores hardcodeados.

### 1. Color

Los colores se organizan por intención semántica:

- `--color-brand`, `--color-brand-strong` y `--color-brand-soft`: rojo corporativo y sus estados de interacción.
- `--color-accent` y `--color-accent-strong`: acento naranja para llamadas de atención, sellos o destacados relacionados con emergencias/formación.
- `--color-ink`, `--color-muted`, `--color-subtle`: jerarquía de texto.
- `--color-bg`, `--color-surface`, `--color-surface-muted`: fondos de página, tarjetas y bloques secundarios.
- `--color-success`, `--color-warning`, `--color-danger`, `--color-stock-out`: estados funcionales como confirmación, aviso, error o cursos sin stock.

Ejemplo recomendado:

```css
.course-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.course-card__title {
  color: var(--color-ink);
}

.course-card__cta {
  background: var(--color-brand);
  color: var(--color-surface);
}

.course-card__cta:hover {
  background: var(--color-brand-strong);
}
```

### 2. Tipografía

La tipografía se divide en dos usos:

- `--font-display`: titulares, hero, métricas y encabezados de sección.
- `--font-body`: navegación, párrafos, formularios, tarjetas y textos largos.

La escala `--text-*` mantiene una progresión consistente entre elementos pequeños, textos base, titulares y displays. Los pesos `--weight-*` y los interlineados `--leading-*` deben combinarse según el tipo de contenido:

```css
.section-title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-heading);
}

.body-copy {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--leading-normal);
}
```

### 3. Espaciado y ritmo vertical

La escala `--space-*` define el ritmo de la interfaz. Debe aplicarse tanto en paddings internos como en separación entre secciones:

- `--space-2` a `--space-4`: controles, badges, inputs y gaps pequeños.
- `--space-6` a `--space-8`: tarjetas, grids y bloques compactos.
- `--space-12` a `--space-24`: wrappers de sección, hero y bloques destacados.

```css
.section {
  padding-block: var(--space-16);
}

.card {
  padding: var(--space-6);
  border-radius: var(--radius-md);
}
```

### 4. Forma, profundidad y layout

Los radios y sombras reproducen el patrón visual de tarjetas blancas sobre fondos claros:

- `--radius-sm`: controles pequeños y badges.
- `--radius-md`: tarjetas y formularios.
- `--radius-lg`: bloques destacados o media cards.
- `--shadow-*`: jerarquía de elevación, de tarjetas simples a overlays.

El layout usa `--container-max` como ancho máximo del contenido y `--container-padding` como margen lateral mínimo:

```css
.container {
  width: min(100% - (var(--container-padding) * 2), var(--container-max));
  margin-inline: auto;
}
```

### 5. Breakpoints

Los breakpoints se exponen como tokens documentales (`--breakpoint-sm`, `--breakpoint-md`, `--breakpoint-lg`, `--breakpoint-xl`). En CSS nativo aún no se pueden usar custom properties de forma portable dentro de `@media`, por lo que deben repetirse como valores literales equivalentes hasta que el proyecto incorpore un preprocesador o Tailwind:

```css
@media (min-width: 800px) {
  .course-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

### 6. Reglas para nuevos componentes

1. Importar `src/styles/tokens.css` una sola vez desde el stylesheet global o layout raíz.
2. Usar tokens para color, tipografía, spacing, radios, sombras y ancho de contenedor.
3. No copiar clases, wrappers ni estructura HTML del WordPress/page builder original.
4. No añadir colores, tamaños o sombras nuevos sin incorporarlos primero a `tokens.css` y justificar su procedencia.
5. Mantener foco visible, contraste AA y `prefers-reduced-motion` en componentes interactivos.

