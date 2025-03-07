import { Button } from "../../../../../components/actions";
import { Icon } from "../../../../../components/dataDisplay";
import { useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import _ from "lodash";

export type MultipleInputBaseProps = {
  children: (params: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    addItem: () => void;
    value: string;
    error?: string;
  }) => React.ReactNode;
  data: string[];
  name?: string;
  onChangeData?: (data: string[]) => void;
  error?: string;
};

export const MultipleInputBase = ({
  children,
  data = [],
  name,
  onChangeData = () => {},
  error,
}: MultipleInputBaseProps) => {
  const form = useFormContext();
  const withForm = !!form && !!name;
  const [inputValue, setInputValue] = useState("");

  const inputData = useMemo(() => {
    if (withForm) {
      return _.get(form.watch(), name) || [];
    }
    return data;
  }, [withForm, form, name, data]);

  const errorMessage = useMemo(() => {
    if (withForm) {
      return _.get(form.formState.errors, name)?.message as string;
    }
    return error;
  }, [error, form, name, withForm]);

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
            type="button"
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
        error: errorMessage,
      })}
      {renderOptions()}
    </div>
  );
};
