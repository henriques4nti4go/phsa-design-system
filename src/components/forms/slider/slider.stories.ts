import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "./index";

type Args = { value: string; min: number; max: number; step: number; showValue: boolean; disabled: boolean };

const meta = {
  title: "Forms/Slider",
  component: "phsa-slider",
  tags: ["autodocs"],
  args: { value: "40", min: 0, max: 100, step: 1, showValue: true, disabled: false },
  render: ({ value, min, max, step, showValue, disabled }) => html`
    <phsa-slider
      label="Volume"
      .value=${value}
      .min=${min}
      .max=${max}
      .step=${step}
      ?show-value=${showValue}
      ?disabled=${disabled}
      style="max-width:24rem"
    ></phsa-slider>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };

export const Steps: Story = {
  render: () => html`
    <phsa-slider label="Nota" value="6" min="0" max="10" step="2" show-value style="max-width:24rem"></phsa-slider>
  `,
};

export const InForm: Story = {
  render: () => html`
    <form
      style="display:grid;gap:1rem;max-width:24rem"
      @submit=${(event: SubmitEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        form.querySelector("output")!.textContent = `Valor: ${new FormData(form).get("priority")}`;
      }}
    >
      <phsa-slider name="priority" label="Prioridade" value="3" min="1" max="5" show-value></phsa-slider>
      <phsa-button type="submit">Enviar</phsa-button>
      <output></output>
    </form>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-slider value="65" show-value class="max-w-lg rounded-lg bg-violet-50 p-4"></phsa-slider>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>.hostile * { background:red; color:yellow; width:40px; height:40px; }</style>
    <div class="hostile"><phsa-slider value="50" show-value style="max-width:24rem"></phsa-slider></div>
  `,
};
