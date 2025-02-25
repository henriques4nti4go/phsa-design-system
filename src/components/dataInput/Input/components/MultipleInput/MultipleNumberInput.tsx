import { useNumericFormat } from "react-number-format";
import { InputProps } from "../Input";
import { NumberInput, NumberInputProps } from "../NumberInput";
import { MultipleInputBase, MultipleInputProps } from "./MultipleInputBase";

export type MultipleNumberInputProps = Omit<
  NumberInputProps,
  "onValueChange" | "children"
> &
  Omit<MultipleInputProps, "children"> & {
    onChangeData?: (data: string[]) => void;
  };

export const MultipleNumberInput = ({
  data,
  onChangeData,
  ...props
}: MultipleNumberInputProps) => {
  const { format } = useNumericFormat({
    thousandSeparator: props.thousandSeparator,
    decimalSeparator: props.decimalSeparator,
    prefix: props.prefix,
    suffix: props.suffix,
    valueIsNumericString: true,
  });

  return (
    <MultipleInputBase
      data={data}
      onChangeData={onChangeData}
      formatItems={(item: string) => format?.(item) || item}
      {...props}
    >
      {({ onChange, value, component, ...rest }: InputProps) => (
        <NumberInput
          {...(rest as Omit<NumberInputProps, "onChange" | "value">)}
          value={value as number}
          onChange={(value) => {
            onChange?.(value);
          }}
          component={component}
        />
      )}
    </MultipleInputBase>
  );
};
