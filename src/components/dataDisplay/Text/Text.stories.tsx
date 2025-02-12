import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "DataDisplay/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["display", "title", "subtitle", "body", "caption", "muted"],
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Display: Story = {
  args: {
    variant: "display",
    children: "Cabeçalho Principal (Display)",
  },
};

export const Title: Story = {
  args: {
    variant: "title",
    children: "Título da Seção",
  },
};

export const Subtitle: Story = {
  args: {
    variant: "subtitle",
    children: "Subtítulo explicativo",
  },
};

export const Normal: Story = {
  args: {
    variant: "normal",
    children: "Texto de corpo padrão",
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
    children: "Texto de legenda",
  },
};

export const Muted: Story = {
  args: {
    variant: "muted",
    children: "Texto desativado ou informativo",
  },
};
