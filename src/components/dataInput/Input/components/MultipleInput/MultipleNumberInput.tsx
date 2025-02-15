import { InputProps } from "../Input";
import { NumberInput, NumberInputProps } from "../NumberInput";
import { MultipleInputBase, MultipleInputProps } from "./MultipleInput";

export type MultipleNumberInputProps = NumberInputProps &
  MultipleInputProps & {};

export const MultipleNumberInput = ({
  data,
  onChangeData,
  ...props
}: Omit<MultipleNumberInputProps, "children"> &
  Omit<InputProps, "children">) => {
  return (
    <MultipleInputBase {...props} data={data} onChangeData={onChangeData}>
      {({ onChange, value }) => {
        return <NumberInput {...props} value={value} onChange={onChange} />;
      }}
    </MultipleInputBase>
  );
};
