import { Input, InputProps } from "../Input";
import { MaskInput, MaskInputProps } from "../MaskInput";
import { MultipleInputBase, MultipleInputProps } from "./MultipleInputBase";

type MultipleMaskInputCustomProps = Omit<MultipleInputProps, "children"> &
  Omit<MaskInputProps, "children"> & {
    placeholder?: string;
  };

export const MultipleInputMask = ({
  data,
  onChangeData,
  name,
  ...props
}: MultipleMaskInputCustomProps) => {
  return (
    <MultipleInputBase name={name} data={data} onChangeData={onChangeData}>
      {({ onChange, value, component }) => {
        console.log({ value });
        return (
          <MaskInput
            {...props}
            value={value}
            onChange={(text) => {
              onChange?.(text);
              props.onChange?.(text);
            }}
            component={component}
          />
        );
      }}
    </MultipleInputBase>
  );
};
