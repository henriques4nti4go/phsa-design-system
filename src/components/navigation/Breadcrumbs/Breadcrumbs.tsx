import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb";
import { Icon } from "../../dataDisplay";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

export type BreadcrumbsProps = {
  data: {
    href: string;
    label: string;
  }[];
  isAutoGenerate?: boolean;
};

export function Breadcrumbs({
  data,
  isAutoGenerate = false,
}: BreadcrumbsProps) {
  const pathname = usePathname();
  const breadCrumData = useMemo(() => {
    if (isAutoGenerate) {
      const path = pathname.split("/").map((item) => ({
        href: item,
        label: item,
      }));
      return path.map((item) => {
        return {
          href: item.href,
          label: item.label,
        };
      });
    }
    return data;
  }, [data, isAutoGenerate, pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumData?.map((item, index) => {
          const isLast = index === data.length - 1;
          if (isLast) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }
          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              <BreadcrumbSeparator>
                <Icon name="BsSlashLg" />
              </BreadcrumbSeparator>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
