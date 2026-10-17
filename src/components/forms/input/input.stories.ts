import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import { INPUT_SIZES, type InputSize } from "./input";
import "./index";

const INPUT_TYPES = ["text", "email", "password", "number", "search", "tel", "url", "date", "file"] as const;

type Args = {
  placeholder: string;
  value: string;
  type: (typeof INPUT_TYPES)[number];
  size: InputSize;
  disabled: boolean;
  required: boolean;
  readOnly: boolean;
  invalid: boolean;
};

const meta = {
  title: "Forms/Input",
  component: "phsa-input",
  tags: ["autodocs"],
  args: {
    placeholder: "Digite algo",
    value: "",
    type: "text",
    size: "default",
    disabled: false,
    required: false,
    readOnly: false,
    invalid: false,
  },
  argTypes: {
    placeholder: { control: "text" },
    value: { control: "text" },
    type: { control: "select", options: INPUT_TYPES },
    size: { control: "select", options: INPUT_SIZES },
    readOnly: { control: "boolean", name: "readonly" },
  },
  render: ({ placeholder, value, type, size, disabled, required, readOnly, invalid }) => html`
    <div style="max-width:20rem">
      <phsa-input
        placeholder=${placeholder}
        value=${value}
        type=${type}
        size=${size}
        ?disabled=${disabled}
        ?required=${required}
        ?readonly=${readOnly}
        ?invalid=${invalid}
      ></phsa-input>
    </div>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

const stack = (content: unknown) =>
  html`<div style="display:flex;flex-direction:column;gap:.75rem;max-width:20rem">${content}</div>`;

export const Default: Story = {};

export const Types: Story = {
  render: () =>
    stack(html`
      <phsa-input type="text" placeholder="Texto"></phsa-input>
      <phsa-input type="email" placeholder="voce@exemplo.com"></phsa-input>
      <phsa-input type="password" placeholder="Senha"></phsa-input>
      <phsa-input type="number" placeholder="0" min="0" max="100"></phsa-input>
      <phsa-input type="search" placeholder="Buscar"></phsa-input>
      <phsa-input type="file"></phsa-input>
    `),
};

/** A altura acompanha o `<phsa-button>` do mesmo `size`. */
export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:.75rem">
      <div style="display:flex;gap:.5rem;align-items:center">
        <div style="width:12rem"><phsa-input size="sm" placeholder="Small"></phsa-input></div>
        <phsa-button size="sm">Small</phsa-button>
      </div>
      <div style="display:flex;gap:.5rem;align-items:center">
        <div style="width:12rem"><phsa-input placeholder="Default"></phsa-input></div>
        <phsa-button>Default</phsa-button>
      </div>
      <div style="display:flex;gap:.5rem;align-items:center">
        <div style="width:12rem"><phsa-input size="lg" placeholder="Large"></phsa-input></div>
        <phsa-button size="lg">Large</phsa-button>
      </div>
    </div>
  `,
};

export const Disabled: Story = {
  args: { disabled: true, value: "Não editável" },
};

export const ReadOnly: Story = {
  args: { readOnly: true, value: "Só leitura" },
};

export const Invalid: Story = {
  args: { invalid: true, value: "valor rejeitado" },
};

/** Clicar no `<label for>` foca o campo, como no `<input>` nativo. */
export const WithLabel: Story = {
  render: () => html`
    <label for="email" style="display:flex;flex-direction:column;gap:.25rem;max-width:20rem;font-size:.875rem">
      Email
      <phsa-input id="email" type="email" placeholder="voce@exemplo.com" autocomplete="email"></phsa-input>
    </label>
  `,
};

/** `name`, `required` e `type="reset"` funcionam com o `<form>` da página. */
export const InForm: Story = {
  render: () => html`
    <form
      style="display:flex;flex-direction:column;gap:.75rem;max-width:20rem"
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        form.querySelector("output")!.textContent = `submit: ${new FormData(form).get("nome")}`;
      }}
    >
      <phsa-input name="nome" placeholder="Nome" required></phsa-input>
      <div style="display:flex;gap:.5rem">
        <phsa-button type="submit">Enviar</phsa-button>
        <phsa-button type="reset" variant="outline">Limpar</phsa-button>
      </div>
      <output></output>
    </form>
  `,
};

/**
 * Classes do Tailwind do projeto funcionam como `className` e vencem os estilos do DS.
 * Só entram as classes passadas no componente — o resto do CSS da página continua de fora.
 */
export const CustomClasses: Story = {
  render: () =>
    stack(html`
      <phsa-input class="h-12 rounded-full px-6" placeholder="Rounded grande"></phsa-input>
      <phsa-input class="border-2 border-violet-600 focus-visible:ring-violet-600" placeholder="Violeta"></phsa-input>
      <phsa-input class="max-w-xs bg-emerald-50" placeholder="Fundo verde"></phsa-input>
    `),
};

/** O CSS global da página não afeta o componente (nem o que tem `class`): só o `<input>` nativo sofre. */
export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile input { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
      .hostile .border-input, .hostile .rounded-md { background: hotpink !important; border-radius: 0 !important; }
    </style>
    <div class="hostile">${stack(html`
      <phsa-input placeholder="phsa-input"></phsa-input>
      <phsa-input class="rounded-full" placeholder="com class"></phsa-input>
      <input placeholder="input nativo" />
    `)}</div>
  `,
};

/** Tema customizado: basta sobrescrever as variáveis `--phsa-*` em qualquer ancestral. */
export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-radius: 9999px; --phsa-input: oklch(0.55 0.22 264); --phsa-ring: oklch(0.55 0.22 264); max-width:20rem">
      <phsa-input placeholder="Tema"></phsa-input>
    </div>
  `,
};
