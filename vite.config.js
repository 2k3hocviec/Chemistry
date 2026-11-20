import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Chemistry/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: true
  }
});
