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
    data: ["R$ 1.234.567,89"],
  },
};

export const WithForm: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: {
        numbers: ["item 1", "item 2"],
      },
    });

    return (
      <FormProvider {...methods}>
        <MultipleNumberInput name="numbers" />
      </FormProvider>
    );
  },
};
