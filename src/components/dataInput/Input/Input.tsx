import {
  Input as InputComponent,
  InputProps as InputComponentProps,
} from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export type InputProps = InputComponentProps & {
  label?: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="grid w-full  items-center gap-1.5">
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <InputComponent {...props} />
    </div>
  );
}
