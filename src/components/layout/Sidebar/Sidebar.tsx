"use client";
import { SidebarInset, SidebarProvider } from "../../ui/sidebar";
import React from "react";
import { AppSidebar, AppSidebarProps } from "./components/app-sidebar";
import { HeaderSidebar } from "./components/header-sidebar";
import { FooterSidebar } from "./components/footer-sidebar";

export type SidebarProps = React.PropsWithChildren & AppSidebarProps;

export const Sidebar = ({ children, ...rest }: SidebarProps) => {
  return (
    <SidebarProvider>
      <AppSidebar {...rest} />
      <SidebarInset className="overflow-auto bg-slate-50">
        <HeaderSidebar />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        <FooterSidebar />
      </SidebarInset>
    </SidebarProvider>
  );
};
