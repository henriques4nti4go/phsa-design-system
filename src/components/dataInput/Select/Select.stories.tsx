import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./index";
import { useForm } from "react-hook-form";
import { Button } from "@/components/actions";
import { Form } from "../form";

const meta: Meta<typeof Select> = {
  title: "Data Input/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    options: { control: "object" },
    placeholder: { control: "text" },
    label: { control: "text" },
    value: { control: "text" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ],
    placeholder: "Select an option",
    label: "Select Label",
  },
};

export const WithForm: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ],
    placeholder: "Select an option",
    label: "Select Label",
    name: "select",
  },
  render: (args) => {
    const form = useForm();
    const onSubmit = (data: unknown) => console.log(data);
    return (
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <Select {...args} />
          <Button type="button" onClick={() => console.log(form.getValues())}>
            Submit
          </Button>
        </form>
      </Form>
    );
  },
};
