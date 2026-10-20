import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { SPACES, type Space } from "../../../core/layout";
import { GRID_COLUMNS, type GridColumns } from "./grid";
import "./index";
import "../../data-display/card";

type Args = { columns: GridColumns; gap: Space; minItemWidth: string };

const cards = (count: number) =>
  Array.from({ length: count }, (_, i) => html`<phsa-card heading=${`Card ${i + 1}`} description="Item da grade."></phsa-card>`);

const meta = {
  title: "Layout/Grid",
  component: "phsa-grid",
  tags: ["autodocs"],
  args: { columns: 3, gap: "md", minItemWidth: "" },
  argTypes: {
    columns: { control: "select", options: GRID_COLUMNS },
    gap: { control: "select", options: SPACES },
  },
  render: ({ columns, gap, minItemWidth }) => html`
    <phsa-grid columns=${columns} gap=${gap} min-item-width=${minItemWidth}>${cards(6)}</phsa-grid>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const AutoFit: Story = { args: { minItemWidth: "14rem" } };

export const StackBelow: Story = {
  render: () => html`<phsa-grid columns="2" stack-below="md">${cards(2)}</phsa-grid>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile div { display: block !important; background: red; }
    </style>
    <div class="hostile"><phsa-grid columns="3">${cards(3)}</phsa-grid></div>
  `,
};
