import type { StorybookConfig } from "@storybook/nextjs";

const basePath = process.env.STORYBOOK_BASE_PATH || '';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  ...(basePath ? { base: basePath } : {}),
};
export default config;
