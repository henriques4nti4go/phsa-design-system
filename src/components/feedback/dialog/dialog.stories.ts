import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import { DIALOG_SIZES, PhsaDialog } from "./dialog";
import "./index";

const meta = {
  title: "Feedback/Dialog",
  component: "phsa-dialog",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const open = (event: Event) => {
  (event.currentTarget as HTMLElement).parentElement?.querySelector("phsa-dialog")?.show();
};

const close = (event: Event, reason = "") => {
  (event.currentTarget as HTMLElement).closest("phsa-dialog")?.close(reason);
};

export const Default: Story = {
  render: () => html`
    <phsa-button type="button" @click=${open}>Editar perfil</phsa-button>
    <phsa-dialog heading="Editar perfil" description="Altere os dados visíveis para o time.">
      <p style="margin:0">O conteúdo do slot fica entre a descrição e as ações.</p>
      <div slot="footer" style="display:flex;gap:.5rem;justify-content:flex-end">
        <phsa-button type="button" variant="outline" @click=${(event: Event) => close(event)}>Cancelar</phsa-button>
        <phsa-button type="button" @click=${(event: Event) => close(event, "saved")}>Salvar</phsa-button>
      </div>
    </phsa-dialog>
  `,
};

/** Overlay, Escape e o botão fecham. `detail.reason` vem no evento `close`. */
export const Reasons: Story = {
  render: () => {
    const onClose = (event: Event) => {
      const dialog = event.currentTarget as PhsaDialog;
      const output = dialog.parentElement?.querySelector("output");
      if (output) output.textContent = `reason: ${(event as CustomEvent<{ reason: string }>).detail.reason || "(overlay)"}`;
    };
    return html`
      <div style="display:flex;gap:.75rem;align-items:center">
        <phsa-button type="button" @click=${open}>Abrir</phsa-button>
        <output></output>
      </div>
      <phsa-dialog heading="Motivo" description="Feche de um jeito diferente e veja o motivo." @close=${onClose}></phsa-dialog>
    `;
  },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;gap:.5rem;flex-wrap:wrap">
      ${DIALOG_SIZES.map(
        (size) => html`
          <span>
            <phsa-button type="button" variant="outline" @click=${open}>${size}</phsa-button>
            <phsa-dialog size=${size} heading="Dialog ${size}" description="Exemplo do tamanho ${size}.">
              <p style="margin:0">Conteúdo do dialog.</p>
            </phsa-dialog>
          </span>
        `,
      )}
    </div>
  `,
};

export const ResponsiveFullscreen: Story = {
  render: () => html`
    <phsa-button type="button" @click=${open}>Abrir responsivo</phsa-button>
    <phsa-dialog responsive-fullscreen heading="Responsivo" description="Em telas pequenas, ocupa toda a viewport.">
      <p style="margin:0">Redimensione a viewport para conferir.</p>
    </phsa-dialog>
  `,
};

export const CustomClasses: Story = {
  render: () => html`
    <phsa-button type="button" @click=${open}>Abrir</phsa-button>
    <phsa-dialog class="max-w-sm rounded-none border-2" heading="Com class" description="A largura veio do projeto."></phsa-dialog>
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
      <phsa-dialog heading="Isolado" description="O dialog da página não pinta este."></phsa-dialog>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-background: oklch(0.97 0.02 264); --phsa-radius: 1.5rem">
      <phsa-button type="button" @click=${open}>Abrir</phsa-button>
      <phsa-dialog heading="Tema" description="Fundo e raio vieram do ancestral."></phsa-dialog>
    </div>
  `,
};
