import React, { useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { dummyImage } from "../../../helper/helper";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalAddEditPengguna from "./components/ModalAddEditPengguna";
import globalVar from "../../../helper/globalVar";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Pengguna",
    path: "/master-data/pengguna",
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

export const Pengguna = () => {
  const [modalAddlEdit, setModalAddEdit] = useState({
    fromAdd: false,
    show: false,
    data: {},
    role: "",
  });

  const data = useMemo(
    () => [
      {
        id: "1",
        nama_lengkap: "Kale Pramono",
        email: "kale@gmail.com",
        nomor_telepon: "0896226849841",
        role: "User",
        status: "Not Active",
      },
      {
        id: "2",
        nama_lengkap: "Kale Pramono",
        nomor_telepon: "0896226849841",
        email: "kale@gmail.com",
        role: "Kurator",
        status: "Requested",
      },
      {
        id: "3",
        nama_lengkap: "Kale Pramono",
        nomor_telepon: "0896226849841",
        email: "kale@gmail.com",
        role: "Pengelola",
        status: "Active",
      },
      {
        id: "4",
        nama_lengkap: "Kale Pramono",
        nomor_telepon: "0896226849841",
        email: "kale@gmail.com",
        role: "Kurator",
        status: "Active",
      },
      {
        id: "5",
        nama_lengkap: "Kale Pramono",
        nomor_telepon: "0896226849841",
        email: "kale@gmail.com",
        role: "User",
        status: "Requested",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Nama Lengkap",
        accessor: "nama_lengkap",
        sortType: "alphanumeric",
      },
      {
        Header: "Email",
        accessor: "email",
        sortType: "alphanumeric",
      },
      {
        Header: "Nomor Telepom",
        accessor: "nomor_telepon",
        sortType: "alphanumeric",
      },
      {
        Header: "Role",
        accessor: "role",
        sortType: "alphanumeric",
      },
      {
        Header: "Status",
        accessor: "status",
        sortType: "alphanumeric",
      },
      {
        Header: "Aksi",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          let actionButton = (
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
                          role: singleData.role,
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

          if (singleData.status === "Requested") {
            actionButton = (
              <div className="d-flex align-items-center">
                <div role="button">
                  <KTIcon
                    iconName="check-square"
                    className="fs-1 text-success me-3"
                  />
                </div>
                <div role="button">
                  <KTIcon
                    iconName="delete-folder"
                    className="fs-1 text-danger"
                  />
                </div>
              </div>
            );
          }

          return actionButton;
        },
      },
    ],
    []
  );

  return (
    <>
      <PageTitle icon="data" breadcrumbs={Breadcrumbs} description="Pengguna">
        Pengguna
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
              role: "",
            })
          }
        />
        <ModalAddEditPengguna
          show={modalAddlEdit.show}
          data={modalAddlEdit.data}
          fromAdd={modalAddlEdit.fromAdd}
          isRoleKurator={modalAddlEdit.role === "Kurator"}
          handleClose={() =>
            setModalAddEdit({
              fromAdd: false,
              show: false,
              data: {},
              role: "",
            })
          }
          handleSubmit={(data) => console.log(data)}
        />
      </Content>
    </>
  );
};
