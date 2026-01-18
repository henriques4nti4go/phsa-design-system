/** @type {import('postcss-load-config').Config} */
const isBuild = process.env.BUILD_LIB === 'true' || process.env.NODE_ENV === 'production';

const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Escopar CSS apenas no build da lib
    ...(isBuild && {
      "postcss-prefix-selector": {
        prefix: ".ds",
        transform(prefix, selector, prefixedSelector) {
          const trimmed = selector.trim();
          
          // Transformar :root para .ds (variáveis CSS)
          // Isso garante que as variáveis CSS estejam disponíveis dentro do escopo .ds
          if (trimmed === ":root") {
            return ".ds";
          }
          
          // Também transformar :root seguido de espaço ou vírgula
          if (trimmed.startsWith(":root")) {
            return trimmed.replace(":root", ".ds");
          }

          // Escopar .dark
          if (trimmed === ".dark") {
            return ".ds.dark";
          }

          // Escopar html e body
          if (trimmed.startsWith("html") || trimmed.startsWith("body")) {
            return ".ds";
          }

          // Escopar todas as classes utilitárias com .ds
          // Isso garante isolamento completo sem precisar de prefixo
          if (trimmed.startsWith(".")) {
            // Verificar se já não está escopado
            if (!trimmed.includes('.ds')) {
              return `.ds ${trimmed}`;
            }
          }

          // Escopar seletores complexos (ex: .dark .bg-primary)
          if (trimmed.includes(' ') && !trimmed.includes('.ds')) {
            return `.ds ${trimmed}`;
          }

          return prefixedSelector;
        },
        // Não prefixar seletor se já tiver .ds
        exclude: [/^\.ds/],
      },
    }),
  },
};

export default config;
