import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is built twice: once for the browser (dist/), once for the server
// (.ssr/), which scripts/prerender.js uses to write every page as real HTML.
export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist', emptyOutDir: true },
});
