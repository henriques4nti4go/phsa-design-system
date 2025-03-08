import { Label } from "../../../components/ui/label";
import {
  Switch as SwitchUI,
  SwitchProps as SwitchUIProps,
} from "../../../components/ui/switch";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../components/ui/form";
import { cn } from "../../../lib/utils";

export type SwitchProps = SwitchUIProps & {
  label?: string;
  withoutForm?: boolean;
};

export function Switch({
  label,
  withoutForm,
  className,
  ...props
}: SwitchProps) {
  const form = useFormContext();
  const hasForm = !!form && !withoutForm && !!props.name;

  if (!hasForm)
    return (
      <div className="flex items-center space-x-2">
        <SwitchUI {...props} />
        {label && <Label htmlFor={props.id}>{label}</Label>}
      </div>
    );
  return (
    <FormField
      control={form.control}
      name={props.name ?? ""}
      render={({ field }) => (
        <FormItem
          className={cn(className, "flex items-center space-x-2 space-y-0")}
        >
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel>{label}</FormLabel>
        </FormItem>
      )}
    />
  );
}
