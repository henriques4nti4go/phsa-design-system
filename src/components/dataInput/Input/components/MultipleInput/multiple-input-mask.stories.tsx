import { Meta, StoryObj } from "@storybook/react";
import { MultipleInputMask } from "./MultipleInputMask";
import { useForm } from "react-hook-form";
import { Form } from "../../../../../components/ui/form";

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

export const WithForm = () => {
  const form = useForm({
    defaultValues: {
      phones: ["(11) 99999-9999", "(21) 88888-8888"],
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <MultipleInputMask
          name="phones"
          label="Phone Numbers"
          options={{ mask: "(00) 00000-0000" }}
          placeholder="(00) 00000-0000"
        />
      </form>
    </Form>
  );
};
