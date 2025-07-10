import React from "react";
import { Icon } from "@/components/dataDisplay";
import { cn } from "@/lib/utils";

export type ErrorLabelProps = React.PropsWithChildren<{
  className?: string;
  "data-testid"?: string;
}>;

export const ErrorLabel = ({
  children,
  className,
  "data-testid": dataTestId,
}: ErrorLabelProps) => {
  return (
    <div
      className={cn("flex items-center gap-2 my-2", className)}
      data-testid={`${dataTestId}-error-label`}
    >
      <Icon name="MdErrorOutline" size={18} className="text-destructive" />
      <span className="text-destructive text-sm">{children}</span>
    </div>
  );
};
