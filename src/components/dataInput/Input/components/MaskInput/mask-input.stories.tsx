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
    mask: "99999-999",
  },
};

export const CPF: Story = {
  args: {
    placeholder: "999.999.999-99",
    label: "CPF",
    mask: "999.999.999-99",
  },
};

export const Phone: Story = {
  args: {
    placeholder: "(99) 99999-9999",
    label: "Telefone",
    mask: "(99) 99999-9999",
  },
};

export const Date: Story = {
  args: {
    placeholder: "99/99/9999",
    label: "Data",
    mask: "99/99/9999",
  },
};

export const LettersExample: Story = {
  args: {
    placeholder: "AAA-9999",
    label: "Código com Letras",
    mask: "AAA-9999",
  },
};

export const MixedExample: Story = {
  args: {
    placeholder: "A99-AAA-999",
    label: "Código Misto",
    mask: "A99-AAA-999",
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
          placeholder="999.999.999-99"
          mask="999.999.999-99"
        />
      </form>
    </Form>
  );
};
