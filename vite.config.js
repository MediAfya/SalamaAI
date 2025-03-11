import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      crypto: path.resolve(__dirname, "node_modules/crypto-browserify"),
    },
  },
  base: "/SalamaAI/", // ✅ Ensures GitHub Pages loads files correctly
  define: {
    global: "window",
  },
  optimizeDeps: {
    include: ["crypto-browserify", "randombytes"],
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: "index.html", // ✅ Ensures Rollup knows the entry point
    },
  },
});
