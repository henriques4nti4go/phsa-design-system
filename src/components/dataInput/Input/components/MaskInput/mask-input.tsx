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
  onChange?: (value: string) => void;
};

const MaskInputBase = ({
  options,
  "data-testid": testId,
  onChange,
  value,
  ...props
}: MaskInputProps) => {
  const { ref: imaskRef } = useIMask(options, {
    onAccept: (val) => {
      onChange?.(val);
    },
  });
  return (
    <Input
      {...props}
      ref={imaskRef as React.RefObject<HTMLInputElement>}
      value={value}
      data-testid={`input-${testId}`}
    />
  );
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
  return (
    <InputBase
      label={label}
      data-testid={testId}
      withoutForm={withoutForm}
      name={name}
    >
      {({ onChange, value }) => {
        return (
          <div
            className="flex w-full gap-3"
            data-testid={`input-wrapper-${testId}`}
          >
            <MaskInputBase
              {...props}
              options={options}
              onChange={onChange}
              value={value}
            />
            {component}
          </div>
        );
      }}
    </InputBase>
  );
};
