"use client";

import DashboardBreadcrumb from "@/components/dashboard/Breadcrumb";
import EbookForm from "../form";

const EbookCreate = () => {
  return (
    <>
      <DashboardBreadcrumb
        items={[
          {
            name: "Dashboard",
            link: "/dashboard",
          },
          {
            name: "Criar ebook",
          },
        ]}
      />
      <EbookForm isEdit={false} />;
    </>
  );
};

export default EbookCreate;
