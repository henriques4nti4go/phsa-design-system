import { useFormContext } from "react-hook-form";
import {
  Checkbox as CheckboxUI,
  CheckboxProps as CheckboxUIProps,
} from "../../ui/checkbox";
import { Label } from "../../../components/ui/label";

import { FormControl, FormField, FormItem, FormLabel } from "../form";

import { ErrorMessage } from "../../../components/dataDisplay/ErrorMessage";

export type CheckboxProps = CheckboxUIProps & {
  label: string;
  error?: string;
  withoutForm?: boolean;
};

export const Checkbox = ({
  label,
  error,
  withoutForm,
  ...props
}: CheckboxProps) => {
  const form = useFormContext();

  const hasForm = !withoutForm && !!form && !!props.name;
  if (!hasForm)
    return (
      <div className="flex items-center space-x-2">
        <CheckboxUI {...props} />
        {label && <Label htmlFor={props.id}>{label}</Label>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );

  return (
    <FormField
      control={form.control}
      name={props.name ?? ""}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <CheckboxUI
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          {label && (
            <div className="space-y-1 leading-none">
              <FormLabel>{label}</FormLabel>
            </div>
          )}
        </FormItem>
      )}
    />
  );
};
