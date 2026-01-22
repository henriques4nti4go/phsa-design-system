// src/components/forms/Input/index.tsx
import * as React from "react"
import { Input as UIInput } from "@/components/ui/input"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

export type InputProps = React.ComponentProps<"input">

/**
 * Campo de entrada padrão do Design System.
 *
 * Pode ser usado de duas formas:
 * 1. Como input simples: <Input placeholder="..." />
 * 2. Com Field integrado: <Input label="Nome" description="..." />
 *
 * Quando usado com props do Field (label, description, error), automaticamente
 * cria o Field ao redor do input.
 */
export interface InputWithFieldProps extends InputProps {
  /**
   * Label do campo. Quando fornecido, cria o Field automaticamente.
   */
  label?: React.ReactNode
  /**
   * Descrição ou texto de ajuda do campo.
   */
  description?: React.ReactNode
  /**
   * Mensagem de erro ou array de erros.
   */
  error?: React.ReactNode | Array<{ message?: string } | undefined>
  /**
   * Define se o campo está inválido.
   */
  invalid?: boolean
  /**
   * Orientação do Field (vertical, horizontal, responsive).
   */
  orientation?: "vertical" | "horizontal" | "responsive"
  /**
   * Classes CSS adicionais para o container do Field.
   */
  fieldClassName?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputWithFieldProps>(
  (
    {
      id: providedId,
      label,
      description,
      error,
      invalid,
      orientation = "vertical",
      fieldClassName,
      className,
      ...inputProps
    },
    ref
  ) => {
    const id = React.useId()
    const inputId = providedId || id
    const hasError = invalid || !!error
    const hasFieldProps = label !== undefined || description !== undefined || error !== undefined

    // Se tem props do Field, cria o Field automaticamente
    if (hasFieldProps) {
      return (
        <Field
          orientation={orientation}
          data-invalid={hasError}
          className={fieldClassName}
        >
          {label && (
            <FieldLabel htmlFor={inputId}>
              {label}
            </FieldLabel>
          )}
          <FieldContent>
            <UIInput
              id={inputId}
              ref={ref}
              className={className}
              aria-invalid={hasError}
              aria-describedby={
                description || error
                  ? `${inputId}-description ${hasError ? `${inputId}-error` : ""}`.trim()
                  : undefined
              }
              {...inputProps}
            />
            {description && (
              <FieldDescription id={`${inputId}-description`}>
                {description}
              </FieldDescription>
            )}
            {error && (
              <FieldError id={`${inputId}-error`} errors={Array.isArray(error) ? error : undefined}>
                {!Array.isArray(error) ? error : undefined}
              </FieldError>
            )}
          </FieldContent>
        </Field>
      )
    }

    // Input simples sem Field
    return <UIInput ref={ref} className={className} {...inputProps} />
  }
)

Input.displayName = "Input"

// Mantém InputField como alias para compatibilidade
export type InputFieldProps = InputWithFieldProps
export const InputField = Input
