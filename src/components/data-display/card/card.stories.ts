import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../actions/button";
import "./index";

const meta = {
  title: "Data Display/Card",
  component: "phsa-card",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const card = (extra = "max-w-sm") => html`
  <phsa-card class=${extra} heading="Equipe" description="Quem acessa este projeto.">
    <p style="margin:0">Três pessoas com papel de editor.</p>
    <phsa-button slot="footer" type="button" variant="outline">Gerenciar</phsa-button>
  </phsa-card>
`;

export const Default: Story = { render: () => card() };

export const WithImage: Story = {
  render: () => html`
    <phsa-card class="max-w-sm" heading="Costa norte" description="Trilha de fim de semana.">
      <svg slot="media" viewBox="0 0 640 360" role="img" aria-label="Mar, pinheiros e um mirante na costa">
        <defs>
          <linearGradient id="phsa-card-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#8ec6e6" />
            <stop offset="1" stop-color="#e7f3f8" />
          </linearGradient>
        </defs>
        <rect width="640" height="360" fill="url(#phsa-card-sky)" />
        <circle cx="500" cy="78" r="36" fill="#f3d36b" />
        <path d="M0 210 C140 170 220 230 340 200 C460 170 520 150 640 176 L640 360 L0 360 Z" fill="#3c7f9a" />
        <path d="M0 250 C120 220 200 270 320 246 C450 220 530 236 640 214 L640 360 L0 360 Z" fill="#2d6248" />
        <path d="M0 292 C150 270 240 310 400 286 C500 272 560 286 640 268 L640 360 L0 360 Z" fill="#244e3a" />
        <path d="M96 292 L96 214 L128 188 L160 214 L160 292 Z" fill="#1b3a2c" />
        <rect x="118" y="246" width="20" height="46" fill="#d7e4dc" />
      </svg>
      <p style="margin:0">Quatro horas de caminhada, com mirante no meio do caminho.</p>
      <phsa-button slot="footer" type="button">Ver roteiro</phsa-button>
    </phsa-card>
  `,
};

export const CustomClasses: Story = {
  render: () => card("max-w-sm rounded-none border-2 shadow-none"),
};

export const Isolation: Story = {
  render: () => html`
    <style>
      .hostile * { font-family: "Comic Sans MS", cursive; letter-spacing: 3px; text-transform: uppercase; }
      .hostile section { background: red; color: yellow; border: 4px dashed lime; }
    </style>
    <div class="hostile">${card()}</div>
  `,
};

export const CustomTheme: Story = {
  render: () => html`<div style="--phsa-background: oklch(0.97 0.02 264); --phsa-radius: 1.5rem">${card()}</div>`,
};
