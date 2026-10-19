import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "./index";

const meta = {
  title: "Navigation/Navigation Menu",
  component: "phsa-navigation-menu",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const menu = (extra = "") => html`
  <phsa-navigation-menu class=${extra}>
    <phsa-navigation-menu-item href="/" current>Início</phsa-navigation-menu-item>
    <phsa-navigation-menu-item label="Produtos">
      <div style="display:grid;gap:.25rem;min-width:12rem">
        <a href="/web">Web</a>
        <a href="/mobile">Mobile</a>
        <a href="/api">API</a>
      </div>
    </phsa-navigation-menu-item>
    <phsa-navigation-menu-item label="Recursos">
      <div style="display:grid;gap:.25rem;min-width:12rem">
        <a href="/docs">Documentação</a>
        <a href="/blog">Blog</a>
      </div>
    </phsa-navigation-menu-item>
    <phsa-navigation-menu-item href="/about">Sobre</phsa-navigation-menu-item>
  </phsa-navigation-menu>
`;

export const Default: Story = { render: () => menu() };

export const Disabled: Story = {
  render: () => html`
    <phsa-navigation-menu>
      <phsa-navigation-menu-item href="/">Início</phsa-navigation-menu-item>
      <phsa-navigation-menu-item label="Produtos" disabled>
        <a href="/web">Web</a>
      </phsa-navigation-menu-item>
      <phsa-navigation-menu-item href="/about">Sobre</phsa-navigation-menu-item>
    </phsa-navigation-menu>
  `,
};

export const CustomClasses: Story = { render: () => menu("rounded-md bg-muted p-1") };

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile div { background: red; color: yellow; }
    </style>
    <div class="hostile">${menu()}</div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`<div style="--phsa-background: oklch(0.97 0.02 264); --phsa-radius: 1rem">${menu()}</div>`,
};
