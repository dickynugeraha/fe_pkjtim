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
import globalVar from "../../../helper/globalVar";

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
    closeModal,
    handleChange,
    isEdit,
    isModalOpen,
    openModal,
    setQuery,
    formData,
  } = useTutupTempat();
  const { tempat } = useTempat();

  const data = useMemo(
    () => tutupTempat,
    [addTutupTempat, updateTutupTempat, deleteTutupTempat, fetchAllTutupTempat]
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
              <span className="badge badge-light-success fs-6">
                {globalVar.formatDate(singleData.startDate)}
              </span>
              <span className="mx-3">-</span>
              <span className="badge badge-light-danger fs-6">
                {globalVar.formatDate(singleData.endDate)}
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
        description="Tutup Tempat"
      >
        Tutup Tempat
      </PageTitle>
      <Content>
        <Table
          loading={loading}
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
          }}
        />
      </Content>
    </>
  );
};
