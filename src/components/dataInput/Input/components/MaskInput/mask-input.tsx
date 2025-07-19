"use client";
import * as React from "react";
import { Input } from "../Input";
import { useConditionalController } from "@/hooks/use-conditional-controller";
import { InputProps } from "../Input/types";
import { useMask } from "@/hooks/use-mask";
import { useRef } from "react";

export type MaskInputProps = {
  mask?: string;
} & InputProps;

export const MaskInput = ({
  "data-testid": dataTestId,
  withoutForm = false,
  extraElement,
  mask = "",
  ...props
}: MaskInputProps) => {
  const formData = useConditionalController({
    name: props.name || "",
    withoutForm,
  });

  const inputProps = React.useMemo(() => {
    return {
      ...formData,
      ...props,
    };
  }, [formData, props]);

  const { applyMask } = useMask({ mask });

  const inputRef = useRef<HTMLInputElement>(null);

  const applyMaskToInput = React.useCallback(
    (value: string) => {
      if (inputRef.current && mask) {
        const maskedValue = applyMask(value);
        inputRef.current.value = maskedValue;
      }
    },
    [applyMask, mask]
  );

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const maskedValue = mask ? applyMask(e.target.value) : e.target.value;

      const response = {
        ...e,
        target: {
          ...e.target,
          value: maskedValue,
        },
      };
      applyMaskToInput(maskedValue);
      return inputProps?.onChange?.(response);
    },
    [applyMask, inputProps, mask, applyMaskToInput]
  );

  return (
    <Input
      {...inputProps}
      ref={inputRef}
      onChange={handleChange}
      extraElement={extraElement}
      data-testid={dataTestId}
      withoutForm={true}
    />
  );
};
