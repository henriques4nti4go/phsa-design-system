import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./index";

type Args = { value?: number; max: number; label: string };

const meta = {
  title: "Feedback/Progress",
  component: "phsa-progress",
  tags: ["autodocs"],
  args: { value: 45, max: 100, label: "Envio do arquivo" },
  argTypes: { value: { control: "number" }, max: { control: "number" } },
  render: ({ value, max, label }) => html`
    <phsa-progress .value=${value} .max=${max} label=${label} style="max-width:28rem"></phsa-progress>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Indeterminate: Story = {
  render: () => html`<phsa-progress label="Carregando dados" style="max-width:28rem"></phsa-progress>`,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-progress value="70" class="h-4 rounded-none bg-violet-100" style="max-width:28rem"></phsa-progress>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { background: red; height: 40px; border-radius: 0; }
    </style>
    <div class="hostile"><phsa-progress value="60" style="max-width:28rem"></phsa-progress></div>
  `,
};
