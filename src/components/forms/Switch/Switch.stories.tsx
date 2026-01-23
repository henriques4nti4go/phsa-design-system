// src/components/forms/Switch/Switch.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"
import { Switch } from "./index"
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "../../ui/field"

const meta = {
  title: "Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    checked: {
      control: "boolean",
    },
    labelPosition: {
      control: "select",
      options: ["left", "right"],
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

// Switch simples (sem Field)
export const Default: Story = {
  args: {},
}

export const Checked: Story = {
  args: {
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
}

export const WithLabelInline: Story = {
  args: {
    label: "Ativar notificações",
    labelPosition: "right",
  },
}

export const WithLabelLeft: Story = {
  args: {
    label: "Ativar notificações",
    labelPosition: "left",
  },
}

// Switch com Field automático (usando props)
export const WithField: Story = {
  args: {
    label: "Ativar notificações",
    description: "Receba notificações por email sobre atualizações",
  },
}

export const WithError: Story = {
  args: {
    label: "Aceitar termos",
    description: "Você deve aceitar os termos para continuar",
    error: "Este campo é obrigatório",
  },
}

export const WithMultipleErrors: Story = {
  render: () => (
    <Switch
      label="Aceitar termos"
      description="Você deve aceitar os termos para continuar"
      error={[
        { message: "Este campo é obrigatório" },
        { message: "Você deve ler os termos antes de aceitar" },
      ]}
    />
  ),
}

export const Horizontal: Story = {
  args: {
    label: "Ativar modo escuro",
    description: "Altere o tema da aplicação",
    orientation: "horizontal",
  },
}

export const WithoutLabel: Story = {
  args: {
    description: "Campo sem label visível",
  },
}

// Switch usado manualmente com Field
export const ManualField: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="manual-switch">Ativar notificações</FieldLabel>
      <FieldContent>
        <Switch id="manual-switch" />
        <FieldDescription>Receba notificações por email sobre atualizações</FieldDescription>
      </FieldContent>
    </Field>
  ),
}

export const ManualFieldWithError: Story = {
  render: () => (
    <Field data-invalid>
      <FieldLabel htmlFor="manual-error-switch">Aceitar termos</FieldLabel>
      <FieldContent>
        <Switch id="manual-error-switch" aria-invalid />
        <FieldError>Este campo é obrigatório</FieldError>
      </FieldContent>
    </Field>
  ),
}

// Switch controlado
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState<boolean>(false)
    return (
      <div className="space-y-4">
        <Switch
          label="Ativar notificações (Controlado)"
          description="O valor é controlado externamente"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <div className="text-sm text-muted-foreground">
          Estado: {checked ? "Ativado" : "Desativado"}
        </div>
      </div>
    )
  },
}

// Switch com label inline
export const InlineLabel: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch
        label="Notificações por email"
        labelPosition="right"
      />
      <Switch
        label="Notificações por SMS"
        labelPosition="right"
        checked
      />
      <Switch
        label="Notificações push"
        labelPosition="left"
      />
    </div>
  ),
}

// Switch com Field (label sempre no FieldLabel, não inline)
export const WithFieldMultiple: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch
        label="Ativar notificações"
        description="Escolha como deseja receber notificações"
      />
      <Switch
        label="Modo escuro"
        description="Altere o tema da aplicação"
        checked
      />
    </div>
  ),
}
