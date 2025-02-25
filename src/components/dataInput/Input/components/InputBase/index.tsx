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
} from "../../../../../components/ui/form";
import { InputProps } from "../../../../../components/ui/input";

export type BaseInputValue = string | number | readonly string[] | undefined;

export type CustomInputProps = Omit<InputProps, "onChange" | "value"> & {
  onChange?: (value: BaseInputValue) => void;
  value?: BaseInputValue;
  "data-testid"?: string;
};

export type InputBaseProps = Omit<CustomInputProps, "children"> & {
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  name?: string;
  withoutForm?: boolean;
  "data-testid"?: string;
  disabled?: boolean;
  required?: boolean;
  children: (props: CustomInputProps) => React.ReactNode;
  onChange?: (value: BaseInputValue) => void;
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

  if (!name) {
    console.error(
      "[InputBase] O prop 'name' é obrigatório quando usado com formulário."
    );
    return null;
  }

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
              ...field,
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
