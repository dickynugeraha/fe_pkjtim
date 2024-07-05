import { FC } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Dashboard",
    path: "/dashboard/kalender",
    isSeparator: false,
    isActive: true,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: true,
  },
];

const DashboardKalender: FC = () => {
  return (
    <>
      <PageTitle
        icon="calendar"
        breadcrumbs={Breadcrumbs}
        description="Kalender"
      >
        Kalender
      </PageTitle>
      <Content></Content>
    </>
  );
};

export { DashboardKalender };
