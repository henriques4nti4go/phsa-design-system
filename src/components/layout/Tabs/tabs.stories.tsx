import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from ".";

const meta: Meta<typeof Tabs> = {
  title: "Layout/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeTabIndex: 1,
    tabs: [
      {
        label: "Tab 1",
        content: <div>Conteúdo da Tab 1</div>,
      },
      {
        label: "Tab 2",
        content: <div>Conteúdo da Tab 2</div>,
      },
      {
        label: "Tab 3",
        content: <div>Conteúdo da Tab 3</div>,
      },
    ],
  },
};

export const Controlled: Story = {
  args: {
    tabs: [
      {
        label: "Tab 1",
        content: <div>Conteúdo da Tab 1</div>,
      },
      {
        label: "Tab 2",
        content: <div>Conteúdo da Tab 2</div>,
      },
      {
        label: "Tab 3",
        content: <div>Conteúdo da Tab 3</div>,
      },
    ],
    activeTabIndex: 0,
    onTabChange: (index) => {
      console.log(`Aba selecionada: ${index}`);
    },
  },
};
