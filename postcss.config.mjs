/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-prefix-selector": {
      prefix: ".ds",
      transform(prefix, selector, prefixedSelector) {
        if (selector === ":root") {
          return ".ds";
        }

        if (selector === ".dark") {
          return ".ds.dark";
        }

        if (selector.startsWith("html") || selector.startsWith("body")) {
          return ".ds";
        }

        return prefixedSelector;
      },
    },
  },
};

export default config;
