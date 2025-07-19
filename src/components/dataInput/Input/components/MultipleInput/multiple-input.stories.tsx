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
    withoutForm: true,
    onAdd: (data: string) => {
      console.log("Added:", data);
    },
    onRemove: (index: number) => {
      console.log("Removed index:", index);
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
    withoutForm: true,
    onAdd: (data: string) => {
      console.log("Added:", data);
    },
    onRemove: (index: number) => {
      console.log("Removed index:", index);
    },
  },
};

export const WithForm: Story = {
  args: {
    label: "Multiple Input",
    name: "client",
    placeholder: "Multiple Input",
  },
  decorators: [
    (Story: React.ComponentType) => {
      const form = useForm({
        defaultValues: {
          client: ["Item 1", "Item 2", "Item 3"],
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

export const WithMaskAndForm: Story = {
  args: {
    label: "Phone Numbers",
    name: "phoneNumbers",
    placeholder: "Enter phone number",
    mask: "(99) 99999-9999",
  },
  decorators: [
    (Story: React.ComponentType) => {
      const form = useForm({
        defaultValues: {
          phoneNumbers: ["(11) 99999-9999", "(21) 88888-8888"],
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
