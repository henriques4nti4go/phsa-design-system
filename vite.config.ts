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
      entry: {
        ...Object.fromEntries(
          findComponents().map(({ name, category }) => [
            `${name}/index`,
            resolve(import.meta.dirname, `src/components/${category}/${name}/index.ts`),
          ]),
        ),
        // Wrappers React: um entry por componente, para o `/react` só reexportar
        // e o bundler do projeto descartar os que não forem usados.
        "react/index": resolve(import.meta.dirname, "src/react/index.ts"),
        ...Object.fromEntries(
          findComponents().map(({ name }) => [`react/${name}`, resolve(import.meta.dirname, `src/react/${name}.ts`)]),
        ),
      },
    },
    rollupOptions: {
      external: [/^lit/, /^@lit\//, "react"],
      output: {
        chunkFileNames: "chunks/[name]-[hash].js",
        // Os wrappers React usam hooks: no Next (App Router), precisam ser módulos de cliente
        // para funcionar direto em Server Components. O Rollup descarta diretivas do código-fonte,
        // então ela entra como banner só nos arquivos de `react/`.
        banner: (chunk) => (chunk.fileName.startsWith("react/") ? '"use client";' : ""),
      },
    },
  },
});
