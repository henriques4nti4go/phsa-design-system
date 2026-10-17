import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../badge";
import "./index";

const meta = {
  title: "Data Display/Table",
  component: "phsa-table",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const equipe = (extra = "max-w-lg") => html`
  <phsa-table class=${extra} caption="Equipe">
    <phsa-column label="Nome" sortable></phsa-column>
    <phsa-column label="Papel"></phsa-column>
    <phsa-column label="Status"></phsa-column>
    <phsa-row>
      <phsa-cell>Ana Costa</phsa-cell>
      <phsa-cell>Editora</phsa-cell>
      <phsa-cell><phsa-badge variant="success">Ativa</phsa-badge></phsa-cell>
    </phsa-row>
    <phsa-row>
      <phsa-cell>Bruno Lima</phsa-cell>
      <phsa-cell>Leitor</phsa-cell>
      <phsa-cell><phsa-badge variant="secondary">Convidado</phsa-badge></phsa-cell>
    </phsa-row>
    <phsa-row>
      <phsa-cell>Carla Dias</phsa-cell>
      <phsa-cell>Administradora</phsa-cell>
      <phsa-cell><phsa-badge variant="success">Ativa</phsa-badge></phsa-cell>
    </phsa-row>
  </phsa-table>
`;

export const Default: Story = {
  render: () => equipe(),
};

export const Empty: Story = {
  render: () => html`
    <phsa-table class="max-w-lg" caption="Convites">
      <phsa-column label="E-mail"></phsa-column>
    </phsa-table>
  `,
};

export const CustomClasses: Story = {
  render: () => equipe("max-w-lg rounded-none border-2 text-xs"),
};

export const Isolation: Story = {
  render: () => html`
    <style>
      table, th, td { font-family: "Comic Sans MS", cursive; background: red; color: yellow; }
    </style>
    <div>${equipe()}</div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-muted: oklch(0.93 0.03 264); --phsa-border: oklch(0.55 0.15 264); --phsa-radius: 1rem">${equipe()}</div>
  `,
};

