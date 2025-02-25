"use client";

import * as React from "react";
import {
  Input as InputShadcn,
  InputProps as PropsShadcn,
} from "../../../../../components/ui/input";
import { InputBase } from "../InputBase";

export type BaseInputProps = {
  onChange?: (value: BaseInputValue) => void;
  value?: BaseInputValue;
  "data-testid"?: string;
};

type BaseInputValue = string | number | readonly string[] | undefined;

type InputComponentProps = Omit<PropsShadcn, "onChange"> & BaseInputProps;

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> &
  BaseInputProps & {
    name?: string;
    label?: string;
    description?: string;
    error?: string;
    className?: string;
    withoutForm?: boolean;
    component?: React.ReactNode;
  };

export const InputComponent = React.forwardRef<
  HTMLInputElement,
  InputComponentProps
>((props, ref) => {
  const { onChange, "data-testid": testId, ...rest } = props;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  return (
    <InputShadcn
      {...rest}
      ref={ref}
      onChange={handleChange}
      data-testid={testId || "input-component"}
    />
  );
});

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ "data-testid": testId, component, ...props }, ref) => {
    const baseTestId = testId || props.name || "";

    return (
      <InputBase {...props} data-testid={baseTestId}>
        {(rest) => (
          <div
            className="flex w-full gap-3"
            data-testid={`input-wrapper-${baseTestId}`}
          >
            <InputComponent
              ref={ref}
              data-testid={`input-${baseTestId}`}
              {...props}
              {...rest}
            />
            {component}
          </div>
        )}
      </InputBase>
    );
  }
);

InputComponent.displayName = "InputComponent";
Input.displayName = "Input";
