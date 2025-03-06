import { useFormContext } from "react-hook-form";
import { InputProps as InputPropsUI } from "../../../../ui/input";
import { Label } from "../../../../ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../ui/form";

export type InputBaseProps = Omit<InputPropsUI, "children"> & {
  label?: string;
  withoutForm?: boolean;
  "data-testid"?: string;
  error?: string;
  children?: (
    props: React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) => JSX.Element;
};

export const InputBase = ({
  label,
  withoutForm,
  className,
  name,
  required,
  "data-testid": testId,
  error,
  children,
  ...props
}: InputBaseProps) => {
  const form = useFormContext();
  const hasForm = !withoutForm && !!form && !!name;

  if (!hasForm)
    return (
      <div className="grid w-full items-center gap-3">
        <Label htmlFor="email">
          {label}
          {required && <span>*</span>}
        </Label>
        {children?.({
          className,
          name,
          required,
          ...props,
        })}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={className}
          data-testid={testId ? `form-item-${testId}` : undefined}
        >
          {label && (
            <FormLabel
              htmlFor={name}
              data-testid={testId ? `form-label-${testId}` : undefined}
            >
              {`${label}${required ? " *" : ""}`}
            </FormLabel>
          )}
          <FormControl>
            {children?.({
              className,
              required,
              ...props,
              ...field,
            })}
          </FormControl>
          <FormMessage
            role="alert"
            data-testid={testId ? `form-message-${testId}` : undefined}
          />
        </FormItem>
      )}
    />
  );
};
