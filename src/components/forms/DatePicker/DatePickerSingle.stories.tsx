// src/components/forms/DatePicker/DatePickerSingle.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"
import { DatePickerSingle } from "./index"

const meta = {
  title: "Forms/DatePicker/DatePickerSingle",
  component: DatePickerSingle,
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
} satisfies Meta<typeof DatePickerSingle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Selecione uma data",
  },
  render: (args) => {
    const [date, setDate] = React.useState<Date>()
    return <DatePickerSingle {...args} date={date} onSelect={setDate} />
  },
}

export const WithInitialDate: Story = {
  name: "Com data inicial",
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <DatePickerSingle
        date={date}
        onSelect={setDate}
        placeholder="Selecione uma data"
      />
    )
  },
}

export const Disabled: Story = {
  name: "Desabilitado",
  args: {
    placeholder: "Selecione uma data",
    disabled: true,
  },
}

export const CustomFormat: Story = {
  name: "Formato customizado",
  render: () => {
    const [date, setDate] = React.useState<Date>()
    return (
      <DatePickerSingle
        date={date}
        onSelect={setDate}
        placeholder="Selecione uma data"
        dateFormat="dd/MM/yyyy"
      />
    )
  },
}

export const WithMinMaxDate: Story = {
  name: "Com data mínima e máxima",
  render: () => {
    const [date, setDate] = React.useState<Date>()
    const today = new Date()
    const minDate = new Date(today)
    minDate.setDate(today.getDate() - 7) // 7 dias atrás
    const maxDate = new Date(today)
    maxDate.setDate(today.getDate() + 30) // 30 dias à frente

    return (
      <div className="space-y-4">
        <DatePickerSingle
          date={date}
          onSelect={setDate}
          placeholder="Selecione uma data (últimos 7 dias ou próximos 30)"
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

export const WithDisabledDates: Story = {
  name: "Com datas desabilitadas",
  render: () => {
    const [date, setDate] = React.useState<Date>()
    const today = new Date()
    const disabledDates = [
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    ]

    return (
      <div className="space-y-4">
        <DatePickerSingle
          date={date}
          onSelect={setDate}
          placeholder="Selecione uma data"
          disabledDates={disabledDates}
        />
        <p className="text-sm text-muted-foreground">
          Datas desabilitadas: {disabledDates.map((d) => d.toLocaleDateString("pt-BR")).join(", ")}
        </p>
      </div>
    )
  },
}

export const CustomStyling: Story = {
  name: "Estilização customizada",
  render: () => {
    const [date, setDate] = React.useState<Date>()
    return (
      <DatePickerSingle
        date={date}
        onSelect={setDate}
        placeholder="Selecione uma data"
        buttonClassName="w-[320px] border-2"
        popoverContentClassName="shadow-xl"
        calendarClassName="rounded-lg"
      />
    )
  },
}

export const Controlled: Story = {
  name: "Controlado externamente",
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date(2024, 0, 15))
    return (
      <div className="space-y-4">
        <DatePickerSingle
          date={date}
          onSelect={(date) => setDate(date || new Date())}
          placeholder="Selecione uma data"
        />
        <div className="text-sm space-y-2">
          <p className="text-muted-foreground">
            Data selecionada: {date ? date.toLocaleDateString("pt-BR") : "Nenhuma"}
          </p>
          <button
            onClick={() => setDate(new Date())}
            className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md"
          >
            Definir como hoje
          </button>
          <button
            onClick={() => setDate(undefined)}
            className="ml-2 px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
          >
            Limpar
          </button>
        </div>
      </div>
    )
  },
}

export const WithoutOutsideDays: Story = {
  name: "Sem dias externos ao mês",
  render: () => {
    const [date, setDate] = React.useState<Date>()
    return (
      <DatePickerSingle
        date={date}
        onSelect={setDate}
        placeholder="Selecione uma data"
        showOutsideDays={false}
      />
    )
  },
}

export const WithField: Story = {
  name: "Com Field (label e description)",
  render: () => {
    const [date, setDate] = React.useState<Date>()
    return (
      <DatePickerSingle
        label="Data de nascimento"
        description="Selecione sua data de nascimento"
        date={date}
        onSelect={setDate}
        placeholder="Selecione uma data"
      />
    )
  },
}

export const WithFieldError: Story = {
  name: "Com Field e erro",
  render: () => {
    const [date, setDate] = React.useState<Date>()
    return (
      <DatePickerSingle
        label="Data de nascimento"
        description="Selecione sua data de nascimento"
        error="Este campo é obrigatório"
        invalid={!date}
        date={date}
        onSelect={setDate}
        placeholder="Selecione uma data"
      />
    )
  },
}

export const WithFieldHorizontal: Story = {
  name: "Com Field horizontal",
  render: () => {
    const [date, setDate] = React.useState<Date>()
    return (
      <DatePickerSingle
        label="Data de nascimento"
        description="Selecione sua data de nascimento"
        orientation="horizontal"
        date={date}
        onSelect={setDate}
        placeholder="Selecione uma data"
      />
    )
  },
}
