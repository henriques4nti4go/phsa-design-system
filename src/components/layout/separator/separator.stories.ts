import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { SEPARATOR_ORIENTATIONS, type SeparatorOrientation } from "./separator";
import "./index";

type Args = { orientation: SeparatorOrientation; decorative: boolean };

const meta = {
  title: "Layout/Separator",
  component: "phsa-separator",
  tags: ["autodocs"],
  args: { orientation: "horizontal", decorative: true },
  argTypes: { orientation: { control: "select", options: SEPARATOR_ORIENTATIONS } },
  render: ({ orientation, decorative }) => html`
    <div style=${orientation === "vertical" ? "display:flex;align-items:stretch;height:2.5rem;gap:1rem" : "max-width:20rem"}>
      <span>Antes</span>
      <phsa-separator orientation=${orientation} ?decorative=${decorative}></phsa-separator>
      <span>Depois</span>
    </div>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Vertical: Story = { args: { orientation: "vertical" } };

export const CustomClasses: Story = {
  render: () => html`<div style="max-width:20rem"><phsa-separator class="h-1 bg-emerald-600"></phsa-separator></div>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { background: red; height: 20px; }
    </style>
    <div class="hostile" style="max-width:20rem;display:flex;flex-direction:column;gap:.75rem">
      <phsa-separator></phsa-separator>
      <div>div nativa</div>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-border: oklch(0.55 0.22 264); max-width:20rem">
      <phsa-separator></phsa-separator>
    </div>
  `,
};
