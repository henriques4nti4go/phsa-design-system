import {
  AlertDialog as AlertDialogUI,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";

export type AlertDialogProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const AlertDialog = ({
  title,
  description,
  children,
  onConfirm,
  onCancel,
}: AlertDialogProps) => {
  return (
    <AlertDialogUI>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogUI>
  );
};
