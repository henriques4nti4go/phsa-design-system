import {
  Input as InputComponent,
  InputProps as InputComponentProps,
} from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { FormContainer } from "../form/Form";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import { IMaskMixin, useIMask } from "react-imask";

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
    <FormContainer
      name={name}
      label={label}
      className="flex-1"
      render={(props) => <Input {...props} {...rest} />}
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
    <FormContainer
      name={name}
      label={label}
      className="flex-1"
      render={(props) => {
        return <PatternFormat {...props} {...rest} customInput={Input} />;
      }}
    />
  );
};

export type InputMaskProps = {
  label?: string;
  name: string;
  mask: string | string[];
  prepare?: (value: string) => string;
};

export const InputMaskForm = ({ name, label, ...rest }: InputMaskProps) => {
  const MaskedStyledInput = IMaskMixin(({ inputRef, ...props }) => (
    <Input {...props} ref={inputRef} />
  ));

  return (
    <FormContainer
      name={name}
      label={label}
      className="flex-1"
      render={(props) => (
        <MaskedStyledInput // Converte para maiúsculas
          {...props}
          {...rest}
        />
      )}
    />
  );
};
