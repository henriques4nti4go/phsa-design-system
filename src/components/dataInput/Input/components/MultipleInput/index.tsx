import { useState } from "react";
import { Input } from "../Input";
import { Icon, Text } from "../../../../../components/dataDisplay";
import { Button } from "../../../../../components/actions";
import { InputProps } from "@/components/ui/input";
import _ from "lodash";

export type MultipleInputProps = InputProps & {
  data: string[];
  onChangeData?: (data: string[]) => void;
};

export const MultipleInput = ({
  data,
  onChangeData = () => {},
  ...rest
}: MultipleInputProps) => {
  const [value, setValue] = useState("");

  const handleAddData = () => {
    if (value.trim()) {
      onChangeData([...data, value]);
      setValue(""); // Limpa o campo de entrada após adicionar
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-center">
        <Input
          {...rest}
          value={value}
          onChange={({ target: { value } }) => setValue(value)}
          withoutForm
        />
        <Button onClick={handleAddData} disabled={!value.trim()}>
          <Icon name="MdAdd" />
        </Button>
      </div>
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <Text>{item}</Text>
          <Button
            variant="ghost"
            onClick={() => onChangeData(_.without(data, item))}
          >
            <Icon name="MdDelete" className="fill-destructive" />
          </Button>
        </div>
      ))}
    </div>
  );
};
