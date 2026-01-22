// src/components/forms/TextArea/TextArea.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs"
import React from "react"
import { TextArea } from "./index"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "../../ui/field"

const meta = {
  title: "Forms/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    rows: {
      control: "number",
    },
    label: {
      control: "text",
    },
    description: {
      control: "text",
    },
    error: {
      control: "text",
    },
  },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

// TextArea simples (sem Field)
export const Default: Story = {
  args: {
    placeholder: "Digite sua mensagem...",
  },
}

export const WithRows: Story = {
  args: {
    placeholder: "Digite sua mensagem...",
    rows: 5,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Campo desabilitado",
  },
}

// TextArea com Field automático (usando props)
export const WithField: Story = {
  args: {
    label: "Descrição",
    description: "Digite uma descrição detalhada",
    placeholder: "Digite sua descrição aqui...",
  },
}

export const WithError: Story = {
  args: {
    label: "Comentário",
    description: "Digite seu comentário",
    placeholder: "Seu comentário...",
    error: "Este campo é obrigatório",
  },
}

export const WithMultipleErrors: Story = {
  render: () => (
    <TextArea
      label="Mensagem"
      description="A mensagem deve ter pelo menos 10 caracteres"
      placeholder="Digite sua mensagem..."
      error={[
        { message: "A mensagem deve ter pelo menos 10 caracteres" },
        { message: "A mensagem não pode conter palavras ofensivas" },
      ]}
    />
  ),
}

export const Horizontal: Story = {
  args: {
    label: "Observações",
    description: "Adicione observações adicionais",
    placeholder: "Digite suas observações...",
    orientation: "horizontal",
  },
}

export const WithoutLabel: Story = {
  args: {
    description: "Campo sem label visível",
    placeholder: "Digite algo...",
  },
}

// TextArea usado manualmente com Field
export const ManualField: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="manual-textarea">Descrição</FieldLabel>
      <FieldContent>
        <TextArea id="manual-textarea" placeholder="Digite sua descrição..." />
        <FieldDescription>Digite uma descrição detalhada</FieldDescription>
      </FieldContent>
    </Field>
  ),
}

export const ManualFieldWithError: Story = {
  render: () => (
    <Field data-invalid>
      <FieldLabel htmlFor="manual-error-textarea">Comentário</FieldLabel>
      <FieldContent>
        <TextArea id="manual-error-textarea" placeholder="Seu comentário..." aria-invalid />
        <FieldError>Este campo é obrigatório</FieldError>
      </FieldContent>
    </Field>
  ),
}
