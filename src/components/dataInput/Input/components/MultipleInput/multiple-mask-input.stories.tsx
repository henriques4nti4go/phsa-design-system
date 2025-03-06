import type { Meta, StoryObj } from "@storybook/react";
import { MultipleMaskInput } from "./MultipleMaskInput";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const meta: Meta<typeof MultipleMaskInput> = {
  title: "Data Input/Multiple Mask Input",
  component: MultipleMaskInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof MultipleMaskInput>;

export const Default: Story = {
  args: {
    label: "Multiple Input",
    name: "multipleInput",
    data: ["Item 1", "Item 2", "Item 3"],
    placeholder: "000.000.000-00",
    options: {
      mask: "000.000.000-00",
    },
    onChangeData: (data) => {
      console.log(data);
    },
  },
};

export const WithError: Story = {
  args: {
    label: "Multiple Input",
    name: "multipleInput",
    error: "This is an error",
    data: ["Item 1", "Item 2", "Item 3"],
    withoutForm: true,
    placeholder: "000.000.000-00",
    options: {
      mask: "000.000.000-00",
    },
  },
};

export const WithForm: Story = {
  args: {
    label: "Multiple Input",
    name: "multipleInput.data",
    placeholder: "000.000.000-00",
    options: {
      mask: "000.000.000-00",
    },
  },
  decorators: [
    (Story) => {
      const form = useForm({
        defaultValues: {
          multipleInput: {
            data: ["Item 1", "Item 2", "Item 3"],
          },
        },
      });
      return (
        <Form {...form}>
          <Story />
        </Form>
      );
    },
  ],
};
