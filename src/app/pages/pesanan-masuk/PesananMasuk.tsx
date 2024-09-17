import React, { useEffect, useMemo, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle, PageLink } from "../../../_metronic/layout/core/PageData";
import { Card } from "react-bootstrap";
import Table from "../../../_metronic/layout/components/table/Table";
import ModalDetailPesananMasuk from "./components/ModalDetailPesananMasuk";
import usePesanTempat from "../../modules/hooks/pesan-tempat";
import globalVar from "../../helper/globalVar";

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
  const { getAllReservationPesanTempat, loading, allReservationPesanTempat } =
    usePesanTempat();

  useEffect(() => {
    getAllReservationPesanTempat(true);
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
        Header: "Tanggal Pesan",
        accessor: "createdAt",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return <>{globalVar.formatDate(singleData.createdAt)}</>;
        },
      },
      {
        Header: "Tanggal Sewa",
        accessor: "tanggal_sewa",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return (
            <>
              <span className="badge badge-light-success fs-base">
                {globalVar.formatDate(singleData.startDate)}
              </span>
              -
              <span className="badge badge-light-danger fs-base">
                {globalVar.formatDate(singleData.endDate)}
              </span>
            </>
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
          let statusDesc = "";
          switch (singleData.status) {
            case "WAITING_ANSWER_LETTER":
              statusClass = "badge badge-light-success fs-6";
              statusDesc = "Menunggu surat jawaban";
              break;
            case "PROSES":
              statusClass = "badge badge-light-warning fs-6";
              statusDesc = "Pesanan sedang di proses";
              break;
            case "DONE":
              statusClass = "badge badge-light-success fs-6";
              statusDesc = "Selesai";
              break;
            case "PENDING":
              statusDesc = "Pesanan tertunda";
              statusClass = "badge badge-light-warning fs-6";
              break;
            case "REJECT":
              statusDesc = "Ditolak";
              statusClass = "badge badge-light-danger fs-6";
              break;
            case "REQUEST":
              statusDesc = "Menunggu persetujuan admin";
              statusClass = "badge badge-light-info fs-6";
              break;
            case "EXPIRED":
              statusDesc = "Kadaluarsa";
              statusClass = "badge badge-light-danger fs-6";
              break;
            case "REVISE":
              statusDesc = "Revisi";
              statusClass = "badge badge-light-danger fs-6";
              break;
          }

          return <span className={statusClass}>{statusDesc}</span>;
        },
      },
      {
        Header: "Total Pembayaran",
        accessor: "priceTotal",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return <>{globalVar.formatRupiah(singleData.priceTotal)}</>;
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
        breadcrumbs={Breadcrumbs}
        icon="entrance-left"
        description="Pesanan Masuk"
      >
        Pesanan Masuk
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
        <ModalDetailPesananMasuk
          show={modalDetail.show}
          data={modalDetail.data}
          handleClose={() => setModalDetail({ show: false, data: {} })}
        />
      </Content>
    </>
  );
};
