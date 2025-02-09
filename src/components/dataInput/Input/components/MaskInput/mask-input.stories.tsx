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
    description: "Digite seu CPF",
    mask: "000.000.000-00",
  },
};

export const Phone: Story = {
  args: {
    placeholder: "(00) 00000-0000",
    label: "Telefone",
    description: "Digite seu telefone",
    mask: "(00) 00000-0000",
  },
};

export const Date: Story = {
  args: {
    placeholder: "00/00/0000",
    label: "Data",
    description: "Digite uma data",
    mask: "00/00/0000",
  },
};

export const WithForm = () => {
  const form = useForm({
    defaultValues: {
      cpf: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <MaskInput
          name="cpf"
          label="CPF"
          mask="000.000.000-00"
          description="Digite seu CPF"
        />
      </form>
    </Form>
  );
};
