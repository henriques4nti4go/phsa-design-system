import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../badge";
import "../pagination";
import "./index";

const meta = {
  title: "Data Display/Table",
  component: "phsa-table",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const equipe = (extra = "max-w-lg", selectable = false) => html`
  <phsa-table class=${extra} caption="Equipe" ?selectable=${selectable}>
    <phsa-column key="name" label="Nome" sortable width="40%"></phsa-column>
    <phsa-column key="role" label="Papel"></phsa-column>
    <phsa-column key="status" label="Status" align="right"></phsa-column>
    <phsa-row value="ana">
      <phsa-cell>Ana Costa</phsa-cell>
      <phsa-cell>Editora</phsa-cell>
      <phsa-cell><phsa-badge variant="success">Ativa</phsa-badge></phsa-cell>
    </phsa-row>
    <phsa-row value="bruno">
      <phsa-cell>Bruno Lima</phsa-cell>
      <phsa-cell>Leitor</phsa-cell>
      <phsa-cell><phsa-badge variant="secondary">Convidado</phsa-badge></phsa-cell>
    </phsa-row>
    <phsa-row value="carla">
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
      <div slot="empty">
        <strong>Nenhum convite.</strong>
        <div style="margin-top:.25rem">Os novos convites aparecerão aqui.</div>
      </div>
    </phsa-table>
  `,
};

export const Loading: Story = {
  render: () => html`
    <phsa-table class="max-w-lg" caption="Equipe" loading selectable>
      <phsa-column label="Nome" width="40%"></phsa-column>
      <phsa-column label="Papel"></phsa-column>
      <phsa-column label="Status" align="right"></phsa-column>
    </phsa-table>
  `,
};

export const Selection: Story = {
  render: () => html`
    <div
      @phsa-selection-change=${(event: CustomEvent<{ values: string[] }>) => {
        (event.currentTarget as HTMLElement).querySelector("output")!.textContent =
          event.detail.values.join(", ") || "Nenhuma linha";
      }}
    >
      ${equipe("max-w-lg", true)}
      <output style="display:block;margin-top:.75rem">Nenhuma linha</output>
    </div>
  `,
};

export const ControlledSorting: Story = {
  render: () => html`
    <div
      @phsa-sort=${(event: CustomEvent<{ key: string; direction: string }>) => {
        (event.currentTarget as HTMLElement).querySelector("output")!.textContent =
          event.detail.direction ? `${event.detail.key}: ${event.detail.direction}` : "Sem ordenação";
      }}
    >
      ${equipe()}
      <output style="display:block;margin-top:.75rem">Sem ordenação</output>
    </div>
  `,
};

export const StickyHeader: Story = {
  render: () => html`
    <phsa-table class="max-h-64 max-w-lg" sticky-header>
      <phsa-column key="name" label="Nome" width="60%"></phsa-column>
      <phsa-column key="role" label="Papel"></phsa-column>
      ${Array.from(
        { length: 12 },
        (_, index) => html`
          <phsa-row value=${String(index + 1)}>
            <phsa-cell>Usuário ${index + 1}</phsa-cell>
            <phsa-cell>${index % 2 ? "Leitor" : "Editor"}</phsa-cell>
          </phsa-row>
        `,
      )}
    </phsa-table>
  `,
};

export const WithPagination: Story = {
  render: () => html`
    <div
      style="display:grid;gap:.75rem;max-width:32rem"
      @phsa-change=${(event: CustomEvent<{ page: number }>) => {
        (event.currentTarget as HTMLElement).querySelector("output")!.textContent = `Página ${event.detail.page}`;
      }}
    >
      ${equipe("w-full")}
      <div style="display:flex;align-items:center;justify-content:space-between">
        <output>Página 1</output>
        <phsa-pagination page="1" page-count="8"></phsa-pagination>
      </div>
    </div>
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

