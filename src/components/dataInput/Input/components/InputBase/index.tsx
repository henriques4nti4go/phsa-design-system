import { ErrorLabel } from "@/components/feedback/ErrorLabel";
import { InputProps as InputPropsUI } from "../../../../ui/input";
import { Label } from "../../../../ui/label";

export type InputBaseProps = Omit<InputPropsUI, "children"> & {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  "data-testid"?: string;
};

export const InputBase = ({
  label,
  error,
  children,
  required,
  "data-testid": testId,
}: InputBaseProps) => {
  return (
    <div>
      {label && (
        <Label data-testid={`${testId}-label`}>
          {`${label} ${required ? "*" : ""}`}{" "}
        </Label>
      )}
      {children}
      {error && <ErrorLabel data-testid={testId}>{error}</ErrorLabel>}
    </div>
  );
};
