import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "../input";
import "./index";

type Args = {
  label: string;
  description: string;
  error: string;
};

const meta = {
  title: "Forms/Field",
  component: "phsa-field",
  tags: ["autodocs"],
  args: { label: "E-mail", description: "Usaremos para o login.", error: "" },
  render: ({ label, description, error }) => html`
    <phsa-field label=${label} description=${description} error=${error} style="max-width:20rem">
      <phsa-input type="email" placeholder="voce@exemplo.com"></phsa-input>
    </phsa-field>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const WithError: Story = {
  args: { error: "E-mail já cadastrado." },
};

/**
 * Sem `error`, o field mostra a mensagem de validação nativa do browser quando o
 * `<form>` é enviado inválido, e limpa quando o valor fica válido ou o form é resetado.
 */
export const NativeValidation: Story = {
  render: () => html`
    <form
      novalidate
      style="display:flex;flex-direction:column;gap:1rem;max-width:20rem"
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        if (!form.checkValidity()) return;
        const data = new FormData(form);
        form.querySelector("output")!.textContent = `submit: ${data.get("nome")} / ${data.get("email")}`;
      }}
    >
      <phsa-field label="Nome">
        <phsa-input name="nome" required minlength="3"></phsa-input>
      </phsa-field>
      <phsa-field label="E-mail" description="Usaremos para o login.">
        <phsa-input name="email" type="email" required></phsa-input>
      </phsa-field>
      <div style="display:flex;gap:.5rem">
        <phsa-button type="submit">Enviar</phsa-button>
        <phsa-button type="reset" variant="outline">Limpar</phsa-button>
      </div>
      <output></output>
    </form>
  `,
};

/** CSS hostil na página: label, descrição e erro do field não são afetados. */
export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile label, .hostile p { color: lime !important; font-size: 2rem !important; }
      .hostile .text-destructive, .hostile .text-muted-foreground { color: hotpink !important; }
    </style>
    <div class="hostile" style="max-width:20rem">
      <phsa-field label="E-mail" description="Usaremos para o login." error="E-mail inválido.">
        <phsa-input type="email" value="paulo@"></phsa-input>
      </phsa-field>
    </div>
  `,
};
