// src/components/data-display/Card/Card.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs"
import React from "react"

import {
  Card,
  CardRoot,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
} from "./index"
import { Button } from "../../../components/actions/Button"

const meta = {
  title: "Data Display/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
    badge: {
      control: "text",
    },
    image: {
      control: "text",
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Título do Card",
    description: "Descrição breve do conteúdo deste card.",
    children: (
      <p className="text-sm text-muted-foreground">
        Este é o conteúdo principal do card. Você pode colocar textos,
        formulários, listas ou qualquer outro componente aqui.
      </p>
    ),
    footer: (
      <span className="text-xs text-muted-foreground">
        Rodapé do card (ex: ações, links ou metadados).
      </span>
    ),
  } as CardProps,
}

export const SemHeader: Story = {
  name: "Sem header (apenas conteúdo)",
  args: {
    children: (
      <p className="text-sm">
        Este card não possui título nem descrição, apenas conteúdo livre.
      </p>
    ),
  } as CardProps,
}

export const CustomizadoComPrimitivos: Story = {
  name: "Usando primitivos do Card",
  render: () => (
    <CardRoot className="max-w-sm">
      <CardHeader>
        <CardTitle>Card Customizado</CardTitle>
        <CardDescription>
          Exemplo usando diretamente os primitivos do Card.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Aqui você tem controle total sobre a estrutura do card, combinando os
          elementos conforme a necessidade.
        </p>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-muted-foreground">
          Rodapé totalmente customizado.
        </span>
      </CardFooter>
    </CardRoot>
  ),
}

export const ComImagemEBadge: Story = {
  name: "Card com imagem, badge e botão",
  render: () => (
    <Card
      className="max-w-sm"
      image={
        <div className="w-full h-48 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Imagem</span>
        </div>
      }
      title="Design systems meetup"
      badge={
        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          Featured
        </span>
      }
      description="A practical talk on component APIs, accessibility, and shipping faster."
      footer={
        <Button className="w-full">View Event</Button>
      }
    />
  ),
}

