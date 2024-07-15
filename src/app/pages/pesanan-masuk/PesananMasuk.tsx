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

const PesananMasuk = () => {
  const [modalDetail, setModalDetail] = useState({
    show: false,
    data: {},
  });

  const data = useMemo(
    () => [
      {
        id: "1",
        tipe_tempat: "Kim Parrish",
        tanggal_pesan: "4420 Valley Street, Garnerville, NY 10923",
        tanggal_sewa: "07/11/2020",
        total_pembayaran: "Rp. 1.000.000",
        status: "Proses",
      },
      {
        id: "2",
        tipe_tempat: "Michele Castillo",
        tanggal_pesan: "637 Kyle Street, Fullerton, NE 68638",
        tanggal_sewa: "07/11/2020",
        total_pembayaran: "Rp. 1.000.000",
        status: "Pending",
      },
      {
        id: "3",
        tipe_tempat: "Eric Ferris",
        tanggal_pesan: "906 Hart Country Lane, Toccoa, GA 30577",
        tanggal_sewa: "07/10/2020",
        total_pembayaran: "Rp. 1.000.000",
        status: "Selesai",
      },
      {
        id: "4",
        tipe_tempat: "Gloria Noble",
        tanggal_pesan: "2403 Edgewood Avenue, Fresno, CA 93721",
        tanggal_sewa: "07/09/2020",
        total_pembayaran: "Rp. 1.000.000",
        status: "Ditolak",
      },
      {
        id: "5",
        tipe_tempat: "Darren Daniels",
        tanggal_pesan: "882 Hide A Way Road, Anaktuvuk Pass, AK 99721",
        tanggal_sewa: "07/07/2020",
        total_pembayaran: "Rp. 1.000.000",
        status: "Revisi",
      },
      {
        id: "6",
        tipe_tempat: "Ted McDonald",
        tanggal_pesan: "796 Bryan Avenue, Minneapolis, MN 55406",
        tanggal_sewa: "07/07/2020",
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
      },
      {
        Header: "Status",
        accessor: "status",
        sortType: "alphanumeric",
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
              className={"btn btn-sm btn-light-primary"}
              style={{ minWidth: "120px" }}
              onClick={() => {
                setModalDetail({
                  show: true,
                  data: singleData,
                });
                console.log("props", singleData);
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
        <Table data={data} columns={columns} addData={() => {}} />
        <ModalDetailPesananMasuk
          show={modalDetail.show}
          data={modalDetail.data}
          handleClose={() => setModalDetail({ show: false, data: {} })}
        />
      </Content>
    </>
  );
};

export default PesananMasuk;
