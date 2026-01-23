// src/components/forms/DatePicker/DatePickerRange.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"
import { DatePickerRange } from "./index"
import type { DateRange } from "react-day-picker"

const meta = {
  title: "Forms/DatePicker/DatePickerRange",
  component: DatePickerRange,
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
} satisfies Meta<typeof DatePickerRange>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange>()
    return (
      <DatePickerRange
        date={range}
        onSelect={setRange}
        placeholder="Selecione um range de datas"
      />
    )
  },
}

export const WithInitialRange: Story = {
  name: "Com range inicial",
  render: () => {
    const today = new Date()
    const nextWeek = new Date(today)
    nextWeek.setDate(today.getDate() + 7)
    const [range, setRange] = React.useState<DateRange>({
      from: today,
      to: nextWeek,
    })
    return (
      <DatePickerRange
        date={range}
        onSelect={setRange}
        placeholder="Selecione um range de datas"
      />
    )
  },
}

export const CustomFormat: Story = {
  name: "Formato customizado",
  render: () => {
    const [range, setRange] = React.useState<DateRange>()
    return (
      <DatePickerRange
        date={range}
        onSelect={setRange}
        placeholder="Selecione um range"
        dateFormat="dd/MM/yyyy"
      />
    )
  },
}

export const WithMinMaxDate: Story = {
  name: "Com data mínima e máxima",
  render: () => {
    const [range, setRange] = React.useState<DateRange>()
    const today = new Date()
    const minDate = new Date(today)
    minDate.setDate(today.getDate() - 30) // 30 dias atrás
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 60) // 60 dias à frente

    return (
      <div className="space-y-4">
        <DatePickerRange
          date={range}
          onSelect={setRange}
          placeholder="Selecione um range"
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
    placeholder: "Selecione um range de datas",
    disabled: true,
  },
}

export const WithField: Story = {
  name: "Com Field (label e description)",
  render: () => {
    const [range, setRange] = React.useState<DateRange>()
    return (
      <DatePickerRange
        label="Período de viagem"
        description="Selecione as datas de ida e volta"
        date={range}
        onSelect={setRange}
        placeholder="Selecione um range de datas"
      />
    )
  },
}

export const WithFieldError: Story = {
  name: "Com Field e erro",
  render: () => {
    const [range, setRange] = React.useState<DateRange>()
    return (
      <DatePickerRange
        label="Período de viagem"
        description="Selecione as datas de ida e volta"
        error="Selecione um período válido"
        invalid={!range?.from || !range?.to}
        date={range}
        onSelect={setRange}
        placeholder="Selecione um range de datas"
      />
    )
  },
}
