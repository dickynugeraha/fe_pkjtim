import React, { useMemo, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { PageTitle, PageLink } from "../../../_metronic/layout/core/PageData";
import { Card } from "react-bootstrap";
import Table from "../../../_metronic/layout/components/table/Table";
import ModalDetailPesananPlanetarium from "./components/ModalDetailPesananPlanetarium";

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
  const [modalDetail, setModalDetail] = useState({
    show: false,
    data: {},
  });

  const data = useMemo(
    () => [
      {
        id: "1",
        nama_sekolah: "Kim Parrish",
        tanggal_mulai_kunjungan: "07/11/2020",
        tanggal_akhir_kunjungan: "07/11/2020",
        jumlah_siswa: 23,
      },
      {
        id: "2",
        nama_sekolah: "Michele Castillo",
        tanggal_mulai_kunjungan: "07/11/2020",
        tanggal_akhir_kunjungan: "07/11/2020",
        jumlah_siswa: 23,
        total_pembayaran: "Rp. 1.000.000",
        status: "Pending",
      },
      {
        id: "3",
        nama_sekolah: "Eric Ferris",
        tanggal_mulai_kunjungan: "07/11/2020",
        tanggal_akhir_kunjungan: "07/11/2020",
        jumlah_siswa: 23,
      },
      {
        id: "4",
        nama_sekolah: "Gloria Noble",
        tanggal_mulai_kunjungan: "07/11/2020",
        tanggal_akhir_kunjungan: "07/11/2020",
        jumlah_siswa: 23,
      },
      {
        id: "5",
        nama_sekolah: "Darren Daniels",
        tanggal_mulai_kunjungan: "07/11/2020",
        tanggal_akhir_kunjungan: "07/11/2020",
        jumlah_siswa: 23,
      },
      {
        id: "6",
        nama_sekolah: "Ted McDonald",
        tanggal_mulai_kunjungan: "07/11/2020",
        tanggal_akhir_kunjungan: "07/11/2020",
        jumlah_siswa: 23,
      },
    ],
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: "Nama Sekolah",
        accessor: "nama_sekolah",
        sortType: "alphanumeric",
      },
      {
        Header: "Tanggal Kunjungan",
        accessor: "tanggal_kunjungan",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return (
            <div>
              <span className="badge badge-light-success fs-6">
                {singleData.tanggal_mulai_kunjungan}
              </span>
              <span className="mx-3">-</span>
              <span className="badge badge-light-danger fs-6">
                {singleData.tanggal_akhir_kunjungan}
              </span>
            </div>
          );
        },
      },
      {
        Header: "Tanggal Sewa",
        accessor: "jumlah_siswa",
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
        description="Pesanan Masuk Planetarium"
      >
        Pesanan Masuk Planetarium
      </PageTitle>
      <Content>
        <Table
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
        />
      </Content>
    </>
  );
};
