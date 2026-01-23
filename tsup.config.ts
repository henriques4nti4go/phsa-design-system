import { defineConfig } from "tsup";
import path from "path";
import fs from "fs";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "tailwind-preset": "src/tailwind-preset.ts",
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
  external: ["react", "react-dom", "react/jsx-runtime"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
    options.jsx = 'automatic';
    options.external = (options.external || []).concat(['react', 'react-dom', 'react/jsx-runtime']);
  },
  onSuccess: async () => {
    console.log('📦 Compilando CSS...');
    
    try {
      const cssEntry = path.join(process.cwd(), 'src/app/globals.css');
      const outputCss = path.join(process.cwd(), 'dist/styles.css');

      // Ler o arquivo CSS
      const cssContent = fs.readFileSync(cssEntry, 'utf8');

      // Processar com PostCSS (Tailwind CSS 4.x + Autoprefixer)
      const result = await postcss([
        tailwindcss,
        autoprefixer,
      ]).process(cssContent, {
        from: cssEntry,
        to: outputCss,
      });

      // Escrever o CSS compilado
      fs.writeFileSync(outputCss, result.css, 'utf8');

      console.log('✅ Build concluído!');
      console.log('   ✓ CSS disponível em dist/styles.css');
    } catch (error) {
      console.error('❌ Erro ao compilar CSS:', error);
      throw error;
    }
  },
});
