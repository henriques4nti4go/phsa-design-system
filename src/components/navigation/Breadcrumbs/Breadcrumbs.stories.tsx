import type { Meta, StoryObj } from "@storybook/nextjs";

import { Breadcrumbs } from "./index";

const meta = {
  title: "Navigation/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { href: "/", label: "Home" },
      { href: "/components", label: "Components" },
      { href: "/components/breadcrumb", label: "Breadcrumb" },
    ],
  },
};
