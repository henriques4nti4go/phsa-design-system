import type { Meta, StoryObj } from "@storybook/nextjs";

import { Sheet } from "./index";

const meta = {
  title: "Layout/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
  args: {
    open: false,
    children: "Sheet content",
  },
  argTypes: {
    open: {
      control: {
        type: "boolean",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
