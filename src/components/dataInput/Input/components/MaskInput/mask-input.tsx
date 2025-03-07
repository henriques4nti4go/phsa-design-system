"use client";
import * as React from "react";
import { Input } from "../../../../ui/input";
import { InputBase, InputBaseProps } from "../InputBase";

export type MaskInputProps = Omit<InputBaseProps, "children"> & {
  placeholder?: string;
  className?: string;
  withoutForm?: boolean;
  component?: React.ReactNode;
  "data-testid"?: string;
  onChange?: (value: string) => void;
};

export const MaskInput = ({
  component,
  "data-testid": testId,
  label,
  name,
  withoutForm,
  ...props
}: MaskInputProps) => {
  return (
    <InputBase
      label={label}
      data-testid={testId}
      withoutForm={withoutForm}
      name={name}
    >
      {({ ...rest }) => {
        return (
          <div
            className="flex w-full gap-3"
            data-testid={`input-wrapper-${testId}`}
          >
            <Input {...props} {...rest} />
            {component}
          </div>
        );
      }}
    </InputBase>
  );
};
