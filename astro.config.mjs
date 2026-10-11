// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sarthakagrawal.dev',
  output: 'static',
  trailingSlash: 'never',
  // Emit `about.html` rather than `about/index.html` so URLs have no
  // trailing slash on Cloudflare Pages (no 308 redirect on every link).
  // Other routes keep their existing inline CSS. The home-only postbuild step
  // extracts critical CSS and loads the gallery remainder asynchronously.
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [react(), mdx(), sitemap()],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  vite: {
    plugins: [tailwindcss()],
    // Fleet standard (VoidZero ecosystem) — Lightning CSS as the CSS
    // transformer + minifier. Already bundled in Vite, just needs opting in.
    css: { transformer: 'lightningcss' },
    build: { cssMinify: 'lightningcss' },
  },
});
