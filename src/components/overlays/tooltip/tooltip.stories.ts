import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import { ANCHOR_SIDES, type AnchorSide } from "./tooltip";
import "./index";

type Args = { side: AnchorSide; text: string };

const meta = {
  title: "Overlays/Tooltip",
  component: "phsa-tooltip",
  tags: ["autodocs"],
  args: { side: "top", text: "Salvar as alterações" },
  argTypes: { side: { control: "select", options: ANCHOR_SIDES } },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

const tip = (side: AnchorSide = "top", extra = "", text = "Salvar as alterações") => html`
  <phsa-tooltip side=${side} text=${text} class=${extra}>
    <phsa-button slot="trigger" type="button" variant="outline">Salvar</phsa-button>
  </phsa-tooltip>
`;

export const Default: Story = { render: () => tip() };

export const Sides: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:1rem;padding:3rem">
      ${ANCHOR_SIDES.map((side) => tip(side, "", side))}
    </div>
  `,
};

export const CustomClasses: Story = { render: () => tip("top", "rounded-none px-4") };

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile div { background: red; color: yellow; }
    </style>
    <div class="hostile"><phsa-tooltip open text="Isolado"><phsa-button slot="trigger" type="button">Salvar</phsa-button></phsa-tooltip></div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-foreground: oklch(0.35 0.12 264); --phsa-background: oklch(0.97 0.02 264); --phsa-radius: 1rem">
      <phsa-tooltip open text="Tema"><phsa-button slot="trigger" type="button">Salvar</phsa-button></phsa-tooltip>
    </div>
  `,
};
