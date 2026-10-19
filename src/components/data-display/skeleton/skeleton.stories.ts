import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { SKELETON_VARIANTS, type SkeletonVariant } from "./skeleton";
import "./index";

type Args = { variant: SkeletonVariant; animated: boolean };

const meta = {
  title: "Data display/Skeleton",
  component: "phsa-skeleton",
  tags: ["autodocs"],
  args: { variant: "rectangular", animated: true },
  argTypes: { variant: { control: "select", options: SKELETON_VARIANTS } },
  render: ({ variant, animated }) => html`
    <phsa-skeleton variant=${variant} .animated=${animated} style="max-width:24rem"></phsa-skeleton>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => html`
    <div style="display:grid;gap:1rem;max-width:24rem">
      <phsa-skeleton variant="text"></phsa-skeleton>
      <phsa-skeleton variant="circular"></phsa-skeleton>
      <phsa-skeleton variant="rectangular"></phsa-skeleton>
    </div>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-skeleton class="h-40 w-64 rounded-2xl bg-violet-200"></phsa-skeleton>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { background: red; border-radius: 0; width: 10px; height: 10px; }
    </style>
    <div class="hostile"><phsa-skeleton style="max-width:24rem"></phsa-skeleton></div>
  `,
};
