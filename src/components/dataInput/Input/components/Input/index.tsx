import { InputBase, InputBaseProps } from "../InputBase";
import { Input as InputUI } from "../../../../ui/input";

export type InputProps = Omit<InputBaseProps, "children"> & {
  component?: React.ReactNode;
};

export const Input = ({
  label,
  withoutForm,
  component,
  name,
  error,
  ...props
}: InputProps) => {
  return (
    <InputBase
      label={label}
      withoutForm={withoutForm}
      name={name}
      error={error}
    >
      {({ ...rest }) => (
        <div className="flex w-full max-w-sm items-center space-x-2">
          <InputUI {...props} {...rest} />
          {component}
        </div>
      )}
    </InputBase>
  );
};
