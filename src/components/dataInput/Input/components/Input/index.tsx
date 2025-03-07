import React, { useCallback, useState } from "react";
import { InputBaseProps } from "../InputBase";
import { mask as remask } from "remask";
import { Label } from "../../../../ui/label";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input as InputUI } from "../../../../../components/ui/input";

export type InputProps = Omit<InputBaseProps, "children"> & {
  component?: React.ReactNode;
  onChangeText?: (value: string) => void;
  mask?: string | string[];
  defaultValue?: string;
};

export const Input = ({
  label,
  withoutForm,
  component,
  name,
  error,
  onChangeText = () => {},
  mask,
  "data-testid": testId,
  className,
  ...props
}: InputProps) => {
  const setMask = useCallback(
    (value?: string | number | readonly string[] | undefined) => {
      if (!mask) return value as string;
      return remask(String(value || ""), mask);
    },
    [mask]
  );

  // const [inputValue, setInputValue] = useState(setMask(props.value));

  const form = useFormContext();
  const hasForm = !withoutForm && !!form && !!name;

  if (!hasForm)
    return (
      <div className="grid w-full items-center gap-3">
        <Label htmlFor="email">
          {label}
          {props.required && <span>*</span>}
        </Label>
        <div className="flex w-full items-center space-x-2">
          <InputUI
            {...props}
            value={setMask(props.value)}
            onChange={(e) => {
              const maskedValue = setMask(e.target.value);
              props?.onChange?.(e);
              onChangeText(maskedValue);
            }}
          />
          {component}
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, ...rest } }) => (
        <FormItem
          className={className}
          data-testid={testId ? `form-item-${testId}` : undefined}
        >
          {label && (
            <FormLabel
              htmlFor={name}
              data-testid={testId ? `form-label-${testId}` : undefined}
            >
              {`${label}${props.required ? " *" : ""}`}
            </FormLabel>
          )}
          <FormControl>
            <InputUI
              {...props}
              {...rest}
              value={setMask(rest.value)}
              onChange={(e) => {
                const maskedValue = setMask(e.target.value);
                onChange(e);
                onChangeText(maskedValue);
              }}
            />
          </FormControl>
          <FormMessage
            role="alert"
            data-testid={testId ? `form-message-${testId}` : undefined}
          />
        </FormItem>
      )}
    />
  );
};
