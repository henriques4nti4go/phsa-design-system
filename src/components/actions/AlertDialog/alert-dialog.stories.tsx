import type { Meta, StoryObj } from "@storybook/react";
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

export const CustomContent: Story = {
  args: {
    title: "Delete Document",
    description:
      "Are you sure you want to delete this document? This action cannot be undone.",
    children: <Button>Delete Document</Button>,
  },
};

export const WithWarning: Story = {
  args: {
    title: "Warning: Critical Action",
    description:
      "You are about to perform a critical action that will affect all users. Please confirm to proceed.",
    children: <Button variant="destructive">Execute Critical Action</Button>,
  },
};
