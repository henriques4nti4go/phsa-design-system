import { MaskInput, MaskInputProps } from "../MaskInput";
import { MultipleInputBase, MultipleInputProps } from "./MultipleInputBase";

export const MultipleInputMask = ({
  data,
  onChangeData,
  ...props
}: Omit<MultipleInputProps, "children"> & Omit<MaskInputProps, "children">) => {
  return (
    <MultipleInputBase {...props} data={data} onChangeData={onChangeData}>
      {({ component, onChange, value, ...rest }) => {
        return (
          <MaskInput
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
