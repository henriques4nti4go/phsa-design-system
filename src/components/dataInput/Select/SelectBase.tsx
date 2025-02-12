import { useCallback } from "react";
import {
  Select,
  SelectProps,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export type SelectBaseProps = Omit<SelectProps, "onValueChange"> & {
  options: {
    value: string | number;
    label: string;
  }[];
  placeholder?: string;
  className?: string;
  id?: string;
  onChange?: (value: string) => void;
  value?: string;
  onChangeCallback?: (value: string) => void;
};

export const SelectBase = ({
  options,
  placeholder,
  onChange = () => {},
  onChangeCallback = () => {},
  value,
  ...rest
}: SelectBaseProps) => {
  const onSelect = useCallback(
    (value: string) => {
      onChange(value);
      onChangeCallback(value);
    },
    [onChange, onChangeCallback]
  );
  return (
    <Select
      {...rest}
      onValueChange={onSelect}
      defaultValue={value}
      value={value}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option, index: number) => (
          <SelectItem key={index} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
