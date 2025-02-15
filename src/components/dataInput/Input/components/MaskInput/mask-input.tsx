"use client";

import * as React from "react";
import { useIMask, ReactMaskOpts } from "react-imask";
import { Input } from "../../../../ui/input";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../../../../../components/ui/form";
import { InputBase } from "../InputBase";

export interface MaskInputProps {
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  options: ReactMaskOpts;
  className?: string;
  withoutForm?: boolean;
}

export const MaskInput = React.forwardRef<HTMLInputElement, MaskInputProps>(
  ({
    name,
    label,
    description,
    error,
    options,
    withoutForm,
    className,
    ...props
  }) => {
    const { setValue, ref: imaskRef } = useIMask(options);
    return (
      <InputBase
        label={label}
        description={description}
        error={error}
        className={className}
        {...props}
      >
        {(rest) => (
          <Input
            ref={imaskRef as React.LegacyRef<HTMLInputElement> | undefined}
            {...rest}
            onChange={(e) => {
              setValue(e.target.value);
              rest.onChange?.(e.target.value);
            }}
          />
        )}
      </InputBase>
    );
    const form = useFormContext();
    const hasForm = !!form && !!name;

    React.useEffect(() => {
      if (hasForm && name && form.getValues(name)) {
        setValue(form.getValues(name));
      }
    }, [form, hasForm, name, setValue]);

    if (!hasForm || withoutForm) {
      return (
        <InputBase
          label={label}
          description={description}
          error={error}
          className={className}
        >
          <Input
            {...props}
            ref={imaskRef as React.LegacyRef<HTMLInputElement> | undefined}
          />
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
