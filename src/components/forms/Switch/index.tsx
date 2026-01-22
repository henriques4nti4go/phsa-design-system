// src/components/forms/Switch/index.tsx
"use client";

import * as React from "react";
import { Switch as UISwitch } from "@/components/ui/switch";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

export type SwitchProps = React.ComponentProps<typeof UISwitch>;

/**
 * Switch padrão do Design System.
 *
 * Pode ser usado de duas formas:
 * 1. Como switch simples: <Switch />
 * 2. Com Field integrado: <Switch label="Ativar notificações" description="..." />
 *
 * Quando usado com props do Field (label, description, error), automaticamente
 * cria o Field ao redor do switch.
 */
export interface SwitchWithFieldProps extends SwitchProps {
  /**
   * Label do campo. Quando fornecido, cria o Field automaticamente.
   */
  label?: React.ReactNode;
  /**
   * Descrição ou texto de ajuda do campo.
   */
  description?: React.ReactNode;
  /**
   * Mensagem de erro ou array de erros.
   */
  error?: React.ReactNode | Array<{ message?: string } | undefined>;
  /**
   * Define se o campo está inválido.
   */
  invalid?: boolean;
  /**
   * Orientação do Field (vertical, horizontal, responsive).
   */
  /**
   * Classes CSS adicionais para o container do Field.
   */
  fieldClassName?: string;
  /**
   * ID do campo. Se não fornecido, será gerado automaticamente.
   */
  id?: string;
  /**
   * Posição do label em relação ao switch (left ou right).
   * Padrão: "right"
   */
  labelPosition?: "left" | "right";
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof UISwitch>,
  SwitchWithFieldProps
>(
  (
    {
      id: providedId,
      label,
      description,
      error,
      invalid,
      fieldClassName,
      labelPosition = "right",
      className,
      disabled,
      ...switchProps
    },
    ref
  ) => {
    const id = React.useId();
    const switchId = providedId || id;
    const hasError = invalid || !!error;

    const renderFieldContent = React.useCallback(() => {
      return <FieldContent>
        {label && (
          <FieldLabel htmlFor={switchId}>
            {label}
          </FieldLabel>
        )}
        {description && (
          <FieldDescription id={`${switchId}-description`}>
            {description}
          </FieldDescription>
        )}
        {error && (
          <FieldError
            id={`${switchId}-error`}
            errors={Array.isArray(error) ? error : undefined}
          >
            {!Array.isArray(error) ? error : undefined}
          </FieldError>
        )}
      </FieldContent>
    }, [label, description, error, switchId])

    const renderSwitch = React.useCallback(() => {
      return (
        <>
          {labelPosition === 'left' && renderFieldContent()}
          <UISwitch
            id={switchId}
            ref={ref}
            className={className}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              description || error
                ? `${switchId}-description ${hasError ? `${switchId}-error` : ""}`.trim()
                : undefined
            }
            {...switchProps}
          />
          {labelPosition === 'right' && renderFieldContent()}
        </>
      )
    }, [labelPosition, renderFieldContent, switchId, ref, className, disabled, hasError, description, error, switchProps])


    return (
      <Field
        orientation='horizontal'
        data-invalid={hasError}
        className={fieldClassName}
      >
        {renderSwitch()}
      </Field>
    );
  }
);

Switch.displayName = "Switch";
