import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { BADGE_VARIANTS, type BadgeVariant } from "./badge";
import "./index";

type Args = { label: string; variant: BadgeVariant };

const meta = {
  title: "Data Display/Badge",
  component: "phsa-badge",
  tags: ["autodocs"],
  args: { label: "Novo", variant: "default" },
  argTypes: { variant: { control: "select", options: BADGE_VARIANTS } },
  render: ({ label, variant }) => html`<phsa-badge variant=${variant}>${label}</phsa-badge>`,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

const row = (content: unknown) => html`<div style="display:flex;flex-wrap:wrap;gap:.75rem;align-items:center">${content}</div>`;

export const Default: Story = {};

export const Variants: Story = {
  render: () => row(BADGE_VARIANTS.map((variant) => html`<phsa-badge variant=${variant}>${variant}</phsa-badge>`)),
};

export const CustomClasses: Story = {
  render: () => html`<phsa-badge class="rounded-full px-4 text-sm">Grande</phsa-badge>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile span { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
    </style>
    <div class="hostile" style="display:flex;gap:.75rem;align-items:center">
      <phsa-badge>phsa</phsa-badge>
      <span>span nativo</span>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-primary: oklch(0.55 0.22 264); --phsa-radius: 9999px">
      <phsa-badge>Tema</phsa-badge>
    </div>
  `,
};
