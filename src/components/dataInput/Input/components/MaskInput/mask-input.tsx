"use client";

import * as React from "react";
import { useIMask, ReactMaskOpts } from "react-imask";
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
import { cn } from "../../../../../lib/utils";

interface MaskInputProps {
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  options: ReactMaskOpts;
  className?: string;
}

export const MaskInput = React.forwardRef<HTMLInputElement, MaskInputProps>(
  ({ name, label, description, error, options, className, ...props }) => {
    const form = useFormContext();
    const hasForm = !!form && !!name;

    const { setValue, ref: imaskRef } = useIMask(options);

    React.useEffect(() => {
      if (hasForm && name && form.getValues(name)) {
        setValue(form.getValues(name));
      }
    }, [form, hasForm, name, setValue]);

    if (!hasForm) {
      return (
        <div className={cn("space-y-2", className)}>
          {label && <Label>{label}</Label>}
          <Input
            {...props}
            ref={imaskRef as React.LegacyRef<HTMLInputElement> | undefined}
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
          <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input
                {...props}
                ref={imaskRef as React.LegacyRef<HTMLInputElement> | undefined}
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
