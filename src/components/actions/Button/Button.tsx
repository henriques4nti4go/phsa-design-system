import { forwardRef } from "react";
import { Spinner } from "../../../components/feedback";
import {
  Button as UIButton,
  ButtonProps as UIButtonProps,
} from "../../ui/button";

export type ButtonProps = UIButtonProps & {
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, loading, ...rest }, ref) => {
    return (
      <UIButton {...rest} disabled={disabled || loading} ref={ref}>
        {loading && <Spinner className="fill-white" />}
        {children}
      </UIButton>
    );
  }
);

Button.displayName = "Button";
