"use client";

import { cn } from "../../../../lib/utils";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui/sidebar";
import React from "react";

export function Menus({
  items,
}: {
  items: {
    title: string;
    url: string;
    items?: {
      title: string;
      url: string;
      icon?: () => React.ReactNode;
      isActive?: boolean | undefined;
    }[];
  }[];
}) {
  return (
    <>
      {items.map((item, index) => {
        return (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarMenu>
              {item.items?.map((subItem) => (
                <SidebarMenuItem key={subItem.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      subItem?.isActive && "bg-sidebar-accent font-semibold"
                    )}
                  >
                    <a href={subItem.url}>
                      {subItem?.icon && subItem.icon()}
                      <span>{subItem.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        );
      })}
    </>
  );
}
