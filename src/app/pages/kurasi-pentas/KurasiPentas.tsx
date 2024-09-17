import React, { FC, useEffect, useMemo, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import Table from "../../../_metronic/layout/components/table/Table";
import ModalDetailKurasiPentas from "./components/ModalDetailKurasiPentas";
import usePesanTempat from "../../modules/hooks/pesan-tempat";
import globalVar from "../../helper/globalVar";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "kurasi Pentas",
    path: "/kurasi-pentas",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

export const KurasiPentas = () => {
  const { getAllReservationPesanTempat, loading, allReservationPesanTempat } =
    usePesanTempat();

  useEffect(() => {
    getAllReservationPesanTempat(false, true);
  }, []);

  const [modalDetail, setModalDetail] = useState({
    show: false,
    data: {},
  });

  const data = useMemo(() => allReservationPesanTempat, [loading]);
  const columns = useMemo(
    () => [
      {
        Header: "Tipe Tempat",
        accessor: "tipe_tempat",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return <>{singleData.tempat.name}</>;
        },
      },
      {
        Header: "Nama Sanggar",
        accessor: "namaSanggar",
        sortType: "alphanumeric",
      },
      {
        Header: "Judul Pentas",
        accessor: "judulPentas",
        sortType: "alphanumeric",
      },
      {
        Header: "Tanggal Sewa",
        accessor: "tanggal_kunjungan",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return (
            <div style={{ width: "230px" }}>
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
        Header: "Status",
        accessor: "status",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return <span className="badge badge-light-warning fs-6">Kurasi</span>;
        },
      },
      {
        Header: "Aksi",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return (
            <button
              className={"btn btn-sm btn-primary"}
              onClick={() => {
                setModalDetail({
                  show: true,
                  data: singleData,
                });
              }}
            >
              Detail
            </button>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <PageTitle
        icon="book"
        breadcrumbs={Breadcrumbs}
        description="Kursi Pentas"
      >
        Kurasi Pentas
      </PageTitle>

      <Content>
        <Table
          loading={loading}
          searchData={() => {}}
          data={data}
          columns={columns}
          addData={() => {}}
          showAddButton={false}
        />
        <ModalDetailKurasiPentas
          show={modalDetail.show}
          handleClose={() => setModalDetail({ data: {}, show: false })}
          data={modalDetail.data}
        />
      </Content>
    </>
  );
};
