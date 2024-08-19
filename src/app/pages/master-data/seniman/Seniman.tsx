import React, { useEffect, useMemo, useState } from "react";
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
  const [formFile, setFormFile] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    file: null,
    name: "",
    biografi: "",
    performanceDesc: "",
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
        id: null,
        name: "",
        biografi: "",
        performanceDesc: "",
        file: null,
      });
      setIsEdit(false);
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setFormFile(null);
  };
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    addSeniman,
    seniman,
    loading,
    updateSeniman,
    deleteSeniman,
    searchSeniman,
  } = useSeniman();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    searchSeniman(debouncedQuery);
  }, [debouncedQuery]);

  const data = useMemo(
    () => seniman,
    [loading, updateSeniman, addSeniman, deleteSeniman, searchSeniman]
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
                src={singleData.file}
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
        <Table
          columns={columns}
          data={data}
          addData={() => openModal()}
          searchData={(val: any) => {
            setQuery(val);
          }}
        />
        <ModalAddEditSeniman
          fromAdd={!isEdit}
          data={formData}
          fileValue={formFile}
          onchangeVal={(e: any) => handleChange(e)}
          onChangeFile={(e) => setFormFile(e)}
          show={isModalOpen}
          handleClose={closeModal}
          handleSubmit={() => {
            const formWithFile = { ...formData, file: formFile };
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
