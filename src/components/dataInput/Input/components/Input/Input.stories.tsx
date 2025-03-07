import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./index";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/actions";

const meta: Meta<typeof Input> = {
  title: "Data Input/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Default Input",
    placeholder: "Type something...",
    name: "default",
    mask: "999.999.999-99",
  },
};

export const Required: Story = {
  args: {
    label: "Required Input",
    placeholder: "This field is required",
    name: "required",
    required: true,
  },
};

export const WithForm: Story = {
  args: {
    label: "Input with Form",
    placeholder: "Standalone input",
    name: "test",
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

export const WithFormMask: Story = {
  args: {
    label: "Input with Form",
    placeholder: "Standalone input",
    name: "standalone",
    mask: "999.999.999-99",
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

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "You cannot type here",
    name: "disabled",
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: "Error Input",
    placeholder: "This field is required",
    name: "error",
    error: "This is an error message",
  },
};

export const WithButton: Story = {
  args: {
    label: "Input with Button",
    placeholder: "Type something...",
    name: "default",
    component: <Button>Click me</Button>,
  },
};
