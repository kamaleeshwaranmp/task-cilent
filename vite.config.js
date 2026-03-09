import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "https://task-server-1-vsbe.onrender.com",
        changeOrigin: true
      }
    }
  }

});