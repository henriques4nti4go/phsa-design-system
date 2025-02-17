import type { Meta, StoryObj } from "@storybook/react";
import { MultipleInput } from "./MultipleInput";
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
    name: "items",
    label: "Itens",
    placeholder: "Adicione itens",
    data: ["Item 1", "Item 2"],
    onChangeData: console.log,
  },
};
export const WithError: Story = {
  args: {
    name: "items",
    label: "Itens",
    placeholder: "Adicione itens",
    error: "Erro ao adicionar item",
  },
};

export const WithForm: Story = {
  render: () => {
    const methods = useForm({
      defaultValues: {
        items: [],
      },
    });

    console.log(methods.watch());

    return (
      <FormProvider {...methods}>
        <MultipleInput
          label="Itens"
          placeholder="Adicione itens"
          name="items"
        />
      </FormProvider>
    );
  },
};
