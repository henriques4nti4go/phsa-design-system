import { Button } from "../../../../../components/actions";
import { Icon } from "../../../../../components/dataDisplay";
import { useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import _ from "lodash";

export type MultipleInputBaseProps = {
  children: ({
    onChange,
    addItem,
    value,
  }: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addItem: () => void;
    value: string;
  }) => React.ReactNode;
  data: string[];
  name?: string;
  onChangeData?: (data: string[]) => void;
};

export const MultipleInputBase = ({
  children,
  data = [],
  name,
  onChangeData = () => {},
}: MultipleInputBaseProps) => {
  const form = useFormContext();
  const withForm = !!form && !!name;
  const [inputValue, setInputValue] = useState("");

  console.log({ inputValue });

  const inputData = useMemo(() => {
    if (withForm) {
      return _.get(form.watch(), name) || [];
    }
    return data;
  }, [withForm, form, name, data]);

  const updateData = useCallback(() => {
    if (!inputValue.length) return;
    if (withForm) {
      form.setValue(name, [...inputData, inputValue]);
    } else {
      onChangeData?.(inputData.concat(inputValue));
    }
    setInputValue("");
  }, [inputData, inputValue, withForm, form, name, onChangeData]);

  const removeItem = useCallback(
    (index: number) => {
      if (withForm) {
        form.setValue(
          name,
          inputData.filter((_: string, i: number) => i !== index)
        );
      } else {
        onChangeData?.(inputData.filter((_: string, i: number) => i !== index));
      }
    },
    [withForm, form, name, inputData, onChangeData]
  );

  const renderOptions = useCallback(() => {
    return inputData?.map((item: string, index: number) => {
      return (
        <div key={index} className="flex justify-between mt-2">
          <div>{item}</div>
          <Button
            onClick={() => removeItem(index)}
            variant={"ghost"}
            size={"icon"}
          >
            <Icon name="MdDelete" className="fill-destructive" />
          </Button>
        </div>
      );
    });
  }, [inputData, removeItem]);

  return (
    <div>
      {children({
        onChange: ({ target: { value } }) => {
          setInputValue(value);
        },
        addItem: updateData,
        value: inputValue,
      })}
      {renderOptions()}
    </div>
  );
};
