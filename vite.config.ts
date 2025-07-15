import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  // For GitHub Pages deployment, we need to set the base path to the repository name
  // For local development and preview, we use the root path
  const base = process.env.GITHUB_ACTIONS === 'true' ? '/grub_sniffer/' : '/';

  console.log(`Building with base path: ${base}`);

  return {
  // Set base path dynamically based on environment
  base,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
