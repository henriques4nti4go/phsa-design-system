import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import { TIME_PICKER_SIZES, type TimePickerSize } from "./time-picker";
import "./index";

type Args = { value: string; min: string; max: string; step: number; size: TimePickerSize; disabled: boolean };

const meta = {
  title: "Forms/Time Picker",
  component: "phsa-time-picker",
  tags: ["autodocs"],
  args: { value: "09:30", min: "", max: "", step: 60, size: "default", disabled: false },
  argTypes: { size: { control: "select", options: TIME_PICKER_SIZES } },
  render: ({ value, min, max, step, size, disabled }) => html`
    <phsa-time-picker
      label="Horário"
      .value=${value}
      min=${min}
      max=${max}
      .step=${step}
      size=${size}
      ?disabled=${disabled}
      style="max-width:16rem"
    ></phsa-time-picker>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const WithSeconds: Story = { args: { value: "09:30:15", step: 1 } };
export const Range: Story = { args: { min: "08:00", max: "18:00" } };
export const Disabled: Story = { args: { disabled: true } };

export const InForm: Story = {
  render: () => html`
    <form
      style="display:grid;gap:1rem;max-width:16rem"
      @submit=${(event: SubmitEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        form.querySelector("output")!.textContent = String(new FormData(form).get("time"));
      }}
    >
      <phsa-time-picker name="time" label="Horário" min="08:00" max="18:00" required></phsa-time-picker>
      <phsa-button type="submit">Agendar</phsa-button>
      <output></output>
    </form>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-time-picker value="14:30" class="rounded-full border-violet-500" style="max-width:16rem"></phsa-time-picker>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>.hostile * { background:red; color:yellow; padding:20px; border:4px dashed lime; }</style>
    <div class="hostile"><phsa-time-picker value="10:00" style="max-width:16rem"></phsa-time-picker></div>
  `,
};
