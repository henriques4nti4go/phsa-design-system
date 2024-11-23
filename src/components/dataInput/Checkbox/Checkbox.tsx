import {
  Checkbox as CheckboxShadcn,
  CheckboxProps as CheckboxShadcnProps,
} from "../../ui/checkbox";
import { Label } from "../../dataDisplay/Label";
import { useFormContext } from "react-hook-form";
import { useMemo } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";

export type CheckboxProps = CheckboxShadcnProps & {
  id: string;
};

export const Checkbox = ({ children, ...props }: CheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <CheckboxShadcn {...props} />
      {children && <Label htmlFor={props.id}>{children}</Label>}
    </div>
  );
};

export type CheckboxFormProps = CheckboxProps & {
  name: string;
};

export function CheckboxForm({ name, children, ...rest }: CheckboxFormProps) {
  const form = useFormContext();
  const control = useMemo(() => form?.control, [form]);

  if (!control) return <></>;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                {...rest}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="font-normal">{children}</FormLabel>
          </FormItem>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
