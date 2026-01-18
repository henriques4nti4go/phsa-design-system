import { defineConfig } from "tsup";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

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
      const cssEntry = path.join(process.cwd(), 'src/components/config/DesignSystemProvider/globals.css');
      const outputCss = path.join(process.cwd(), 'dist/styles.css');

      // Compilar CSS com Tailwind
      execSync(
        `npx tailwindcss -i "${cssEntry}" -o "${outputCss}" --minify`,
        {
          cwd: process.cwd(),
          stdio: 'inherit',
          env: {
            ...process.env,
            BUILD_LIB: 'true',
          },
        }
      );

      // Ler e processar CSS
      let css = fs.readFileSync(outputCss, 'utf-8');

      // Transformar :root para .ds (variáveis CSS)
      css = css.replace(/:root\s*\{/g, '.ds{');

      // Escopar regras com .ds
      css = css.replace(/([^{}]*)(\{[^}]*\})/g, (match, selector, rules) => {
        const trimmed = selector.trim();

        if (
          trimmed.startsWith('@keyframes') ||
          trimmed.startsWith('@import') ||
          trimmed.startsWith('@media') ||
          trimmed.startsWith('@supports')
        ) {
          return match;
        }

        const scopedSelector = selector
          .split(',')
          .map((raw: string) => {
            const sel = raw.trim();
            if (!sel) return sel;
            if (sel.includes('.ds')) return sel;
            if (sel.startsWith(':root')) return sel.replace(':root', '.ds');
            if (sel.startsWith('@')) return sel;
            return `.ds ${sel}`;
          })
          .join(',');

        return `${scopedSelector}${rules}`;
      });

      // Salvar CSS final
      fs.writeFileSync(outputCss, css);

      console.log('✅ Build concluído!');
      console.log('   ✓ CSS disponível em dist/styles.css');
      console.log('   ✓ Customizável via CSS Variables');
    } catch (error) {
      console.error('❌ Erro ao compilar CSS:', error);
    }
  },
});
