"use client";
import {
  SidebarInset,
  SidebarProvider as UISidebarProvider,
} from "../../ui/sidebar";
import { AppSidebar, AppSidebarProps } from "./components/app-sidebar";
import { HeaderSidebar } from "./components/header-sidebar";
import { FooterSidebar } from "./components/footer-sidebar";
import { cn } from "../../../lib/utils";
import { SidebarProvider } from "./provider";

interface SidebarProps extends AppSidebarProps {
  children: React.ReactNode;
  contentClassName?: string;
  showFooter?: boolean;
  defaultPath?: string;
  defaultCollapsed?: boolean;
}

export const Sidebar = ({
  children,
  contentClassName,
  showFooter = true,
  defaultPath,
  defaultCollapsed,
  ...rest
}: SidebarProps) => {
  return (
    <SidebarProvider
      defaultPath={defaultPath}
      defaultCollapsed={defaultCollapsed}
    >
      <UISidebarProvider>
        <AppSidebar {...rest} />
        <SidebarInset className="overflow-auto bg-slate-50">
          <HeaderSidebar />
          <main
            className={cn(
              "flex flex-1 flex-col gap-4 p-4 pt-0",
              contentClassName
            )}
          >
            {children}
          </main>
          {showFooter && <FooterSidebar />}
        </SidebarInset>
      </UISidebarProvider>
    </SidebarProvider>
  );
};
