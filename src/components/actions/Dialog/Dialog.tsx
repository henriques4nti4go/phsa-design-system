import {
  Dialog as DialogComponent,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogProps as DialogComponentProps,
} from "../../../components/ui/dialog";
import { PropsWithChildren } from "react";

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
