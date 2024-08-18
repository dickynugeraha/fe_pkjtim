import React, { useEffect, useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalAddEditTutupTempat from "./components/ModalAddEditTutupTempat";
import useTutupTempat from "../../../modules/hooks/master-data/tempat-tutup";
import Loading from "../../../../_metronic/layout/components/content/Loading";
import useTempat from "../../../modules/hooks/master-data/tempat";

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

export const TutupTempat = () => {
  const {
    addTutupTempat,
    deleteTutupTempat,
    fetchAllTutupTempat,
    loading,
    tutupTempat,
    updateTutupTempat,
  } = useTutupTempat();

  const { tempat } = useTempat();

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
    if (debouncedQuery) {
      fetchAllTutupTempat(debouncedQuery);
    }
  }, [debouncedQuery]);

  const data = useMemo(
    () => tutupTempat,
    [
      loading,
      addTutupTempat,
      updateTutupTempat,
      deleteTutupTempat,
      fetchAllTutupTempat,
    ]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Tipe Tempat",
        accessor: "tipe_tempat",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return <span>{singleData.tempat.name}</span>;
        },
      },
      {
        Header: "Tanggal Tutup",
        accessor: "tanggal_kunjungan",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return (
            <div>
              <span className="bg-light-success text-success rounded p-2">
                {new Date(singleData.startDate).toLocaleDateString()}
              </span>
              <span className="mx-3">-</span>
              <span className="bg-light-danger text-danger rounded p-2">
                {new Date(singleData.endDate).toLocaleDateString()}
              </span>
            </div>
          );
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
                      onClick={() => deleteTutupTempat(singleData.id)}
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
      <PageTitle
        icon="data"
        breadcrumbs={Breadcrumbs}
        description="Tutup Tempat"
      >
        Tutup Tempat
      </PageTitle>
      <Content>
        <Table
          searchData={(val: any) => {
            setQuery(val);
          }}
          columns={columns}
          data={data}
          addData={() => openModal()}
        />
        <ModalAddEditTutupTempat
          handleChange={(e) => handleChange(e)}
          tempat={tempat}
          show={isModalOpen}
          data={formData}
          fromAdd={!isEdit}
          handleClose={() => closeModal()}
          handleSubmit={() => {
            if (isEdit) {
              updateTutupTempat(formData);
            } else {
              addTutupTempat(formData);
            }
            closeModal();
          }}
        />
      </Content>
    </>
  );
};
