"use client";

import * as React from "react";
import { useIMask } from "react-imask";
import { Input } from "../../Input";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

interface MaskInputProps {
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  mask: string | RegExp;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const MaskInput = React.forwardRef<HTMLInputElement, MaskInputProps>(
  ({ mask, onChange, name, label, description, error, ...props }, ref) => {
    const form = useFormContext();
    const hasForm = !!form && !!name;

    const { value } = useIMask(
      {
        mask: String(mask),
        prepare: (str: string) => str,
      },
      {
        onAccept: (value) => {
          onChange?.(value);
          if (hasForm && name) {
            form.setValue(name, value);
          }
        },
      }
    );

    if (!hasForm) {
      return (
        <div className="space-y-2">
          {label && <Label>{label}</Label>}
          <Input
            {...props}
            ref={ref}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
          />
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
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input
                {...props}
                ref={ref}
                value={value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

MaskInput.displayName = "MaskInput";
