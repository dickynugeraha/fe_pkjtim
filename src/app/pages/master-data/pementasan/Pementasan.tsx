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
import useTempat from "../../../modules/hooks/master-data/tempat";
import Skeleton from "react-loading-skeleton";

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
  const {
    addPementasan,
    deletePementasan,
    pementasan,
    searchPementasan,
    updatePementasan,
    loading,
    closeModal,
    formData,
    formFile,
    handleChange,
    isEdit,
    isModalOpen,
    openModal,
    setFormFile,
    setQuery,
  } = usePentas();

  const { tempat } = useTempat();

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
          const [loading, setLoading] = useState(true);
          let singleData = props.cell.row.original;

          const handleImageLoad = () => {
            setLoading(false);
          };

          let content = <Skeleton height={80} width={150} />;
          setTimeout(() => {
            setLoading(false);
          }, 1000);

          if (!loading) {
            content = (
              <div style={{ width: "150px" }}>
                <img
                  src={singleData.file}
                  className="rounded"
                  style={{ width: "100%" }}
                  onLoad={handleImageLoad}
                />
              </div>
            );
          }

          return content;
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
        Header: "Status",
        accessor: "status",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          let className = "",
            title = "";
          switch (singleData.status) {
            case "DRAFT":
              className = "badge badge-light-danger fs-6";
              title = "Draft";
              break;
            case "PUBLISHED":
              className = "badge badge-light-success fs-6";
              title = "Terbit";
              break;
          }
          return <span className={className}>{title}</span>;
        },
      },

      {
        Header: "Aksi",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <>
              <div className="input-group">
                <button
                  className="btn btn-sm btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Aksi
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
                      <KTIcon iconName="trash" className="me-3 fs-3" />
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
      <PageTitle icon="data" breadcrumbs={Breadcrumbs} description="Pementasan">
        Pementasan
      </PageTitle>
      <Content>
        <Table
          loading={loading}
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
          }}
        />
      </Content>
    </>
  );
};
