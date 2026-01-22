// src/components/forms/RadioGroup/RadioGroup.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs"
import React from "react"
import { RadioGroup } from "./index"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "../../ui/field"

const meta = {
  title: "Forms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    fieldOrientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

const simpleOptions = [
  { value: "option1", label: "Opção 1" },
  { value: "option2", label: "Opção 2" },
  { value: "option3", label: "Opção 3" },
]

const manyOptions = [
  { value: "sp", label: "São Paulo" },
  { value: "rj", label: "Rio de Janeiro" },
  { value: "mg", label: "Minas Gerais" },
  { value: "rs", label: "Rio Grande do Sul" },
  { value: "pr", label: "Paraná" },
  { value: "sc", label: "Santa Catarina" },
]

// RadioGroup simples (sem Field)
export const Default: Story = {
  args: {
    options: simpleOptions,
  },
}

export const Horizontal: Story = {
  args: {
    options: simpleOptions,
    orientation: "horizontal",
  },
}

export const Disabled: Story = {
  args: {
    options: simpleOptions,
    disabled: true,
  },
}

export const WithDisabledOption: Story = {
  args: {
    options: [
      { value: "option1", label: "Opção 1" },
      { value: "option2", label: "Opção 2", disabled: true },
      { value: "option3", label: "Opção 3" },
    ],
  },
}

// RadioGroup com Field automático (usando props)
export const WithField: Story = {
  args: {
    label: "Selecione uma opção",
    description: "Escolha uma das opções disponíveis",
    options: simpleOptions,
  },
}

export const WithError: Story = {
  args: {
    label: "Selecione uma opção",
    description: "Escolha uma das opções disponíveis",
    error: "Este campo é obrigatório",
    options: simpleOptions,
  },
}

export const WithMultipleErrors: Story = {
  render: () => (
    <RadioGroup
      label="Selecione uma opção"
      description="Escolha uma das opções disponíveis"
      options={simpleOptions}
      error={[
        { message: "Este campo é obrigatório" },
        { message: "Você deve selecionar uma opção válida" },
      ]}
    />
  ),
}

export const FieldHorizontal: Story = {
  args: {
    label: "Estado",
    description: "Selecione o estado onde você mora",
    options: manyOptions,
    fieldOrientation: "horizontal",
  },
}

export const ItemsHorizontal: Story = {
  args: {
    label: "Selecione uma opção",
    description: "Itens dispostos horizontalmente",
    options: simpleOptions,
    orientation: "horizontal",
  },
}

export const WithoutLabel: Story = {
  args: {
    description: "Campo sem label visível",
    options: simpleOptions,
  },
}

// RadioGroup usado manualmente com Field
export const ManualField: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="manual-radio">Selecione uma opção</FieldLabel>
      <FieldContent>
        <RadioGroup id="manual-radio" options={simpleOptions} />
        <FieldDescription>Escolha uma das opções disponíveis</FieldDescription>
      </FieldContent>
    </Field>
  ),
}

export const ManualFieldWithError: Story = {
  render: () => (
    <Field data-invalid>
      <FieldLabel htmlFor="manual-error-radio">Selecione uma opção</FieldLabel>
      <FieldContent>
        <RadioGroup id="manual-error-radio" options={simpleOptions} aria-invalid />
        <FieldError>Este campo é obrigatório</FieldError>
      </FieldContent>
    </Field>
  ),
}

// RadioGroup controlado
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>("")
    return (
      <div className="space-y-4">
        <RadioGroup
          label="Estado (Controlado)"
          description="O valor é controlado externamente"
          options={manyOptions}
          value={value}
          onValueChange={setValue}
        />
        <div className="text-sm text-muted-foreground">
          Selecionado: {value || "Nenhum"}
        </div>
      </div>
    )
  },
}

// RadioGroup com muitas opções
export const ManyOptions: Story = {
  render: () => {
    const manyOptionsList = Array.from({ length: 10 }, (_, i) => ({
      value: `option-${i}`,
      label: `Opção ${i + 1}`,
    }))
    return (
      <RadioGroup
        label="Selecione uma opção"
        description="Teste com muitas opções (10 itens)"
        options={manyOptionsList}
      />
    )
  },
}
