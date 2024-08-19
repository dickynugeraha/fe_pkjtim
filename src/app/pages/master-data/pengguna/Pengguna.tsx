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
import Loading from "../../../../_metronic/layout/components/content/Loading";

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

  const {
    addPengguna,
    deletePengguna,
    fetchAllPengguna,
    loading,
    pengguna,
    updatePengguna,
    approveRequestRegisterFromAdmin,
  } = usePengguna();

  const [formData, setFormData] = useState({
    tempatId: null,
    startDate: null,
    endDate: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const openModal = (data = null) => {
    if (data) {
      setFormData(data);
      setIsEdit(true);
    } else {
      setFormData({
        tempatId: null,
        startDate: null,
        endDate: null,
      });
      setIsEdit(false);
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    fetchAllPengguna(debouncedQuery);
  }, [debouncedQuery]);

  const data = useMemo(
    () => pengguna,
    [updatePengguna, addPengguna, deletePengguna, fetchAllPengguna]
  );

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
        Header: "Nomor Telepom",
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
                      <KTIcon iconName="trash-square" className="me-3 fs-3" />
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
      {loading && <Loading />}
      <PageTitle icon="data" breadcrumbs={Breadcrumbs} description="Pengguna">
        Pengguna
      </PageTitle>
      <Content>
        <Table
          searchData={(val: string) => setQuery(val)}
          columns={columns}
          data={data}
          addData={() => openModal()}
        />
        <ModalAddEditPengguna
          handleChange={(e) => handleChange(e)}
          show={isModalOpen}
          data={formData}
          fromAdd={!isEdit}
          isRoleKurator={modalAddlEdit.role === "Kurator"}
          handleClose={() => closeModal()}
          handleSubmit={() => {
            if (isEdit) {
              updatePengguna(formData);
            } else {
              addPengguna(formData);
            }
            closeModal();
          }}
        />
      </Content>
    </>
  );
};
