import { Button } from "../../../../actions/Button";
import { Input, InputProps } from "../Input";
import { MultipleInputBase } from "./MultipleInputBase";
import { Icon } from "../../../../dataDisplay/Icon";

export type MultipleInputProps = InputProps & {
  data: string[];
  onChangeData: (data: string[]) => void;
  name: string;
};

export const MultipleInput = ({ data, ...props }: MultipleInputProps) => {
  return (
    <MultipleInputBase data={data} {...props}>
      {({ onChange, addItem, value }) => (
        <Input
          {...props}
          value={value}
          onChange={onChange}
          withoutForm
          component={
            <Button type="button" onClick={() => addItem()}>
              <Icon name="MdAdd" />
            </Button>
          }
        />
      )}
    </MultipleInputBase>
  );
};
