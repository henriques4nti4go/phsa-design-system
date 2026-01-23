// src/components/forms/PatternInput/PatternInput.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"
import { PatternInput } from "./index"

const meta = {
  title: "Forms/PatternInput",
  component: PatternInput,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
    },
    description: {
      control: "text",
    },
    format: {
      control: "text",
      description: "Padrão de formatação. Use # para dígitos e outros caracteres como literais.",
    },
    mask: {
      control: "text",
      description: "Caractere usado para preencher espaços vazios no formato.",
    },
    allowEmptyFormatting: {
      control: "boolean",
      description: "Permite mostrar o formato mesmo quando o campo está vazio.",
    },
  },
} satisfies Meta<typeof PatternInput>

export default meta
type Story = StoryObj<typeof meta>

// Telefone brasileiro
export const Phone: Story = {
  name: "Phone (Brazilian)",
  args: {
    label: "Telefone",
    description: "Digite o telefone com DDD",
    format: "(##) #####-####",
    allowEmptyFormatting: true,
    mask: "_",
    placeholder: "(00) 00000-0000",
  },
}

// CPF
export const CPF: Story = {
  name: "CPF",
  args: {
    label: "CPF",
    description: "Digite o CPF",
    format: "###.###.###-##",
    allowEmptyFormatting: true,
    mask: "_",
    placeholder: "000.000.000-00",
  },
}

// CNPJ
export const CNPJ: Story = {
  name: "CNPJ",
  args: {
    label: "CNPJ",
    description: "Digite o CNPJ",
    format: "##.###.###/####-##",
    allowEmptyFormatting: true,
    mask: "_",
    placeholder: "00.000.000/0000-00",
  },
}

// CEP
export const CEP: Story = {
  name: "CEP",
  args: {
    label: "CEP",
    description: "Digite o CEP",
    format: "#####-###",
    allowEmptyFormatting: true,
    mask: "_",
    placeholder: "00000-000",
  },
}

// Data
export const Date: Story = {
  name: "Date",
  args: {
    label: "Data",
    description: "Digite a data",
    format: "##/##/####",
    allowEmptyFormatting: true,
    mask: "_",
    placeholder: "00/00/0000",
  },
}

// Hora
export const Time: Story = {
  name: "Time",
  args: {
    label: "Hora",
    description: "Digite a hora",
    format: "##:##",
    allowEmptyFormatting: true,
    mask: "_",
    placeholder: "00:00",
  },
}

// Cartão de crédito
export const CreditCard: Story = {
  name: "Credit Card",
  args: {
    label: "Cartão de Crédito",
    description: "Digite o número do cartão",
    format: "#### #### #### ####",
    allowEmptyFormatting: true,
    mask: "_",
    placeholder: "0000 0000 0000 0000",
  },
}

// Com erro
export const WithError: Story = {
  name: "With Error",
  args: {
    label: "CPF",
    description: "Digite o CPF",
    format: "###.###.###-##",
    allowEmptyFormatting: true,
    mask: "_",
    error: "CPF inválido",
  },
}

// Múltiplos erros
export const WithMultipleErrors: Story = {
  name: "With Multiple Errors",
  render: () => (
    <PatternInput
      label="Telefone"
      description="Digite o telefone com DDD"
      format="(##) #####-####"
      allowEmptyFormatting
      mask="_"
      error={[
        { message: "O telefone deve ter 11 dígitos" },
        { message: "O DDD deve ser válido" },
      ]}
    />
  ),
}

// Orientação horizontal
export const Horizontal: Story = {
  name: "Horizontal Orientation",
  args: {
    label: "CEP",
    description: "Digite o CEP",
    format: "#####-###",
    allowEmptyFormatting: true,
    mask: "_",
    orientation: "horizontal",
  },
}

// Sem label
export const WithoutLabel: Story = {
  name: "Without Label",
  args: {
    description: "Campo de padrão sem label visível",
    format: "###.###.###-##",
    allowEmptyFormatting: true,
    mask: "_",
    placeholder: "000.000.000-00",
  },
}

// Sem máscara (formato simples)
export const WithoutMask: Story = {
  name: "Without Mask",
  args: {
    label: "Código",
    description: "Digite o código no formato especificado",
    format: "###-###",
    placeholder: "000-000",
  },
}

// Placa de veículo
export const LicensePlate: Story = {
  name: "License Plate (Brazilian)",
  render: () => (
    <PatternInput
      label="Placa do Veículo"
      description="Digite a placa no formato Mercosul (ABC-1D23) ou antigo (ABC-1234)"
      format="AAA-####"
      allowEmptyFormatting
      mask="_"
      placeholder="ABC-1234"
    />
  ),
}
