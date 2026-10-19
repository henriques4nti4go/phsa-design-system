import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "./index";

type Args = { value: string; min: number; max: number; step: number; showValues: boolean; disabled: boolean };

const meta = {
  title: "Forms/Range Slider",
  component: "phsa-range-slider",
  tags: ["autodocs"],
  args: { value: "25/75", min: 0, max: 100, step: 1, showValues: true, disabled: false },
  render: ({ value, min, max, step, showValues, disabled }) => html`
    <phsa-range-slider
      label="Faixa de preço"
      .value=${value}
      .min=${min}
      .max=${max}
      .step=${step}
      ?show-values=${showValues}
      ?disabled=${disabled}
      style="max-width:28rem"
    ></phsa-range-slider>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const Steps: Story = { args: { value: "20/80", step: 10 } };
export const Disabled: Story = { args: { disabled: true } };

export const InForm: Story = {
  render: () => html`
    <form
      style="display:grid;gap:1rem;max-width:28rem"
      @submit=${(event: SubmitEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        form.querySelector("output")!.textContent = String(new FormData(form).get("price"));
      }}
    >
      <phsa-range-slider name="price" label="Preço" value="100/500" min="0" max="1000" step="50" show-values></phsa-range-slider>
      <phsa-button type="submit">Aplicar</phsa-button>
      <output></output>
    </form>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-range-slider value="30/70" show-values class="max-w-xl rounded-lg bg-violet-50 p-4"></phsa-range-slider>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>.hostile * { background:red; color:yellow; width:40px; height:40px; }</style>
    <div class="hostile"><phsa-range-slider value="20/80" show-values style="max-width:28rem"></phsa-range-slider></div>
  `,
};
