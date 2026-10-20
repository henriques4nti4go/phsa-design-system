import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { TEXT_ALIGNS, TEXT_TONES, TEXT_VARIANTS, TEXT_WEIGHTS, type TextTone, type TextVariant } from "./text";
import "./index";
import "../../layout/stack";

type Args = { text: string; variant: TextVariant; tone: TextTone; weight: string; align: string };

const meta = {
  title: "Data Display/Text",
  component: "phsa-text",
  tags: ["autodocs"],
  args: { text: "O rato roeu a roupa do rei de Roma.", variant: "body", tone: "inherit", weight: "", align: "" },
  argTypes: {
    variant: { control: "select", options: TEXT_VARIANTS },
    tone: { control: "select", options: TEXT_TONES },
    weight: { control: "select", options: ["", ...TEXT_WEIGHTS] },
    align: { control: "select", options: ["", ...TEXT_ALIGNS] },
  },
  render: ({ text, variant, tone, weight, align }) => html`
    <phsa-text variant=${variant} tone=${tone} weight=${weight} align=${align}>${text}</phsa-text>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Scale: Story = {
  render: () => html`
    <phsa-stack gap="sm">
      ${TEXT_VARIANTS.map((variant) => html`<phsa-text variant=${variant}>${variant}</phsa-text>`)}
    </phsa-stack>
  `,
};

export const Tones: Story = {
  render: () => html`
    <phsa-stack gap="xs">
      ${TEXT_TONES.map((tone) => html`<phsa-text tone=${tone}>tone="${tone}"</phsa-text>`)}
    </phsa-stack>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile h1, .hostile p { color: red; font-family: "Comic Sans MS", cursive; margin: 40px; text-transform: uppercase; }
    </style>
    <div class="hostile">
      <phsa-text variant="h1">Título phsa</phsa-text>
      <phsa-text>Parágrafo phsa</phsa-text>
      <p>p nativo</p>
    </div>
  `,
};
