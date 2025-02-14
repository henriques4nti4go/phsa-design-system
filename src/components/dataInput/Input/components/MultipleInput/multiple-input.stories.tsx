import type { Meta, StoryObj } from "@storybook/react";
import { MultipleInput } from ".";
import { useForm, FormProvider } from "react-hook-form";

const meta: Meta<typeof MultipleInput> = {
  title: "Data Input/MultipleInput",
  component: MultipleInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Items",
    data: ["Item 1", "Item 2", "Item 3"],
    onChangeData: (data: string[]) => console.log(data),
  },
};

export const WithError: Story = {
  args: {
    label: "Items",
    data: ["Item 1", "Item 2", "Item 3"],
    onChangeData: (data: string[]) => console.log(data),
    error: "This is an error",
  },
};

export const WithForm: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        items: ["asdasda"], // Valor inicial
      },
    });

    console.log(form.watch("items"));

    return (
      <FormProvider {...form}>
        <MultipleInput name="items" label="Items" />
      </FormProvider>
    );
  },
};
