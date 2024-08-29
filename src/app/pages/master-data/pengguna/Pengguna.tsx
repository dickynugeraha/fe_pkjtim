import React, { useEffect, useMemo, useState } from "react";
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
import usePengguna from "../../../modules/hooks/master-data/pengguna";

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
  const {
    addPengguna,
    deletePengguna,
    fetchAllPengguna,
    loading,
    pengguna,
    updatePengguna,
    approveRequestRegisterFromAdmin,
    closeModal,
    formData,
    handleChange,
    isEdit,
    isLockedCheck,
    isModalOpen,
    openModal,
    setIsLockedCheck,
    setQuery,
  } = usePengguna();

  const data = useMemo(
    () => pengguna,
    [updatePengguna, addPengguna, deletePengguna, fetchAllPengguna]
  );

  useEffect(() => {
    fetchAllPengguna();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Nama Lengkap",
        accessor: "fullName",
        sortType: "alphanumeric",
      },
      {
        Header: "Email",
        accessor: "email",
        sortType: "alphanumeric",
      },
      {
        Header: "Nomor Telepon",
        accessor: "phoneNumber",
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
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          let className = "";
          let title = "";

          if (singleData.status === "ACTIVE") {
            className = "badge badge-light-success fs-6";
            title = "Aktif";
          } else if (singleData.status === "REQUEST") {
            className = "badge badge-light-warning fs-6";
            title = "Request";
          } else {
            className = "badge badge-light-success fs-6";
            title = "Tidak aktif";
          }

          return <span className={className}>{title}</span>;
        },
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
                      onClick={() => openModal(singleData)}
                    >
                      <KTIcon iconName="pencil" className="me-3 fs-3" />
                      <p className="m-0">Ubah</p>
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      onClick={() => deletePengguna(singleData.id)}
                    >
                      <KTIcon iconName="trash" className="me-3 fs-3" />
                      <p className="m-0">Hapus</p>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          );

          if (singleData.status === "REQUEST") {
            actionButton = (
              <div className="d-flex align-items-center">
                <div
                  role="button"
                  onClick={() => approveRequestRegisterFromAdmin(singleData.id)}
                >
                  <KTIcon
                    iconName="check-square"
                    className="fs-1 text-success me-3"
                  />
                </div>
                <div
                  role="button"
                  onClick={() => deletePengguna(singleData.id)}
                >
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
          loading={loading}
          searchData={(val: string) => setQuery(val)}
          columns={columns}
          data={data}
          addData={() => openModal()}
        />
        <ModalAddEditPengguna
          isLockedCheck={isLockedCheck}
          handleIsCheckLocked={() => setIsLockedCheck(!isLockedCheck)}
          handleChange={(e) => handleChange(e)}
          show={isModalOpen}
          data={formData}
          fromAdd={!isEdit}
          handleClose={() => closeModal()}
          handleSubmit={() => {
            const formWithLocked = { ...formData, isLocked: isLockedCheck };
            if (isEdit) {
              updatePengguna(formWithLocked);
            } else {
              addPengguna(formWithLocked);
            }
          }}
        />
      </Content>
    </>
  );
};
