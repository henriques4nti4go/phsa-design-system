import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input as InputComponent } from "../../../../../components/ui/input";
import { Icon, Text } from "../../../../../components/dataDisplay";
import { Button } from "../../../../../components/actions";
import { InputProps } from "../Input";
import _ from "lodash";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputBase } from "../InputBase";
import { ErrorMessage } from "@/components/dataDisplay/ErrorMessage/ErrorMessage";

export type MultipleInputProps = InputProps & {
  data?: string[];
  onChangeData?: (data: string[]) => void;
  error?: string | React.ReactNode;
};

export const MultipleInputBase = ({
  data = [],
  onChangeData = () => {},
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

  const renderError = useCallback(() => {
    if (typeof error === "string") {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    return error;
  }, [error]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-center">
        <InputComponent
          {...rest}
          value={value}
          onChange={({ target: { value } }) => setValue(value)}
        />
        <Button onClick={handleAddData} disabled={!value.trim()}>
          <Icon name="MdAdd" />
        </Button>
      </div>
      {renderError()}
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

const MultipleInputForm = ({
  name,
  className,
  label,
  description,
  ...rest
}: MultipleInputProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name!}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <MultipleInputBase
              data={field.value}
              onChangeData={(data) => field.onChange(data)}
              {...rest}
              error={<FormMessage />}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

export const MultipleInput = ({
  name,
  className,
  error,
  ...rest
}: MultipleInputProps) => {
  const form = useFormContext();
  const hasForm = !!form && !!name;

  if (!hasForm) {
    return (
      <InputBase {...rest}>
        <MultipleInputBase {...rest} error={error} />
      </InputBase>
    );
  }

  return <MultipleInputForm name={name} className={className} {...rest} />;
};
