import type { Meta, StoryObj } from "@storybook/nextjs";
import { MaskInput } from "./mask-input";
import { useForm } from "react-hook-form";
import { Form } from "../../../../../components/ui/form";

const meta = {
  title: "Data Input/Input/MaskInput",
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
    placeholder: "99999-999",
    label: "CEP",
    mask: "00000-000",
  },
};

export const CPF: Story = {
  args: {
    placeholder: "000.000.000-00",
    label: "CPF",
    mask: "000.000.000-00",
  },
};

export const Phone: Story = {
  args: {
    placeholder: "(00) 00000-0000",
    label: "Telefone",
    mask: "(00) 00000-0000",
  },
};

export const Date: Story = {
  args: {
    placeholder: "00/00/0000",
    label: "Data",
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
          placeholder="000.000.000-00"
          mask="000.000.000-00"
        />
      </form>
    </Form>
  );
};
