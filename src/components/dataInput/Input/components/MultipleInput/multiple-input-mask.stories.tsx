import { Meta, StoryObj } from "@storybook/react";
import { MultipleInputMask } from "./MultipleInputMask";
import { useForm } from "react-hook-form";
import { Form } from "../../../../../components/ui/form";
import { MultipleInput } from "./MultipleInput";

const meta: Meta<typeof MultipleInputMask> = {
  title: "Data Input/Multiple Input Mask",
  component: MultipleInputMask,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultipleInputMask>;

export const PhoneNumbers: Story = {
  args: {
    label: "Phone Numbers",
    data: ["(11) 99999-9999", "(21) 88888-8888"],
    options: {
      mask: "(00) 00000-0000",
    },
    placeholder: "(00) 00000-0000",
  },
};

export const CPFs: Story = {
  args: {
    label: "CPF List",
    data: ["123.456.789-00", "987.654.321-00"],
    options: {
      mask: "000.000.000-00",
    },
    placeholder: "000.000.000-00",
  },
};

export const Dates: Story = {
  args: {
    label: "Important Dates",
    data: ["01/01/2024", "31/12/2024"],
    options: {
      mask: "00/00/0000",
    },
    placeholder: "DD/MM/YYYY",
  },
};

export const WithForm: Story = {
  args: {
    name: "multipleInput",
    label: "Multiple Input",
    placeholder: "Enter value",
    data: ["Item 1", "Item 2"],
    options: {
      mask: "000.000.000-00",
    },
    onChangeData: (data) => console.log("Data changed:", data),
  },
  render: (args) => {
    const form = useForm();
    return (
      <Form {...form}>
        <form className="space-y-6">
          <MultipleInputMask {...args} />
        </form>
      </Form>
    );
  },
};
