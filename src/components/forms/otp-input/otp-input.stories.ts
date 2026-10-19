import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import { OTP_INPUT_TYPES, type OtpInputType } from "./otp-input";
import "./index";

type Args = { value: string; length: number; type: OtpInputType; mask: boolean; disabled: boolean };

const meta = {
  title: "Forms/OTP Input",
  component: "phsa-otp-input",
  tags: ["autodocs"],
  args: { value: "", length: 6, type: "numeric", mask: false, disabled: false },
  argTypes: { type: { control: "select", options: OTP_INPUT_TYPES } },
  render: ({ value, length, type, mask, disabled }) => html`
    <phsa-otp-input
      label="Código de verificação"
      description="Digite o código enviado para seu telefone."
      .value=${value}
      .length=${length}
      type=${type}
      ?mask=${mask}
      ?disabled=${disabled}
    ></phsa-otp-input>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
export const Alphanumeric: Story = { args: { type: "alphanumeric", value: "A2B" } };
export const Masked: Story = { args: { mask: true, value: "123" } };
export const Disabled: Story = { args: { disabled: true, value: "123456" } };

export const InForm: Story = {
  render: () => html`
    <form
      style="display:grid;gap:1rem;max-width:max-content"
      @submit=${(event: SubmitEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        form.querySelector("output")!.textContent = String(new FormData(form).get("code"));
      }}
    >
      <phsa-otp-input name="code" label="Código" required></phsa-otp-input>
      <phsa-button type="submit">Verificar</phsa-button>
      <output></output>
    </form>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-otp-input class="gap-3 rounded-xl bg-violet-50 p-3"></phsa-otp-input>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>.hostile * { background:red; color:yellow; width:80px; height:20px; }</style>
    <div class="hostile"><phsa-otp-input></phsa-otp-input></div>
  `,
};
