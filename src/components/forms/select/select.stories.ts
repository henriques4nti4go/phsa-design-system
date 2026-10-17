import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import { SELECT_SIZES, type SelectSize } from "./select";
import "./index";

const states = html`
  <option value="sp">São Paulo</option>
  <option value="rj">Rio de Janeiro</option>
  <option value="mg">Minas Gerais</option>
  <option value="rs">Rio Grande do Sul</option>
  <option value="pr">Paraná</option>
  <option value="ba">Bahia</option>
`;

const grouped = html`
  <optgroup label="Sudeste">
    <option value="sp">São Paulo</option>
    <option value="rj">Rio de Janeiro</option>
    <option value="mg">Minas Gerais</option>
  </optgroup>
  <optgroup label="Sul">
    <option value="rs">Rio Grande do Sul</option>
    <option value="pr">Paraná</option>
    <option value="sc">Santa Catarina</option>
  </optgroup>
`;

type Args = {
  placeholder: string;
  size: SelectSize;
  searchable: boolean;
  multiple: boolean;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
};

const meta = {
  component: "phsa-select",
  tags: ["autodocs"],
  args: {
    placeholder: "Selecione um estado",
    size: "default",
    searchable: false,
    multiple: false,
    disabled: false,
    required: false,
    invalid: false,
  },
  argTypes: { size: { control: "select", options: SELECT_SIZES } },
  render: ({ placeholder, size, searchable, multiple, disabled, required, invalid }) => html`
    <div style="max-width:20rem">
      <phsa-select
        placeholder=${placeholder}
        size=${size}
        ?searchable=${searchable}
        ?multiple=${multiple}
        ?disabled=${disabled}
        ?required=${required}
        ?invalid=${invalid}
        >${states}</phsa-select
      >
    </div>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Groups: Story = {
  render: () => html`<div style="max-width:20rem"><phsa-select placeholder="Estado">${grouped}</phsa-select></div>`,
};

export const Search: Story = { args: { searchable: true } };

export const Multiple: Story = {
  args: { multiple: true, placeholder: "Um ou mais estados" },
};

export const Disabled: Story = { args: { disabled: true } };

export const Invalid: Story = { args: { invalid: true } };

export const WithLabel: Story = {
  render: () => html`
    <div style="max-width:20rem">
      <phsa-select label="Estado" description="Onde você mora." name="uf" required searchable>${states}</phsa-select>
    </div>
  `,
};

export const InForm: Story = {
  render: () => html`
    <form
      style="display:flex;flex-direction:column;gap:.75rem;max-width:20rem"
      @submit=${(event: SubmitEvent) => {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const form = event.target as HTMLFormElement;
        form.querySelector("output")!.textContent = `uf=${data.get("uf") ?? ""} | ufs=${data.getAll("ufs").join(",")}`;
      }}
    >
      <phsa-select name="uf" required placeholder="Estado">${states}</phsa-select>
      <phsa-select name="ufs" multiple placeholder="Vários">${states}</phsa-select>
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
      <phsa-select class="h-12 rounded-full px-6" placeholder="Arredondado">${states}</phsa-select>
    </div>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile select, .hostile button { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
    </style>
    <div class="hostile" style="display:flex;flex-direction:column;gap:.75rem;max-width:20rem">
      <phsa-select placeholder="phsa-select">${states}</phsa-select>
      <select><option>select nativo</option></select>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-radius: 9999px; --phsa-primary: oklch(0.55 0.22 264); --phsa-ring: oklch(0.55 0.22 264); max-width:20rem">
      <phsa-select placeholder="Tema">${states}</phsa-select>
    </div>
  `,
};
