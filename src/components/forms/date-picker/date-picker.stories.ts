import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import { DATE_MODES, DATE_SIZES, type DateMode, type DatePickerSize } from "./date-picker";
import "./index";

type Args = {
  mode: DateMode;
  size: DatePickerSize;
  value: string;
  min: string;
  max: string;
  disabled: boolean;
  required: boolean;
  invalid: boolean;
};

const meta = {
  component: "phsa-date-picker",
  tags: ["autodocs"],
  args: { mode: "single", size: "default", value: "", min: "", max: "", disabled: false, required: false, invalid: false },
  argTypes: {
    mode: { control: "select", options: DATE_MODES },
    size: { control: "select", options: DATE_SIZES },
  },
  render: ({ mode, size, value, min, max, disabled, required, invalid }) => html`
    <div style="max-width:20rem">
      <phsa-date-picker
        mode=${mode}
        size=${size}
        value=${value}
        min=${min}
        max=${max}
        ?disabled=${disabled}
        ?required=${required}
        ?invalid=${invalid}
      ></phsa-date-picker>
    </div>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Range: Story = { args: { mode: "range" } };

export const Multiple: Story = { args: { mode: "multiple" } };

export const Limits: Story = {
  args: { min: "2026-10-01", max: "2026-10-31", value: "2026-10-17" },
};

export const Disabled: Story = { args: { disabled: true, value: "2026-10-17" } };

export const Invalid: Story = { args: { invalid: true } };

export const WithLabel: Story = {
  render: () => html`
    <div style="max-width:20rem">
      <phsa-date-picker label="Nascimento" description="Dia, mês e ano." name="nascimento" required max="2026-10-17"></phsa-date-picker>
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
        form.querySelector("output")!.textContent = `dia=${data.get("dia")} | periodo=${data.get("periodo")}`;
      }}
    >
      <phsa-date-picker name="dia" required></phsa-date-picker>
      <phsa-date-picker name="periodo" mode="range"></phsa-date-picker>
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
      <phsa-date-picker class="h-12 rounded-full px-6"></phsa-date-picker>
    </div>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile button { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
    </style>
    <div class="hostile" style="max-width:20rem">
      <phsa-date-picker></phsa-date-picker>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-radius: 9999px; --phsa-primary: oklch(0.55 0.22 264); --phsa-ring: oklch(0.55 0.22 264); max-width:20rem">
      <phsa-date-picker value="2026-10-17"></phsa-date-picker>
    </div>
  `,
};
