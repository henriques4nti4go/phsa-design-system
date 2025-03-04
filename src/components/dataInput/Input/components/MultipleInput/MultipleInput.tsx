import { Input, InputProps } from "../Input";
import { MultipleInputBase, MultipleInputProps } from "./MultipleInputBase";

type MultipleInputCustomProps = Omit<MultipleInputProps, "children"> &
  Omit<InputProps, "children"> & {
    placeholder?: string;
  };

export const MultipleInput = ({
  data,
  onChangeData,
  name,
  ...props
}: MultipleInputCustomProps) => {
  return (
    <MultipleInputBase name={name} data={data} onChangeData={onChangeData}>
      {({ onChange, value, component, ...rest }) => {
        return (
          <Input
            {...props}
            {...rest}
            value={value}
            onChange={(value) => {
              onChange?.(value);
              props.onChange?.(value);
            }}
            component={component}
          />
        );
      }}
    </MultipleInputBase>
  );
};
