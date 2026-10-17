import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import { toast, TOAST_VARIANTS } from "./toast";
import "./index";

const meta = {
  title: "Feedback/Toast",
  component: "phsa-toaster",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const stack = html`<phsa-toaster position="top-right"></phsa-toaster>`;

export const Default: Story = {
  render: () => html`
    ${stack}
    <div style="display:flex;flex-wrap:wrap;gap:.5rem">
      ${TOAST_VARIANTS.map((variant) => {
        const show = () => toast("Arquivo enviado", { description: "O recibo está na pasta.", variant });
        return html`<phsa-button type="button" variant=${variant === "error" ? "destructive" : "outline"} @click=${show}>${variant}</phsa-button>`;
      })}
    </div>
  `,
};

export const Helpers: Story = {
  render: () => html`
    ${stack}
    <div style="display:flex;flex-wrap:wrap;gap:.5rem">
      <phsa-button type="button" @click=${() => toast.success("Dados salvos", { description: "O perfil foi atualizado." })}>Sucesso</phsa-button>
      <phsa-button type="button" variant="destructive" @click=${() => toast.error("Não salvou", { description: "Tente de novo em instantes." })}>Erro</phsa-button>
      <phsa-button type="button" variant="outline" @click=${() => toast.warning("Sessão expirando")}>Aviso</phsa-button>
      <phsa-button type="button" variant="outline" @click=${() => toast.info("Nova mensagem")}>Info</phsa-button>
    </div>
  `,
};

export const WithAction: Story = {
  render: () => html`
    ${stack}
    <phsa-button
      type="button"
      @click=${() =>
        toast("Item removido", {
          description: "Dá para trazer de volta.",
          duration: 8000,
          action: { label: "Desfazer", onClick: () => toast.success("Restaurado") },
        })}
      >Remover</phsa-button
    >
  `,
};

export const CustomClasses: Story = {
  render: () => html`
    <phsa-toaster class="max-w-xs" position="top-right"></phsa-toaster>
    <phsa-button type="button" @click=${() => toast("Largura do projeto")}>Mostrar</phsa-button>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile div { background: red; color: yellow; }
    </style>
    <div class="hostile">
      <phsa-toaster position="top-right"></phsa-toaster>
      <phsa-button type="button" @click=${() => toast("Isolado", { description: "A página não pinta o toast." })}>Mostrar</phsa-button>
      <div>div nativa</div>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-success: oklch(0.55 0.22 264)">
      <phsa-toaster position="top-right"></phsa-toaster>
      <phsa-button type="button" @click=${() => toast.success("Tema", { description: "O sucesso veio do ancestral." })}>Mostrar</phsa-button>
    </div>
  `,
};
