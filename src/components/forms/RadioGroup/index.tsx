// src/components/forms/RadioGroup/index.tsx
"use client"

import * as React from "react"
import {
  RadioGroup as UIRadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface RadioGroupOption {
  value: string
  label: string
  disabled?: boolean
}

export type RadioGroupBaseProps = {
  /**
   * Opções do radio group.
   */
  options: RadioGroupOption[]
  /**
   * Valor selecionado (controlado).
   */
  value?: string
  /**
   * Callback quando o valor muda.
   */
  onValueChange?: (value: string) => void
  /**
   * Valor padrão (não controlado).
   */
  defaultValue?: string
  /**
   * Se o radio group está desabilitado.
   */
  disabled?: boolean
  /**
   * Orientação dos itens (vertical ou horizontal).
   */
  orientation?: "vertical" | "horizontal"
  /**
   * Classes CSS adicionais para o container do RadioGroup.
   */
  className?: string
}

export interface RadioGroupWithFieldProps extends RadioGroupBaseProps {
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
  fieldOrientation?: "vertical" | "horizontal" | "responsive"
  /**
   * Classes CSS adicionais para o container do Field.
   */
  fieldClassName?: string
  /**
   * ID do campo. Se não fornecido, será gerado automaticamente.
   */
  id?: string
}

/**
 * RadioGroup padrão do Design System.
 *
 * Pode ser usado de duas formas:
 * 1. Como radio group simples: <RadioGroup options={[...]} />
 * 2. Com Field integrado: <RadioGroup label="Opção" options={[...]} />
 *
 * Quando usado com props do Field (label, description, error), automaticamente
 * cria o Field ao redor do radio group.
 */
export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof UIRadioGroup>,
  RadioGroupWithFieldProps
>(
  (
    {
      id: providedId,
      label,
      description,
      error,
      invalid,
      fieldOrientation = "vertical",
      fieldClassName,
      options,
      value,
      onValueChange,
      defaultValue,
      disabled,
      orientation = "vertical",
      className,
    },
    ref
  ) => {
    const id = React.useId()
    const radioGroupId = providedId || id
    const hasError = invalid || !!error
    const hasFieldProps =
      label !== undefined ||
      description !== undefined ||
      error !== undefined

    const radioGroupComponent = (
      <UIRadioGroup
        ref={ref}
        id={radioGroupId}
        value={value}
        onValueChange={onValueChange}
        defaultValue={defaultValue}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={
          description || error
            ? `${radioGroupId}-description ${hasError ? `${radioGroupId}-error` : ""}`.trim()
            : undefined
        }
        className={cn(
          orientation === "horizontal" && "flex flex-row gap-4",
          orientation === "vertical" && "grid gap-2",
          className
        )}
      >
        {options.map((option) => {
          const optionId = `${radioGroupId}-${option.value}`
          return (
            <div
              key={option.value}
              className={cn(
                "flex items-center space-x-2",
                disabled || option.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              )}
            >
              <RadioGroupItem
                value={option.value}
                id={optionId}
                disabled={disabled || option.disabled}
              />
              <Label
                htmlFor={optionId}
                className={cn(
                  "font-normal",
                  (disabled || option.disabled) ? "cursor-not-allowed" : "cursor-pointer"
                )}
              >
                {option.label}
              </Label>
            </div>
          )
        })}
      </UIRadioGroup>
    )

    // Se tem props do Field, cria o Field automaticamente
    if (hasFieldProps) {
      return (
        <Field
          orientation={fieldOrientation}
          data-invalid={hasError}
          className={fieldClassName}
        >
          {label && <FieldLabel htmlFor={radioGroupId}>{label}</FieldLabel>}
          <FieldContent>
            {radioGroupComponent}
            {description && (
              <FieldDescription id={`${radioGroupId}-description`}>
                {description}
              </FieldDescription>
            )}
            {error && (
              <FieldError
                id={`${radioGroupId}-error`}
                errors={Array.isArray(error) ? error : undefined}
              >
                {!Array.isArray(error) ? error : undefined}
              </FieldError>
            )}
          </FieldContent>
        </Field>
      )
    }

    // RadioGroup simples sem Field
    return radioGroupComponent
  }
)

RadioGroup.displayName = "RadioGroup"
