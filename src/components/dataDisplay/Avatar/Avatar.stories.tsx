import type { Meta, StoryObj } from "@storybook/nextjs";
import { Avatar } from "./Avatar";

const meta = {
  title: "DataDisplay/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://github.com/shadcn.png",
    alt: "Avatar",
    avatarFallback: "A",
  },
};
