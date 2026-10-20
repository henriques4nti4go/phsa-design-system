import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { LINK_SIZES, LINK_VARIANTS, type LinkSize, type LinkVariant } from "./link";
import "./index";

type Args = { label: string; href: string; variant: LinkVariant; size: LinkSize };

const meta = {
  title: "Navigation/Link",
  component: "phsa-link",
  tags: ["autodocs"],
  args: { label: "Esqueci a senha", href: "#", variant: "default", size: "default" },
  argTypes: {
    variant: { control: "select", options: LINK_VARIANTS },
    size: { control: "select", options: LINK_SIZES },
  },
  render: ({ label, href, variant, size }) => html`<phsa-link href=${href} variant=${variant} size=${size}>${label}</phsa-link>`,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display:flex;gap:1rem">
      ${LINK_VARIANTS.map((variant) => html`<phsa-link href="#" variant=${variant}>${variant}</phsa-link>`)}
    </div>
  `,
};

export const External: Story = {
  render: () => html`<phsa-link href="https://example.com" target="_blank">Abre em nova aba</phsa-link>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile a { color: red !important; font-size: 30px; text-decoration: line-through; }
    </style>
    <div class="hostile" style="display:flex;gap:1rem;align-items:center">
      <phsa-link href="#">phsa</phsa-link>
      <a href="#">a nativo</a>
    </div>
  `,
};
