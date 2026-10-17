import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { ALERT_VARIANTS, type AlertVariant } from "./alert";
import "./index";

type Args = { heading: string; description: string; variant: AlertVariant; dismissible: boolean };

const meta = {
  title: "Feedback/Alert",
  component: "phsa-alert",
  tags: ["autodocs"],
  args: {
    heading: "Atualização disponível",
    description: "Uma nova versão do cadastro foi publicada.",
    variant: "default",
    dismissible: false,
  },
  argTypes: { variant: { control: "select", options: ALERT_VARIANTS } },
  render: ({ heading, description, variant, dismissible }) => html`
    <div style="max-width:32rem">
      <phsa-alert variant=${variant} heading=${heading} description=${description} ?dismissible=${dismissible}></phsa-alert>
    </div>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:.75rem;max-width:32rem">
      ${ALERT_VARIANTS.map(
        (variant) => html`<phsa-alert variant=${variant} heading=${variant} description="Texto de apoio da variante."></phsa-alert>`,
      )}
    </div>
  `,
};

export const Dismissible: Story = {
  args: { dismissible: true, variant: "warning", heading: "Sessão expirando", description: "Salve o rascunho antes de sair." },
};

export const CustomClasses: Story = {
  render: () => html`
    <div style="max-width:32rem">
      <phsa-alert class="rounded-none border-2 shadow-lg" heading="Com class" description="O class do projeto vence o do DS."></phsa-alert>
    </div>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile div { background: red; color: yellow; border: 4px dashed lime; }
    </style>
    <div class="hostile" style="display:flex;flex-direction:column;gap:.75rem;max-width:32rem">
      <phsa-alert heading="phsa" description="Isolado."></phsa-alert>
      <div>div nativa</div>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-success: oklch(0.55 0.22 264); max-width:32rem">
      <phsa-alert variant="success" heading="Tema" description="A cor de sucesso veio do ancestral."></phsa-alert>
    </div>
  `,
};
