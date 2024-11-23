import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "../../../components/actions";
import { Toaster, useToast } from "./index";

const meta = {
  title: "DataInput/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Success",
    description: "This is a success message",
    variant: "default",
  },
  argTypes: {
    descritpion: { control: { type: "text" } },
    title: { control: { type: "text" } },
    variant: {
      control: {
        type: "select",
      },
      options: ["default", "success", "destructive"],
    },
  },
  render: (args) => {
    const { toast } = useToast();
    return (
      <div className="w-[500px] h-[500px]">
        <Button onClick={() => toast(args)}>Success</Button>
        <Toaster />
      </div>
    );
  },
};
