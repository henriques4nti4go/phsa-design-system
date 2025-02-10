import { Label } from "../../../../../components/dataDisplay/Label";
import { cn } from "../../../../../lib/utils";
import { PropsWithChildren } from "react";

type InputBaseProps = PropsWithChildren & {
  label?: string;
  description?: string;
  error?: string;
  className?: string;
};

export const InputBase = ({
  children,
  description,
  error,
  label,
  className,
}: InputBaseProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      {children}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
};
