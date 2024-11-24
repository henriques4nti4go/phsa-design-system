import { Label } from "../../../components/ui/label";
import {
  Select as SelectShadcn,
  SelectProps as SelectShadcnProps,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import { FormContainer } from "../form/Form";

export type SelectProps = Omit<SelectShadcnProps, "onValueChange"> & {
  options: {
    value: string | number;
    label: string;
  }[];
  placeholder?: string;
  className?: string;
  label?: string;
  id?: string;
  onChange?: (value: string) => void;
  value?: string;
};
export const Select = ({
  options,
  placeholder,
  label,
  onChange = () => {},
  value,
  ...rest
}: SelectProps) => {
  return (
    <div className="w-full">
      {label && <Label htmlFor={rest.id}>{label}</Label>}
      <SelectShadcn {...rest} onValueChange={onChange} defaultValue={value}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option, index: number) => (
            <SelectItem key={index} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectShadcn>
    </div>
  );
};

export type SelectFormProps = SelectProps & {
  name: string;
};

export function SelectForm({ name, label, ...rest }: SelectFormProps) {
  return (
    <FormContainer
      name={name}
      label={label}
      render={(props) => <Select {...rest} {...props} />}
    />
  );
  // const form = useFormContext();
  // const control = useMemo(() => form?.control, [form]);

  // if (!control) return <></>;

  // return (
  //   <FormField
  //     control={control}
  //     name={name}
  //     render={({ field }) => (
  //       <FormItem>
  //         {label && <FormLabel>{label}</FormLabel>}
  //         <FormControl>
  //           <Select {...rest} {...field} />
  //         </FormControl>
  //         <FormMessage />
  //       </FormItem>
  //     )}
  //   />
  // );
}
