// src/components/forms/NumericInput/NumericInput.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs"
import React from "react"
import { NumericInput } from "./index"

const meta = {
  title: "Forms/NumericInput",
  component: NumericInput,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    description: {
      control: "text",
    },
    prefix: {
      control: "text",
    },
    suffix: {
      control: "text",
    },
    thousandSeparator: {
      control: "text",
    },
    decimalSeparator: {
      control: "text",
    },
    decimalScale: {
      control: "number",
    },
    allowNegative: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof NumericInput>

export default meta
type Story = StoryObj<typeof meta>

// Input numérico simples
export const Default: Story = {
  args: {
    placeholder: "Digite um número",
  },
}

// Moeda brasileira
export const Currency: Story = {
  name: "Currency (BRL)",
  args: {
    label: "Valor",
    description: "Digite o valor em reais",
    prefix: "R$ ",
    thousandSeparator: ".",
    decimalSeparator: ",",
    decimalScale: 2,
    placeholder: "0,00",
  },
}

// Percentual
export const Percentage: Story = {
  name: "Percentage",
  args: {
    label: "Taxa de juros",
    description: "Digite a taxa de juros",
    suffix: "%",
    decimalScale: 2,
    placeholder: "0,00",
  },
}

// Número inteiro
export const Integer: Story = {
  name: "Integer",
  args: {
    label: "Quantidade",
    description: "Digite apenas números inteiros",
    allowDecimal: false,
    placeholder: "0",
  },
}

// Com erro
export const WithError: Story = {
  name: "With Error",
  args: {
    label: "Valor",
    description: "Digite o valor em reais",
    prefix: "R$ ",
    thousandSeparator: ".",
    decimalSeparator: ",",
    decimalScale: 2,
    error: "Este campo é obrigatório",
  },
}

// Múltiplos erros
export const WithMultipleErrors: Story = {
  name: "With Multiple Errors",
  render: () => (
    <NumericInput
      label="Valor"
      description="Digite um valor válido"
      prefix="R$ "
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      error={[
        { message: "O valor deve ser maior que zero" },
        { message: "O valor não pode exceder R$ 1.000.000,00" },
      ]}
    />
  ),
}

// Orientação horizontal
export const Horizontal: Story = {
  name: "Horizontal Orientation",
  args: {
    label: "Valor",
    description: "Digite o valor em reais",
    prefix: "R$ ",
    thousandSeparator: ".",
    decimalSeparator: ",",
    decimalScale: 2,
    orientation: "horizontal",
  },
}

// Sem label
export const WithoutLabel: Story = {
  name: "Without Label",
  args: {
    description: "Campo numérico sem label visível",
    prefix: "R$ ",
    thousandSeparator: ".",
    decimalSeparator: ",",
    decimalScale: 2,
    placeholder: "0,00",
  },
}

// Número de telefone (exemplo alternativo)
export const PhoneNumber: Story = {
  name: "Phone Number",
  render: () => (
    <NumericInput
      label="Telefone"
      description="Digite apenas números"
      format="(##) #####-####"
      allowEmptyFormatting
      mask="_"
      placeholder="(00) 00000-0000"
    />
  ),
}

// CPF (exemplo alternativo)
export const CPF: Story = {
  name: "CPF",
  render: () => (
    <NumericInput
      label="CPF"
      description="Digite o CPF sem pontos e hífen"
      format="###.###.###-##"
      allowEmptyFormatting
      mask="_"
      placeholder="000.000.000-00"
    />
  ),
}
