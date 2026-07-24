import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// SSG estático. React para las islas de las pantallas.
export default defineConfig({
  site: 'https://gepcoformacion.es',
  output: 'static',
  integrations: [react()],
});
