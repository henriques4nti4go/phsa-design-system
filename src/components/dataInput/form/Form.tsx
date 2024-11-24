import { useMemo } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./index";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

export type FormContainerProps = {
  name: string;
  label?: string;
  render: (
    props?: ControllerRenderProps<FieldValues, string>
  ) => React.ReactNode;
  className?: string;
};
export const FormContainer = ({
  name,
  label,
  className,
  render = () => <></>,
}: FormContainerProps) => {
  const form = useFormContext();
  const control = useMemo(() => form?.control, [form]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>{render && render(field)}</FormControl>
          </FormItem>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
