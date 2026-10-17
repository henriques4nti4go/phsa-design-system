import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../radio-group";
import "./index";

const meta = {
  component: "phsa-radio",
  tags: ["autodocs"],
  render: () => html`<phsa-radio value="a" checked>Opção</phsa-radio>`,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const InGroup: Story = {
  render: () => html`
    <phsa-radio-group name="plano" value="pro">
      <phsa-radio value="free">Grátis</phsa-radio>
      <phsa-radio value="pro">Pro</phsa-radio>
    </phsa-radio-group>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <phsa-radio-group name="plano" value="pro">
      <phsa-radio value="free" disabled>Grátis</phsa-radio>
      <phsa-radio value="pro">Pro</phsa-radio>
    </phsa-radio-group>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-radio value="a" checked class="text-base text-violet-700">Texto violeta</phsa-radio>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile button { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
    </style>
    <div class="hostile" style="display:flex;flex-direction:column;gap:.75rem;align-items:flex-start">
      <phsa-radio-group name="isolamento" value="a">
        <phsa-radio value="a">phsa-radio</phsa-radio>
      </phsa-radio-group>
      <button>button nativo</button>
    </div>
  `,
};
