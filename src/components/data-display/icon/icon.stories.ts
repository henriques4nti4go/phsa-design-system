import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { Bell, Check, Heart, House, Mail, Search, Settings, Trash2, User } from "lucide";
import { ICON_SIZES, ICON_TONES, type IconSize, type IconTone } from "./icon";
import "./index";
import "../../layout/stack";
import "../text";

type Args = { size: IconSize; tone: IconTone; strokeWidth: number; label: string };

const meta = {
  title: "Data Display/Icon",
  component: "phsa-icon",
  tags: ["autodocs"],
  args: { size: "md", tone: "inherit", strokeWidth: 2, label: "" },
  argTypes: {
    size: { control: "select", options: ICON_SIZES },
    tone: { control: "select", options: ICON_TONES },
    strokeWidth: { control: { type: "number", min: 1, max: 3, step: 0.5 } },
  },
  render: ({ size, tone, strokeWidth, label }) => html`
    <phsa-icon .icon=${Mail} size=${size} tone=${tone} stroke-width=${strokeWidth} label=${label}></phsa-icon>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => html`
    <phsa-stack direction="row" align="center" gap="md">
      ${ICON_SIZES.map((size) => html`<phsa-icon .icon=${House} size=${size}></phsa-icon>`)}
    </phsa-stack>
  `,
};

export const Tones: Story = {
  render: () => html`
    <phsa-stack direction="row" align="center" gap="md">
      ${ICON_TONES.map((tone) => html`<phsa-icon .icon=${Heart} size="lg" tone=${tone}></phsa-icon>`)}
    </phsa-stack>
  `,
};

export const WithText: Story = {
  render: () => html`
    <phsa-stack gap="sm">
      ${[
        [User, "Perfil"],
        [Bell, "Notificações"],
        [Settings, "Configurações"],
        [Trash2, "Excluir conta"],
      ].map(
        ([icon, text]) => html`
          <phsa-stack direction="row" align="center" gap="sm">
            <phsa-icon .icon=${icon}></phsa-icon>
            <phsa-text as="span">${text}</phsa-text>
          </phsa-stack>
        `,
      )}
    </phsa-stack>
  `,
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile svg { fill: red !important; stroke: lime !important; width: 64px !important; }
    </style>
    <div class="hostile">
      <phsa-icon .icon=${Search} size="lg"></phsa-icon>
      <phsa-icon .icon=${Check} size="lg"></phsa-icon>
    </div>
  `,
};
