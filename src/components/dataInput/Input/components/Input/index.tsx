import React from "react";
import { Label } from "../../../../ui/label";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { InputBase, InputBaseProps } from "./InputBase";
import { ErrorMessage } from "../../../../../components/dataDisplay/ErrorMessage";

export type InputProps = Omit<InputBaseProps, "children"> & {
  component?: React.ReactNode;
  error?: string;
  withoutForm?: boolean;
  label?: string;
};

export const Input = ({
  label,
  withoutForm,
  component,
  name,
  error,
  "data-testid": testId,
  className,
  required,
  ...props
}: InputProps) => {
  const form = useFormContext();
  const hasForm = !withoutForm && !!form && !!name;

  if (!hasForm)
    return (
      <div className="grid w-full items-center gap-3">
        <Label htmlFor="email">
          {label}
          {required && <span>*</span>}
        </Label>
        <div className="flex w-full items-center space-x-2">
          <InputBase {...props} />
          {component}
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
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
              {`${label}${required ? " *" : ""}`}
            </FormLabel>
          )}
          <FormControl>
            <InputBase {...props} {...rest} onChangeText={onChange} />
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
