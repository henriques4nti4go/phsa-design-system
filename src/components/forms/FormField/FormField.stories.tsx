// src/components/forms/FormField/FormField.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import React from "react"
import { useForm, FormProvider } from "react-hook-form"

import { Button } from "../../actions/Button"
import { FormField } from "./index"

type FormValues = {
  name: string
}

const meta = {
  title: "Forms/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    name: {
      control: "text",
    },
    label: {
      control: "text",
    },
    description: {
      control: "text",
    },
  },
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

const FormWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = methods.handleSubmit((data) => {
    // eslint-disable-next-line no-console
    console.log("Submit:", data)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex w-80 flex-col gap-4">
        {children}
        <Button type="submit">Enviar</Button>
      </form>
    </FormProvider>
  )
}

export const Default: Story = {
  args: {
    name: "name",
    label: "Nome completo",
    description: "Digite o seu nome completo.",
  },
  render: (args) => (
    <FormWrapper>
      <FormField {...args} />
    </FormWrapper>
  ),
}

