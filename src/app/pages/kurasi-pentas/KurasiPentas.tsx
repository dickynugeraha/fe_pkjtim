import React, { FC, useMemo, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { Link, useNavigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import globalVar from "../../helper/globalVar";
import Gap from "../../../_metronic/layout/components/content/Gap";
import Table from "../../../_metronic/layout/components/table/Table";
import ModalDetailKurasiPentas from "./components/ModalDetailKurasiPentas";

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
  const [modalDetail, setModalDetail] = useState({
    show: false,
    data: {},
  });

  const data = useMemo(
    () => [
      {
        id: "1",
        tipe_tempat: "Kim Parrish",
        nama_sanggar: "Sanggar ABC",
        judul: "Judul ABC",
        tanggal_mulai_kunjungan: "07/11/2020",
        tanggal_akhir_kunjungan: "07/11/2020",
        status: "Kurasi",
      },
      {
        id: "2",
        tipe_tempat: "Michele Castillo",
        nama_sanggar: "Sanggar ABC",
        judul: "Judul ABC",
        tanggal_mulai_kunjungan: "07/11/2020",
        tanggal_akhir_kunjungan: "07/11/2020",
        status: "Kurasi",
      },
      {
        id: "3",
        tipe_tempat: "Eric Ferris",
        nama_sanggar: "Sanggar ABC",
        judul: "Judul ABC",
        tanggal_mulai_kunjungan: "07/11/2020",
        tanggal_akhir_kunjungan: "07/11/2020",
        status: "Kurasi",
      },
      {
        id: "4",
        tipe_tempat: "Gloria Noble",
        nama_sanggar: "Sanggar ABC",
        judul: "Judul ABC",
        tanggal_mulai_kunjungan: "07/11/2020",
        tanggal_akhir_kunjungan: "07/11/2020",
        status: "Kurasi",
      },
      {
        id: "5",
        tipe_tempat: "Darren Daniels",
        nama_sanggar: "Sanggar ABC",
        judul: "Judul ABC",
        tanggal_mulai_kunjungan: "07/11/2020",
        tanggal_akhir_kunjungan: "07/11/2020",
        status: "Kurasi",
      },
      {
        id: "6",
        tipe_tempat: "Ted McDonald",
        nama_sanggar: "Sanggar ABC",
        judul: "Judul ABC",
        tanggal_mulai_kunjungan: "07/11/2020",
        tanggal_akhir_kunjungan: "07/11/2020",
        status: "Kurasi",
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
        Header: "Nama Sanggar",
        accessor: "nama_sanggar",
        sortType: "alphanumeric",
      },
      {
        Header: "Judul",
        accessor: "judul",
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
              <span className="bg-light-success text-success rounded p-2">
                {singleData.tanggal_mulai_kunjungan}
              </span>
              <span className="mx-3">-</span>
              <span className="bg-light-danger text-danger rounded p-2">
                {singleData.tanggal_akhir_kunjungan}
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
          return (
            <span className="bg-light-warning text-warning rounded p-2">
              {singleData.status}
            </span>
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
        icon="book"
        breadcrumbs={Breadcrumbs}
        description="Kursi Pentas"
      >
        Kurasi Pentas
      </PageTitle>

      <Content>
        <Table
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
