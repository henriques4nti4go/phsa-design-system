import { Sheet as SheetComponent, SheetContent } from "@/components/ui/sheet";
import { PropsWithChildren } from "react";

export type SheetProps = typeof SheetComponent &
  PropsWithChildren & {
    side?: "left" | "right" | "top" | "bottom";
    className?: string;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
  };
export function Sheet({ side, className, children, ...props }: SheetProps) {
  return (
    <SheetComponent {...props}>
      <SheetContent side={side} className={className}>
        {children}
      </SheetContent>
    </SheetComponent>
  );
}
