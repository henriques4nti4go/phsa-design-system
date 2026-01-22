// src/components/forms/PatternInput/index.tsx
import * as React from "react"
import {
  PatternFormat,
  type PatternFormatProps,
} from "react-number-format"

import { Input as UIInput } from "@/components/ui/input"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

// Wrapper do Input que aceita as props do PatternFormat
const PatternInputBase = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>((props, ref) => {
  return <UIInput ref={ref} {...props} />
})

PatternInputBase.displayName = "PatternInputBase"

export type PatternInputBaseProps = Omit<
  PatternFormatProps,
  "customInput" | "getInputRef"
>

export interface PatternInputProps extends PatternInputBaseProps {
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

/**
 * Input com formatação de padrão usando `react-number-format`,
 * integrado com o sistema de Field (label, descrição, erro).
 *
 * Exemplos de uso:
 *
 * - Telefone:
 *   <PatternInput
 *     label="Telefone"
 *     format="(##) #####-####"
 *     allowEmptyFormatting
 *     mask="_"
 *   />
 *
 * - CPF:
 *   <PatternInput
 *     label="CPF"
 *     format="###.###.###-##"
 *     allowEmptyFormatting
 *     mask="_"
 *   />
 *
 * - CEP:
 *   <PatternInput
 *     label="CEP"
 *     format="#####-###"
 *     allowEmptyFormatting
 *     mask="_"
 *   />
 */
export const PatternInput = React.forwardRef<
  HTMLInputElement,
  PatternInputProps
>(
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
      ...patternProps
    },
    ref
  ) => {
    const id = React.useId()
    const inputId = providedId || id
    const hasError = invalid || !!error

    const hasFieldProps =
      label !== undefined || description !== undefined || error !== undefined

    const inputElement = (
      <PatternFormat
        {...patternProps}
        customInput={PatternInputBase}
        getInputRef={ref}
        className={className}
        id={inputId}
        aria-invalid={hasError}
        aria-describedby={
          description || error
            ? `${inputId}-description ${hasError ? `${inputId}-error` : ""}`.trim()
            : undefined
        }
      />
    )

    if (!hasFieldProps) {
      return inputElement
    }

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
          {inputElement}
          {description && (
            <FieldDescription id={`${inputId}-description`}>
              {description}
            </FieldDescription>
          )}
          {error && (
            <FieldError
              id={`${inputId}-error`}
              errors={Array.isArray(error) ? error : undefined}
            >
              {!Array.isArray(error) ? error : undefined}
            </FieldError>
          )}
        </FieldContent>
      </Field>
    )
  }
)

PatternInput.displayName = "PatternInput"
