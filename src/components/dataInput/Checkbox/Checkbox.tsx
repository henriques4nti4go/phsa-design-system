import {
  Checkbox as CheckboxShadcn,
  CheckboxProps as CheckboxShadcnProps,
} from "../../ui/checkbox";
import { Label } from "../../dataDisplay/Label";
import { FormContainer } from "../form/Form";

export type CheckboxProps = CheckboxShadcnProps & {
  id: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export const Checkbox = ({
  children,
  value,
  onChange,
  ...props
}: CheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <CheckboxShadcn {...props} checked={value} onCheckedChange={onChange} />
      {children && <Label htmlFor={props.id}>{children}</Label>}
    </div>
  );
};

export type CheckboxFormProps = CheckboxProps & {
  name: string;
  id: string;
};

export function CheckboxForm({ name, children, ...rest }: CheckboxFormProps) {
  return (
    <FormContainer
      name={name}
      label={children as string}
      render={(props) => <Checkbox {...props} id={rest.id} />}
      className="flex flex-row-reverse items-center gap-2 space-y-0"
    />
  );

  // return (
  //   <FormField
  //     control={control}
  //     name={name}
  //     render={({ field }) => (
  //       <FormItem>
  //         <FormItem className="flex flex-row items-start space-x-3 space-y-0">
  //           <FormControl>
  //             <Checkbox
  //               {...rest}
  //               checked={field.value}
  //               onCheckedChange={field.onChange}
  //             />
  //           </FormControl>
  //           <FormLabel className="font-normal">{children}</FormLabel>
  //         </FormItem>
  //         <FormMessage />
  //       </FormItem>
  //     )}
  //   />
  // );
}
