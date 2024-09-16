import React, { useEffect, useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalAddEditKoleksiSeni from "./components/ModalAddEditKoleksiSeni";
import useSeni from "../../../modules/hooks/master-data/seni";
import Skeleton from "react-loading-skeleton";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Kontak Person",
    path: "/master-data/contact-person",
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

export const ContactPerson = () => {
  const {
    addSeni,
    deleteSeni,
    loading,
    searchSeni,
    seni,
    updateSeni,
    closeModal,
    formData,
    formFile,
    handleChange,
    isEdit,
    isModalOpen,
    openModal,
    setFormFile,
    setQuery,
  } = useSeni();

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
        Header: "Nama Seni",
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
                      onClick={() => deleteSeni(singleData.id)}
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
        description="Kontak Person"
      >
        Kontak Person
      </PageTitle>
      <Content>
        <Table
          loading={loading}
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
          }}
        />
      </Content>
    </>
  );
};
