"use client";
import {
  Dialog as DialogComponent,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogProps as DialogComponentProps,
  DialogClose,
} from "../../../components/ui/dialog";
import { PropsWithChildren, useRef } from "react";
import { Button } from "../Button";
import { cn } from "../../../lib/utils";

export type DialogProps = DialogComponentProps &
  PropsWithChildren & {
    className?: string;
    title?: string;
    description?: string;
    footer?: () => React.ReactNode;
  };

export function Dialog({
  title,
  description,
  className,
  children,
  footer = () => null,
  ...props
}: DialogProps) {
  return (
    <DialogComponent {...props}>
      <DialogContent className={className}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer()}</DialogFooter>}
      </DialogContent>
    </DialogComponent>
  );
}

export type DialogWithFormProps = DialogProps & {
  onSubmit: () => void;
};

export const DialogWithForm = ({
  title,
  description,
  className,
  children,
  footer = () => null,
  onSubmit = () => {},
  ...props
}: DialogWithFormProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  return (
    <DialogComponent {...props}>
      <form
        onSubmit={onSubmit}
        // className={cn(
        //   dialogRef.current?.className
        //     .replace("overflow-auto", "")
        //     .replace("max-h-[80vh]", "")
        // )}
      >
        <DialogContent className={className} ref={dialogRef}>
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
          {footer && (
            <DialogFooter>
              <div className="flex justify-between w-full">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Fechar
                  </Button>
                </DialogClose>
                {footer()}
              </div>
            </DialogFooter>
          )}
        </DialogContent>
      </form>
    </DialogComponent>
  );
};
