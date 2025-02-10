"use client";

import * as React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input as InputBase } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useFormContext } from "react-hook-form";
import { cn } from "../../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, description, error, className, ...props }, ref) => {
    const form = useFormContext();
    const hasForm = !!form && !!name;

    if (!hasForm) {
      return (
        <div className={cn("space-y-2", className)}>
          {label && <Label>{label}</Label>}
          <InputBase ref={ref} {...props} />
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}
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
              <InputBase {...field} {...props} ref={ref} />
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
