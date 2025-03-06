import { Button } from "../../../../actions/Button";
import { Input, InputProps } from "../Input";
import { MultipleInputBase } from "./MultipleInputBase";
import { Icon } from "../../../../dataDisplay/Icon";

export type MultipleNumberInputProps = InputProps & {
  data: string[];
  onChangeData: (data: string[]) => void;
  name: string;
};

export const MultipleNumberInput = ({
  data,
  ...props
}: MultipleNumberInputProps) => {
  return (
    <MultipleInputBase data={data} {...props}>
      {({ onChange, addItem, value }) => (
        <Input
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
