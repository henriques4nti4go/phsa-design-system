import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "../../feedback/dialog";
import "./index";

const meta = {
  title: "Overlays/Command",
  component: "phsa-command",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const groups = html`
  <phsa-command-group label="Projeto">
    <phsa-command-item value="new">Novo arquivo</phsa-command-item>
    <phsa-command-item value="open">Abrir</phsa-command-item>
  </phsa-command-group>
  <phsa-command-separator></phsa-command-separator>
  <phsa-command-group label="Conta">
    <phsa-command-item value="settings" disabled>Configurações</phsa-command-item>
    <phsa-command-item value="logout">Sair</phsa-command-item>
  </phsa-command-group>
  <phsa-command-separator></phsa-command-separator>
  <phsa-command-group label="Ajuda">
    <phsa-command-item value="shortcuts">Atalhos</phsa-command-item>
  </phsa-command-group>
`;

const palette = (extra = "") => html`
  <phsa-command class=${extra} placeholder="Buscar ação">${groups}</phsa-command>
`;

export const Default: Story = { render: () => palette("max-w-sm") };

export const Dialog: Story = {
  render: () => html`
    <phsa-dialog open title="Paleta" description="Escolha uma ação.">
      <phsa-command placeholder="Buscar ação">${groups}</phsa-command>
    </phsa-dialog>
  `,
};

export const CustomClasses: Story = {
  render: () => palette("max-w-sm rounded-none border-2 shadow-none"),
};

export const Isolation: Story = {
  render: () => html`
    <style>
      input, button { font-family: "Comic Sans MS", cursive; background: red; color: yellow; }
    </style>
    ${palette("max-w-sm")}
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-background: oklch(0.97 0.02 264); --phsa-accent: oklch(0.92 0.04 264); --phsa-radius: 1rem">
      ${palette("max-w-sm")}
    </div>
  `,
};
