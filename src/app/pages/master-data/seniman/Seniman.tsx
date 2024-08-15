import React, { useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { KTIcon } from "../../../../_metronic/helpers";
import { dummyImage } from "../../../helper/helper";
import ModalAddEditSeniman from "./components/ModalAddEditSeniman";
import useSeniman from "../../../modules/hooks/master-data/seniman";
import Loading from "../../../../_metronic/layout/components/content/Loading";
import ModalAddSeniman from "./components/ModalAddSeniman";
import ModalEditSeniman from "./components/ModalEditSeniman";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Seniman",
    path: "/master-data/seniman",
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

export const Seniman = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formFile, setFormFile] = useState();
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    biografi: "",
    performanceDesc: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const openModal = (data = null) => {
    if (data) {
      setFormData(data);
      setIsEdit(true);
    } else {
      setFormData({ id: null, name: "", biografi: "", performanceDesc: "" });
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

  const { addSeniman, seniman, loading, updateSeniman, deleteSeniman } =
    useSeniman();

  const data = useMemo(
    () => seniman,
    [loading, updateSeniman, addSeniman, deleteSeniman]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Gambar",
        accessor: "file",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <div style={{ width: "150px" }}>
              <img
                src={dummyImage}
                className="rounded"
                style={{ width: "100%" }}
              />
            </div>
          );
        },
      },
      {
        Header: "Nama Seniman",
        sortType: "alphanumeric",
        accessor: "name",
      },
      {
        Header: "Deskripsi",
        sortType: "alphanumeric",
        accessor: "performanceDesc",
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
                      onClick={() => openModal(singleData)}
                    >
                      <KTIcon iconName="pencil" className="me-3 fs-3" />
                      <p className="m-0">Ubah</p>
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      onClick={() => {
                        deleteSeniman(singleData.id);
                      }}
                    >
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
      {loading && <Loading />}
      <PageTitle icon="data" breadcrumbs={Breadcrumbs} description="Seniman">
        Seniman
      </PageTitle>
      <Content>
        <Table columns={columns} data={data} addData={() => openModal()} />
        <ModalAddEditSeniman
          fromAdd={!isEdit}
          data={formData}
          onchangeVal={(e: any) => handleChange(e)}
          onChangeFile={(e) => setFormFile(e)}
          show={isModalOpen}
          handleClose={closeModal}
          handleSubmit={() => {
            const formWithFile = { ...formData, file: formFile };
            console.log("formData", formWithFile);

            if (isEdit) {
              updateSeniman(formWithFile);
            } else {
              addSeniman(formWithFile);
            }
            closeModal();
          }}
        />
      </Content>
    </>
  );
};
