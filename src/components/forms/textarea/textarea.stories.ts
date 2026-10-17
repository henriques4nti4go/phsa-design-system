import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "../field";
import { TEXTAREA_SIZES, type TextareaSize } from "./textarea";
import "./index";

type Args = {
  placeholder: string;
  value: string;
  rows: number;
  size: TextareaSize;
  disabled: boolean;
  required: boolean;
  readOnly: boolean;
  invalid: boolean;
};

const meta = {
  component: "phsa-textarea",
  tags: ["autodocs"],
  args: {
    placeholder: "Digite sua mensagem",
    value: "",
    rows: 3,
    size: "default",
    disabled: false,
    required: false,
    readOnly: false,
    invalid: false,
  },
  argTypes: {
    size: { control: "select", options: TEXTAREA_SIZES },
    readOnly: { control: "boolean", name: "readonly" },
  },
  render: ({ placeholder, value, rows, size, disabled, required, readOnly, invalid }) => html`
    <div style="max-width:20rem">
      <phsa-textarea
        placeholder=${placeholder}
        value=${value}
        rows=${rows}
        size=${size}
        ?disabled=${disabled}
        ?required=${required}
        ?readonly=${readOnly}
        ?invalid=${invalid}
      ></phsa-textarea>
    </div>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Disabled: Story = { args: { disabled: true, value: "Não editável" } };

export const ReadOnly: Story = { args: { readOnly: true, value: "Só leitura" } };

export const Invalid: Story = { args: { invalid: true, value: "texto rejeitado" } };

export const WithField: Story = {
  render: () => html`
    <div style="max-width:20rem">
      <phsa-field label="Mensagem" description="Conte o que aconteceu.">
        <phsa-textarea name="mensagem" rows="4" required minlength="10"></phsa-textarea>
      </phsa-field>
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
        form.querySelector("output")!.textContent = `submit: ${new FormData(form).get("mensagem")}`;
      }}
    >
      <phsa-textarea name="mensagem" placeholder="Mensagem" required></phsa-textarea>
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
    <div style="max-width:24rem">
      <phsa-textarea class="min-h-32 rounded-xl border-2 border-violet-600" placeholder="Com classe"></phsa-textarea>
    </div>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile textarea { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
      .hostile .border-input, .hostile .rounded-md { background: hotpink !important; border-radius: 0 !important; }
    </style>
    <div class="hostile" style="display:flex;flex-direction:column;gap:.75rem;max-width:20rem">
      <phsa-textarea placeholder="phsa-textarea"></phsa-textarea>
      <phsa-textarea class="rounded-full" placeholder="com class"></phsa-textarea>
      <textarea placeholder="textarea nativo"></textarea>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-radius: 9999px; --phsa-input: oklch(0.55 0.22 264); --phsa-ring: oklch(0.55 0.22 264); max-width:20rem">
      <phsa-textarea placeholder="Tema"></phsa-textarea>
    </div>
  `,
};
