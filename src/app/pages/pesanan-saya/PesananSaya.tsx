import { Content } from "../../../_metronic/layout/components/content";
import { PageLink, PageTitle } from "../../../_metronic/layout/core/PageData";
import Table from "../../../_metronic/layout/components/table/Table";
import { FC, useMemo, useState } from "react";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import Gap from "../../../_metronic/layout/components/content/Gap";
import ModalDetailPesanan from "./components/ModalDetailPesanan";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Pesanan Saya",
    path: "/pesanan-saya",
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

export const PesananSaya: FC = () => {
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
        status: "Pending",
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
        status: "Proses",
      },
      {
        id: "5",
        tipe_tempat: "Darren Daniels",
        tanggal_pesan: "07/11/2020",
        tanggal_mulai_sewa: "07/07/2020",
        tanggal_akhir_sewa: "07/07/2020",
        total_pembayaran: "Rp. 1.000.000",
        status: "Pending",
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
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;

          return (
            <>
              <span className="text-success bg-light-success">
                {singleData.tanggal_mulai_sewa}
              </span>
              <span> - </span>
              <span className="text-danger bg-light-danger">
                {singleData.tanggal_akhir_sewa}
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
          switch (singleData.status) {
            case "Selesai":
              statusClass = "bg-light-success text-success";
              break;
            case "Proses":
              statusClass = "bg-light-warning text-warning";
              break;
            case "Ditolak":
              statusClass = "bg-light-danger text-danger";
              break;
            case "Pending":
              statusClass = "bg-light-danger text-danger";
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
          let classes =
            singleData.status !== "Pending"
              ? "btn btn-sm btn-success"
              : "btn btn-sm btn-warning";
          return (
            <button
              className={classes}
              style={{ minWidth: "120px" }}
              onClick={() => {
                if (singleData.status !== "Pending") {
                  setModalDetail({
                    show: true,
                    data: singleData,
                  });
                }
              }}
            >
              {singleData.status !== "Pending" ? "Detail" : "Lanjut Pesan"}
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
        icon="shop"
        breadcrumbs={Breadcrumbs}
        description="Daftar pesanan saya"
      >
        Daftar Pesanan Saya
      </PageTitle>
      <Content>
        <Table data={data} columns={columns} addData={() => {}} />
        <ModalDetailPesanan
          data={modalDetail.data}
          show={modalDetail.show}
          hideModal={() => {
            setModalDetail({ ...modalDetail, show: false });
          }}
        />
      </Content>
    </>
  );
};
