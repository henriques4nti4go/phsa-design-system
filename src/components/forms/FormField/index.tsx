// src/components/forms/FormField/index.tsx
"use client"

import * as React from "react"
import { Controller, useFormContext } from "react-hook-form"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/forms/Input"

export interface FormFieldProps {
  /**
   * Nome do campo no formulário (`react-hook-form`).
   */
  name: string
  /**
   * Rótulo visível do campo.
   */
  label?: React.ReactNode
  /**
   * Texto de ajuda exibido abaixo do campo.
   */
  description?: React.ReactNode
  /**
   * Props adicionais encaminhadas para o componente `Input`.
   */
  inputProps?: React.ComponentProps<typeof Input>
}

/**
 * Campo de formulário integrado ao `react-hook-form`.
 *
 * Combina os primitivos `Field` e `Input` do design system,
 * exibindo automaticamente label, descrição e mensagens de erro.
 */
export const FormField = ({
  name,
  label,
  description,
  inputProps,
}: FormFieldProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={!!fieldState.error}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
          <FieldContent>
            <Input id={field.name} {...field} {...inputProps} />
            {description && (
              <FieldDescription>{description}</FieldDescription>
            )}
            <FieldError
              errors={
                fieldState.error ? [{ message: fieldState.error.message }] : []
              }
            />
          </FieldContent>
        </Field>
      )}
    />
  )
}

