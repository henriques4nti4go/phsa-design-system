import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";
import { useState } from "react";

const meta = {
  title: "Action/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Dialog Title",
    description: "Dialog Description",
    footer: () => <button>Footer Button</button>,
  },
  render: (props) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
      <div>
        <button onClick={() => setOpen(true)}>Open Dialog</button>
        <Dialog {...props} open={open} onOpenChange={setOpen}>
          Dialog
        </Dialog>
      </div>
    );
  },
};
