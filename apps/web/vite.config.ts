import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // 開発中は /api をAPIサーバーへ回す
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL ?? 'http://localhost:8787',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
