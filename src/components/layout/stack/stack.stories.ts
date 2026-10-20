import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { SPACES, type Space } from "../../../core/layout";
import {
  STACK_ALIGNS,
  STACK_BACKGROUNDS,
  STACK_DIRECTIONS,
  STACK_JUSTIFIES,
  type StackAlign,
  type StackBackground,
  type StackDirection,
  type StackJustify,
} from "./stack";
import "./index";
import "../../actions/button";
import "../../data-display/text";

type Args = {
  direction: StackDirection;
  gap: Space;
  align: StackAlign;
  justify: StackJustify;
  padding: Space;
  background: StackBackground;
  wrap: boolean;
};

const meta = {
  title: "Layout/Stack",
  component: "phsa-stack",
  tags: ["autodocs"],
  args: { direction: "column", gap: "md", align: "stretch", justify: "start", padding: "md", background: "muted", wrap: false },
  argTypes: {
    direction: { control: "select", options: STACK_DIRECTIONS },
    gap: { control: "select", options: SPACES },
    align: { control: "select", options: STACK_ALIGNS },
    justify: { control: "select", options: STACK_JUSTIFIES },
    padding: { control: "select", options: SPACES },
    background: { control: "select", options: STACK_BACKGROUNDS },
  },
  render: ({ direction, gap, align, justify, padding, background, wrap }) => html`
    <phsa-stack direction=${direction} gap=${gap} align=${align} justify=${justify} padding=${padding} background=${background} radius="lg" ?wrap=${wrap}>
      <phsa-button>Um</phsa-button>
      <phsa-button variant="secondary">Dois</phsa-button>
      <phsa-button variant="outline">Três</phsa-button>
    </phsa-stack>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Row: Story = { args: { direction: "row", align: "center" } };

export const Surface: Story = {
  render: () => html`
    <phsa-stack background="primary" padding="xl" radius="xl" gap="sm">
      <phsa-text variant="h3">Superfície</phsa-text>
      <phsa-text>O texto herda a cor que combina com o fundo.</phsa-text>
    </phsa-stack>
  `,
};

export const CenteredContainer: Story = {
  render: () => html`
    <phsa-stack background="muted" padding="lg">
      <phsa-stack max-width="sm" background="background" padding="lg" radius="lg" bordered>
        <phsa-text variant="h4">max-width="sm"</phsa-text>
        <phsa-button block>Largura total</phsa-button>
      </phsa-stack>
    </phsa-stack>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile div { display: block !important; padding: 20px; background: red; }
      .hostile * { font-family: "Comic Sans MS", cursive; }
    </style>
    <div class="hostile">
      <phsa-stack direction="row" gap="sm">
        <phsa-button>A</phsa-button>
        <phsa-button>B</phsa-button>
      </phsa-stack>
    </div>
  `,
};
