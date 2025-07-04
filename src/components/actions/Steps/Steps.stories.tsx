import type { Meta, StoryObj } from "@storybook/nextjs";
import { fn } from "storybook/test";

import { Steps } from "./Steps";

const meta = {
  title: "Action/Steps",
  component: Steps,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
    value: 3,
  },
};
