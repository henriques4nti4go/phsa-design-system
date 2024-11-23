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
import { PropsWithChildren } from "react";
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
  return (
    <DialogComponent {...props}>
      <DialogContent className={className}>
        <form
          onSubmit={onSubmit}
          className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
        >
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
