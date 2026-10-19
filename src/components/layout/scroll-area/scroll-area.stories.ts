import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { SCROLL_AREA_ORIENTATIONS, type ScrollAreaOrientation } from "./scroll-area";
import "./index";

type Args = { orientation: ScrollAreaOrientation };

const lines = () => Array.from({ length: 16 }, (_, index) => html`<p style="margin:0 0 .5rem">Linha ${index + 1} — conteúdo para rolar.</p>`);

const meta = {
  title: "Layout/Scroll Area",
  component: "phsa-scroll-area",
  tags: ["autodocs"],
  args: { orientation: "vertical" },
  argTypes: { orientation: { control: "select", options: SCROLL_AREA_ORIENTATIONS } },
  render: ({ orientation }) => html`
    <phsa-scroll-area orientation=${orientation} class="h-48 w-72 rounded-md border p-3">${lines()}</phsa-scroll-area>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: () => html`
    <phsa-scroll-area orientation="horizontal" class="w-72 rounded-md border p-3">
      <div style="display:flex;gap:.5rem;width:max-content">
        ${Array.from({ length: 12 }, (_, index) => html`<span style="flex:none;padding:.5rem .75rem;border:1px solid var(--phsa-border);border-radius:.375rem">Item ${index + 1}</span>`)}
      </div>
    </phsa-scroll-area>
  `,
};

export const CustomClasses: Story = {
  render: () => html`
    <phsa-scroll-area class="h-40 w-72 rounded-none border p-4">${lines()}</phsa-scroll-area>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { background: red; color: yellow; padding: 20px; border: 4px dashed lime; }
    </style>
    <div class="hostile">
      <phsa-scroll-area class="h-40 w-72">${lines()}</phsa-scroll-area>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-border:oklch(0.55 0.12 264);--phsa-radius:1rem">
      <phsa-scroll-area class="h-40 w-72 rounded-md border p-3">${lines()}</phsa-scroll-area>
    </div>
  `,
};
