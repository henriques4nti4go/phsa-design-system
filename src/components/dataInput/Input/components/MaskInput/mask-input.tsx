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
  component,
  "data-testid": testId,
  options,
  ...props
}: MaskInputProps) => {
  const { setValue, ref: imaskRef } = useIMask(options);

  const baseTestId = testId || props.name || "";

  return (
    <InputBase data-testid={baseTestId}>
      {(rest) => (
        <div
          className="flex w-full gap-3"
          data-testid={`input-wrapper-${baseTestId}`}
        >
          <InputComponent
            {...props}
            {...rest}
            ref={imaskRef as React.LegacyRef<HTMLInputElement> | undefined}
            onChange={(value) => {
              setValue(value as string);
              rest.onChange?.(value);
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
