"use client";

import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { InputBase } from "../InputBase";
import { Input } from "../../../../ui/input";

export type NumberInputProps = Omit<
  NumericFormatProps,
  "onChange" | "onValueChange"
> & {
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  withoutForm?: boolean;
  component?: React.ReactNode;
  onChange?: (value: number) => void;
  "data-testid"?: string;
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const {
      name,
      label,
      description,
      error,
      className,
      withoutForm,
      component,
      onChange,
      "data-testid": testId,
      ...inputProps
    } = props;

    const baseTestId = testId || name || "";

    return (
      <InputBase
        label={label}
        description={description}
        error={error}
        className={className}
        name={name}
        withoutForm={withoutForm}
        data-testid={baseTestId}
      >
        {({ onChange: onBaseChange, value }) => (
          <div
            className="flex w-full gap-3"
            data-testid={`number-input-wrapper-${baseTestId}`}
          >
            <NumericFormat
              value={value as number}
              customInput={Input}
              getInputRef={ref}
              onValueChange={({ floatValue }) => {
                const numberValue = floatValue as number | undefined;
                onBaseChange?.(numberValue);
                onChange?.(numberValue as number);
              }}
              data-testid={`${baseTestId}-number-input`}
              {...inputProps}
            />
            {component}
          </div>
        )}
      </InputBase>
    );
  }
);

NumberInput.displayName = "NumberInput";
