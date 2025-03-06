"use client";
import * as React from "react";
import { useIMask, ReactMaskOpts } from "react-imask";
import { Input } from "../../../../ui/input";
import { InputBase, InputBaseProps } from "../InputBase";

export type MaskInputProps = Omit<InputBaseProps, "children"> & {
  placeholder?: string;
  options: ReactMaskOpts;
  className?: string;
  withoutForm?: boolean;
  component?: React.ReactNode;
  "data-testid"?: string;
};

export const MaskInput = ({
  component,
  "data-testid": testId,
  label,
  name,
  withoutForm,
  options,
  ...props
}: MaskInputProps) => {
  const { value, ref: imaskRef } = useIMask(options);

  const baseTestId = testId || name || "";

  return (
    <InputBase
      label={label}
      data-testid={baseTestId}
      withoutForm={withoutForm}
      name={name}
    >
      {(rest) => {
        return (
          <div
            className="flex w-full gap-3"
            data-testid={`input-wrapper-${baseTestId}`}
          >
            <Input
              {...props}
              {...rest}
              value={value}
              ref={imaskRef as React.RefObject<HTMLInputElement>}
              data-testid={`input-${baseTestId}`}
            />
            {component}
          </div>
        );
      }}
    </InputBase>
  );
};
