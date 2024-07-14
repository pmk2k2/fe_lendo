import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: true,
        ws: true,
      },
      "/api/product": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: true,
        ws: true,
      },
      "/api/product/commodity/view/all": {
        target: "http://localhost:8082",
        changeOrigin: true,
        secure: true,
        ws: true,
      },
    },
  },
  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  plugins: [
    react({}),
  ],
});
