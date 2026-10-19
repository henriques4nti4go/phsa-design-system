import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { TOGGLE_SIZES, TOGGLE_VARIANTS, type ToggleSize, type ToggleVariant } from "./toggle";
import "./index";

type Args = { pressed: boolean; disabled: boolean; variant: ToggleVariant; size: ToggleSize };

const meta = {
  title: "Actions/Toggle",
  component: "phsa-toggle",
  tags: ["autodocs"],
  args: { pressed: false, disabled: false, variant: "default", size: "default" },
  argTypes: {
    variant: { control: "select", options: TOGGLE_VARIANTS },
    size: { control: "select", options: TOGGLE_SIZES },
  },
  render: ({ pressed, disabled, variant, size }) => html`
    <phsa-toggle ?pressed=${pressed} ?disabled=${disabled} variant=${variant} size=${size}>Negrito</phsa-toggle>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const Pressed: Story = { args: { pressed: true } };
export const Disabled: Story = { args: { disabled: true } };

export const SingleGroup: Story = {
  render: () => html`
    <phsa-toggle-group value="center">
      <phsa-toggle value="left">Esquerda</phsa-toggle>
      <phsa-toggle value="center">Centro</phsa-toggle>
      <phsa-toggle value="right">Direita</phsa-toggle>
    </phsa-toggle-group>
  `,
};

export const MultipleGroup: Story = {
  render: () => html`
    <phsa-toggle-group type="multiple" value="bold,italic">
      <phsa-toggle value="bold">Negrito</phsa-toggle>
      <phsa-toggle value="italic">Itálico</phsa-toggle>
      <phsa-toggle value="underline">Sublinhado</phsa-toggle>
    </phsa-toggle-group>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-toggle class="rounded-full px-6 text-violet-700">Favorito</phsa-toggle>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>.hostile * { background:red; color:yellow; padding:20px; border:4px dashed lime; }</style>
    <div class="hostile"><phsa-toggle>Isolado</phsa-toggle></div>
  `,
};
