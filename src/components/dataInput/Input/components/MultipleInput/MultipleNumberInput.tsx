import { useNumericFormat } from "react-number-format";
import { InputProps } from "../Input";
import { NumberInput, NumberInputProps } from "../NumberInput";
import { MultipleInputBase, MultipleInputProps } from "./MultipleInput";

export type MultipleNumberInputProps = Omit<NumberInputProps, "onValueChange"> &
  MultipleInputProps & {};

export const MultipleNumberInput = ({
  data,
  onChangeData,

  ...props
}: Omit<MultipleNumberInputProps, "children"> &
  Omit<InputProps, "children">) => {
  const { format } = useNumericFormat(props);

  return (
    <MultipleInputBase
      data={data}
      onChangeData={onChangeData}
      formatItems={(item) => format?.(item) || item}
      {...props}
    >
      {({ onChange, value, component }) => {
        return (
          <NumberInput
            {...props}
            value={value as number}
            onValueChange={(value: number) => {
              onChange?.(value);
            }}
            component={component}
          />
        );
      }}
    </MultipleInputBase>
  );
};
