import type { Meta, StoryObj } from "@storybook/nextjs";
import { AlertDialog } from "./AlertDialog";
import { Button } from "../../ui/button";

const meta: Meta<typeof AlertDialog> = {
  title: "Action/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  args: {
    title: "Are you absolutely sure?",
    description:
      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    children: <Button variant="destructive">Delete Account</Button>,
  },
};
