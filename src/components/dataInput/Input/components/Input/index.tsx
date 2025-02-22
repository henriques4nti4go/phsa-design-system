"use client";

import * as React from "react";
import {
  Input as InputShadcn,
  InputProps as PropsShadcn,
} from "../../../../../components/ui/input";
import { InputBase } from "../InputBase";

type BaseInputProps = {
  onChange?: (value: string | number) => void;
  "data-testid"?: string;
};

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
  (props, ref) => {
    const {
      name,
      label,
      description,
      error,
      className,
      withoutForm,
      component,
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
        data-testid={`input-base-${baseTestId}`}
      >
        {(rest) => (
          <div
            className="flex w-full gap-3"
            data-testid={`input-wrapper-${baseTestId}`}
          >
            <InputComponent
              ref={ref}
              {...rest}
              {...inputProps}
              data-testid={`input-${baseTestId}`}
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
