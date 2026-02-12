import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    host: "0.0.0.0",
    port: process.env.PORT,
    allowedHosts: ["private-notes-frontend-hzy4.onrender.com"],
  },
});
