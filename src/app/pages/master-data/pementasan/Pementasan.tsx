import React, { useEffect, useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalAddEditPementasan from "./components/ModalAddEditPementasan";
import usePentas from "../../../modules/hooks/master-data/pentas";
import Loading from "../../../../_metronic/layout/components/content/Loading";
import useTempat from "../../../modules/hooks/master-data/tempat";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Pementasan",
    path: "/master-data/pementasan",
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

export const Pementasan = () => {
  const [formFile, setFormFile] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    file: null,
    tempatId: "",
    title: "",
    sinopsis: "",
    namaSanggar: "",
    status: "",
    tipeSanggar: "",
    jumlahPelakuSeni: "",
    jumlahPekerjaSeni: "",
    jumlahPenonton: "",
    startDate: "",
    endDate: "",
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
        file: null,
        tempatId: "",
        title: "",
        sinopsis: "",
        namaSanggar: "",
        status: "",
        tipeSanggar: "",
        jumlahPelakuSeni: "",
        jumlahPekerjaSeni: "",
        jumlahPenonton: "",
        startDate: "",
        endDate: "",
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
    addPementasan,
    deletePementasan,
    pementasan,
    searchPementasan,
    updatePementasan,
    loading,
  } = usePentas();

  const { tempat } = useTempat();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    searchPementasan(debouncedQuery);
  }, [debouncedQuery]);

  const data = useMemo(
    () => pementasan,
    [addPementasan, updatePementasan, deletePementasan, searchPementasan]
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
                src={singleData.file}
                className="rounded"
                style={{ width: "100%" }}
              />
            </div>
          );
        },
      },
      {
        Header: "Nama Sanggar",
        sortType: "alphanumeric",
        accessor: "namaSanggar",
      },
      {
        Header: "Judul",
        sortType: "alphanumeric",
        accessor: "title",
      },
      {
        Header: "Sinopsis",
        sortType: "alphanumeric",
        accessor: "sinopsis",
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
          return <p className={className}>{singleData.status}</p>;
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
                      onClick={() => openModal(singleData)}
                    >
                      <KTIcon iconName="pencil" className="me-3 fs-3" />
                      <p className="m-0">Ubah</p>
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      onClick={() => deletePementasan(singleData.id)}
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
      <PageTitle icon="data" breadcrumbs={Breadcrumbs} description="Pementasan">
        Pementasan
      </PageTitle>
      <Content>
        <Table
          searchData={(val: string) => setQuery(val)}
          columns={columns}
          data={data}
          addData={() => openModal()}
        />
        <ModalAddEditPementasan
          show={isModalOpen}
          data={formData}
          fromAdd={!isEdit}
          tempat={tempat}
          fileValue={formFile}
          onChangeVal={(e: any) => handleChange(e)}
          onChangeFile={(e) => setFormFile(e)}
          handleClose={() => closeModal()}
          handleSubmit={() => {
            const formWithFile = { ...formData, file: formFile };
            if (isEdit) {
              updatePementasan(formWithFile);
            } else {
              addPementasan(formWithFile);
            }
            closeModal();
          }}
        />
      </Content>
    </>
  );
};
