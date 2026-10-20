// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

const site = env.SITE_URL || 'https://charls-leo.github.io';

export default defineConfig({
  site,
  base: '/Lujen-Prototype/',
  output: 'static',
  integrations: [react(), sitemap()],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
  vite: {
    // Pre-empaqueta las dependencias de la isla para que el servidor de desarrollo
    // no las descubra tarde ("Outdated Optimize Dep") en la primera carga.
    optimizeDeps: { include: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'react/jsx-dev-runtime', 'motion/react'] },
  },
});
