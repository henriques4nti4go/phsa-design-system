import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { SPINNER_SIZES, type SpinnerSize } from "./spinner";
import "./index";

type Args = { size: SpinnerSize; label: string };

const meta = {
  title: "Feedback/Spinner",
  component: "phsa-spinner",
  tags: ["autodocs"],
  args: { size: "default", label: "Carregando" },
  argTypes: { size: { control: "select", options: SPINNER_SIZES } },
  render: ({ size, label }) => html`<phsa-spinner size=${size} label=${label}></phsa-spinner>`,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;gap:1rem;align-items:center">
      ${SPINNER_SIZES.map((size) => html`<phsa-spinner size=${size}></phsa-spinner>`)}
    </div>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-spinner class="size-12 text-violet-600"></phsa-spinner>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { color: red; width: 80px; height: 80px; animation: none; }
    </style>
    <div class="hostile"><phsa-spinner></phsa-spinner></div>
  `,
};
