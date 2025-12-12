import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      tailwindcss({
        // Tailwind v4 with Vite plugin should automatically use tailwind.config.js
      }),
      react(),
    ],
    server: {
      port: 5173,
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
