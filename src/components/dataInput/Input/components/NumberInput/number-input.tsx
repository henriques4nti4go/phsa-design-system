"use client";

import * as React from "react";
import {
  NumericFormat,
  NumericFormatProps,
  NumberFormatValues,
} from "react-number-format";
import { Input } from "../../Input";
import { useFormContext } from "react-hook-form";

interface NumberInputProps
  extends Omit<NumericFormatProps, "onChange" | "value"> {
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
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      decimalScale = 2,
      fixedDecimalScale = true,
      thousandSeparator = ".",
      decimalSeparator = ",",
      prefix = "",
      suffix = "",
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const form = useFormContext();
    const hasForm = !!form && !!props.name;

    const handleValueChange = (values: NumberFormatValues) => {
      const numericValue = values.floatValue;
      onChange?.(numericValue ?? null);

      if (hasForm && props.name) {
        form.setValue(props.name, numericValue ?? null);
      }
    };

    return (
      <NumericFormat
        customInput={Input}
        {...props}
        value={value}
        prefix={prefix}
        suffix={suffix}
        decimalScale={decimalScale}
        fixedDecimalScale={fixedDecimalScale}
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        onValueChange={handleValueChange}
        getInputRef={ref}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";
