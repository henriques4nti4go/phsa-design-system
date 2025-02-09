import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import { Form } from "../../../components/ui/form";

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

export const WithForm = () => {
  const form = useForm({
    defaultValues: {
      username: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <Input
          name="username"
          label="Username"
          description="This is your public display name."
        />
      </form>
    </Form>
  );
};
