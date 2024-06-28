import HeadPage from "../../modules/widgets/components/HeadPage";
import { Content } from "../../../_metronic/layout/components/content";
import GenerateQR from "../../../_metronic/layout/components/content/GenerateQR";
import { PageLink, PageTitle } from "../../../_metronic/layout/core/PageData";
import Table from "../../../_metronic/layout/components/table/Table";
import { useIntl } from "react-intl";
import { FC } from "react";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar/ToolbarWrapper";
import { KTIcon } from "../../../_metronic/helpers";
import { Breadcrumb } from "react-bootstrap";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Pesanan Saya",
    path: "/pesanan-saya",
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

const PesananSaya: FC = () => {
  return (
    <>
      <PageTitle
        icon="shop"
        breadcrumbs={Breadcrumbs}
        description="Daftar pesanan saya"
      >
        Daftar Pesanan Saya
      </PageTitle>
      <Content>
        <Table />
      </Content>
    </>
  );
};

export default PesananSaya;
