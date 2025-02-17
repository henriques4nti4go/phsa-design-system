"use client";

import * as React from "react";

import {
  Input as InputShadcn,
  InputProps as PropsShadcn,
} from "../../../../../components/ui/input";
import { InputBase } from "../InputBase";

export const InputComponent = React.forwardRef<
  HTMLInputElement,
  Omit<PropsShadcn, "onChange"> & { onChange?: (value: string) => void }
>((props, ref) => {
  return (
    <InputShadcn
      {...props}
      ref={ref}
      onChange={({ target: { value } }) => props?.onChange?.(value as string)}
    />
  );
});

InputComponent.displayName = "InputComponent";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  withoutForm?: boolean;
  onChange?: (value: string | number) => void;
  component?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      description,
      error,
      className,
      withoutForm,
      component,
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
        name={name}
        withoutForm={withoutForm}
      >
        {(rest) => (
          <div className="flex gap-3">
            <InputComponent ref={ref} {...rest} {...props} />
            {component}
          </div>
        )}
      </InputBase>
    );
  }
);

Input.displayName = "Input";
