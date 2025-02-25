import { Input, InputProps } from "../../../Input";
import { MultipleInputBase, MultipleInputProps } from "./MultipleInputBase";

export const MultipleInput = ({
  data,
  onChangeData,
  name,
  ...props
}: Omit<MultipleInputProps, "children"> & Omit<InputProps, "children">) => {
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
