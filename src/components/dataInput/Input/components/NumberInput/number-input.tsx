"use client";

import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { InputBase, InputBaseProps } from "../InputBase";
import { Input } from "../../../../ui/input";

export type NumberInputProps = Omit<
  NumericFormatProps,
  "onChange" | "onValueChange"
> &
  Omit<InputBaseProps, "children"> & {
    onChange?: (value: number) => void;
    "data-testid"?: string;
    component?: React.ReactNode;
  };

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const {
      name,
      label,
      error,
      className,
      withoutForm,
      onChange,
      "data-testid": testId,
      component,
      ...inputProps
    } = props;

    const baseTestId = testId || name || "";

    return (
      <InputBase
        label={label}
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
