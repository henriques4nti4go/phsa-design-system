import {
  Tabs as TabsShadcn,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { useCallback } from "react";

export type TabsProps = {
  data: {
    label: string;
    value: string;
    content: JSX.Element;
  }[];
  defaultValue: string;
  className?: string;
  onSelectTab?: (value: string) => void;
  value?: string;
};

export function Tabs({
  data,
  className,
  value,
  onSelectTab = () => {},
}: TabsProps) {
  const renderTabsTrigger = useCallback(() => {
    return data.map(({ label, value }, index) => (
      <TabsTrigger key={index} value={value} onClick={() => onSelectTab(value)}>
        {label}
      </TabsTrigger>
    ));
  }, [data, onSelectTab]);

  const renderTabsContent = useCallback(() => {
    return data.map(({ value, content }, index) => (
      <TabsContent key={index} value={value}>
        {content}
      </TabsContent>
    ));
  }, [data]);

  return (
    <TabsShadcn defaultValue={value} className={className}>
      {data?.length && (
        <TabsList className="grid w-full grid-cols-2">
          {renderTabsTrigger()}
        </TabsList>
      )}
      {data?.length && renderTabsContent()}
    </TabsShadcn>
  );
}
