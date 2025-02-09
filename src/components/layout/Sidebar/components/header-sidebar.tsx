"use client";
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
import { useSidebar } from "../provider";

interface BreadcrumbItemProps {
  isLast?: boolean;
  path: string;
  label: string;
}

const routeMap: Record<string, string> = {
  dashboard: "Dashboard",
  users: "Usuários",
  documents: "Documentos",
  settings: "Configurações",
  create: "Criar",
  edit: "Editar",
  profile: "Perfil",
  analytics: "Análises",
  reports: "Relatórios",
};

const BreadcrumbElement = ({ isLast, path, label }: BreadcrumbItemProps) => {
  if (isLast) {
    return (
      <BreadcrumbItem>
        <BreadcrumbPage className="capitalize">{label}</BreadcrumbPage>
      </BreadcrumbItem>
    );
  }

  return (
    <BreadcrumbItem>
      <BreadcrumbLink href={path} className="capitalize">
        {label}
      </BreadcrumbLink>
      <BreadcrumbSeparator />
    </BreadcrumbItem>
  );
};

export const HeaderSidebar = () => {
  const { currentPath } = useSidebar();

  const breadcrumbItems = currentPath
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => {
      const path = `/${array.slice(0, index + 1).join("/")}`;
      const isLast = index === array.length - 1;
      const label = routeMap[segment] || segment;

      return {
        path,
        label,
        isLast,
      };
    });

  return (
    <header className="flex h-16 shrink-0 items-center border-b border-border bg-background px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-2 h-9 w-9" />
        <Separator orientation="vertical" className="h-6" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="capitalize">
                Home
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            {breadcrumbItems.map((item) => (
              <BreadcrumbElement key={item.path} {...item} />
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
