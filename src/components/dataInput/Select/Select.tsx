import React from "react";
import { Label } from "../../../components/ui/label";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../../../components/ui/form";
import { SelectBase, SelectBaseProps } from "./SelectBase";
import { useFormContext } from "react-hook-form";
import { cn } from "../../../lib/utils";
import { ErrorMessage } from "../../../components/dataDisplay/ErrorMessage/ErrorMessage";

export type SelectProps = SelectBaseProps & {
  label?: string;
  name?: string;
  error?: string;
  description?: string;
  withoutForm?: boolean;
};

export const Select = ({
  name,
  label,
  description,
  error,
  className,
  withoutForm,
  options,
  placeholder,
  ...props
}: SelectProps) => {
  const form = useFormContext();
  const hasForm = !!form && !!name;

  if (!hasForm || withoutForm) {
    return (
      <div className={cn("space-y-2", className)}>
        {label && <Label>{label}</Label>}
        <SelectBase options={options} placeholder={placeholder} {...props} />
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }

  return (
    <FormField
      control={form.control}
      name={name!}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <SelectBase
              options={options}
              placeholder={placeholder}
              {...props}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
