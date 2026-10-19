import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "./index";

const meta = {
  title: "Data display/Empty State",
  component: "phsa-empty-state",
  tags: ["autodocs"],
  args: { heading: "Nenhum projeto", description: "Crie seu primeiro projeto para começar." },
  render: ({ heading, description }) => html`
    <phsa-empty-state heading=${heading} description=${description} style="max-width:36rem">
      <phsa-button slot="actions">Criar projeto</phsa-button>
    </phsa-empty-state>
  `,
} satisfies Meta<{ heading: string; description: string }>;

export default meta;
type Story = StoryObj<{ heading: string; description: string }>;

export const Default: Story = {};

export const SearchResults: Story = {
  render: () => html`
    <phsa-empty-state heading="Nenhum resultado" description="Tente alterar os filtros ou o termo pesquisado." style="max-width:36rem">
      <span slot="icon">⌕</span>
      <phsa-button slot="actions" variant="outline">Limpar filtros</phsa-button>
    </phsa-empty-state>
  `,
};

export const CustomClasses: Story = {
  render: () => html`
    <phsa-empty-state class="rounded-2xl border-violet-300 bg-violet-50" heading="Tudo pronto" style="max-width:36rem"></phsa-empty-state>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>.hostile * { background:red; color:yellow; padding:20px; border:4px dashed lime; }</style>
    <div class="hostile"><phsa-empty-state heading="Isolado" style="max-width:36rem"></phsa-empty-state></div>
  `,
};
