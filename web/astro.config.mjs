import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// SSG estático. React para las islas de las pantallas; Tailwind (con los tokens
// del DS mapeados en tailwind.config.mjs) como sistema de estilos; sitemap
// genera sitemap-index.xml a partir de las rutas estáticas (necesita `site`).
export default defineConfig({
  site: 'https://gepcoformacion.es',
  output: 'static',
  integrations: [react(), tailwind(), sitemap()],
});
