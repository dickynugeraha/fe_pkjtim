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
    title: "Pesanan Masuk Planetarium",
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
  const { getAllReservationPlanetarium, allReservationPlanetarium, loading } =
    usePlanetarium();
  const [modalDetail, setModalDetail] = useState<{
    show: boolean;
    data: any;
  }>({
    show: false,
    data: {},
  });

  useEffect(() => {
    getAllReservationPlanetarium(true);
  }, []);

  const data = useMemo(() => allReservationPlanetarium, [loading]);

  const columns = useMemo(
    () => [
      {
        Header: "Nama Sekolah",
        accessor: "namaSekolah",
        sortType: "alphanumeric",
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

  console.log("allReservationPlanetarium", allReservationPlanetarium);

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
      data?.userCreator.fullName,
      data?.userCreator.phoneNumber,
      data?.userCreator.email,
      data?.namaSekolah,
      data?.alamatSekolah,
      data?.daerah,
      data?.status,
    ]);
  });

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Pesanan Masuk Planetarium",
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
        description="Pesanan Masuk Planetarium"
      >
        Pesanan Masuk Planetarium
      </PageTitle>
      <Content>
        <Table
          isExport
          onClickExport={handleDownloadExcel}
          loading={loading}
          searchData={() => {}}
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
