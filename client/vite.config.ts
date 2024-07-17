import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://regal-estates.onrender.com",
        secure: false,
      },
    },
  },

  plugins: [react()],
});
