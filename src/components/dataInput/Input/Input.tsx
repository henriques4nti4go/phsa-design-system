import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Input as InputComponent,
  InputProps as InputComponentProps,
} from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useMemo } from "react";
import { FormContainer } from "../form/Form";

export type InputProps = InputComponentProps & {
  label?: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <InputComponent {...props} className="" />
    </div>
  );
}

export type InputFormProps = InputProps & {
  name: string;
};

export function InputForm({ name, label, ...rest }: InputFormProps) {
  const form = useFormContext();
  const control = useMemo(() => form?.control, [form]);

  return (
    <FormContainer
      name={name}
      label={label}
      render={(props) => <Input {...props} {...rest} />}
    />
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...rest} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
