import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { BUTTON_SIZES, BUTTON_VARIANTS, type ButtonSize, type ButtonVariant } from "./button";
import "./index";

type Args = {
  label: string;
  variant: ButtonVariant;
  size: ButtonSize;
  disabled: boolean;
  type: "submit" | "button" | "reset";
};

const plusIcon = html`
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14" /></svg>
`;

const meta = {
  title: "Actions/Button",
  component: "phsa-button",
  tags: ["autodocs"],
  args: { label: "Button", variant: "default", size: "default", disabled: false, type: "submit" },
  argTypes: {
    label: { control: "text", description: "Conteúdo do slot padrão." },
    variant: { control: "select", options: BUTTON_VARIANTS },
    size: { control: "select", options: BUTTON_SIZES },
    type: { control: "select", options: ["submit", "button", "reset"] },
  },
  render: ({ label, variant, size, disabled, type }) => html`
    <phsa-button variant=${variant} size=${size} type=${type} ?disabled=${disabled}>${label}</phsa-button>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

const row = (content: unknown) => html`<div style="display:flex;flex-wrap:wrap;gap:.75rem;align-items:center">${content}</div>`;

export const Default: Story = {};

export const Variants: Story = {
  render: () => row(BUTTON_VARIANTS.map((v) => html`<phsa-button variant=${v}>${v}</phsa-button>`)),
};

export const Sizes: Story = {
  render: () =>
    row(html`
      <phsa-button size="sm">Small</phsa-button>
      <phsa-button>Default</phsa-button>
      <phsa-button size="lg">Large</phsa-button>
      <phsa-button size="icon" aria-label="Adicionar">${plusIcon}</phsa-button>
    `),
};

export const WithIcon: Story = {
  render: () => row(html`<phsa-button>${plusIcon} Novo item</phsa-button>`),
};

export const Disabled: Story = {
  args: { disabled: true },
};

/** `type="submit"` e `type="reset"` funcionam com o `<form>` da página, como o `<button>` nativo. */
export const InForm: Story = {
  render: () => html`
    <form
      style="display:flex;gap:.5rem;align-items:center"
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        form.querySelector("output")!.textContent = `submit: ${new FormData(form).get("nome")}`;
      }}
    >
      <input name="nome" placeholder="Nome" required />
      <phsa-button type="submit">Enviar</phsa-button>
      <phsa-button type="reset" variant="outline">Limpar</phsa-button>
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
    row(html`
      <phsa-button class="h-12 rounded-full px-8 text-base">Rounded grande</phsa-button>
      <phsa-button variant="outline" class="border-2 border-violet-600 text-violet-600 hover:bg-violet-50">Outline violeta</phsa-button>
      <phsa-button class="bg-emerald-600 shadow-lg hover:bg-emerald-700">Verde</phsa-button>
      <phsa-button class="w-64">w-64</phsa-button>
    `),
};

/** O CSS global da página não afeta o componente (nem o que tem `class`): só o `<button>` nativo sofre. */
export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile button { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
      .hostile .bg-primary, .hostile .rounded-md { background: hotpink !important; border-radius: 0 !important; }
    </style>
    <div class="hostile">${row(html`
      <phsa-button>phsa-button</phsa-button>
      <phsa-button variant="outline">outline</phsa-button>
      <phsa-button class="rounded-full">com class</phsa-button>
      <button>button nativo</button>
    `)}</div>
  `,
};

/** Tema customizado: basta sobrescrever as variáveis `--phsa-*` em qualquer ancestral. */
export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-primary: oklch(0.55 0.22 264); --phsa-radius: 9999px">
      ${row(BUTTON_VARIANTS.map((v) => html`<phsa-button variant=${v}>${v}</phsa-button>`))}
    </div>
  `,
};
