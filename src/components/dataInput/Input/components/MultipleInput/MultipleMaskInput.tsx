import { Button } from "../../../../../components/actions";
import { MaskInput, MaskInputProps } from "../MaskInput";
import { MultipleInputBase } from "./MultipleInputBase";
import { Icon } from "../../../../../components/dataDisplay";

export type MultipleMaskInputProps = MaskInputProps & {
  data?: string[];
  onChangeData?: (data: string[]) => void;
  name: string;
};

export const MultipleMaskInput = ({
  data = [],
  ...props
}: MultipleMaskInputProps) => {
  return (
    <MultipleInputBase data={data} {...props}>
      {({ onChange, addItem, value }) => (
        <MaskInput
          {...props}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          withoutForm
          component={
            <Button onClick={() => addItem()}>
              <Icon name="MdAdd" />
            </Button>
          }
        />
      )}
    </MultipleInputBase>
  );
};
