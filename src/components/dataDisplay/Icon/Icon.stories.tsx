import type { Meta, StoryObj } from "@storybook/nextjs";

import { Icon } from "./index";

const meta = {
  title: "DataDisplay/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "MdHome",
  },
};
