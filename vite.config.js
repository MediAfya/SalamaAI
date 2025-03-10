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
  base: "/SalamaAI/",
  //base: "./",
  define: {
    global: "window", // Polyfill global as window
  },
  optimizeDeps: {
    include: ["crypto-browserify", "randombytes"],
  },
});
