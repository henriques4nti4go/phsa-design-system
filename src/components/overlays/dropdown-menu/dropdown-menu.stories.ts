import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "./index";

const meta = {
  title: "Overlays/Dropdown Menu",
  component: "phsa-dropdown-menu",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const menu = (extra = "") => html`
  <phsa-dropdown-menu class=${extra}>
    <phsa-button slot="trigger" type="button" variant="outline">Ações</phsa-button>
    <phsa-dropdown-item value="edit">Editar</phsa-dropdown-item>
    <phsa-dropdown-item value="copy">Duplicar</phsa-dropdown-item>
    <phsa-dropdown-item value="archive" disabled>Arquivar</phsa-dropdown-item>
    <phsa-dropdown-separator></phsa-dropdown-separator>
    <phsa-dropdown-item value="delete" variant="destructive">Excluir</phsa-dropdown-item>
  </phsa-dropdown-menu>
`;

export const Default: Story = { render: () => menu() };

export const CustomClasses: Story = { render: () => menu("min-w-56 rounded-none") };

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile div { background: red; color: yellow; }
    </style>
    <div class="hostile">${menu()}</div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`<div style="--phsa-background: oklch(0.97 0.02 264); --phsa-radius: 1rem">${menu()}</div>`,
};
