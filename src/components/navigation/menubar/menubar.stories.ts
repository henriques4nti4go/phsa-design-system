import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./index";

const meta = {
  title: "Navigation/Menubar",
  component: "phsa-menubar",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const bar = (extra = "") => html`
  <phsa-menubar class=${extra}>
    <phsa-menubar-menu label="Arquivo">
      <phsa-dropdown-item value="new">Novo</phsa-dropdown-item>
      <phsa-dropdown-item value="open">Abrir</phsa-dropdown-item>
      <phsa-dropdown-separator></phsa-dropdown-separator>
      <phsa-dropdown-item value="quit">Sair</phsa-dropdown-item>
    </phsa-menubar-menu>
    <phsa-menubar-menu label="Editar">
      <phsa-dropdown-item value="undo">Desfazer</phsa-dropdown-item>
      <phsa-dropdown-item value="redo">Refazer</phsa-dropdown-item>
      <phsa-dropdown-separator></phsa-dropdown-separator>
      <phsa-dropdown-item value="cut">Recortar</phsa-dropdown-item>
      <phsa-dropdown-item value="copy">Copiar</phsa-dropdown-item>
    </phsa-menubar-menu>
    <phsa-menubar-menu label="Ajuda">
      <phsa-dropdown-item value="docs">Documentação</phsa-dropdown-item>
      <phsa-dropdown-item value="about">Sobre</phsa-dropdown-item>
    </phsa-menubar-menu>
  </phsa-menubar>
`;

export const Default: Story = { render: () => bar() };

export const Disabled: Story = {
  render: () => html`
    <phsa-menubar>
      <phsa-menubar-menu label="Arquivo">
        <phsa-dropdown-item value="new">Novo</phsa-dropdown-item>
      </phsa-menubar-menu>
      <phsa-menubar-menu label="Editar" disabled>
        <phsa-dropdown-item value="undo">Desfazer</phsa-dropdown-item>
      </phsa-menubar-menu>
      <phsa-menubar-menu label="Ajuda">
        <phsa-dropdown-item value="docs">Documentação</phsa-dropdown-item>
      </phsa-menubar-menu>
    </phsa-menubar>
  `,
};

export const WithEvent: Story = {
  render: () => html`
    <div
      @phsa-select=${(event: CustomEvent<{ value: string }>) => {
        (event.currentTarget as HTMLElement).querySelector("output")!.textContent = event.detail.value;
      }}
    >
      ${bar()}
      <output style="display:block;margin-top:.75rem"></output>
    </div>
  `,
};

export const CustomClasses: Story = { render: () => bar("rounded-none bg-muted p-2") };

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile div { background: red; color: yellow; }
    </style>
    <div class="hostile">${bar()}</div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`<div style="--phsa-background: oklch(0.97 0.02 264); --phsa-radius: 1rem">${bar()}</div>`,
};
