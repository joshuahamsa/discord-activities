import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  define: {
    // Make environment variables available to the client
    'import.meta.env.VITE_CLIENT_ID': JSON.stringify(process.env.VITE_CLIENT_ID)
  }
});
