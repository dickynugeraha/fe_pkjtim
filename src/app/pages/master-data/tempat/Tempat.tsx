import React, { useEffect, useMemo, useState } from "react";
import {
  PageTitle,
  PageLink,
} from "../../../../_metronic/layout/core/PageData";
import { Content } from "../../../../_metronic/layout/components/content";
import Table from "../../../../_metronic/layout/components/table/Table";
import { KTIcon } from "../../../../_metronic/helpers";
import ModalAddEditTempat from "./components/ModalAddEditTempat";
import globalVar from "../../../helper/globalVar";
import useTempat from "../../../modules/hooks/master-data/tempat";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Tempat",
    path: "/master-data/tempat",
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

export const Tempat = () => {
  const {
    loading,
    tempat,
    addTempat,
    deleteTempat,
    fetchAllTempat,
    updateTempat,
    closeModal,
    formData,
    handleChange,
    isEdit,
    isModalOpen,
    isPreEvent,
    openModal,
    setIsPreEvent,
    setQuery,
  } = useTempat();

  useEffect(() => {
    fetchAllTempat();
  }, []);

  const data = useMemo(
    () => tempat,
    [loading, addTempat, updateTempat, deleteTempat, fetchAllTempat]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Nama Tempat",
        accessor: "name",
        sortType: "alphanumeric",
      },
      {
        Header: "Harga Main Event (Hari kerja)",
        accessor: "priceMainEventWeekDay",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <span>
              {globalVar.formatRupiah(singleData.priceMainEventWeekDay)}
            </span>
          );
        },
      },
      {
        Header: "Harga Main Event (Akhir pekan)",
        accessor: "priceMainEventWeekEnd",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <span>
              {globalVar.formatRupiah(singleData.priceMainEventWeekEnd)}
            </span>
          );
        },
      },
      {
        Header: "Harga Pre Event (Hari kerja)",
        accessor: "pricePreEventWeekDay",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <span>
              {globalVar.formatRupiah(singleData.pricePreEventWeekDay)}
            </span>
          );
        },
      },
      {
        Header: "Harga Pre Event (Akhir pekan)",
        accessor: "pricePreEventWeekEnd",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <span>
              {globalVar.formatRupiah(singleData.pricePreEventWeekEnd)}
            </span>
          );
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
                      onClick={() => {
                        openModal(singleData);
                        setIsPreEvent(singleData.pricePreEventWeekEnd !== 0);
                      }}
                    >
                      <KTIcon iconName="pencil" className="me-3 fs-3" />
                      <p className="m-0">Ubah</p>
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      onClick={() => deleteTempat(singleData.id)}
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
      <PageTitle icon="data" breadcrumbs={Breadcrumbs} description="Tempat">
        Tempat
      </PageTitle>
      <Content>
        <Table
          loading={loading}
          searchData={(val: string) => {
            setQuery(val);
          }}
          columns={columns}
          data={data}
          addData={() => openModal()}
        />
        <ModalAddEditTempat
          isPreEvent={isPreEvent}
          setIsPreEvent={() => setIsPreEvent(!isPreEvent)}
          show={isModalOpen}
          data={formData}
          handleChange={(e: any) => handleChange(e)}
          fromAdd={!isEdit}
          handleClose={closeModal}
          handleSubmit={() => {
            if (isEdit) {
              updateTempat(formData);
            } else {
              addTempat(formData);
            }
          }}
        />
      </Content>
    </>
  );
};
