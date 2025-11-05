import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: mode === 'production' ? 'esbuild' : false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('react-router-dom')) {
              return 'vendor-router';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            if (id.includes('react-hook-form') || id.includes('zod')) {
              return 'vendor-forms';
            }
            if (id.includes('@tanstack')) {
              return 'vendor-query';
            }
            return 'vendor';
          }
          if (id.includes('pages/invoice-templates/')) {
            return 'invoice-templates';
          }
          if (id.includes('pages/templates/')) {
            return 'templates';
          }
          if (id.includes('pages/docs/')) {
            return 'docs';
          }
          if (id.includes('pages/guides/')) {
            return 'guides';
          }
          if (id.includes('pages/features/')) {
            return 'features';
          }
          if (id.includes('pages/trades/')) {
            return 'trades';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: mode === 'development',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@vite/client', '@vite/env'],
  },
}));
