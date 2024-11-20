import React from "react";
import {
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export type CardProps = {
  title?: string;
  description?: string;
  footer?: () => React.ReactNode | JSX.Element;
  children?: React.ReactNode | JSX.Element;
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
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
      {footer && <CardFooter>{footer()}</CardFooter>}
    </CardComponent>
  );
};
