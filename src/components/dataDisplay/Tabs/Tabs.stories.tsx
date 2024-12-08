import type { Meta, StoryObj } from "@storybook/react";

import { Tabs } from "./Tabs";

const meta = {
  title: "DataDisplay/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        label: "Tab 1",
        value: "tab1",
        content: <div>Tab 1 content</div>,
      },
      {
        label: "Tab 2",
        value: "tab2",
        content: <div>Tab 2 content</div>,
      },
    ],
    defaultValue: "tab1",
    onSelectTab: (value) => console.log(value),
  },
};
