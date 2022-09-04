import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { obfuscator } from 'rollup-obfuscator';
import checker from 'vite-plugin-checker';
import { fileURLToPath, URL } from 'url';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim'); // Load origin on localhost.

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[hash].js`,
        chunkFileNames: `assets/[hash].js`,
        assetFileNames: `assets/[hash].[ext]`,
      },
    },
  },
  esbuild: {
    legalComments: 'none',
  },
  server: {
    open: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [react(), checker({ typescript: true }), obfuscator()],
  define: {
    'process.env': {}, // For libraries that reference process (panolens)
  },
});
