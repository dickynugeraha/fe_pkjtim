import React, { useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { dummyImage } from "../../../helper/helper";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalAddEditSekilasInfo from "./components/ModalAddEditSekilasInfo";
import { useInfo } from "../../../modules/hooks/master-data/info";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Sekilas Info",
    path: "/master-data/sekilas-info",
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

export const SekilasInfo = () => {
  const [modaAddlEdit, setModalAddEdit] = useState({
    fromAdd: false,
    show: false,
    data: {},
  });

  const { info } = useInfo();
  console.log("infoooooo", info);

  const data = useMemo(
    () => [
      {
        id: "1",
        gambar: { dummyImage },
        judul_info: "Kim Parrish",
        detail_info: "4420 Valley Street, Garnerville, NY 10923",
        status: "Terbit",
      },
      {
        id: "2",
        gambar: { dummyImage },
        judul_info: "Michele Castillo",
        detail_info: "637 Kyle Street, Fullerton, NE 68638",
        status: "Draft",
      },
      {
        id: "3",
        gambar: { dummyImage },
        judul_info: "Eric Ferris",
        detail_info: "906 Hart Country Lane, Toccoa, GA 30577",
        status: "Terbit",
      },
      {
        id: "4",
        gambar: { dummyImage },
        judul_info: "Gloria Noble",
        detail_info: "2403 Edgewood Avenue, Fresno, CA 93721",
        status: "Terbit",
      },
      {
        id: "5",
        gambar: { dummyImage },
        judul_info: "Darren Daniels",
        detail_info: "882 Hide A Way Road, Anaktuvuk Pass, AK 99721",
        status: "Draft",
      },
      {
        id: "6",
        gambar: { dummyImage },
        judul_info: "Ted McDonald",
        detail_info: "796 Bryan Avenue, Minneapolis, MN 55406",
        status: "Terbit",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Gambar",
        accessor: "gambar",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <div style={{ width: "150px" }}>
              <img
                src={singleData.gambar.dummyImage}
                className="rounded"
                style={{ width: "100%" }}
              />
            </div>
          );
        },
      },
      {
        Header: "Judul Info",
        accessor: "judul_info",
        sortType: "alphanumeric",
      },
      {
        Header: "Detail Info",
        accessor: "detail_info",
        sortType: "alphanumeric",
      },
      {
        Header: "Status",
        accessor: "status",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          const className =
            singleData.status === "Draft"
              ? "m-0 text-danger bg-light-danger text-center rounded p-2"
              : "m-0 text-success bg-light-success text-center rounded p-2";
          return <span className={className}>{singleData.status}</span>;
        },
      },

      {
        Header: "Aksi",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <>
              <div className="input-group mb-3">
                <button
                  className="btn btn-sm btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Pilih
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      onClick={() =>
                        setModalAddEdit({
                          show: true,
                          data: singleData,
                          fromAdd: false,
                        })
                      }
                    >
                      <KTIcon iconName="pencil" className="me-3 fs-3" />
                      <p className="m-0">Ubah</p>
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item d-flex align-items-center">
                      <KTIcon iconName="trash-square" className="me-3 fs-3" />
                      <p className="m-0">Hapus</p>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <PageTitle
        icon="data"
        breadcrumbs={Breadcrumbs}
        description="Sekilas Info"
      >
        Sekilas Info
      </PageTitle>
      <Content>
        <Table
          columns={columns}
          data={data}
          addData={() =>
            setModalAddEdit({
              show: true,
              data: {},
              fromAdd: true,
            })
          }
        />
        <ModalAddEditSekilasInfo
          show={modaAddlEdit.show}
          data={modaAddlEdit.data}
          fromAdd={modaAddlEdit.fromAdd}
          handleClose={() =>
            setModalAddEdit({
              fromAdd: false,
              show: false,
              data: {},
            })
          }
          handleSubmit={(data) => console.log(data)}
        />
      </Content>
    </>
  );
};
