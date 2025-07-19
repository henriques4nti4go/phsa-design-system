import { Button } from "../../../../actions/Button";
import { Icon } from "../../../../dataDisplay/Icon";
import { useCallback, useMemo, useState } from "react";
import { InputProps } from "../Input/types";
import { Input } from "../Input";
import { useConditionalController } from "@/hooks/use-conditional-controller";

export type MultipleInputProps = InputProps & {
  data?: string[];
  onAdd?: (data: string) => void;
  onRemove?: (position: number) => void;
  name: string;
  defaultValue?: string;
  "data-testid"?: string;
};

export const MultipleInput = ({
  data = [],
  onAdd = () => {},
  defaultValue = "",
  onRemove = () => {},
  withoutForm = false,
  ...props
}: MultipleInputProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const formData = useConditionalController({
    name: props.name || "",
    withoutForm,
  });

  const inputItems = useMemo(() => {
    if (formData?.value) {
      return formData.value;
    }
    return data;
  }, [data, formData]);

  const onAddData = useCallback(() => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      if (formData?.onChange) {
        formData.onChange([...inputItems, trimmedValue]);
      } else {
        onAdd(trimmedValue);
      }
      setInputValue("");
    }
  }, [inputValue, formData, onAdd, inputItems]);

  const onRemoveData = useCallback(
    (index: number) => {
      if (formData?.onChange) {
        const newData = inputItems.filter(
          (_: string, i: number) => i !== index
        );
        formData.onChange(newData);
      } else {
        onRemove(index);
      }
    },
    [formData, inputItems, onRemove]
  );

  const renderItens = useCallback(() => {
    return inputItems.map((item: string, index: number) => {
      return (
        <div key={item} className="flex justify-between">
          {item}
          <Button
            variant="ghost"
            className="text-destructive"
            size={"icon"}
            onClick={() => onRemoveData(index)}
          >
            <Icon name="MdDelete" />
          </Button>
        </div>
      );
    });
  }, [inputItems, onRemoveData]);

  return (
    <div className="flex flex-col gap-2">
      <Input
        {...props}
        withoutForm
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        value={inputValue}
        extraElement={
          <Button type="button" onClick={onAddData} disabled={!inputValue}>
            <Icon name="MdAdd" />
          </Button>
        }
      />
      {renderItens()}
    </div>
  );
};
