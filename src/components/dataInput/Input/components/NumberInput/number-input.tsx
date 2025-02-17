"use client";

import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "../../../../ui/input";
import { InputBase } from "../InputBase";

export type NumberInputProps = Omit<NumericFormatProps, "onValueChange"> & {
  label?: string;
  description?: string;
  error?: string;
  component?: React.ReactNode;
  className?: string;
  onValueChange?: (value: number) => void;
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      label,
      description,
      error,
      component,
      onValueChange,
      ...props
    },
    ref
  ) => {
    return (
      <InputBase
        label={label}
        description={description}
        error={error}
        className={className}
      >
        {({ onChange, ...rest }) => (
          <div className="flex gap-3">
            <NumericFormat
              {...props}
              {...rest}
              customInput={Input}
              value={rest.value as number}
              onValueChange={(value) => {
                const { floatValue } = value;
                onChange?.(floatValue as number);
                onValueChange?.(floatValue as number);
              }}
              getInputRef={ref}
            />
            {component}
          </div>
        )}
      </InputBase>
    );
  }
);

NumberInput.displayName = "NumberInput";
