import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { AVATAR_SIZES, type AvatarSize } from "./avatar";
import "./index";

type Args = { src: string; name: string; size: AvatarSize; shape: "circle" | "square" };

const meta = {
  title: "Data display/Avatar",
  component: "phsa-avatar",
  tags: ["autodocs"],
  args: { src: "", name: "Ana Costa", size: "default", shape: "circle" },
  argTypes: {
    size: { control: "select", options: AVATAR_SIZES },
    shape: { control: "select", options: ["circle", "square"] },
  },
  render: ({ src, name, size, shape }) => html`
    <phsa-avatar src=${src} name=${name} alt=${name} size=${size} shape=${shape}></phsa-avatar>
  `,
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => html`
    <div style="display:flex;gap:.75rem;align-items:center">
      ${AVATAR_SIZES.map((size) => html`<phsa-avatar name="Ana Costa" size=${size}></phsa-avatar>`)}
    </div>
  `,
};

export const Fallback: Story = {
  render: () => html`<phsa-avatar src="/imagem-inexistente.jpg" name="Bruno Lima"></phsa-avatar>`,
};

export const Group: Story = {
  render: () => html`
    <phsa-avatar-group max="3">
      <phsa-avatar name="Ana Costa"></phsa-avatar>
      <phsa-avatar name="Bruno Lima"></phsa-avatar>
      <phsa-avatar name="Carla Dias"></phsa-avatar>
      <phsa-avatar name="Diego Souza"></phsa-avatar>
      <phsa-avatar name="Eva Rocha"></phsa-avatar>
    </phsa-avatar-group>
  `,
};

export const CustomClasses: Story = {
  render: () => html`<phsa-avatar name="Ana Costa" class="size-16 bg-violet-100 text-violet-700"></phsa-avatar>`,
};

export const Isolation: Story = {
  render: () => html`
    <style>.hostile * { background:red; color:yellow; width:100px; height:20px; }</style>
    <div class="hostile"><phsa-avatar name="Ana Costa"></phsa-avatar></div>
  `,
};
