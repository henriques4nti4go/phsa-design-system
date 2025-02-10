"use client";

import * as React from "react";
import {
  NumericFormat,
  NumericFormatProps,
  NumberFormatValues,
} from "react-number-format";
import { Input } from "../../../../ui/input";
import { useFormContext } from "react-hook-form";
import { cn } from "../../../../../lib/utils";
import { Label } from "../../../../../components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../../../../../components/ui/form";

interface NumberInputProps
  extends Omit<NumericFormatProps, "onChange" | "value" | "onValueChange"> {
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  thousandSeparator?: boolean | string;
  decimalSeparator?: string;
  onChange?: (value: number | null) => void;
  className?: string;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, onChange, label, description, name, ...props }, ref) => {
    const form = useFormContext();
    const hasForm = !!form && !!name;

    const handleValueChange = (values: NumberFormatValues) => {
      const numericValue = values.floatValue;
      onChange?.(numericValue ?? null);

      if (hasForm && name) {
        form.setValue(name, numericValue ?? null);
      }
    };

    const numericProps = {
      ...props,
      onValueChange: handleValueChange,
      getInputRef: ref,
    };

    if (!hasForm) {
      return (
        <div className={cn("space-y-2", className)}>
          {label && <Label>{label}</Label>}
          <NumericFormat customInput={Input} {...numericProps} />
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {props.error && (
            <p className="text-sm font-medium text-destructive">
              {props.error}
            </p>
          )}
        </div>
      );
    }

    return (
      <FormField
        control={form.control}
        name={name!}
        render={({ field }) => (
          <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <NumericFormat customInput={Input} {...field} {...props} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";
