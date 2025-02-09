import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "./number-input";
import { useForm } from "react-hook-form";
import { Form } from "../../../../../components/ui/form";

const meta = {
  title: "Data Input/NumberInput",
  component: NumberInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "0,00",
    label: "Valor",
    description: "Digite um valor numérico",
  },
};

export const Currency: Story = {
  args: {
    placeholder: "0,00",
    label: "Preço",
    prefix: "R$ ",
    description: "Digite o preço",
    decimalScale: 2,
    fixedDecimalScale: false,
    value: 1234.56,
  },
};

export const Percentage: Story = {
  args: {
    placeholder: "0,00",
    label: "Porcentagem",
    suffix: "%",
    description: "Digite a porcentagem",
    decimalScale: 1,
    fixedDecimalScale: true,
    value: 85.5,
  },
};

export const CustomFormat: Story = {
  args: {
    placeholder: "0",
    label: "Número",
    thousandSeparator: ",",
    decimalSeparator: ".",
    description: "Formato americano",
    value: 1234567.89,
  },
};

export const WithForm = () => {
  const form = useForm({
    defaultValues: {
      price: 99.99,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <NumberInput
          name="price"
          label="Preço"
          prefix="R$ "
          description="Digite o preço do produto"
        />
      </form>
    </Form>
  );
};
