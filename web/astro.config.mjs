import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// SSG estático. React para las islas de las pantallas; Tailwind (con los tokens
// del DS mapeados en tailwind.config.mjs) como sistema de estilos.
export default defineConfig({
  site: 'https://gepcoformacion.es',
  output: 'static',
  integrations: [react(), tailwind()],
});
