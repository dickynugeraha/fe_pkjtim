import { Content } from "../../../_metronic/layout/components/content";
import { PageLink, PageTitle } from "../../../_metronic/layout/core/PageData";
import { FC, useState } from "react";
import ModalDetailPesanan from "./components/ModalPesananTempat";
import TablePlanetarium from "./components/TablePlanetarium";
import ModalDetailPesananPlanetarium from "../pesanan-planetarium/components/ModalDetailPesananPlanetarium";
import TablePesanTempat from "./components/TablePesanTempat";

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

export const PesananSaya: FC = () => {
  const [modalDetail, setModalDetail] = useState({
    show: false,
    data: {},
  });

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
        <TablePlanetarium
          showModalPlanetarium={(val) =>
            setModalDetail({
              show: val.show,
              data: val.data,
            })
          }
        />
        <TablePesanTempat
          showModalPlanetarium={(val) =>
            setModalDetail({
              show: val.show,
              data: val.data,
            })
          }
        />
        <ModalDetailPesananPlanetarium
          data={modalDetail.data}
          show={modalDetail.show}
          handleClose={() => {
            setModalDetail({ ...modalDetail, show: false });
          }}
        />
      </Content>
    </>
  );
};
