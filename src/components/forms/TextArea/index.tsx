// src/components/forms/TextArea/index.tsx
import * as React from "react"
import { Textarea as UITextarea } from "@/components/ui/textarea"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

export type TextAreaProps = React.ComponentProps<"textarea">

/**
 * Campo de texto multilinha padrão do Design System.
 *
 * Pode ser usado de duas formas:
 * 1. Como textarea simples: <TextArea placeholder="..." />
 * 2. Com Field integrado: <TextArea label="Descrição" description="..." />
 *
 * Quando usado com props do Field (label, description, error), automaticamente
 * cria o Field ao redor do textarea.
 */
export interface TextAreaWithFieldProps extends TextAreaProps {
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

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaWithFieldProps>(
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
      ...textareaProps
    },
    ref
  ) => {
    const id = React.useId()
    const textareaId = providedId || id
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
            <FieldLabel htmlFor={textareaId}>
              {label}
            </FieldLabel>
          )}
          <FieldContent>
            <UITextarea
              id={textareaId}
              ref={ref}
              className={className}
              aria-invalid={hasError}
              aria-describedby={
                description || error
                  ? `${textareaId}-description ${hasError ? `${textareaId}-error` : ""}`.trim()
                  : undefined
              }
              {...textareaProps}
            />
            {description && (
              <FieldDescription id={`${textareaId}-description`}>
                {description}
              </FieldDescription>
            )}
            {error && (
              <FieldError id={`${textareaId}-error`} errors={Array.isArray(error) ? error : undefined}>
                {!Array.isArray(error) ? error : undefined}
              </FieldError>
            )}
          </FieldContent>
        </Field>
      )
    }

    // TextArea simples sem Field
    return <UITextarea ref={ref} className={className} {...textareaProps} />
  }
)

TextArea.displayName = "TextArea"

// Mantém TextAreaField como alias para compatibilidade
export type TextAreaFieldProps = TextAreaWithFieldProps
export const TextAreaField = TextArea
