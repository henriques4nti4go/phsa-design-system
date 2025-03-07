import { Button } from "../../../../actions/Button";
import { Input, InputProps } from "../Input";
import { MultipleInputBase } from "./MultipleInputBase";
import { Icon } from "../../../../dataDisplay/Icon";

export type MultipleInputProps = InputProps & {
  data?: string[];
  onChangeData?: (data: string[]) => void;
  name: string;
};

export const MultipleInput = ({
  data = [],
  mask,
  ...props
}: MultipleInputProps) => {
  return (
    <MultipleInputBase data={data} {...props}>
      {({ onChange, addItem, value, error }) => (
        <Input
          {...props}
          mask={mask}
          value={value}
          onChange={onChange}
          withoutForm
          error={error}
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
