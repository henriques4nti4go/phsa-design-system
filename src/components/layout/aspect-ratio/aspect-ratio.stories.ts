import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./index";

type Args = { ratio: string };

const fill = (label: string) => html`
  <div style="display:flex;height:100%;align-items:center;justify-content:center;background:var(--phsa-muted);color:var(--phsa-muted-foreground);font-size:.875rem">${label}</div>
`;

const meta = {
  title: "Layout/Aspect Ratio",
  component: "phsa-aspect-ratio",
  tags: ["autodocs"],
  args: { ratio: "16/9" },
  render: ({ ratio }) => html`
    <phsa-aspect-ratio ratio=${ratio} class="max-w-sm">${fill(ratio)}</phsa-aspect-ratio>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const Square: Story = { args: { ratio: "1" } };
export const Portrait: Story = { args: { ratio: "3/4" } };

export const CustomClasses: Story = {
  render: () => html`
    <phsa-aspect-ratio ratio="16/9" class="max-w-sm rounded-none">${fill("16/9")}</phsa-aspect-ratio>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
    </style>
    <div class="hostile">
      <phsa-aspect-ratio ratio="16/9" class="max-w-sm">${fill("isolado")}</phsa-aspect-ratio>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-muted:oklch(0.9 0.04 264);--phsa-radius:1rem">
      <phsa-aspect-ratio ratio="21/9" class="max-w-sm">${fill("21/9")}</phsa-aspect-ratio>
    </div>
  `,
};
