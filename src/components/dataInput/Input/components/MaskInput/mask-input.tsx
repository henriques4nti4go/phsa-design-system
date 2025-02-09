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
} from "../../../../../components/ui/form";
import { Label } from "../../../../../components/ui/label";

interface MaskInputProps {
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  mask: string;
  placeholder?: string;
}

export const MaskInput = React.forwardRef<HTMLInputElement, MaskInputProps>(
  ({ mask, name, label, description, error, ...props }) => {
    const form = useFormContext();
    const hasForm = !!form && !!name;

    const { setValue, ref } = useIMask({
      mask,
    });

    React.useEffect(() => {
      if (hasForm && name && form.getValues(name)) {
        setValue(form.getValues(name));
      }
    }, [form, hasForm, name, setValue]);

    if (!hasForm) {
      return (
        <div className="space-y-2">
          {label && <Label>{label}</Label>}
          <Input
            {...props}
            ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
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
                ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
                onChange={(e) => {
                  setValue(e.target.value);
                  field.onChange(e.target.value);
                }}
                onBlur={field.onBlur}
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
