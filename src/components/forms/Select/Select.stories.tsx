// src/components/forms/Select/Select.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs"
import React from "react"
import { Select, MultiSelect } from "./index"

const meta = {
  title: "Forms/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const simpleOptions = [
  { value: "sp", label: "São Paulo" },
  { value: "rj", label: "Rio de Janeiro" },
  { value: "mg", label: "Minas Gerais" },
  { value: "rs", label: "Rio Grande do Sul" },
  { value: "pr", label: "Paraná" },
  { value: "sc", label: "Santa Catarina" },
  { value: "ba", label: "Bahia" },
  { value: "go", label: "Goiás" },
]

const groupedOptions = [
  {
    label: "Região Sudeste",
    options: [
      { value: "sp", label: "São Paulo" },
      { value: "rj", label: "Rio de Janeiro" },
      { value: "mg", label: "Minas Gerais" },
      { value: "es", label: "Espírito Santo" },
    ],
  },
  {
    label: "Região Sul",
    options: [
      { value: "rs", label: "Rio Grande do Sul" },
      { value: "pr", label: "Paraná" },
      { value: "sc", label: "Santa Catarina" },
    ],
  },
  {
    label: "Região Nordeste",
    options: [
      { value: "ba", label: "Bahia" },
      { value: "pe", label: "Pernambuco" },
      { value: "ce", label: "Ceará" },
    ],
  },
]

export const Default: Story = {
  args: {
    options: simpleOptions,
    placeholder: "Selecione um estado...",
  },
}

export const WithField: Story = {
  args: {
    label: "Estado",
    description: "Selecione o estado onde você mora",
    options: simpleOptions,
    placeholder: "Selecione um estado...",
  },
}

export const WithError: Story = {
  args: {
    label: "Estado",
    description: "Selecione o estado onde você mora",
    error: "Este campo é obrigatório",
    invalid: true,
    options: simpleOptions,
    placeholder: "Selecione um estado...",
  },
}

export const Disabled: Story = {
  args: {
    label: "Estado",
    options: simpleOptions,
    placeholder: "Selecione um estado...",
    disabled: true,
  },
}

export const WithGroups: Story = {
  args: {
    label: "Estado",
    description: "Estados agrupados por região",
    options: groupedOptions,
    placeholder: "Selecione um estado...",
  },
}

