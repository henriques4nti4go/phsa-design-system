"use client";
import * as React from "react";
import { useIMask, ReactMaskOpts } from "react-imask";
import { Input } from "../Input";
import { useConditionalController } from "@/hooks/use-conditional-controller";
import { InputProps } from "../Input/types";

export type MaskInputProps = ReactMaskOpts & InputProps;

export const MaskInput = ({
  "data-testid": dataTestId,
  withoutForm = false,
  ...props
}: MaskInputProps) => {
  const formData = useConditionalController({
    name: props.name || "",
    withoutForm,
  });

  const {
    label,
    error,
    required,
    name,
    className,
    placeholder,
    ...imaskProps
  } = props;

  const { ref, value } = useIMask({
    ...imaskProps,
  });

  React.useEffect(() => {
    if (formData.value !== undefined && formData.value !== value) {
      formData.onChange(value);
    }
  }, [formData, value]);

  return (
    <Input
      {...props}
      ref={ref as React.RefObject<HTMLInputElement>}
      data-testid={dataTestId}
      withoutForm={true}
      label={label}
      error={error}
      required={required}
      className={className}
      placeholder={placeholder}
      name={name}
    />
  );
};
