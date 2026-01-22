// src/components/data-display/Icon/Icon.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs"
import React from "react"
import { Icon } from "./index"

const meta = {
  title: "Data Display/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    iconName: {
      control: "text",
      description:
        "Nome do ícone do `react-icons` como string (ex: `MdHome`, `FiUser`, `FaHeart`). O componente identifica automaticamente a biblioteca baseado no prefixo.",
    },
    size: {
      control: {
        type: "number",
      },
      defaultValue: 20,
    },
    className: {
      control: "text",
      description: "Classes Tailwind CSS para estilizar o ícone (ex: `text-primary`, `text-red-500`).",
    },
    "aria-label": {
      control: "text",
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    iconName: "MdHome",
    size: 20,
    "aria-label": "Página inicial",
  },
}

export const Sizes: Story = {
  args: {
    iconName: "MdHome",
    size: 20,
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Icon {...args} size={16} aria-label="Ícone pequeno" />
      <Icon {...args} size={20} aria-label="Ícone médio" />
      <Icon {...args} size={28} aria-label="Ícone grande" />
    </div>
  ),
}

export const Variants: Story = {
  args: {
    iconName: "FiHome",
  },
  render: () => (
    <div className="flex items-center gap-4 text-primary">
      <Icon iconName="FiHome" aria-label="Home" />
      <Icon iconName="FiUser" aria-label="Usuário" />
      <Icon iconName="FiSettings" aria-label="Configurações" />
      <Icon iconName="FaRegHeart" aria-label="Favorito" />
      <Icon iconName="MdFavorite" aria-label="Favorito Material" />
      <Icon iconName="Hi2ArrowRight" aria-label="Seta direita" />
    </div>
  ),
}

export const Decorative: Story = {
  args: {
    iconName: "MdHome",
    size: 20,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Quando nenhum `aria-label` é informado, o ícone é tratado como decorativo (`aria-hidden=true`).",
      },
    },
  },
}

export const DifferentLibraries: Story = {
  args: {
    iconName: "FiHome",
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-2 text-sm font-semibold">Feather Icons (Fi)</h3>
        <div className="flex items-center gap-4">
          <Icon iconName="FiHome" aria-label="Home" />
          <Icon iconName="FiUser" aria-label="User" />
          <Icon iconName="FiSettings" aria-label="Settings" />
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Material Design (Md)</h3>
        <div className="flex items-center gap-4">
          <Icon iconName="MdHome" aria-label="Home" />
          <Icon iconName="MdFavorite" aria-label="Favorite" />
          <Icon iconName="MdSettings" aria-label="Settings" />
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Font Awesome (Fa)</h3>
        <div className="flex items-center gap-4">
          <Icon iconName="FaHeart" aria-label="Heart" />
          <Icon iconName="FaRegHeart" aria-label="Heart Regular" />
          <Icon iconName="FaUser" aria-label="User" />
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Heroicons (Hi2)</h3>
        <div className="flex items-center gap-4">
          <Icon iconName="Hi2ArrowRight" aria-label="Arrow Right" />
          <Icon iconName="Hi2ArrowLeft" aria-label="Arrow Left" />
          <Icon iconName="Hi2Check" aria-label="Check" />
        </div>
      </div>
    </div>
  ),
}

