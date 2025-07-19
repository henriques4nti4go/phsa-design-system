import { InputBaseProps } from "./InputBase";

export type InputProps = Omit<InputBaseProps, "children"> & {
  component?: React.ReactNode;
  error?: string;
  withoutForm?: boolean;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  floatingLabel?: boolean;
  "data-testid"?: string;
  extraElement?: React.ReactNode;
  containerClassName?: string;
};
