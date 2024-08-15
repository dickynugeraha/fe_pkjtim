import React, { useMemo, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle, PageLink } from "../../../_metronic/layout/core/PageData";
import { Card } from "react-bootstrap";
import Table from "../../../_metronic/layout/components/table/Table";
import ModalDetailPesananMasuk from "./components/ModalDetailPesananMasuk";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Pesanan Masuk",
    path: "/pesanan-masuk",
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

export const PesananMasuk = () => {
  const [modalDetail, setModalDetail] = useState({
    show: false,
    data: {},
  });

  const data = useMemo(
    () => [
      {
        id: "1",
        tipe_tempat: "Kim Parrish",
        tanggal_pesan: "07/11/2020",
        tanggal_mulai_sewa: "07/07/2020",
        tanggal_akhir_sewa: "07/07/2020",
        total_pembayaran: "Rp. 1.000.000",
        status: "Proses",
      },
      {
        id: "2",
        tipe_tempat: "Michele Castillo",
        tanggal_pesan: "07/11/2020",
        tanggal_mulai_sewa: "07/07/2020",
        tanggal_akhir_sewa: "07/07/2020",
        total_pembayaran: "Rp. 1.000.000",
        status: "Menunggu Surat Jawaban",
      },
      {
        id: "3",
        tipe_tempat: "Eric Ferris",
        tanggal_pesan: "07/11/2020",
        tanggal_mulai_sewa: "07/07/2020",
        tanggal_akhir_sewa: "07/07/2020",
        total_pembayaran: "Rp. 1.000.000",
        status: "Selesai",
      },
      {
        id: "4",
        tipe_tempat: "Gloria Noble",
        tanggal_pesan: "07/11/2020",
        tanggal_mulai_sewa: "07/07/2020",
        tanggal_akhir_sewa: "07/07/2020",
        total_pembayaran: "Rp. 1.000.000",
        status: "Ditolak",
      },
      {
        id: "5",
        tipe_tempat: "Darren Daniels",
        tanggal_pesan: "07/11/2020",
        tanggal_mulai_sewa: "07/07/2020",
        tanggal_akhir_sewa: "07/07/2020",
        total_pembayaran: "Rp. 1.000.000",
        status: "Revisi",
      },
      {
        id: "6",
        tipe_tempat: "Ted McDonald",
        tanggal_pesan: "07/11/2020",
        tanggal_mulai_sewa: "07/07/2020",
        tanggal_akhir_sewa: "07/07/2020",
        status: "Selesai",
        total_pembayaran: "Rp. 1.000.000",
      },
    ],
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: "Tipe Tempat",
        accessor: "tipe_tempat",
        sortType: "alphanumeric",
      },
      {
        Header: "Tanggal Pesan",
        accessor: "tanggal_pesan",
        sortType: "alphanumeric",
      },
      {
        Header: "Tanggal Sewa",
        accessor: "tanggal_sewa",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <div style={{ width: "230px" }}>
              <span className="text-success bg-light-success rounded p-2">
                {singleData.tanggal_mulai_sewa}
              </span>
              <span> - </span>
              <span className="text-danger bg-light-danger rounded p-2">
                {singleData.tanggal_akhir_sewa}
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
          let statusClass = "";
          switch (singleData.status) {
            case "Selesai":
              statusClass = "bg-light-success text-success rounded p-2";
              break;
            case "Proses":
              statusClass = "bg-light-warning text-warning rounded p-2";
              break;
            case "Ditolak":
              statusClass = "bg-light-danger text-danger rounded p-2";
              break;
            case "Revisi":
              statusClass = "bg-light-danger text-danger rounded p-2";
              break;
            case "Menunggu Surat Jawaban":
              statusClass = "bg-light-success text-success rounded p-2";
              break;
          }

          return <span className={statusClass}>{singleData.status}</span>;
        },
      },
      {
        Header: "Total Pembayaran",
        accessor: "total_pembayaran",
        sortType: "alphanumeric",
      },
      {
        Header: "Aksi",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return (
            <button
              className={"btn btn-sm btn-primary"}
              style={{ minWidth: "120px" }}
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
        breadcrumbs={Breadcrumbs}
        icon="entrance-left"
        description="Pesanan Masuk"
      >
        Pesanan Masuk
      </PageTitle>
      <Content>
        <Table
          data={data}
          columns={columns}
          addData={() => {}}
          showAddButton={false}
        />
        <ModalDetailPesananMasuk
          show={modalDetail.show}
          data={modalDetail.data}
          handleClose={() => setModalDetail({ show: false, data: {} })}
        />
      </Content>
    </>
  );
};
