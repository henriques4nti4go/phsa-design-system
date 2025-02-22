"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../../../../../components/dataDisplay/ErrorMessage/ErrorMessage";
import { Label } from "../../../../../components/dataDisplay/Label";
import { cn } from "../../../../../lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputProps } from "../../../../../components/ui/input";

// Tipos mais específicos e documentados
type BaseInputValue = string | number | readonly string[] | undefined;

export type CustomInputProps = Omit<InputProps, "onChange" | "value"> & {
  onChange?: (value: BaseInputValue) => void;
  value?: BaseInputValue;
  "data-testid"?: string;
};

export type InputBaseProps = Omit<CustomInputProps, "children"> & {
  /** Rótulo do campo */
  label?: string;

  /** Texto de descrição/ajuda */
  description?: string;
  /** Mensagem de erro */
  error?: string;
  /** Classes CSS customizadas */
  className?: string;
  /** Nome do campo (obrigatório quando usado com formulário) */
  name?: string;
  /** Define se o componente será usado fora de um formulário */
  withoutForm?: boolean;
  /** ID para testes */
  "data-testid"?: string;
  /** Desabilita o campo */
  disabled?: boolean;
  /** Define se o campo é obrigatório */
  required?: boolean;
  /** Renderiza o conteúdo do input */
  children: (props: CustomInputProps) => React.ReactNode;
};

export const InputBase = ({
  children = () => null,
  description,
  error,
  label,
  className,
  name,
  withoutForm,
  disabled,
  required,
  "data-testid": testId,
  ...props
}: InputBaseProps) => {
  const form = useFormContext();
  const hasForm = !withoutForm && !!form && !!name;

  // Componente sem formulário
  if (!hasForm) {
    return (
      <div
        className={cn("space-y-2", className)}
        data-testid={testId ? `input-base-${testId}` : undefined}
      >
        {label && (
          <Label
            htmlFor={name}
            data-testid={testId ? `label-${testId}` : undefined}
          >
            {`${label} ${required ? "*" : ""}`}
          </Label>
        )}
        {children &&
          children({
            ...props,
            disabled,
            required,
            "aria-required": required,
            "aria-invalid": !!error,
            "data-testid": testId,
          })}
        {description && (
          <p
            className="text-sm text-muted-foreground"
            data-testid={testId ? `description-${testId}` : undefined}
          >
            {description}
          </p>
        )}
        {error && (
          <ErrorMessage data-testid={testId ? `error-${testId}` : undefined}>
            {error}
          </ErrorMessage>
        )}
      </div>
    );
  }

  // Validação para uso com formulário
  if (!name) {
    console.error(
      "[InputBase] O prop 'name' é obrigatório quando usado com formulário."
    );
    return null;
  }

  // Componente com formulário
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={className}
          data-testid={testId ? `form-item-${testId}` : undefined}
        >
          {label && (
            <FormLabel
              htmlFor={name}
              data-testid={testId ? `form-label-${testId}` : undefined}
            >
              {`${label} ${required ? "*" : ""}`}
            </FormLabel>
          )}
          <FormControl>
            {children({
              ...props,
              ...field,
              id: name,
              disabled: disabled || field.disabled,
              "aria-required": required,
              onChange: (value) => {
                field.onChange(value);
                props.onChange?.(value);
              },
              "data-testid": testId,
            })}
          </FormControl>
          {description && (
            <FormDescription
              data-testid={testId ? `form-description-${testId}` : undefined}
            >
              {description}
            </FormDescription>
          )}
          <FormMessage
            role="alert"
            data-testid={testId ? `form-message-${testId}` : undefined}
          />
        </FormItem>
      )}
    />
  );
};
