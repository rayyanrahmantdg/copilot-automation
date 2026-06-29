import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Proxy /api calls to the local Node backend so the browser talks to one origin.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
