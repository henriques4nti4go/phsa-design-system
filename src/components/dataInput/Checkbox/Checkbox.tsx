import {
  Checkbox as CheckboxShadcn,
  CheckboxProps as CheckboxShadcnProps,
} from "../../ui/checkbox";
import { Label } from "../../dataDisplay/Label";

export type CheckboxProps = CheckboxShadcnProps & {
  id: string;
};

export const Checkbox = ({ children, ...props }: CheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <CheckboxShadcn {...props} />
      {children && (
        <Label htmlFor={props.id}>Accept terms and conditions</Label>
      )}
    </div>
  );
};
