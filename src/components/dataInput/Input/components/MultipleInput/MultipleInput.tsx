import { Input, InputProps } from "../../../Input";
import { MultipleInputBase, MultipleInputProps } from "./MultipleInputBase";

export const MultipleInput = ({
  data,
  onChangeData,
  ...props
}: Omit<MultipleInputProps, "children"> & Omit<InputProps, "children">) => {
  return (
    <MultipleInputBase {...props} data={data} onChangeData={onChangeData}>
      {({ onChange, value, component }) => {
        return (
          <Input
            {...props}
            value={value}
            onChange={onChange}
            component={component}
          />
        );
      }}
    </MultipleInputBase>
  );
};
