"use client";

import * as React from "react";
import { useIMask, ReactMaskOpts } from "react-imask";
import { InputComponent, type BaseInputProps } from "../Input";
import { InputBase } from "../InputBase";

export type MaskInputProps = BaseInputProps & {
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  options: ReactMaskOpts;
  className?: string;
  withoutForm?: boolean;
  component?: React.ReactNode;
};

export const MaskInput = ({
  label,
  description,
  error,
  options,
  className,
  name,
  withoutForm,
  component,
  "data-testid": testId,
  ...props
}: MaskInputProps) => {
  const { setValue, ref: imaskRef } = useIMask(options);

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
      {({ onChange, ...rest }) => (
        <div
          className="flex w-full gap-3"
          data-testid={`input-wrapper-${baseTestId}`}
        >
          <InputComponent
            ref={imaskRef as React.LegacyRef<HTMLInputElement> | undefined}
            {...props}
            {...rest}
            onChange={(value) => {
              setValue(value as string);
              onChange?.(value);
              props.onChange?.(value);
            }}
            data-testid={`input-${baseTestId}`}
          />
          {component}
        </div>
      )}
    </InputBase>
  );
};
