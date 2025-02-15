import { useState } from "react";
import { Icon, Text } from "../../../../../components/dataDisplay";
import { Button } from "../../../../../components/actions";
import { Input, InputProps } from "../../../Input";
import _ from "lodash";

export type MultipleInputProps = {
  data?: string[];
  onChangeData?: (data: string[]) => void;
  error?: string | React.ReactNode;
  children: (props: InputProps) => React.ReactNode;
};

export const MultipleInputBase = ({
  data = [],
  onChangeData = () => {},
  children = () => null,
  error,
  ...rest
}: MultipleInputProps) => {
  const [value, setValue] = useState("");

  const handleAddData = () => {
    if (value.trim()) {
      onChangeData([...data, value]);
      setValue("");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-end">
        {children({
          ...rest,
          value,
          onChange: (e) => setValue(e as string),
          error: error as string,
        })}
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

export const MultipleInput = ({
  data,
  onChangeData,
  ...props
}: Omit<MultipleInputProps, "children"> & Omit<InputProps, "children">) => {
  return (
    <MultipleInputBase {...props} data={data} onChangeData={onChangeData}>
      {({ onChange, value }) => {
        return <Input {...props} value={value} onChange={onChange} />;
      }}
    </MultipleInputBase>
  );
};
