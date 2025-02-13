"use client";

import * as React from "react";
import {
  Tabs as TabsUI,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { cn } from "../../../lib/utils";

interface TabsProps {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className,
}) => {
  return (
    <TabsUI
      value={activeTab}
      onValueChange={onTabChange}
      className={cn("w-full", className)}
    >
      <TabsList>
        {tabs.map((tab, index) => (
          <TabsTrigger key={index} value={tab.label}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab, index) => (
        <TabsContent key={index} value={tab.label}>
          {tab.content}
        </TabsContent>
      ))}
    </TabsUI>
  );
};
