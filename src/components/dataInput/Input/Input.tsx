"use client";
import {
  Input as InputComponent,
  InputProps as InputComponentProps,
} from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import { useIMask, ReactMaskOpts } from "react-imask";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../../components/ui/form";

export type InputProps = InputComponentProps & {
  label?: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="w-full flex-1">
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <InputComponent {...props} className="flex-1" />
    </div>
  );
}

export type InputFormProps = InputProps & {
  name: string;
};

export function InputForm({ name, label, ...rest }: InputFormProps) {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} {...rest} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export type PatternNumeicInputProps = PatternFormatProps & {
  label?: string;
  name: string;
};

export const PatternNumericInputForm = ({
  name,
  label,
  ...rest
}: PatternNumeicInputProps) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <PatternFormat {...field} {...rest} customInput={Input} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export type InputMaskProps = {
  label?: string;
  name: string;
  mask: ReactMaskOpts["mask"];
  prepare?: ReactMaskOpts["prepare"];
};

export const InputMaskForm = ({
  name,
  label,
  prepare = (chars: string) => chars,
  ...rest
}: InputMaskProps) => {
  const { ref, value } = useIMask({
    mask: rest.mask,
    prepare,
  });

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              {...rest}
              ref={ref}
              value={value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
