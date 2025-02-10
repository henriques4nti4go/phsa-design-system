import type { Meta, StoryObj } from "@storybook/react";
import { Input } from ".";
import { useForm } from "react-hook-form";
import { Form } from "../../../../../components/ui/form";

const meta = {
  title: "Data Input/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type something...",
    label: "Label",
    description: "This is a description",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Type something...",
    label: "Label",
    error: "This field is required",
  },
};

interface WithFormProps {
  name?: string;
  label?: string;
  description?: string;
  placeholder?: string;
}

const WithFormComponent = (props: WithFormProps) => {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="space-y-6">
        <Input {...props} />
      </form>
    </Form>
  );
};

export const WithForm: Story = {
  render: WithFormComponent,
  args: {
    name: "username",
    label: "Username",
    description: "Type your username",
  },
};
