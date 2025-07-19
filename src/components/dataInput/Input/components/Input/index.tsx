import { Input as InputUI } from "@/components/ui/input";
import { InputProps } from "./types";
import { useMemo } from "react";
import { InputBase } from "../InputBase";
import { useConditionalController } from "@/hooks/use-conditional-controller";
import { cn } from "@/lib/utils";

export const Input = ({
  "data-testid": dataTestId,
  withoutForm = false,
  extraElement,
  containerClassName,
  ...props
}: InputProps) => {
  const formData = useConditionalController({
    name: props.name || "",
    withoutForm,
  });

  const inputProps = useMemo(() => {
    return {
      ...formData,
      ...props,
    };
  }, [formData, props]);

  return (
    <InputBase
      label={props.label}
      error={props.error}
      required={props.required}
      data-testid={dataTestId}
    >
      <div className={cn("flex items-center gap-2", containerClassName)}>
        <InputUI
          {...inputProps}
          data-testid={dataTestId}
          className={cn(
            props.className,
            props.error &&
              "border-destructive focus:border-destructive focus-visible:ring-0"
          )}
        />
        {extraElement}
      </div>
    </InputBase>
  );
};
