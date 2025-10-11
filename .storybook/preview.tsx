import type { Preview } from "@storybook/react";
import React from "react";
import { DesignSystemProvider } from "../src/components/config/DesignSystemProvider";

const preview: Preview = {
  decorators: [
    (Story) => (
      <DesignSystemProvider>
        <Story />
      </DesignSystemProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
