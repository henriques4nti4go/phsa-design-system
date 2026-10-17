import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { COMBOBOX_SIZES, type ComboboxSize } from "./index";

const cities = html`
  <optgroup label="Sudeste">
    <option value="sp">São Paulo</option>
    <option value="rj">Rio de Janeiro</option>
    <option value="bh">Belo Horizonte</option>
  </optgroup>
  <optgroup label="Sul">
    <option value="cwb">Curitiba</option>
    <option value="poa">Porto Alegre</option>
    <option value="fln" disabled>Florianópolis</option>
  </optgroup>
`;

type Args = {
  placeholder: string;
  size: ComboboxSize;
};

const meta = {
  title: "Forms/Combobox",
  component: "phsa-combobox",
  tags: ["autodocs"],
  args: {
    placeholder: "Buscar cidade",
    size: "default",
  },
  argTypes: { size: { control: "select", options: COMBOBOX_SIZES } },
  render: ({ placeholder, size }) => html`
    <phsa-combobox class="max-w-xs" placeholder=${placeholder} size=${size}>${cities}</phsa-combobox>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const CustomClasses: Story = {
  render: () => html`
    <phsa-combobox class="max-w-xs rounded-none border-2" placeholder="Buscar cidade">${cities}</phsa-combobox>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      input, button { font-family: "Comic Sans MS", cursive; background: red; color: yellow; }
    </style>
    <phsa-combobox class="max-w-xs" placeholder="Buscar cidade">${cities}</phsa-combobox>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-input: oklch(0.55 0.15 264); --phsa-radius: 1rem">
      <phsa-combobox class="max-w-xs" placeholder="Buscar cidade">${cities}</phsa-combobox>
    </div>
  `,
};
