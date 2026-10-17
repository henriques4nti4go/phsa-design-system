import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "./index";

type Args = {
  placeholder: string;
  prefix: string;
  suffix: string;
  decimalScale: number;
  allowNegative: string;
  disabled: boolean;
  invalid: boolean;
};

const meta = {
  component: "phsa-numeric-input",
  tags: ["autodocs"],
  args: {
    placeholder: "0,00",
    prefix: "",
    suffix: "",
    decimalScale: -1,
    allowNegative: "true",
    disabled: false,
    invalid: false,
  },
  render: ({ placeholder, prefix, suffix, decimalScale, allowNegative, disabled, invalid }) => html`
    <div style="max-width:20rem">
      <phsa-numeric-input
        placeholder=${placeholder}
        prefix=${prefix}
        suffix=${suffix}
        decimal-scale=${decimalScale}
        allow-negative=${allowNegative}
        ?disabled=${disabled}
        ?invalid=${invalid}
      ></phsa-numeric-input>
    </div>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Currency: Story = {
  args: { prefix: "R$ ", decimalScale: 2, placeholder: "0,00" },
};

export const Percent: Story = {
  args: { suffix: "%", decimalScale: 2, allowNegative: "false", placeholder: "0,00" },
};

export const Integer: Story = {
  args: { decimalScale: 0, placeholder: "0" },
};

export const Invalid: Story = { args: { invalid: true, prefix: "R$ " } };

export const WithLabel: Story = {
  render: () => html`
    <div style="max-width:20rem">
      <phsa-numeric-input label="Valor" description="Em reais." name="valor" prefix="R$ " decimal-scale="2" required min="0"></phsa-numeric-input>
    </div>
  `,
};

export const InForm: Story = {
  render: () => html`
    <form
      style="display:flex;flex-direction:column;gap:.75rem;max-width:20rem"
      @submit=${(event: SubmitEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        form.querySelector("output")!.textContent = `submit: ${new FormData(form).get("valor")}`;
      }}
    >
      <phsa-numeric-input name="valor" prefix="R$ " decimal-scale="2" required></phsa-numeric-input>
      <div style="display:flex;gap:.5rem">
        <phsa-button type="submit">Enviar</phsa-button>
        <phsa-button type="reset" variant="outline">Limpar</phsa-button>
      </div>
      <output></output>
    </form>
  `,
};

export const CustomClasses: Story = {
  args: { prefix: "R$ ", decimalScale: 2 },
  render: () => html`
    <div style="max-width:20rem">
      <phsa-numeric-input class="h-12 rounded-full px-6" prefix="R$ " decimal-scale="2" placeholder="0,00"></phsa-numeric-input>
    </div>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile input { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
    </style>
    <div class="hostile" style="display:flex;flex-direction:column;gap:.75rem;max-width:20rem">
      <phsa-numeric-input prefix="R$ " decimal-scale="2" placeholder="phsa"></phsa-numeric-input>
      <input placeholder="input nativo" />
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-radius: 9999px; --phsa-ring: oklch(0.55 0.22 264); max-width:20rem">
      <phsa-numeric-input prefix="R$ " decimal-scale="2" placeholder="Tema"></phsa-numeric-input>
    </div>
  `,
};
