import type { Meta, StoryObj } from "@storybook/nextjs";

import { Card } from "./index";
import { Button } from "../../../components/actions";

const meta = {
  title: "DataDisplay/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Card title",
    description: "Card description",
    footer: () => <Button>Card footer</Button>,
  },
};
