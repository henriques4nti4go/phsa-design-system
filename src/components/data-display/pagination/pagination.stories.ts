import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./index";

type Args = { page: number; pageCount: number; siblingCount: number; disabled: boolean };

const meta = {
  title: "Data display/Pagination",
  component: "phsa-pagination",
  tags: ["autodocs"],
  args: { page: 1, pageCount: 10, siblingCount: 1, disabled: false },
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    pageCount: { control: { type: "number", min: 1 } },
    siblingCount: { control: { type: "number", min: 0 } },
  },
  render: ({ page, pageCount, siblingCount, disabled }) => html`
    <phsa-pagination
      .page=${page}
      .pageCount=${pageCount}
      .siblingCount=${siblingCount}
      ?disabled=${disabled}
    ></phsa-pagination>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const ManyPages: Story = { args: { page: 24, pageCount: 80 } };

export const Disabled: Story = { args: { page: 4, disabled: true } };

export const WithEvent: Story = {
  render: () => html`
    <div
      @phsa-change=${(event: CustomEvent<{ page: number }>) => {
        (event.currentTarget as HTMLElement).querySelector("output")!.textContent = `Página ${event.detail.page}`;
      }}
    >
      <phsa-pagination page="3" page-count="12"></phsa-pagination>
      <output style="display:block;margin-top:1rem">Página 3</output>
    </div>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-pagination page="5" page-count="12" class="rounded-xl bg-violet-50 p-2"></phsa-pagination>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
    </style>
    <div class="hostile"><phsa-pagination page="4" page-count="10"></phsa-pagination></div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-primary:oklch(0.55 0.22 264);--phsa-radius:9999px">
      <phsa-pagination page="4" page-count="10"></phsa-pagination>
    </div>
  `,
};
