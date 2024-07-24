import React, { useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { dummyImage } from "../../../helper/helper";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalAddEditTempat from "./components/ModalAddEditTempat";
import globalVar from "../../../helper/globalVar";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Tempat",
    path: "/master-data/tempat",
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

const Tempat = () => {
  const [modaAddlEdit, setModalAddEdit] = useState({
    fromAdd: false,
    show: false,
    data: {},
  });

  const data = useMemo(
    () => [
      {
        id: "1",
        nama_tempat: "Teater Besar",
        harga_main_event_kerja: globalVar.rupiahFormat(42000000),
        harga_main_event_weekend: globalVar.rupiahFormat(50000000),
        harga_pre_event_kerja: globalVar.rupiahFormat(21000000),
        harga_pre_event_weekend: globalVar.rupiahFormat(25000000),
      },
      {
        id: "2",
        nama_tempat: "Teater Besar",
        harga_main_event_kerja: globalVar.rupiahFormat(42000000),
        harga_main_event_weekend: globalVar.rupiahFormat(50000000),
        harga_pre_event_kerja: globalVar.rupiahFormat(21000000),
        harga_pre_event_weekend: globalVar.rupiahFormat(25000000),
      },
      {
        id: "3",
        nama_tempat: "Teater Besar",
        harga_main_event_kerja: globalVar.rupiahFormat(42000000),
        harga_main_event_weekend: globalVar.rupiahFormat(50000000),
        harga_pre_event_kerja: globalVar.rupiahFormat(21000000),
        harga_pre_event_weekend: globalVar.rupiahFormat(25000000),
      },
      {
        id: "4",
        nama_tempat: "Teater Besar",
        harga_main_event_kerja: globalVar.rupiahFormat(42000000),
        harga_main_event_weekend: globalVar.rupiahFormat(50000000),
        harga_pre_event_kerja: null,
        harga_pre_event_weekend: null,
      },
      {
        id: "5",
        nama_tempat: "Teater Besar",
        harga_main_event_kerja: globalVar.rupiahFormat(42000000),
        harga_main_event_weekend: globalVar.rupiahFormat(50000000),
        harga_pre_event_kerja: "",
        harga_pre_event_weekend: "",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Nama Tempat",
        accessor: "nama_tempat",
        sortType: "alphanumeric",
      },
      {
        Header: "Harga Main Event (Hari kerja)",
        accessor: "harga_main_event_kerja",
        sortType: "alphanumeric",
      },
      {
        Header: "Harga Main Event (Akhir pekan)",
        accessor: "harga_main_event_weekend",
        sortType: "alphanumeric",
      },
      {
        Header: "Harga Pre Event (Hari kerja)",
        accessor: "harga_pre_event_kerja",
        sortType: "alphanumeric",
      },
      {
        Header: "Harga Pre Event (Akhir pekan)",
        accessor: "harga_pre_event_weekend",
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
      <PageTitle icon="data" breadcrumbs={Breadcrumbs} description="Tempat">
        Tempat
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
        <ModalAddEditTempat
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

export default Tempat;
