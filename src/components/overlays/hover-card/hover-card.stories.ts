import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import { ANCHOR_SIDES, type AnchorSide } from "./hover-card";
import "./index";

type Args = { side: AnchorSide };

const card = (side: AnchorSide = "bottom", extra = "") => html`
  <phsa-hover-card side=${side} class=${extra}>
    <phsa-button slot="trigger" type="button" variant="link">@phsa</phsa-button>
    <div>
      <strong style="display:block">PHSA</strong>
      <span style="color:var(--phsa-muted-foreground)">Design system isolado em Web Components.</span>
    </div>
  </phsa-hover-card>
`;

const meta = {
  title: "Overlays/Hover Card",
  component: "phsa-hover-card",
  tags: ["autodocs"],
  args: { side: "bottom" },
  argTypes: { side: { control: "select", options: ANCHOR_SIDES } },
  render: ({ side }) => card(side),
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Open: Story = {
  render: () => html`
    <phsa-hover-card open>
      <phsa-button slot="trigger" type="button" variant="link">@phsa</phsa-button>
      <div>
        <strong style="display:block">PHSA</strong>
        <span>Cartão visível para inspeção.</span>
      </div>
    </phsa-hover-card>
  `,
};

export const CustomClasses: Story = { render: () => card("bottom", "rounded-none w-80") };

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile div { background: red; color: yellow; }
    </style>
    <div class="hostile">
      <phsa-hover-card open>
        <phsa-button slot="trigger" type="button">Perfil</phsa-button>
        <div>Isolado.</div>
      </phsa-hover-card>
    </div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`
    <div style="--phsa-background: oklch(0.97 0.02 264); --phsa-radius: 1rem">
      <phsa-hover-card open>
        <phsa-button slot="trigger" type="button" variant="link">Tema</phsa-button>
        <div>Cartão com tokens.</div>
      </phsa-hover-card>
    </div>
  `,
};
