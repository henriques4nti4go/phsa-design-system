import type { StorybookConfig } from "@storybook/web-components-vite";

const config: StorybookConfig = {
  // Título de cada story = categoria/nome da pasta (ex.: "Forms/Input").
  stories: [{ directory: "../src/components", files: "**/*.stories.ts" }],
  addons: ["@storybook/addon-docs"],
  framework: "@storybook/web-components-vite",
  // O vite.config.ts é do build da lib; o Storybook só aproveita o pipeline de CSS.
  viteFinal(config) {
    delete config.build?.lib;
    delete config.build?.rollupOptions;
    return config;
  },
};

export default config;
