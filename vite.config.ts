import { resolve } from "node:path";
import { defineConfig } from "vite";
import { findComponents } from "./scripts/components.mjs";

// Um entry por componente, com caminho plano: `@phsa.tec/.../button` carrega só o button.
export default defineConfig({
  build: {
    outDir: resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    target: "es2022",
    lib: {
      formats: ["es"],
      entry: Object.fromEntries(
        findComponents().map(({ name, category }) => [
          `${name}/index`,
          resolve(import.meta.dirname, `src/components/${category}/${name}/index.ts`),
        ]),
      ),
    },
    rollupOptions: {
      external: [/^lit/],
      output: { chunkFileNames: "chunks/[name]-[hash].js" },
    },
  },
});
