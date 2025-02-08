import { useState } from "react";
import { DialogWithActions as DialogWithActionsComponent } from "./components/DialogWithActions";
import { Dialog } from "./Dialog";
import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@/components/dataDisplay/Label";
import { Input } from "@/components/dataInput";

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
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </Dialog>
      </div>
    );
  },
};

export const DialogWithActions: Story = {
  render: (args) => {
    return (
      <DialogWithActionsComponent {...args}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
      </DialogWithActionsComponent>
    );
  },
};
