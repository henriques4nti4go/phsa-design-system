import type { Meta, StoryObj } from "@storybook/react";
import { MaskInput } from "./mask-input";
import { useForm } from "react-hook-form";
import { Form } from "../../../../../components/ui/form";

const meta = {
  title: "Data Input/MaskInput",
  component: MaskInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MaskInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "000.000.000-00",
    label: "CPF",
    mask: "999.999.999-99",
  },
};

export const Phone: Story = {
  args: {
    placeholder: "(99) 99999-9999",
    label: "Telefone",
  },
};

export const Date: Story = {
  args: {
    placeholder: "99/99/9999",
    label: "Data",
  },
};

export const WithForm = () => {
  const form = useForm({
    defaultValues: {
      cpf: "999.999.999-99",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <MaskInput
          name="cpf"
          label="CPF"
          placeholder="000.000.000-00"
          mask="999.999.999-99"
        />
      </form>
    </Form>
  );
};
