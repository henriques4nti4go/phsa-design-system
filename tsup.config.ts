import { defineConfig } from "tsup";
import postcss from "esbuild-postcss";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    styles: "src/components/config/DesignSystemProvider/globals.css",
  },
  format: ["cjs", "esm"],
  dts: {
    compilerOptions: {
      incremental: false,
    },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildPlugins: [postcss()], // ← Adiciona PostCSS
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
});
