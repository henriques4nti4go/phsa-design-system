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
      <DialogContent className={className} ref={dialogRef}>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
        </form>
      </DialogContent>
    </DialogComponent>
  );
};
