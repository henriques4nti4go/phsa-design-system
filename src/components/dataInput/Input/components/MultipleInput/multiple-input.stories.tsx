import { Meta, StoryObj } from "@storybook/react";
import { MultipleInput } from "./MultipleInput";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

const meta: Meta<typeof MultipleInput> = {
  title: "Data Input/MultipleInput",
  component: MultipleInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultipleInput>;

export const Default: Story = {
  args: {
    label: "Multiple Input",
    placeholder: "Enter value",
    data: ["Item 1", "Item 2"],
    onChangeData: (data) => console.log("Data changed:", data),
  },
};

export const WithValidation: Story = {
  args: {
    label: "Multiple Input with Validation",
    placeholder: "Enter value",
    data: ["Item 1", "Item 2"],
    onChangeData: (data) => console.log("Data changed:", data),
    required: true,
  },
};

export const WithForm: Story = {
  args: {
    name: "multipleInput",
    label: "Multiple Input",
    placeholder: "Enter value",
    data: ["Item 1", "Item 2"],
    onChangeData: (data) => console.log("Data changed:", data),
  },
  render: (args) => {
    const form = useForm();
    return (
      <Form {...form}>
        <form className="space-y-6">
          <MultipleInput {...args} />
        </form>
      </Form>
    );
  },
};
