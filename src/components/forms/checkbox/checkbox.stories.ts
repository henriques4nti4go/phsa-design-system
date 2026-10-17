import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "../field";
import "./index";

type Args = { label: string; checked: boolean; disabled: boolean; required: boolean; invalid: boolean };

const meta = {
  component: "phsa-checkbox",
  tags: ["autodocs"],
  args: { label: "Aceito os termos", checked: false, disabled: false, required: false, invalid: false },
  render: ({ label, checked, disabled, required, invalid }) => html`
    <phsa-checkbox value="sim" ?checked=${checked} ?disabled=${disabled} ?required=${required} ?invalid=${invalid}
      >${label}</phsa-checkbox
    >
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Checked: Story = { args: { checked: true } };

export const Disabled: Story = { args: { disabled: true, checked: true } };

export const Invalid: Story = { args: { invalid: true } };

export const WithField: Story = {
  render: () => html`
    <phsa-field label="Termos" description="Obrigatório para continuar." error="">
      <phsa-checkbox name="termos" value="sim" required>Li e aceito</phsa-checkbox>
    </phsa-field>
  `,
};

export const InForm: Story = {
  render: () => html`
    <form
      style="display:flex;flex-direction:column;gap:.75rem;align-items:flex-start"
      @submit=${(event: SubmitEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        form.querySelector("output")!.textContent = `submit: ${new FormData(form).get("termos") ?? "(desmarcado)"}`;
      }}
    >
      <label for="termos">Contrato</label>
      <phsa-checkbox id="termos" name="termos" value="sim" required>Aceito o contrato</phsa-checkbox>
      <div style="display:flex;gap:.5rem">
        <phsa-button type="submit">Enviar</phsa-button>
        <phsa-button type="reset" variant="outline">Limpar</phsa-button>
      </div>
      <output></output>
    </form>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-checkbox class="text-base text-violet-700">Texto violeta</phsa-checkbox>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile button { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
    </style>
    <div class="hostile" style="display:flex;flex-direction:column;gap:.75rem;align-items:flex-start">
      <phsa-checkbox checked>phsa-checkbox</phsa-checkbox>
      <button>button nativo</button>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-primary: oklch(0.55 0.22 264); --phsa-radius: 2px">
      <phsa-checkbox checked>Tema</phsa-checkbox>
    </div>
  `,
};
