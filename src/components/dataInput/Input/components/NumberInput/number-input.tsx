"use client";

import * as React from "react";
import {
  NumericFormat,
  NumericFormatProps,
  NumberFormatValues,
} from "react-number-format";
import { Input } from "../../../../ui/input";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../../../../../components/ui/form";
import { InputBase } from "../InputBase";

export interface NumberInputProps
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
  withoutForm?: boolean;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      onChange,
      label,
      description,
      name,
      error,
      withoutForm,
      ...props
    },
    ref
  ) => {
    const form = useFormContext();
    const hasForm = !!form && !!name;

    // const handleValueChange = (values: NumberFormatValues) => {
    //   const numericValue = values.floatValue;
    //   onChange?.(numericValue ?? null);

    //   if (hasForm && name) {
    //     form.setValue(name, numericValue ?? null);
    //   }
    // };

    // const numericProps = {
    //   ...props,
    //   onValueChange: handleValueChange,
    //   getInputRef: ref,
    // };

    return (
      <InputBase
        label={label}
        description={description}
        error={error}
        className={className}
      >
        {(rest) => (
          <NumericFormat
            {...props}
            customInput={Input}
            onValueChange={(values) => {
              rest.onChange?.(values.floatValue as number);
            }}
            value={rest.value as string | number}
            getInputRef={ref}
          />
        )}
      </InputBase>
    );

    if (!hasForm || withoutForm) {
      return (
        <InputBase
          label={label}
          description={description}
          error={error}
          className={className}
        >
          {(rest) => (
            <NumericFormat customInput={Input} {...numericProps} {...rest} />
          )}
        </InputBase>
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
