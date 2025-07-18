import type { Meta, StoryObj } from "@storybook/nextjs";

import { Label } from "./index";

const meta = {
  title: "DataDisplay/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label",
  },
};
