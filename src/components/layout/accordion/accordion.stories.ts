import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { ACCORDION_TYPES, type AccordionType } from "./accordion";
import "./index";

type Args = { type: AccordionType; value: string };

const items = () => html`
  <phsa-accordion-item value="account" heading="Minha conta">Altere seus dados pessoais e preferências.</phsa-accordion-item>
  <phsa-accordion-item value="billing" heading="Cobrança">Consulte faturas e formas de pagamento.</phsa-accordion-item>
  <phsa-accordion-item value="security" heading="Segurança">Configure senha e autenticação em duas etapas.</phsa-accordion-item>
`;

const meta = {
  title: "Layout/Accordion",
  component: "phsa-accordion",
  tags: ["autodocs"],
  args: { type: "single", value: "account" },
  argTypes: { type: { control: "select", options: ACCORDION_TYPES } },
  render: ({ type, value }) => html`
    <phsa-accordion type=${type} value=${value} style="max-width:36rem">${items()}</phsa-accordion>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Multiple: Story = { args: { type: "multiple", value: "account,billing" } };

export const Disabled: Story = {
  render: () => html`
    <phsa-accordion style="max-width:36rem">
      <phsa-accordion-item value="one" heading="Disponível">Conteúdo disponível.</phsa-accordion-item>
      <phsa-accordion-item value="two" heading="Indisponível" disabled>Conteúdo indisponível.</phsa-accordion-item>
    </phsa-accordion>
  `,
};

export const CustomClasses: Story = {
  render: () => html`
    <phsa-accordion class="rounded-xl border px-4" style="max-width:36rem">${items()}</phsa-accordion>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
    </style>
    <div class="hostile"><phsa-accordion style="max-width:36rem">${items()}</phsa-accordion></div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-primary:oklch(0.55 0.22 264);--phsa-border:oklch(0.7 0.12 264)">
      <phsa-accordion style="max-width:36rem">${items()}</phsa-accordion>
    </div>
  `,
};
