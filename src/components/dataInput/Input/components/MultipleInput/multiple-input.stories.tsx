import type { Meta, StoryObj } from "@storybook/nextjs";
import { MultipleInput } from "./MultipleInput";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const meta: Meta<typeof MultipleInput> = {
  title: "Data Input/Input/Multiple Input",
  component: MultipleInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof MultipleInput>;

export const Default: Story = {
  args: {
    label: "Multiple Input",
    name: "multipleInput",
    data: ["Item 1", "Item 2", "Item 3"],
    placeholder: "Multiple Input",
    onChangeData: (data: string[]) => {
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
    placeholder: "Multiple Input",
  },
};

export const WithForm: Story = {
  args: {
    label: "Multiple Input",
    name: "client.data",
    placeholder: "Multiple Input",
    mask: "999.999.999-99",
  },
  decorators: [
    (Story: React.ComponentType) => {
      const form = useForm({
        defaultValues: {
          client: {
            data: ["Item 1", "Item 2", "Item 3"],
          },
        },
        errors: {
          client: {
            data: {
              message: "This is an error",
            },
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
