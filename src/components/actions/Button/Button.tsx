import { Spinner } from "../../../components/feedback";
import {
  Button as ButtonShadcn,
  ButtonProps as ButtonPropsShadcn,
} from "../../ui/button";

export type ButtonProps = ButtonPropsShadcn & {
  loading?: boolean;
};
export const Button = ({
  children,
  disabled,
  loading,
  ...rest
}: ButtonProps) => {
  return (
    <ButtonShadcn {...rest} disabled={disabled || loading}>
      {loading && <Spinner className="fill-white" />}
      {children}
    </ButtonShadcn>
  );
};
