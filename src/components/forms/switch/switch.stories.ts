import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "./index";

type Args = { label: string; checked: boolean; disabled: boolean; invalid: boolean };

const meta = {
  component: "phsa-switch",
  tags: ["autodocs"],
  args: { label: "Notificações", checked: false, disabled: false, invalid: false },
  render: ({ label, checked, disabled, invalid }) => html`
    <phsa-switch ?checked=${checked} ?disabled=${disabled} ?invalid=${invalid}>${label}</phsa-switch>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Checked: Story = { args: { checked: true } };

export const Disabled: Story = { args: { disabled: true, checked: true } };

export const Invalid: Story = { args: { invalid: true } };

/** Clicar no label do field alterna o switch. */
export const WithLabel: Story = {
  render: () => html`
    <phsa-switch label="Alertas" description="E-mail quando houver novidade." name="alertas" value="sim"></phsa-switch>
  `,
};

export const InForm: Story = {
  render: () => html`
    <form
      style="display:flex;flex-direction:column;gap:.75rem;align-items:flex-start"
      @submit=${(event: SubmitEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        form.querySelector("output")!.textContent = `submit: ${new FormData(form).get("alertas") ?? "(desligado)"}`;
      }}
    >
      <phsa-switch name="alertas" value="sim">Receber alertas</phsa-switch>
      <div style="display:flex;gap:.5rem">
        <phsa-button type="submit">Enviar</phsa-button>
        <phsa-button type="reset" variant="outline">Limpar</phsa-button>
      </div>
      <output></output>
    </form>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-switch class="text-violet-700" checked>Violeta</phsa-switch>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile button { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
    </style>
    <div class="hostile" style="display:flex;flex-direction:column;gap:.75rem;align-items:flex-start">
      <phsa-switch checked>phsa-switch</phsa-switch>
      <button>button nativo</button>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-primary: oklch(0.55 0.22 264)">
      <phsa-switch checked>Tema</phsa-switch>
    </div>
  `,
};
