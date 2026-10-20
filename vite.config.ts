import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { bodyBake } from './vite-plugin-bodybake';

// Mirrors the danmercede-info template scaffold. The template's GEMINI_API_KEY
// `define` block is identity-spoke-specific and is intentionally dropped here —
// this product microsite needs no API key.
export default defineConfig({
  // Served under the brand path https://www.danmercede.com/works/agent-demo-video/
  // (the hub Vercel-rewrites that path to this project's .vercel.app). `base` makes the
  // emitted asset refs + favicon resolve under that path so the proxied page is self-consistent.
  base: '/works/agent-demo-video/',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), tailwindcss(), bodyBake()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
