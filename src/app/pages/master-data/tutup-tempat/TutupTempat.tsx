import React, { useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { dummyImage } from "../../../helper/helper";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalAddEditTutupTempat from "./components/ModalAddEditTutupTempat";
import globalVar from "../../../helper/globalVar";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Tutup Tempat",
    path: "/master-data/tutup-tempat",
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

const TutupTempat = () => {
  const [modaAddlEdit, setModalAddEdit] = useState({
    fromAdd: false,
    show: false,
    data: {},
  });

  const data = useMemo(
    () => [
      {
        id: "1",
        tipe_tempat: "Teater Besar",
        tanggal_kunjungan: "11-10-2024 - 12-10-2024",
      },
      {
        id: "2",
        tipe_tempat: "Teater Besar",
        tanggal_kunjungan: "11-10-2024 - 12-10-2024",
      },
      {
        id: "3",
        tipe_tempat: "Teater Besar",
        tanggal_kunjungan: "11-10-2024 - 12-10-2024",
      },
      {
        id: "4",
        tipe_tempat: "Teater Besar",
        tanggal_kunjungan: "11-10-2024 - 12-10-2024",
      },
      {
        id: "5",
        tipe_tempat: "Teater Besar",
        tanggal_kunjungan: "11-10-2024 - 12-10-2024",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Tipe Tempat",
        accessor: "tipe_tempat",
        sortType: "alphanumeric",
      },
      {
        Header: "Tanggal Tutup",
        accessor: "tanggal_kunjungan",
        sortType: "alphanumeric",
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
        description="Tutup Tempat"
      >
        Tutup Tempat
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
        <ModalAddEditTutupTempat
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

export default TutupTempat;
