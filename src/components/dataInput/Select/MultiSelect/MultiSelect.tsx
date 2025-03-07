"use client";
import React from "react";
import { Label } from "../../../../components/dataDisplay/Label";
import { MultiSelectBase, MultiSelectBaseProps } from "./MultiSelectBase";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { useFormContext } from "react-hook-form";

type MultiSelectProps = MultiSelectBaseProps & {
  label?: string;
  name?: string;
  withoutForm?: boolean;
  className?: string;
  required?: boolean;
  "data-testid"?: string;
};

export function MultiSelect({
  label,
  name,
  withoutForm,
  className,
  required,
  "data-testid": testId,
  ...props
}: MultiSelectProps) {
  const form = useFormContext();
  const hasForm = !withoutForm && !!form && !!name;

  if (!hasForm)
    return (
      <div className="grid w-full items-center gap-3">
        {label && <Label htmlFor={name}>{label}</Label>}
        <MultiSelectBase {...props} />
      </div>
    );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, ...rest } }) => {
        return (
          <FormItem
            className={className}
            data-testid={testId ? `form-item-${testId}` : undefined}
          >
            {label && (
              <FormLabel
                htmlFor={name}
                data-testid={testId ? `form-label-${testId}` : undefined}
              >
                {`${label}${required ? " *" : ""}`}
              </FormLabel>
            )}
            <FormControl>
              <div className="flex w-full items-center space-x-2">
                <MultiSelectBase {...props} {...rest} selected={value} />
              </div>
            </FormControl>
            <FormMessage
              role="alert"
              data-testid={testId ? `form-message-${testId}` : undefined}
            />
          </FormItem>
        );
      }}
    />
  );
}
