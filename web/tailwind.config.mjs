/**
 * Tailwind + design tokens de GEPCO.
 *
 * Regla de oro: cada utilidad se resuelve al MISMO token CSS (var(--*)) que ya
 * usaban los estilos inline. Así `bg-brand` === `background: var(--color-brand)`,
 * y la conversión inline → Tailwind no cambia ni un píxel.
 *
 * Preflight desactivado a propósito (corePlugins.preflight = false): el reset de
 * Tailwind alteraría imágenes/headings y podría desmontar el diseño existente.
 * El reset propio vive en public/global.css.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    // --- Overrides (reemplazan la escala por defecto para hablar en tokens) ---
    borderRadius: {
      none: '0',
      sm: 'var(--radius-sm)',
      md: 'var(--radius-md)',
      lg: 'var(--radius-lg)',
      xl: 'var(--radius-xl)',
      full: 'var(--radius-full)',
      DEFAULT: 'var(--radius-md)',
    },
    boxShadow: {
      none: 'none',
      sm: 'var(--shadow-sm)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      focus: 'var(--shadow-focus)',
    },
    fontSize: {
      xs: 'var(--text-xs)',
      sm: 'var(--text-sm)',
      base: 'var(--text-base)',
      lg: 'var(--text-lg)',
      xl: 'var(--text-xl)',
      '2xl': 'var(--text-2xl)',
      '3xl': 'var(--text-3xl)',
      '4xl': 'var(--text-4xl)',
      display: 'var(--text-display)',
    },
    lineHeight: {
      none: 'var(--leading-none)',
      tight: 'var(--leading-tight)',
      snug: 'var(--leading-snug)',
      normal: 'var(--leading-normal)',
      loose: 'var(--leading-loose)',
    },
    letterSpacing: {
      display: 'var(--tracking-display)',
      heading: 'var(--tracking-heading)',
      nav: 'var(--tracking-nav)',
      eyebrow: 'var(--tracking-eyebrow)',
      mono: 'var(--tracking-mono)',
    },
    screens: {
      sm: '640px',
      md: '800px',
      lg: '1024px',
      xl: '1320px',
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand)',
          strong: 'var(--color-brand-strong)',
          soft: 'var(--color-brand-soft)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          strong: 'var(--color-accent-strong)',
        },
        ink: {
          DEFAULT: 'var(--color-ink)',
          soft: 'var(--color-ink-soft)',
        },
        body: 'var(--color-body)',
        subtle: 'var(--color-subtle)',
        border: {
          DEFAULT: 'var(--color-border)',
          strong: 'var(--color-border-strong)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          muted: 'var(--color-surface-muted)',
          tile: 'var(--color-surface-tile)',
        },
        page: 'var(--surface-page)',
        dark: {
          DEFAULT: 'var(--color-dark)',
          soft: 'var(--color-dark-soft)',
          tile: 'var(--color-dark-tile)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        // Alias semánticos
        'action-primary': 'var(--action-primary)',
        'action-primary-hover': 'var(--action-primary-hover)',
        'action-dark': 'var(--action-dark)',
        'action-dark-hover': 'var(--action-dark-hover)',
      },
      textColor: {
        strong: 'var(--text-strong)',
        body: 'var(--text-body)',
        subtle: 'var(--text-subtle)',
        'on-brand': 'var(--text-on-brand)',
        'on-dark': 'var(--text-on-dark)',
        'on-dark-muted': 'var(--text-on-dark-muted)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      fontWeight: {
        regular: 'var(--weight-regular)',
        medium: 'var(--weight-medium)',
        semibold: 'var(--weight-semibold)',
        bold: 'var(--weight-bold)',
        extrabold: 'var(--weight-extrabold)',
      },
      spacing: {
        section: 'var(--section-y)',
        'section-sm': 'var(--section-y-sm)',
        container: 'var(--container-padding)',
      },
      maxWidth: {
        container: 'var(--container-max)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
      },
    },
  },
  plugins: [],
};
