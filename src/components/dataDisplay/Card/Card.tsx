import { PropsWithChildren } from "react";
import {
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export type CardProps = PropsWithChildren & {
  title: string;
  description?: string;
  footer?: () => React.ReactNode;
};

export const Card = ({
  title,
  children,
  description,
  footer = () => <></>,
}: CardProps) => {
  return (
    <CardComponent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
      {footer && <CardFooter>{footer()}</CardFooter>}
    </CardComponent>
  );
};
