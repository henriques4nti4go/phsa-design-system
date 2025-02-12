export type ErrorMessageProps = {
  children: string;
};
export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return <p className="text-sm font-medium text-destructive">{children}</p>;
};
