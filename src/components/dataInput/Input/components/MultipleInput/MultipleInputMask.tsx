import { MaskInput, MaskInputProps } from "../MaskInput";
import { MultipleInputBase, MultipleInputProps } from "./MultipleInputBase";

export const MultipleInputMask = ({
  data,
  onChangeData,
  ...props
}: Omit<MultipleInputProps, "children"> & Omit<MaskInputProps, "children">) => {
  return (
    <MultipleInputBase {...props} data={data} onChangeData={onChangeData}>
      {({ component, onChange }) => {
        return (
          <MaskInput
            {...props}
            onChange={(value) => {
              onChange?.(value);
            }}
            component={component}
          />
        );
      }}
    </MultipleInputBase>
  );
};
