import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { Form } from "../form";
import { useForm } from "react-hook-form";

type Story = StoryObj<typeof Checkbox>;

const meta = {
  title: "Data Input/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "Accept terms and conditions",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const Checked: Story = {
  args: {
    label: "Accept terms and conditions",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Accept terms and conditions",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Accept terms and conditions",
    disabled: true,
    checked: true,
  },
};

export const WithForm: Story = {
  args: {
    label: "Accept terms and conditions",
  },
  decorators: [
    (Story: React.ComponentType) => {
      const form = useForm();

      return (
        <Form {...form}>
          <Story />
        </Form>
      );
    },
  ],
};
