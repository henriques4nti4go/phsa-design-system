// src/components/forms/Input/Input.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs"
import React from "react"
import { Input } from "./index"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "../../ui/field"

const meta = {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    type: {
      control: "text",
    },
    placeholder: {
      control: "text",
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
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// Input simples (sem Field)
export const Default: Story = {
  args: {
    placeholder: "Digite algo...",
  },
}

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Senha",
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Desabilitado",
  },
}

// Input com Field automático (usando props)
export const WithField: Story = {
  args: {
    label: "Nome completo",
    description: "Digite o seu nome completo",
    placeholder: "João Silva",
  },
}

export const WithError: Story = {
  args: {
    label: "Email",
    description: "Digite o seu email",
    placeholder: "email@exemplo.com",
    error: "Este campo é obrigatório",
  },
}

export const WithMultipleErrors: Story = {
  render: () => (
    <Input
      label="Senha"
      description="A senha deve ter pelo menos 8 caracteres"
      type="password"
      placeholder="••••••••"
      error={[
        { message: "A senha deve ter pelo menos 8 caracteres" },
        { message: "A senha deve conter pelo menos uma letra maiúscula" },
      ]}
    />
  ),
}

export const Horizontal: Story = {
  args: {
    label: "Telefone",
    description: "Digite o seu telefone",
    placeholder: "(11) 99999-9999",
    orientation: "horizontal",
  },
}

export const WithoutLabel: Story = {
  args: {
    description: "Campo sem label visível",
    placeholder: "Digite algo...",
  },
}

// Input usado manualmente com Field
export const ManualField: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="manual-input">Nome completo</FieldLabel>
      <FieldContent>
        <Input id="manual-input" placeholder="João Silva" />
        <FieldDescription>Digite o seu nome completo</FieldDescription>
      </FieldContent>
    </Field>
  ),
}

export const ManualFieldWithError: Story = {
  render: () => (
    <Field data-invalid>
      <FieldLabel htmlFor="manual-error-input">Email</FieldLabel>
      <FieldContent>
        <Input id="manual-error-input" placeholder="email@exemplo.com" aria-invalid />
        <FieldError>Este campo é obrigatório</FieldError>
      </FieldContent>
    </Field>
  ),
}
