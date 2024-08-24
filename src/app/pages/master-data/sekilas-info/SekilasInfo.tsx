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
import Skeleton from "react-loading-skeleton";

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
  const { tempat } = useTempat();
  const {
    addInfo,
    deleteInfo,
    info,
    loading,
    searchInfo,
    updateInfo,
    closeModal,
    formData,
    formFile,
    handleChange,
    isEdit,
    isModalOpen,
    openModal,
    setFormFile,
    setQuery,
  } = useInfo();

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
      <PageTitle
        icon="data"
        breadcrumbs={Breadcrumbs}
        description="Sekilas Info"
      >
        Sekilas Info
      </PageTitle>
      <Content>
        <Table
          loading={loading}
          searchData={(val: string) => setQuery(val)}
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

            if (isEdit) {
              updateInfo(formWithFile);
            } else {
              addInfo(formWithFile);
            }
          }}
        />
      </Content>
    </>
  );
};
