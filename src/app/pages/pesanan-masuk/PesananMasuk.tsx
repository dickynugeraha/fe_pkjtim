import React, { useEffect, useMemo, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle, PageLink } from "../../../_metronic/layout/core/PageData";
import Table from "../../../_metronic/layout/components/table/Table";
import ModalDetailPesananMasuk from "./components/ModalDetailPesananMasuk";
import usePesanTempat from "../../modules/hooks/pesan-tempat";
import globalVar from "../../helper/globalVar";
import { downloadExcel } from "react-export-table-to-excel";

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
  const {
    getAllReservationPesanTempat,
    loading,
    allReservationPesanTempat,
    setQuery,
    changeStatus,
  } = usePesanTempat();

  useEffect(() => {
    getAllReservationPesanTempat();
  }, []);

  const [modalDetail, setModalDetail] = useState({
    show: false,
    data: {},
  });

  const data = useMemo(
    () => allReservationPesanTempat,
    [
      loading,
      allReservationPesanTempat,
      getAllReservationPesanTempat,
      changeStatus,
    ]
  );
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
          const { statusClass, statusDesc } =
            globalVar.exportStatusPesanTempatToTitle(singleData.status);

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

  const header = [
    "Kode Booking",
    "Tempat",
    "Pemesan",
    "Nomor Handphone",
    "Email Pemesan",
    "Judul Pentas",
    "Nama Sanggar",
    "Alamat Sanggar",
    "Total Harga",
    "Mulai Acara",
    "Akhir Acara",
  ];
  let body: any[] = [];
  allReservationPesanTempat?.map((data) => {
    body.push([
      data?.kodeBooking,
      data?.tempat?.name,
      data?.creatorName,
      data?.creatorPhone,
      data?.creatorEmail,
      data?.judulPentas,
      data?.namaSanggar,
      data?.alamatSanggar,
      data?.priceTotal,
      globalVar.formatInputDate(data?.startDate),
      globalVar.formatInputDate(data?.endDate),
    ]);
  });

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Pesanan Masuk Tempat",
      sheet: "sheet1",
      tablePayload: {
        header,
        body: body,
      },
    });
  }

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
          searchData={(val: string) => setQuery(val)}
          data={data}
          columns={columns}
          addData={() => {}}
          showAddButton={false}
          isExport
          onClickExport={handleDownloadExcel}
        />
        <ModalDetailPesananMasuk
          show={modalDetail.show}
          data={modalDetail.data}
          changeStatus={(status: any, payload: any) =>
            changeStatus(status, payload)
          }
          onChangeStatus={() => {
            getAllReservationPesanTempat();
          }}
          handleClose={() => setModalDetail({ ...modalDetail, show: false })}
        />
      </Content>
    </>
  );
};
