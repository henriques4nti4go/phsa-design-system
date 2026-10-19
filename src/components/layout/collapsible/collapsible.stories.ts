import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./index";

type Args = { heading: string; open: boolean; disabled: boolean };

const meta = {
  title: "Layout/Collapsible",
  component: "phsa-collapsible",
  tags: ["autodocs"],
  args: { heading: "Detalhes do pedido", open: false, disabled: false },
  render: ({ heading, open, disabled }) => html`
    <phsa-collapsible heading=${heading} ?open=${open} ?disabled=${disabled} style="max-width:24rem">
      Frete estimado em 3 dias úteis. Você pode alterar o endereço até a confirmação.
    </phsa-collapsible>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const Open: Story = { args: { open: true } };
export const Disabled: Story = { args: { disabled: true } };

export const CustomClasses: Story = {
  render: () => html`
    <phsa-collapsible heading="Filtros" class="rounded-md border px-3" style="max-width:24rem">
      Categoria, preço e disponibilidade.
    </phsa-collapsible>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
    </style>
    <div class="hostile">
      <phsa-collapsible heading="Isolado" open style="max-width:24rem">Conteúdo isolado.</phsa-collapsible>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-primary:oklch(0.55 0.22 264);--phsa-border:oklch(0.7 0.12 264)">
      <phsa-collapsible heading="Tema" open style="max-width:24rem">Conteúdo com tokens.</phsa-collapsible>
    </div>
  `,
};
