"use client";

import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../../../ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { Menus } from "./menus";

export type AppSidebarProps = {
  footer?: () => React.ReactNode;
  user?: {
    email?: string;
    name?: string;
  };
  enterprise?: {
    name: string;
    logo: () => React.ReactNode;
    plan: string;
  };
  navbar: {
    title: string;
    url: string;
    items: {
      title: string;
      url: string;
      isActive?: boolean | undefined;
      icon?: () => React.ReactNode;
    }[];
  }[];
};

export function AppSidebar({
  navbar = [],
  enterprise = {
    name: "Acme Inc",
    logo: () => <GalleryVerticalEnd />,
    plan: "Enterprise",
  },
  footer,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={enterprise} />
      </SidebarHeader>
      <SidebarContent>
        <Menus items={navbar} />
      </SidebarContent>
      {footer && <SidebarFooter>{footer()}</SidebarFooter>}
      <SidebarRail />
    </Sidebar>
  );
}
