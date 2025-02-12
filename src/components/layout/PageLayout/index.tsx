import { Text } from "../../../components/dataDisplay";
import { PropsWithChildren } from "react";

export type PageLayoutProps = PropsWithChildren & {
  title: string;
  subtitle: string;
  header?: React.ReactNode;
};

export const PageLayout = ({
  subtitle,
  title,
  children,
  header,
}: PageLayoutProps) => {
  return (
    <div className="m-5 p-4 bg-white">
      <div className="flex justify-between">
        <div>
          {title && <Text variant="title">{title}</Text>}
          {subtitle && <Text variant="muted">{subtitle}</Text>}
        </div>
        {header}
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
};
