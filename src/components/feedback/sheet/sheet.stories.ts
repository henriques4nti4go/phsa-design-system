import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import { SHEET_SIDES, type PhsaSheet, type SheetSide } from "./index";
import "./index";

type Args = { side: SheetSide; heading: string; description: string };

const showNext = (event: Event) => ((event.currentTarget as Element).nextElementSibling as PhsaSheet | null)?.show();
const closeOwner = (event: Event) => (event.currentTarget as Element).closest<PhsaSheet>("phsa-sheet")?.close("action");

const meta = {
  title: "Feedback/Sheet",
  component: "phsa-sheet",
  tags: ["autodocs"],
  args: { side: "right", heading: "Editar perfil", description: "Atualize os dados da sua conta." },
  argTypes: { side: { control: "select", options: SHEET_SIDES } },
  render: ({ side, heading, description }) => html`
    <phsa-button @click=${showNext}>Abrir painel</phsa-button>
    <phsa-sheet side=${side} heading=${heading} description=${description}>
      <p>O conteúdo do painel pode conter formulários, detalhes ou navegação.</p>
      <phsa-button slot="footer" variant="outline" @click=${closeOwner}>Fechar</phsa-button>
      <phsa-button slot="footer" @click=${closeOwner}>Salvar</phsa-button>
    </phsa-sheet>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Sides: Story = {
  render: () => html`
    <div style="display:flex;gap:.75rem;flex-wrap:wrap">
      ${SHEET_SIDES.map(
        (side) => html`
          <span>
            <phsa-button variant="outline" @click=${showNext}>${side}</phsa-button>
            <phsa-sheet side=${side} heading="Painel ${side}">
              <p>Este painel entra pelo lado ${side}.</p>
            </phsa-sheet>
          </span>
        `,
      )}
    </div>
  `,
};

export const CustomClasses: Story = {
  render: () => html`
    <phsa-button @click=${showNext}>Abrir painel customizado</phsa-button>
    <phsa-sheet class="bg-violet-50" heading="Customizado"><p>Classes do projeto chegam ao painel.</p></phsa-sheet>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
    </style>
    <div class="hostile">
      <phsa-button @click=${showNext}>Abrir isolado</phsa-button>
      <phsa-sheet heading="Isolado"><p>O CSS externo não altera o painel.</p></phsa-sheet>
    </div>
  `,
};
