import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../../../../../components/dataDisplay/ErrorMessage/ErrorMessage";
import { Label } from "../../../../../components/dataDisplay/Label";
import { cn } from "../../../../../lib/utils";
import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputProps } from "../../../../../components/ui/input";

type CustomInputProps = Omit<InputProps, "onChange"> & {
  onChange?: (value: string | number) => void;
};

export type InputBaseProps = Omit<CustomInputProps, "children"> & {
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  name?: string;
  withoutForm?: boolean;
  children: (props: CustomInputProps) => React.ReactNode;
};

export const InputBase = ({
  children = () => null,
  description,
  error,
  label,
  className,
  name,
  withoutForm,
  ...props
}: InputBaseProps) => {
  const form = useFormContext();
  const hasForm = !withoutForm && !!form && !!name;

  if (!hasForm)
    return (
      <div className={cn("space-y-2", className)}>
        {label && <Label>{label}</Label>}
        {children && children(props)}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );

  if (!name) {
    console.warn(
      "InputBase: 'name' é obrigatório quando usado com formulário."
    );
    return null;
  }

  return (
    <FormField
      control={form.control}
      name={name!}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {children({
              ...props,
              ...field,
              onChange: (value) => {
                field.onChange(value);
                props.onChange?.(value);
              },
            })}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
