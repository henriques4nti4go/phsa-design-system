import { useCallback, useMemo, useState } from "react";
import { Icon, Text } from "../../../../../components/dataDisplay";
import { Button } from "../../../../../components/actions";
import { Input, InputProps } from "../../../Input";
import _ from "lodash";
import { useFormContext } from "react-hook-form";

export type MultipleInputProps = {
  data?: string[];
  onChangeData?: (data: string[]) => void;
  error?: string | React.ReactNode;
  children: (props: InputProps) => React.ReactNode;
  formatItems?: (item: string) => string | null;
  name?: string;
};

export const MultipleInputBase = ({
  data = [],
  onChangeData = () => {},
  children = () => null,
  formatItems = (item) => item,
  error,
  ...rest
}: MultipleInputProps) => {
  const [value, setValue] = useState("");

  const form = useFormContext();

  const hasForm = !!form && !!rest.name;

  const componentData = useMemo(() => {
    if (hasForm) return form.watch()[rest.name as string];
    return data;
  }, [data, form, hasForm, rest.name]) as string[];

  const handleAddData = useCallback(() => {
    if (value?.trim()) {
      const fullData = [...componentData, value];
      onChangeData(fullData);
      if (hasForm) form.setValue(rest.name as string, fullData);
      setValue("");
    }
  }, [componentData, form, hasForm, onChangeData, rest.name, value]);

  const removeElement = useCallback(
    (item: string) => {
      onChangeData(_.without(componentData, item));
      if (hasForm)
        form.setValue(rest.name as string, _.without(componentData, item));
    },
    [componentData, form, hasForm, onChangeData, rest.name]
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-end">
        {children({
          ...rest,
          value,
          onChange: (value) => setValue(value ? String(value) : ""),
          error: error as string,
          component: (
            <Button onClick={handleAddData} disabled={!value?.trim()}>
              <Icon name="MdAdd" />
            </Button>
          ),
        })}
      </div>
      {componentData.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <Text>{formatItems(item)}</Text>
          <Button variant="ghost" onClick={() => removeElement(item)}>
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