export const Controlled: Story = {
  args: {
    label: "Estado (Controlado)",
    description: "O valor é controlado externamente",
    options: simpleOptions,
    placeholder: "Selecione um estado...",
  },
  render: () => {
    const [value, setValue] = React.useState<string>("")
    return (
      <Select
        label="Estado (Controlado)"
        description="O valor é controlado externamente"
        options={simpleOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Selecione um estado..."
      />
    )
  },
}

export const WithSearch: Story = {
  name: "Select / With Search",
  args: {
    label: "Estado",
    description: "Use o campo de busca para filtrar os estados",
    options: simpleOptions,
    placeholder: "Busque e selecione um estado...",
    searchable: true,
    searchPlaceholder: "Buscar estado...",
  },
}

export const WithSearchManyOptions: Story = {
  name: "Select / With Search (Many Options)",
  args: {
    label: "Selecione uma opção",
    description: "Teste com muitas opções (50 itens) - com scroll",
    options: simpleOptions,
    placeholder: "Busque e selecione...",
    searchable: true,
    searchPlaceholder: "Digite para buscar...",
  },
  render: () => {
    const manyOptions = Array.from({ length: 50 }, (_, i) => ({
      value: `option-${i}`,
      label: `Opção ${i + 1}`,
    }))
    return (
      <Select
        label="Selecione uma opção"
        description="Teste com muitas opções (50 itens) - com scroll"
        options={manyOptions}
        placeholder="Busque e selecione..."
        searchable={true}
        searchPlaceholder="Digite para buscar..."
      />
    )
  },
}

export const SearchControlled: Story = {
  name: "Select / With Search (Controlled)",
  args: {
    label: "Estado (Controlado)",
    description: "O valor é controlado externamente",
    options: simpleOptions,
    placeholder: "Busque e selecione um estado...",
    searchable: true,
    searchPlaceholder: "Buscar estado...",
  },
  render: () => {
    const [value, setValue] = React.useState<string>("")
    return (
      <Select
        label="Estado (Controlado)"
        description="O valor é controlado externamente"
        options={simpleOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Busque e selecione um estado..."
        searchable={true}
        searchPlaceholder="Buscar estado..."
      />
    )
  },
}

// ============================================================================
// MultiSelect Stories
// ============================================================================

type MultiSelectStory = StoryObj<typeof MultiSelect>

export const MultiSelectDefault: MultiSelectStory = {
  name: "MultiSelect / Default",
  render: () => (
    <MultiSelect
      options={simpleOptions}
      placeholder="Selecione um ou mais estados..."
      searchPlaceholder="Buscar estado..."
    />
  ),
}

export const MultiSelectWithField: MultiSelectStory = {
  name: "MultiSelect / With Field",
  render: () => (
    <MultiSelect
      label="Estados"
      description="Selecione um ou mais estados"
      options={simpleOptions}
      placeholder="Selecione um ou mais estados..."
      searchPlaceholder="Buscar estado..."
    />
  ),
}

export const MultiSelectWithMax: MultiSelectStory = {
  name: "MultiSelect / With Max Selected",
  render: () => (
    <MultiSelect
      label="Estados (máximo 3)"
      description="Você pode selecionar no máximo 3 estados"
      options={simpleOptions}
      placeholder="Selecione até 3 estados..."
      searchPlaceholder="Buscar estado..."
      maxSelected={3}
    />
  ),
}

export const MultiSelectControlled: MultiSelectStory = {
  name: "MultiSelect / Controlled",
  render: () => {
    const [values, setValues] = React.useState<string[]>([])
    return (
      <div className="space-y-4">
        <MultiSelect
          label="Estados (Controlado)"
          description="O valor é controlado externamente"
          options={simpleOptions}
          value={values}
          onValueChange={setValues}
          placeholder="Selecione um ou mais estados..."
          searchPlaceholder="Buscar estado..."
        />
        <div className="text-sm text-muted-foreground">
          Selecionados: {values.length > 0 ? values.join(", ") : "Nenhum"}
        </div>
      </div>
    )
  },
}

export const MultiSelectWithError: MultiSelectStory = {
  name: "MultiSelect / With Error",
  render: () => (
    <MultiSelect
      label="Estados"
      description="Selecione pelo menos um estado"
      error="Você deve selecionar pelo menos um estado"
      invalid={true}
      options={simpleOptions}
      placeholder="Selecione um ou mais estados..."
      searchPlaceholder="Buscar estado..."
    />
  ),
}

export const MultiSelectManyOptions: MultiSelectStory = {
  name: "MultiSelect / Many Options",
  render: () => {
    const manyOptions = Array.from({ length: 50 }, (_, i) => ({
      value: `option-${i}`,
      label: `Opção ${i + 1}`,
    }))
    return (
      <div className="w-[500px]">
        <MultiSelect
          label="Selecione múltiplas opções"
          description="Teste com muitas opções (50 itens) - com scroll e busca"
          options={manyOptions}
          placeholder="Selecione uma ou mais opções..."
          searchPlaceholder="Digite para buscar..."
        />
      </div>
    )
  },
}

export const MultiSelectWithMaxVisible: MultiSelectStory = {
  name: "MultiSelect / With Max Visible",
  render: () => {
    const [values, setValues] = React.useState<string[]>([
      "sp",
      "rj",
      "mg",
      "rs",
      "pr",
      "sc",
      "ba",
      "go",
    ])
    return (
      <div className="space-y-4 w-[500px]">
        <MultiSelect
          label="Estados (máx. 5 visíveis)"
          description="Apenas 5 opções são mostradas no input, o restante aparece como '+N mais'"
          options={simpleOptions}
          value={values}
          onValueChange={setValues}
          placeholder="Selecione um ou mais estados..."
          searchPlaceholder="Buscar estado..."
          maxVisible={5}
        />
        <div className="text-sm text-muted-foreground">
          Selecionados: {values.length} estados
        </div>
      </div>
    )
  },
}
