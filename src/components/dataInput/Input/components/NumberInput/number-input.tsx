"use client";

import * as React from "react";
import {
  NumericFormat,
  NumericFormatProps,
  SourceInfo,
} from "react-number-format";
import { InputBase } from "../InputBase";
import { Input } from "../../../../ui/input";
import { InputProps } from "../Input/types";
import { useCallback, useMemo } from "react";
import { useConditionalController } from "@/hooks/use-conditional-controller";

export type NumberInputProps = Omit<NumericFormatProps, "onChange"> &
  InputProps;

export const NumberInput = (props: NumberInputProps) => {
  const formData = useConditionalController({
    name: props.name || "",
    withoutForm: props.withoutForm,
  });

  const inputProps = useMemo(() => {
    return {
      ...formData,
      ...props,
    };
  }, [formData, props]);

  const onValueChange = useCallback(
    (
      data: {
        value: string;
        floatValue: number | undefined;
        formattedValue: string;
      },
      sourceInfo: SourceInfo
    ) => {
      const syntheticEvent = {
        target: {
          value: data.formattedValue,
          name: props.name,
        },
        currentTarget: {
          value: data.formattedValue,
          name: props.name,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      props.onChange?.(syntheticEvent);
      props.onValueChange?.(data, sourceInfo);
      if (formData.onChange) {
        formData.onChange(data.formattedValue);
      }
    },
    [props, formData]
  );

  return (
    <InputBase {...props}>
      <NumericFormat
        {...inputProps}
        customInput={Input}
        value={props.value}
        onValueChange={onValueChange}
      />
    </InputBase>
  );
};
