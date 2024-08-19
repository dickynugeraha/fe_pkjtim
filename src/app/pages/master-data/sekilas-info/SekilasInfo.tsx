import React, { useEffect, useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { dummyImage } from "../../../helper/helper";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalAddEditSekilasInfo from "./components/ModalAddEditSekilasInfo";
import useInfo from "../../../modules/hooks/master-data/info";
import useTempat from "../../../modules/hooks/master-data/tempat";
import Loading from "../../../../_metronic/layout/components/content/Loading";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Sekilas Info",
    path: "/master-data/sekilas-info",
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

export const SekilasInfo = () => {
  const [formFile, setFormFile] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    file: null,
    name: "",
    title: "",
    content: "",
    status: "",
    publishedAt: "",
    tempatId: "",
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
        name: "",
        title: "",
        content: "",
        status: "",
        publishedAt: "",
        tempatId: "",
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

  const { tempat } = useTempat();
  const { addInfo, deleteInfo, info, loading, searchInfo, updateInfo } =
    useInfo();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    searchInfo(debouncedQuery);
  }, [debouncedQuery]);

  console.log("infoooooo", info);

  const data = useMemo(
    () => info,
    [addInfo, updateInfo, deleteInfo, searchInfo]
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
        Header: "Judul Info",
        accessor: "title",
        sortType: "alphanumeric",
      },
      {
        Header: "Detail Info",
        accessor: "content",
        sortType: "alphanumeric",
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
          return <span className={className}>{singleData.status}</span>;
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
                      onClick={() => deleteInfo(singleData.id)}
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
        description="Sekilas Info"
      >
        Sekilas Info
      </PageTitle>
      <Content>
        <Table
          searchData={(val: string) => {
            setQuery(val);
          }}
          columns={columns}
          data={data}
          addData={() => openModal()}
        />
        <ModalAddEditSekilasInfo
          tempat={tempat}
          fromAdd={!isEdit}
          data={formData}
          fileValue={formFile}
          onChangeVal={(e: any) => handleChange(e)}
          onChangeFile={(e) => setFormFile(e)}
          show={isModalOpen}
          handleClose={closeModal}
          handleSubmit={() => {
            const formWithFile = { ...formData, file: formFile };
            console.log("formWithFile", formWithFile);

            if (isEdit) {
              updateInfo(formWithFile);
            } else {
              addInfo(formWithFile);
            }
            closeModal();
          }}
        />
      </Content>
    </>
  );
};
