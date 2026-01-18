import { defineConfig } from "tsup";
import postcss from "esbuild-postcss";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export default defineConfig({
  entry: {
    index: "src/index.ts",
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
  esbuildPlugins: [postcss()],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
    // Usar o novo JSX transform (React 17+) que não requer React no escopo
    options.jsx = 'automatic';
    // Garantir que React seja sempre externalizado
    options.external = (options.external || []).concat(['react', 'react-dom', 'react/jsx-runtime']);
  },
  onSuccess: async () => {
    console.log('📦 Compilando CSS isolado (sem prefixo, escopado com .ds)...');
    
    try {
      const cssEntry = path.join(process.cwd(), 'src/components/config/DesignSystemProvider/globals.css');
      const outputCss = path.join(process.cwd(), 'dist/styles.css');
      const outputJs = path.join(process.cwd(), 'dist/styles.js');

      // Compilar CSS sem prefixo - todas as classes serão escopadas pelo PostCSS
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

      // Ler CSS compilado (já escopado pelo PostCSS)
      let css = fs.readFileSync(outputCss, 'utf-8');

      // Garantir que todas as regras estejam escopadas com .ds
      // O PostCSS já faz isso, mas reforçamos para evitar regras globais

      // Primeiro, transformar :root para .ds (variáveis CSS)
      css = css.replace(/:root\s*\{/g, '.ds{');

      // Depois, escopar todas as outras regras (incluindo tags)
      css = css.replace(/([^{}]*)(\{[^}]*\})/g, (match, selector, rules) => {
        const trimmed = selector.trim();

        // Não modificar at-rules
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
          .map((raw) => {
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

      // Salvar CSS escopado final
      fs.writeFileSync(outputCss, css);

      // Criar módulo JS com CSS para importação
      const jsContent = `export default ${JSON.stringify(css)};`;
      fs.writeFileSync(outputJs, jsContent);

      console.log('✅ CSS isolado compilado com sucesso!');
      console.log('   ✓ Todas as classes Tailwind sem prefixo');
      console.log('   ✓ Tudo escopado com .ds para isolamento completo');
      console.log('   ✓ Compatível com projetos com ou sem Tailwind');
    } catch (error) {
      console.error('❌ Erro ao compilar CSS:', error);
      // Não fazer exit para não quebrar o build se CSS falhar
    }
  },
});
