import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./index";

const meta = {
  title: "Navigation/Breadcrumb",
  component: "phsa-breadcrumb",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <phsa-breadcrumb>
      <phsa-breadcrumb-item href="/">Início</phsa-breadcrumb-item>
      <phsa-breadcrumb-item href="/components">Componentes</phsa-breadcrumb-item>
      <phsa-breadcrumb-item current>Breadcrumb</phsa-breadcrumb-item>
    </phsa-breadcrumb>
  `,
};

export const CustomSeparator: Story = {
  render: () => html`
    <phsa-breadcrumb>
      <phsa-breadcrumb-item href="/">Início</phsa-breadcrumb-item>
      <phsa-breadcrumb-item current><span slot="separator">/</span>Conta</phsa-breadcrumb-item>
    </phsa-breadcrumb>
  `,
};

export const CustomClasses: Story = {
  render: () => html`
    <phsa-breadcrumb class="rounded-md bg-violet-50 p-3">
      <phsa-breadcrumb-item href="/">Início</phsa-breadcrumb-item>
      <phsa-breadcrumb-item current>Configurações</phsa-breadcrumb-item>
    </phsa-breadcrumb>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>.hostile * { color:red; padding:20px; text-transform:uppercase; }</style>
    <div class="hostile">
      <phsa-breadcrumb>
        <phsa-breadcrumb-item href="/">Início</phsa-breadcrumb-item>
        <phsa-breadcrumb-item current>Página</phsa-breadcrumb-item>
      </phsa-breadcrumb>
    </div>
  `,
};
