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
  activeTabIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTabIndex = 0,
  onTabChange,
  className,
}) => {
  return (
    <TabsUI
      value={tabs[activeTabIndex].label}
      onValueChange={(value) => {
        const index = tabs.findIndex((tab) => tab.label === value);
        if (onTabChange) onTabChange(index);
      }}
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
