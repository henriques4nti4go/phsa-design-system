import { SidebarTrigger } from "../../../ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../../../ui/breadcrumb";
import { Separator } from "../../Separator";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export type RealValuesKeyType = keyof typeof realValues;

export const realValues = {
  create: "criar",
  edit: "editar",
  evaluation: "avaliação",
  offer: "oferta",
};

const BreadCrumbElement = ({
  isLast = false,
  path,
  children,
}: {
  isLast?: boolean;
  path: string;
  children: string;
}) => {
  if (isLast) {
    return (
      <BreadcrumbItem>
        <BreadcrumbPage className="capitalize">{children}</BreadcrumbPage>
      </BreadcrumbItem>
    );
  }
  return (
    <>
      <BreadcrumbLink href={`/${path}`} className="capitalize">
        {children}
      </BreadcrumbLink>
      <BreadcrumbSeparator className="hidden md:block" />
    </>
  );
};

export const HeaderSidebar = () => {
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

  const renderBreadCrumb = useCallback(() => {
    return itemsBreadcrumb?.map((item, index: number) => {
      const path = itemsBreadcrumb.slice(0, index + 1).join("/");
      const isLast = itemsBreadcrumb.length === index + 1;
      const label = realValues[item] || item;
      return (
        <BreadCrumbElement isLast={isLast} path={path} key={index}>
          {label}
        </BreadCrumbElement>
      );
    });
  }, [itemsBreadcrumb]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>{renderBreadCrumb()}</BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
