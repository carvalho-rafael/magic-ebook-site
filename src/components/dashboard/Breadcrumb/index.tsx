import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

type DashboardBreadcrumbProps = {
  items: {
    name: string;
    link?: string;
  }[];
};

const DashboardBreadcrumb = ({ items }: DashboardBreadcrumbProps) => {
  return (
    <Breadcrumb className="[&_li]:list-none bg-gray-300">
      <BreadcrumbList>
        {items.map((item) =>
          item.link ? (
            <React.Fragment key={item.name}>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.link}>{item.name}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ) : (
            <BreadcrumbItem key={item.name}>
              <BreadcrumbPage>{item.name}</BreadcrumbPage>
            </BreadcrumbItem>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrumb;
