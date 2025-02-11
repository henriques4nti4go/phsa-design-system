"use client";

import * as React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../ui/form";
import { Input as InputComponent } from "../../../../../components/ui/input";
import { useFormContext } from "react-hook-form";
import { InputBase } from "../InputBase";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  withoutForm?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { name, label, description, error, className, withoutForm, ...props },
    ref
  ) => {
    const form = useFormContext();
    const hasForm = !!form && !!name;

    if (!hasForm || withoutForm) {
      return (
        <InputBase
          label={label}
          description={description}
          error={error}
          className={className}
        >
          <InputComponent ref={ref} {...props} />
        </InputBase>
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
              <InputComponent {...field} {...props} ref={ref} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

Input.displayName = "Input";
