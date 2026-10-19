import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { STEPPER_ORIENTATIONS, type StepperOrientation } from "./stepper";
import "./index";

type Args = { value: string; orientation: StepperOrientation };

const steps = () => html`
  <phsa-step value="account" heading="Conta" description="Dados pessoais."></phsa-step>
  <phsa-step value="billing" heading="Pagamento" description="Forma de cobrança."></phsa-step>
  <phsa-step value="confirm" heading="Confirmação" description="Revisar e enviar."></phsa-step>
`;

const meta = {
  title: "Layout/Stepper",
  component: "phsa-stepper",
  tags: ["autodocs"],
  args: { value: "billing", orientation: "horizontal" },
  argTypes: { orientation: { control: "select", options: STEPPER_ORIENTATIONS } },
  render: ({ value, orientation }) => html`
    <phsa-stepper value=${value} orientation=${orientation} style="max-width:42rem">${steps()}</phsa-stepper>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const Vertical: Story = { args: { orientation: "vertical" } };

export const Disabled: Story = {
  render: () => html`
    <phsa-stepper value="account" style="max-width:42rem">
      <phsa-step value="account" heading="Conta"></phsa-step>
      <phsa-step value="billing" heading="Pagamento" disabled></phsa-step>
      <phsa-step value="confirm" heading="Confirmação" disabled></phsa-step>
    </phsa-stepper>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-stepper class="rounded-xl border p-4" style="max-width:42rem">${steps()}</phsa-stepper>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>.hostile * { background:red; color:yellow; padding:20px; border:4px dashed lime; }</style>
    <div class="hostile"><phsa-stepper style="max-width:42rem">${steps()}</phsa-stepper></div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-primary:oklch(0.55 0.22 264)">
      <phsa-stepper value="confirm" style="max-width:42rem">${steps()}</phsa-stepper>
    </div>
  `,
};
