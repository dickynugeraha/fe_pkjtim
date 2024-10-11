import React, { useEffect, useMemo, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle, PageLink } from "../../../_metronic/layout/core/PageData";
import Table from "../../../_metronic/layout/components/table/Table";
import ModalDetailPesananPlanetarium from "./components/ModalDetailPesananPlanetarium";
import usePlanetarium from "../../modules/hooks/planetarium";
import globalVar from "../../helper/globalVar";
import { downloadExcel } from "react-export-table-to-excel";

const Breadcrumbs: Array<PageLink> = [
  {
    title: "Pesanan Masuk AGS",
    path: "/pesanan-planet",
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

export const PesananPlanetarium = () => {
  const {
    getAllReservationPlanetarium,
    setQuery,
    allReservationPlanetarium,
    loading,
  } = usePlanetarium();
  const [modalDetail, setModalDetail] = useState<{
    show: boolean;
    data: any;
  }>({
    show: false,
    data: {},
  });

  useEffect(() => {
    getAllReservationPlanetarium();
  }, []);

  const data = useMemo(
    () => allReservationPlanetarium,
    [loading, allReservationPlanetarium]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Nama Sekolah",
        accessor: "namaSekolah",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return <div>{singleData.namaSekolah ?? "-"}</div>;
        },
      },
      {
        Header: "Jumlah Siswa",
        accessor: "jumlahSiswa",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return <div>{`${singleData.jumlahPeserta} Siswa`}</div>;
        },
      },
      {
        Header: "Tanggal Kunjungan",
        accessor: "tanggalKunjungan",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return (
            <div>
              <span className="badge badge-light-success fs-6">
                {globalVar.formatDate(singleData.tanggalKunjungan)}
              </span>
            </div>
          );
        },
      },
      {
        Header: "Tanggal Sewa",
        accessor: "createdAt",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return (
            <div>
              <span className="badge badge-light-warning fs-6">
                {globalVar.formatDate(singleData.createdAt)}
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
          let statusDesc = "";
          switch (singleData.status) {
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
          }

          return <span className={statusClass}>{statusDesc}</span>;
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
    "Pemesan",
    "Nomor Pemesan",
    "Email Pemesan",
    "Nama Sekolah",
    "Alamat Sekolah",
    "Daerah",
    "Status",
  ];
  let body: any[] = [];
  allReservationPlanetarium?.map((data) => {
    body.push([
      data?.creatorName,
      data?.contact,
      data?.creatorEmail,
      data?.namaSekolah,
      data?.alamatSekolah,
      data?.daerah,
      data?.status,
    ]);
  });

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Pesanan Masuk AGS",
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
        description="Pesanan Masuk AGS"
      >
        Pesanan Masuk AGS
      </PageTitle>
      <Content>
        <Table
          isExport
          onClickExport={handleDownloadExcel}
          loading={loading}
          searchData={(val: string) => {
            setQuery(val);
          }}
          data={data}
          columns={columns}
          addData={() => {}}
          showAddButton={false}
        />
        <ModalDetailPesananPlanetarium
          show={modalDetail.show}
          data={modalDetail.data}
          handleClose={() => setModalDetail({ show: false, data: {} })}
          fromAdmin
        />
      </Content>
    </>
  );
};
