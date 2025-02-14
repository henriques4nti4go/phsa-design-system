import type { Meta, StoryObj } from "@storybook/react";
import { MultipleInput } from ".";

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
    data: [],
    onChangeData: (data) => {
      console.log("Dados atualizados:", data);
    },
  },
};

export const WithInitialData: Story = {
  args: {
    data: ["Item 1", "Item 2"],
    onChangeData: (data) => {
      console.log("Dados atualizados:", data);
    },
  },
};
