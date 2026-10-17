import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { TABS_ORIENTATIONS, type TabsOrientation } from "./tabs";
import "./index";

type Args = { orientation: TabsOrientation };

const meta = {
  title: "Layout/Tabs",
  component: "phsa-tabs",
  tags: ["autodocs"],
  args: { orientation: "horizontal" },
  argTypes: { orientation: { control: "select", options: TABS_ORIENTATIONS } },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

const tabs = (orientation: TabsOrientation = "horizontal", extra = "") => html`
  <phsa-tabs orientation=${orientation} value="conta" class=${extra || "max-w-md"}>
    <phsa-tab slot="tab" value="conta">Conta</phsa-tab>
    <phsa-tab slot="tab" value="senha">Senha</phsa-tab>
    <phsa-tab slot="tab" value="time" disabled>Time</phsa-tab>
    <phsa-tab-panel value="conta"><p style="margin:0">Nome, e-mail e idioma.</p></phsa-tab-panel>
    <phsa-tab-panel value="senha"><p style="margin:0">Troque a senha deste acesso.</p></phsa-tab-panel>
    <phsa-tab-panel value="time"><p style="margin:0">Membros do time.</p></phsa-tab-panel>
  </phsa-tabs>
`;

export const Default: Story = { render: () => tabs() };

export const Vertical: Story = { render: () => tabs("vertical") };

export const CustomClasses: Story = { render: () => tabs("horizontal", "w-full") };

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile button { background: red; color: yellow; }
    </style>
    <div class="hostile">${tabs()}</div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`<div style="--phsa-muted: oklch(0.93 0.03 264); --phsa-radius: 1rem">${tabs()}</div>`,
};
