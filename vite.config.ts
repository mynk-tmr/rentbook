import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import vercel from "vite-plugin-vercel";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    vercel(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      external: ["./server"],
    },
  },
});
