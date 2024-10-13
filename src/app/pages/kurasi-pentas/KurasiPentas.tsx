import React, { FC, useEffect, useMemo, useState } from "react";
import { Content } from "../../../_metronic/layout/components/content";
import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import Table from "../../../_metronic/layout/components/table/Table";
import ModalDetailKurasiPentas from "./components/ModalDetailKurasiPentas";
import usePesanTempat from "../../modules/hooks/pesan-tempat";
import globalVar from "../../helper/globalVar";
import { getAllReservation } from "../../modules/requests/pesan-tempat";
import { DEFAULT_LIMIT, INITIAL_PAGE } from "../../constants/PAGE";
import { API_URL, ENDPOINTS } from "../../constants/API";
import Swal from "sweetalert2";

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
  const [loading, setLoading] = useState(false);
  const { changeStatus } = usePesanTempat();
  const [allReservationPesanTempat, setAllReservationPesanTempat] = useState<
    any[]
  >([]);

  const getAllReservationPesanTempatStatusKurasi = async () => {
    setLoading(true);
    try {
      const res = await getAllReservation(
        INITIAL_PAGE,
        DEFAULT_LIMIT,
        "",
        "",
        "KURASI"
      );
      let allReservation: any[] = res.data.data.data;

      let allResrvationWithCorrectEmail: any[] = [];
      allReservation.map((data) => {
        const singleReserve = {
          ...data,
          suratPermohonan: `${API_URL}/${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/Attachment/SuratPermohonan`,
          proposal: `${API_URL}/${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/Attachment/Proposal`,
        };

        allResrvationWithCorrectEmail.push(singleReserve);
      });

      setAllReservationPesanTempat(allResrvationWithCorrectEmail);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: error.message,
        showConfirmButton: false,
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getAllReservationPesanTempatStatusKurasi();
  }, []);

  const [modalDetail, setModalDetail] = useState({
    show: false,
    data: {},
  });

  const data = useMemo(
    () => allReservationPesanTempat,
    [loading, allReservationPesanTempat, changeStatus]
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

  console.log("allReservationPesanTempat", allReservationPesanTempat);

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
          changeStatus={(status: any, payload: any) => {
            changeStatus(status, payload);
            getAllReservationPesanTempatStatusKurasi();
          }}
          onChangeStatus={() => {}}
          handleClose={() => setModalDetail({ data: {}, show: false })}
          data={modalDetail.data}
        />
      </Content>
    </>
  );
};
