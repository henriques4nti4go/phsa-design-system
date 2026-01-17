import { defineConfig } from "tsup";
import postcss from "esbuild-postcss";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Plugin para adicionar prefixo às classes Tailwind
const prefix = 'phsa-';

function transformClassName(className: string) {
  if (!className) return className;
  
  return className
    .split(/\s+/)
    .map(cls => {
      const trimmed = cls.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('phsa-')) return trimmed;
      if (trimmed.startsWith('!') || trimmed.startsWith('[')) return trimmed;
      if (!trimmed.includes('-') && !trimmed.match(/^(flex|grid|block|inline|hidden|visible)$/)) {
        return trimmed;
      }
      return prefix + trimmed;
    })
    .filter(Boolean)
    .join(' ');
}

function transformContent(content: string) {
  content = content.replace(
    /className\s*=\s*["']([^"']+)["']/g,
    (match, classes) => {
      const transformed = transformClassName(classes);
      return transformed !== classes ? `className="${transformed}"` : match;
    }
  );

  content = content.replace(
    /className\s*=\s*\{`([^`]+)`\}/g,
    (match, classes) => {
      const transformed = transformClassName(classes);
      return transformed !== classes ? `className={\`${transformed}\`}` : match;
    }
  );

  content = content.replace(
    /cva\s*\(\s*["']([^"']+)["']/g,
    (match, classes) => {
      const transformed = transformClassName(classes);
      return transformed !== classes ? `cva("${transformed}"` : match;
    }
  );

  return content;
}

const prefixPlugin = {
  name: 'tailwind-prefix',
  setup(build: any) {
    build.onLoad({ filter: /\.(tsx?|jsx?)$/ }, async (args: any) => {
      const contents = fs.readFileSync(args.path, 'utf8');
      const transformed = transformContent(contents);
      
      return {
        contents: transformed,
        loader: args.path.endsWith('.tsx') ? 'tsx' : args.path.endsWith('.ts') ? 'ts' : 'jsx',
      };
    });
  },
};

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
  external: ["react", "react-dom"],
  esbuildPlugins: [postcss(), prefixPlugin],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
  onSuccess: async () => {
    console.log('📦 Compilando CSS isolado...');
    
    // Definir variáveis para build isolado
    process.env.BUILD_LIB = 'true';
    process.env.DS_PREFIX = 'phsa-';
    
    try {
      const cssEntry = path.join(process.cwd(), 'src/components/config/DesignSystemProvider/globals.css');
      const outputCss = path.join(process.cwd(), 'dist/styles.css');
      const outputJs = path.join(process.cwd(), 'dist/styles.js');

      // Compilar CSS usando Tailwind CLI
      execSync(
        `npx tailwindcss -i "${cssEntry}" -o "${outputCss}" --minify`,
        {
          cwd: process.cwd(),
          stdio: 'inherit',
          env: {
            ...process.env,
            BUILD_LIB: 'true',
            DS_PREFIX: 'phsa-',
          },
        }
      );

      // Ler CSS compilado
      let css = fs.readFileSync(outputCss, 'utf-8');

      // Escopar todas as regras CSS com .ds
      css = css.replace(/^([^{]+)\{/gm, (match, selector) => {
        const trimmed = selector.trim();
        
        // Não escopar se já tiver .ds
        if (trimmed.includes('.ds')) return match;
        
        // Manter variáveis CSS em :root (já transformado para .ds pelo postcss)
        if (trimmed === ':root' || trimmed === '.ds') return match;
        
        // Escopar classes utilitárias: .phsa-rounded-md -> .ds .phsa-rounded-md
        if (trimmed.startsWith('.')) {
          return `.ds ${trimmed}{`;
        }
        
        return match;
      });

      // Salvar CSS escopado
      fs.writeFileSync(outputCss, css);

      // Criar módulo JS com CSS para importação
      const jsContent = `export default ${JSON.stringify(css)};`;
      fs.writeFileSync(outputJs, jsContent);

      console.log('✅ CSS isolado compilado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao compilar CSS:', error);
      // Não fazer exit para não quebrar o build se CSS falhar
    }
  },
});
