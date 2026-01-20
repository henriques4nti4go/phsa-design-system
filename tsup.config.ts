import { defineConfig } from "tsup";
import { execSync } from "child_process";
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
        }
      );

      console.log('✅ Build concluído!');
      console.log('   ✓ CSS disponível em dist/styles.css');
    } catch (error) {
      console.error('❌ Erro ao compilar CSS:', error);
    }
  },
});
