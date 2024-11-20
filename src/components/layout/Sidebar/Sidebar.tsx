"use client";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../ui/sidebar";
import React, { useMemo } from "react";
import { AppSidebar, AppSidebarProps } from "./components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { Separator } from "../Separator";
import { usePathname } from "next/navigation";

export type SidebarProps = React.PropsWithChildren & AppSidebarProps;

export const realValues = {
  create: "criar",
  edit: "editar",
  evaluation: "avaliação",
  offer: "oferta",
};

export type RealValuesKeyType = keyof typeof realValues;

export const Sidebar = ({ children, ...rest }: React.PropsWithChildren) => {
  const pathname = usePathname();
  const itemsBreadcrumb = useMemo(() => {
    const path = pathname;
    const indexPosition = path.lastIndexOf("?");
    const currentRoute = path
      .substring(0, indexPosition === -1 ? path.length : indexPosition)
      .split("/")
      .filter((item) => item.length);

    return (currentRoute as RealValuesKeyType[]) || [];
  }, [pathname]);
  return (
    <SidebarProvider>
      <AppSidebar {...rest} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {itemsBreadcrumb.map((item, index: number) => {
                  const path = itemsBreadcrumb.slice(0, index + 1).join("/");
                  const isLast = itemsBreadcrumb.length === index + 1;
                  const label = realValues[item] || item;
                  return (
                    <>
                      {isLast ? (
                        <BreadcrumbItem key={index}>
                          <BreadcrumbPage className="capitalize">
                            {label}
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      ) : (
                        <>
                          <BreadcrumbLink
                            href={`/${path}`}
                            key={index}
                            className="capitalize"
                          >
                            {label}
                          </BreadcrumbLink>
                          <BreadcrumbSeparator
                            className="hidden md:block"
                            key={index + "separator"}
                          />
                        </>
                      )}
                    </>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </div>
        <footer className="h-[65px]">
          <Separator />
          <div className="flex items-center justify-between h-16 bg-background px-5">
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Your Company
            </span>
            <span className="text-sm text-muted-foreground">
              Feito na terra do sol 🌞
            </span>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
};
