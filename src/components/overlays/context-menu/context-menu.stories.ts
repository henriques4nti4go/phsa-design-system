import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./index";

const meta = {
  title: "Overlays/Context Menu",
  component: "phsa-context-menu",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const menu = (extra = "") => html`
  <phsa-context-menu class=${extra}>
    <div
      slot="trigger"
      tabindex="0"
      style="display:flex;align-items:center;justify-content:center;width:24rem;height:12rem;border:1px dashed #999;border-radius:.5rem"
    >
      Clique com o botão direito
    </div>
    <phsa-dropdown-item value="back">Voltar</phsa-dropdown-item>
    <phsa-dropdown-item value="reload">Recarregar</phsa-dropdown-item>
    <phsa-dropdown-separator></phsa-dropdown-separator>
    <phsa-dropdown-item value="inspect">Inspecionar</phsa-dropdown-item>
    <phsa-dropdown-item value="delete" variant="destructive">Excluir</phsa-dropdown-item>
  </phsa-context-menu>
`;

export const Default: Story = { render: () => menu() };

export const WithEvent: Story = {
  render: () => html`
    <div
      @phsa-select=${(event: CustomEvent<{ value: string }>) => {
        (event.currentTarget as HTMLElement).querySelector("output")!.textContent = event.detail.value;
      }}
    >
      ${menu()}
      <output style="display:block;margin-top:.75rem"></output>
    </div>
  `,
};

export const CustomClasses: Story = { render: () => menu("min-w-56 rounded-none") };

export const Isolation: Story = {
  render: () => html`
    <style>.hostile * { background:red; color:yellow; padding:20px; border:4px dashed lime; }</style>
    <div class="hostile">${menu()}</div>
  `,
};
