import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "./index";

type Args = { format: string; placeholder: string; allowEmpty: boolean; mask: string; disabled: boolean; invalid: boolean };

const meta = {
  component: "phsa-pattern-input",
  tags: ["autodocs"],
  args: { format: "(##) #####-####", placeholder: "(00) 00000-0000", allowEmpty: false, mask: "_", disabled: false, invalid: false },
  render: ({ format, placeholder, allowEmpty, mask, disabled, invalid }) => html`
    <div style="max-width:20rem">
      <phsa-pattern-input
        format=${format}
        placeholder=${placeholder}
        mask=${mask}
        ?allow-empty=${allowEmpty}
        ?disabled=${disabled}
        ?invalid=${invalid}
      ></phsa-pattern-input>
    </div>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Phone: Story = {};

export const CPF: Story = { args: { format: "###.###.###-##", placeholder: "000.000.000-00" } };

export const CEP: Story = { args: { format: "#####-###", placeholder: "00000-000" } };

export const Plate: Story = { args: { format: "AAA-#*##", placeholder: "ABC-1D23", allowEmpty: true } };

export const WithMask: Story = { args: { allowEmpty: true } };

export const Invalid: Story = { args: { invalid: true, format: "###.###.###-##" } };

export const WithLabel: Story = {
  render: () => html`
    <div style="max-width:20rem">
      <phsa-pattern-input label="CPF" description="Só números no envio." name="cpf" format="###.###.###-##" placeholder="000.000.000-00" required></phsa-pattern-input>
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
        form.querySelector("output")!.textContent = `submit: ${new FormData(form).get("telefone")}`;
      }}
    >
      <phsa-pattern-input name="telefone" format="(##) #####-####" placeholder="(00) 00000-0000" required></phsa-pattern-input>
      <div style="display:flex;gap:.5rem">
        <phsa-button type="submit">Enviar</phsa-button>
        <phsa-button type="reset" variant="outline">Limpar</phsa-button>
      </div>
      <output></output>
    </form>
  `,
};

export const CustomClasses: Story = {
  render: () => html`
    <div style="max-width:20rem">
      <phsa-pattern-input class="h-12 rounded-full px-6" format="#####-###" placeholder="00000-000"></phsa-pattern-input>
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
      <phsa-pattern-input format="###.###.###-##" placeholder="phsa"></phsa-pattern-input>
      <input placeholder="input nativo" />
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-radius: 9999px; --phsa-ring: oklch(0.55 0.22 264); max-width:20rem">
      <phsa-pattern-input format="#####-###" placeholder="Tema"></phsa-pattern-input>
    </div>
  `,
};
