import { Content } from "../../../_metronic/layout/components/content";
import { PageLink, PageTitle } from "../../../_metronic/layout/core/PageData";
import { FC, useState } from "react";
import TablePlanetarium from "./components/TablePlanetarium";
import ModalDetailPesananPlanetarium from "../pesanan-planetarium/components/ModalDetailPesananPlanetarium";
import TablePesanTempat from "./components/TablePesanTempat";
import ModalDetailPesananTempat from "./components/ModalDetailPesananTempat";

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
  const [modalDetailPlanet, setModalDetailPlanet] = useState({
    show: false,
    data: {},
  });
  const [modalDetailTempat, setModalDetailTempat] = useState({
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
        <TablePesanTempat
          showModalPlanetarium={(val) =>
            setModalDetailTempat({
              show: val.show,
              data: val.data,
            })
          }
        />
        <TablePlanetarium
          showModalPlanetarium={(val) =>
            setModalDetailPlanet({
              show: val.show,
              data: val.data,
            })
          }
        />
          <ModalDetailPesananTempat
            data={modalDetailTempat.data}
            show={modalDetailTempat.show}
            handleClose={() => {
              setModalDetailTempat({ ...modalDetailTempat, show: false });
            }}
          />
        <ModalDetailPesananPlanetarium
          data={modalDetailPlanet.data}
          show={modalDetailPlanet.show}
          handleClose={() => {
            setModalDetailPlanet({ ...modalDetailPlanet, show: false });
          }}
        />
      </Content>
    </>
  );
};
