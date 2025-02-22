import type { Meta, StoryObj } from "@storybook/react";
import { MultipleNumberInput } from "./MultipleNumberInput";
import { useForm, FormProvider } from "react-hook-form";

const meta: Meta<typeof MultipleNumberInput> = {
  title: "Data Input/MultipleNumberInput",
  component: MultipleNumberInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "0",
    label: "Preço",
    prefix: "R$ ",
    thousandSeparator: ".",
    decimalSeparator: ",",
    value: 1234567.89,
    data: ["123456.89"],
  },
};

export const WithForm: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: {
        numbers: ["1234", "1234.5"],
      },
    });

    return (
      <FormProvider {...methods}>
        <MultipleNumberInput
          label="Itens"
          name="numbers"
          placeholder="Entre com um valor"
          prefix="R$ "
          thousandSeparator="."
          decimalSeparator=","
        />
      </FormProvider>
    );
  },
};
