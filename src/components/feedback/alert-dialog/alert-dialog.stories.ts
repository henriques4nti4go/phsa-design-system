import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import { PhsaAlertDialog } from "./alert-dialog";
import "./index";

const meta = {
  title: "Feedback/Alert Dialog",
  component: "phsa-alert-dialog",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const open = (event: Event) => {
  (event.currentTarget as HTMLElement).parentElement?.querySelector("phsa-alert-dialog")?.show();
};

export const Default: Story = {
  render: () => html`
    <phsa-button type="button" @click=${open}>Continuar</phsa-button>
    <phsa-alert-dialog heading="Publicar cadastro?" description="Ele fica visível para o time inteiro."></phsa-alert-dialog>
  `,
};

export const Destructive: Story = {
  render: () => html`
    <phsa-button type="button" variant="destructive" @click=${open}>Excluir</phsa-button>
    <phsa-alert-dialog
      variant="destructive"
      confirm-label="Excluir"
      heading="Excluir este registro?"
      description="Essa ação não pode ser desfeita."
    ></phsa-alert-dialog>
  `,
};

export const Events: Story = {
  render: () => {
    const note = (event: Event) => {
      const dialog = event.currentTarget as PhsaAlertDialog;
      const output = dialog.parentElement?.querySelector("output");
      if (output) output.textContent = event.type;
    };
    return html`
      <div style="display:flex;gap:.75rem;align-items:center">
        <phsa-button type="button" @click=${open}>Confirmar</phsa-button>
        <output></output>
      </div>
      <phsa-alert-dialog
        heading="Arquivar?"
        description="Dá para restaurar depois."
        @phsa-confirm=${note}
        @phsa-cancel=${note}
      ></phsa-alert-dialog>
    `;
  },
};

export const CustomClasses: Story = {
  render: () => html`
    <phsa-button type="button" @click=${open}>Abrir</phsa-button>
    <phsa-alert-dialog class="rounded-none" heading="Com class" description="O raio veio do projeto."></phsa-alert-dialog>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile dialog { background: red; color: yellow; }
    </style>
    <div class="hostile">
      <phsa-button type="button" @click=${open}>Abrir</phsa-button>
      <phsa-alert-dialog heading="Isolado" description="O CSS da página não entra."></phsa-alert-dialog>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-destructive: oklch(0.55 0.22 264)">
      <phsa-button type="button" variant="destructive" @click=${open}>Excluir</phsa-button>
      <phsa-alert-dialog variant="destructive" confirm-label="Excluir" heading="Tema" description="O destrutivo veio do ancestral."></phsa-alert-dialog>
    </div>
  `,
};
