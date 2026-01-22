// src/components/actions/Button/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs"
import React from "react"
import { Button, ButtonIcon } from "./index"

const meta = {
  title: "Actions/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: "boolean",
    },
    asChild: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
}

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
}

type ButtonIconStory = StoryObj<
  React.ComponentProps<typeof ButtonIcon> & { children?: React.ReactNode }
>

export const IconOnly: ButtonIconStory = {
  name: "Button Icon / Only Icon",
  args: {
    iconName: "MdHome",
    iconOnly: true,
    iconClassName: "text-white",
    children: "Ir para página inicial",
    "aria-label": "Ir para página inicial",
    variant: "default",
  },
  render: (args) => <ButtonIcon {...args} />,
}

export const IconWithLabel: ButtonIconStory = {
  name: "Button Icon / With Label",
  args: {
    iconName: "FiUser",
    iconOnly: false,
    "aria-label": "Perfil do usuário",
    variant: "secondary",
    children: "Perfil",
  },
  render: (args) => <ButtonIcon {...args} />,
}

export const IconVariants: ButtonIconStory = {
  name: "Button Icon / Variants",
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonIcon iconName="MdHome" aria-label="Home" />
      <ButtonIcon iconName="FiUser" aria-label="Usuário" variant="secondary" />
      <ButtonIcon iconName="FaHeart" aria-label="Favorito" variant="outline" />
      <ButtonIcon iconName="Hi2ArrowRight" aria-label="Próximo" variant="ghost" />
      <ButtonIcon iconName="MdDelete" aria-label="Excluir" variant="destructive" />
    </div>
  ),
}

