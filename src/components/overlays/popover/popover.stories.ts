import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import { ANCHOR_SIDES, type AnchorSide } from "./popover";
import "./index";

type Args = { side: AnchorSide };

const meta = {
  title: "Overlays/Popover",
  component: "phsa-popover",
  tags: ["autodocs"],
  args: { side: "bottom" },
  argTypes: { side: { control: "select", options: ANCHOR_SIDES } },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

const popover = (side: AnchorSide = "bottom", extra = "") => html`
  <phsa-popover side=${side} class=${extra}>
    <phsa-button slot="trigger" type="button" variant="outline">Abrir</phsa-button>
    <p style="margin:0">O painel flutua ancorado no botão. Clique fora para fechar.</p>
  </phsa-popover>
`;

export const Default: Story = { render: () => popover() };

export const Sides: Story = {
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:1rem;padding:4rem">
      ${ANCHOR_SIDES.map((side) => popover(side))}
    </div>
  `,
};

export const CustomClasses: Story = { render: () => popover("bottom", "w-48 rounded-none") };

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile div { background: red; color: yellow; }
    </style>
    <div class="hostile">${popover()}</div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`<div style="--phsa-background: oklch(0.97 0.02 264); --phsa-radius: 1.5rem">${popover()}</div>`,
};
