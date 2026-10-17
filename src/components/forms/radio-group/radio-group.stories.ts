import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "../radio";
import { RADIO_ORIENTATIONS, type RadioOrientation } from "./radio-group";
import "./index";

type Args = { value: string; orientation: RadioOrientation; disabled: boolean; required: boolean; invalid: boolean };

const options = (disabled = false) => html`
  <phsa-radio value="free">Grátis</phsa-radio>
  <phsa-radio value="pro" ?disabled=${disabled}>Pro</phsa-radio>
  <phsa-radio value="team">Time</phsa-radio>
`;

const meta = {
  component: "phsa-radio-group",
  tags: ["autodocs"],
  args: { value: "pro", orientation: "vertical", disabled: false, required: false, invalid: false },
  argTypes: { orientation: { control: "select", options: RADIO_ORIENTATIONS } },
  render: ({ value, orientation, disabled, required, invalid }) => html`
    <phsa-radio-group
      name="plano"
      value=${value}
      orientation=${orientation}
      ?disabled=${disabled}
      ?required=${required}
      ?invalid=${invalid}
    >
      ${options()}
    </phsa-radio-group>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Horizontal: Story = { args: { orientation: "horizontal" } };

export const Disabled: Story = { args: { disabled: true } };

export const DisabledOption: Story = {
  render: () => html`<phsa-radio-group name="plano">${options(true)}</phsa-radio-group>`,
};

export const Invalid: Story = { args: { invalid: true, value: "" } };

export const WithLabel: Story = {
  render: () => html`
    <phsa-radio-group label="Plano" description="Dá para mudar depois." name="plano" required>${options()}</phsa-radio-group>
  `,
};

export const InForm: Story = {
  render: () => html`
    <form
      style="display:flex;flex-direction:column;gap:.75rem;align-items:flex-start"
      @submit=${(event: SubmitEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        form.querySelector("output")!.textContent = `submit: ${new FormData(form).get("plano")}`;
      }}
    >
      <phsa-radio-group name="plano" required>${options()}</phsa-radio-group>
      <div style="display:flex;gap:.5rem">
        <phsa-button type="submit">Enviar</phsa-button>
        <phsa-button type="reset" variant="outline">Limpar</phsa-button>
      </div>
      <output></output>
    </form>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-radio-group class="gap-6" orientation="horizontal">${options()}</phsa-radio-group>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile button { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
    </style>
    <div class="hostile">
      <phsa-radio-group value="pro">${options()}</phsa-radio-group>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-primary: oklch(0.55 0.22 264)">
      <phsa-radio-group value="pro">${options()}</phsa-radio-group>
    </div>
  `,
};
