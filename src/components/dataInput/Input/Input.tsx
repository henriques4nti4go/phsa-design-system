import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Input as InputComponent,
  InputProps as InputComponentProps,
} from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export type InputProps = InputComponentProps & {
  label?: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="grid w-full  items-center gap-1.5">
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <InputComponent {...props} />
    </div>
  );
}

export type InputFormProps = InputProps & {
  control: any;
  name: string;
};

export function InputForm({ control, name, label, ...rest }: InputFormProps) {
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
