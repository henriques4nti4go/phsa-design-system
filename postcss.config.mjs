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
          if (trimmed === ":root") {
            return ".ds";
          }

          // Escopar .dark
          if (trimmed === ".dark") {
            return ".ds.dark";
          }

          // Escopar html e body
          if (trimmed.startsWith("html") || trimmed.startsWith("body")) {
            return ".ds";
          }

          // Para classes utilitárias, criar seletor escopado
          // Isso permite que classes prefixadas funcionem dentro de .ds
          if (trimmed.startsWith(".")) {
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
