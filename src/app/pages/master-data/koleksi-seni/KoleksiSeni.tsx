import React, { useEffect, useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { KTIcon } from "../../../../_metronic/helpers";
import { dummyImage } from "../../../helper/helper";
import ModalAddEditKoleksiSeni from "./components/ModalAddEditKoleksiSeni";
import useSeni from "../../../modules/hooks/master-data/seni";
import Loading from "../../../../_metronic/layout/components/content/Loading";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Koleksi Seni",
    path: "/master-data/koleksi-seni",
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

export const KoleksiSeni = () => {
  const { addSeni, deleteSeni, loading, searchSeni, seni, updateSeni } =
    useSeni();
  const [formFile, setFormFile] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    file: null,
    title: "",
    desc: "",
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
        title: "",
        desc: "",
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

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    searchSeni(debouncedQuery);
  }, [debouncedQuery]);

  const data = useMemo(
    () => seni,
    [loading, addSeni, updateSeni, deleteSeni, searchSeni]
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
        Header: "Nama Seniman",
        sortType: "alphanumeric",
        accessor: "title",
      },
      {
        Header: "Detail Seni",
        sortType: "alphanumeric",
        accessor: "desc",
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
                      onClick={() => deleteSeni(singleData.id)}
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
        description="Koleksi Seni"
      >
        Koleksi Seni
      </PageTitle>
      <Content>
        <Table
          searchData={(val: string) => setQuery(val)}
          columns={columns}
          data={data}
          addData={() => openModal()}
        />
        <ModalAddEditKoleksiSeni
          fileValue={formFile}
          handleChangeFile={(e: any) => setFormFile(e)}
          handleChangeVal={(e: any) => handleChange(e)}
          show={isModalOpen}
          data={formData}
          fromAdd={!isEdit}
          handleClose={() => closeModal()}
          handleSubmit={() => {
            const formWithFile = { ...formData, file: formFile };
            if (isEdit) {
              updateSeni(formWithFile);
            } else {
              addSeni(formWithFile);
            }
            closeModal();
          }}
        />
      </Content>
    </>
  );
};
