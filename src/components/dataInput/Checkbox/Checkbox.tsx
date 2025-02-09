"use client";

import { Label } from "@/components/dataDisplay/Label";
import {
  Checkbox as CheckboxShadcn,
  CheckboxProps as CheckboxShadcnProps,
} from "../../ui/checkbox";
import { FormField, FormItem, FormControl, FormMessage } from "../../ui/form";

export type CheckboxProps = CheckboxShadcnProps & {
  id: string;
  value: boolean;
  onChange: (value: boolean) => void;
  label?: React.ReactNode;
};

export const Checkbox = ({
  label,
  value,
  onChange,
  ...props
}: CheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <CheckboxShadcn {...props} checked={value} onCheckedChange={onChange} />
      {label && <Label htmlFor={props.id}>{label}</Label>}
    </div>
  );
};

export type CheckboxFormProps = Omit<CheckboxProps, "value" | "onChange"> & {
  name: string;
  label?: React.ReactNode;
};

export function CheckboxForm({ name, label, ...rest }: CheckboxFormProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              {...rest}
              value={field.value}
              onChange={field.onChange}
              label={label}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
