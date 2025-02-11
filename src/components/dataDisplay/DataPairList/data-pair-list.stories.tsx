import type { Meta, StoryObj } from "@storybook/react";
import { DataPairList } from ".";

const meta = {
  title: "DataDisplay/DataPairList",
  component: DataPairList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataPairList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Informações Pessoais",
    data: {
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      phone: "(11) 99999-9999",
    },
  },
};

export const WithLabels: Story = {
  args: {
    title: "Informações Pessoais",
    data: {
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      phone: "(11) 99999-9999",
    },
    labels: {
      name: "Nome",
      age: "Idade",
      email: "E-mail",
      phone: "Telefone",
    },
  },
};

export const WithoutTitle: Story = {
  args: {
    data: {
      name: "John Doe",
      age: 30,
      email: "john@example.com",
      phone: "(11) 99999-9999",
    },
  },
};

export const EmptyData: Story = {
  args: {
    title: "Sem Dados",
    data: {},
  },
};

export const WithClassName: Story = {
  args: {
    title: "Com Classe Customizada",
    data: {
      name: "John Doe",
      age: 30,
    },
    className: "bg-slate-100",
  },
};
