// src/components/forms/DatePicker/DatePickerMultiple.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"
import { DatePickerMultiple } from "./index"

const meta = {
  title: "Forms/DatePicker/DatePickerMultiple",
  component: DatePickerMultiple,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    dateFormat: {
      control: "text",
    },
    showOutsideDays: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof DatePickerMultiple>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [dates, setDates] = React.useState<Date[]>([])
    return (
      <DatePickerMultiple
        date={dates}
        onSelect={setDates}
        placeholder="Selecione múltiplas datas"
      />
    )
  },
}

export const WithInitialDates: Story = {
  name: "Com datas iniciais",
  render: () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    const dayAfter = new Date(today)
    dayAfter.setDate(today.getDate() + 2)
    const [dates, setDates] = React.useState<Date[]>([today, tomorrow, dayAfter])
    return (
      <DatePickerMultiple
        date={dates}
        onSelect={setDates}
        placeholder="Selecione múltiplas datas"
      />
    )
  },
}

export const CustomFormat: Story = {
  name: "Formato customizado",
  render: () => {
    const [dates, setDates] = React.useState<Date[]>([])
    return (
      <DatePickerMultiple
        date={dates}
        onSelect={setDates}
        placeholder="Selecione múltiplas datas"
        dateFormat="dd/MM/yyyy"
      />
    )
  },
}

export const WithMinMaxDate: Story = {
  name: "Com data mínima e máxima",
  render: () => {
    const [dates, setDates] = React.useState<Date[]>([])
    const today = new Date()
    const minDate = new Date(today)
    minDate.setDate(today.getDate() - 7) // 7 dias atrás
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 30) // 30 dias à frente

    return (
      <div className="space-y-4">
        <DatePickerMultiple
          date={dates}
          onSelect={setDates}
          placeholder="Selecione múltiplas datas"
          minDate={minDate}
          maxDate={maxDate}
        />
        <p className="text-sm text-muted-foreground">
          Data mínima: {minDate.toLocaleDateString("pt-BR")}
          <br />
          Data máxima: {maxDate.toLocaleDateString("pt-BR")}
        </p>
      </div>
    )
  },
}

export const Disabled: Story = {
  name: "Desabilitado",
  args: {
    placeholder: "Selecione múltiplas datas",
    disabled: true,
  },
}

export const WithField: Story = {
  name: "Com Field (label e description)",
  render: () => {
    const [dates, setDates] = React.useState<Date[]>([])
    return (
      <DatePickerMultiple
        label="Datas disponíveis"
        description="Selecione todas as datas que deseja"
        date={dates}
        onSelect={setDates}
        placeholder="Selecione múltiplas datas"
      />
    )
  },
}

export const WithFieldError: Story = {
  name: "Com Field e erro",
  render: () => {
    const [dates, setDates] = React.useState<Date[]>([])
    return (
      <DatePickerMultiple
        label="Datas disponíveis"
        description="Selecione pelo menos uma data"
        error="Selecione pelo menos uma data"
        invalid={dates.length === 0}
        date={dates}
        onSelect={setDates}
        placeholder="Selecione múltiplas datas"
      />
    )
  },
}
