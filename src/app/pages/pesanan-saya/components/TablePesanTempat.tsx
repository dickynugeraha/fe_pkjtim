import React, { useEffect, useMemo } from "react";
import Table from "../../../../_metronic/layout/components/table/Table";
import usePlanetarium from "../../../modules/hooks/planetarium";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import usePesanTempat from "../../../modules/hooks/pesan-tempat";
import globalVar from "../../../helper/globalVar";
import { useNavigate } from "react-router-dom";

type Props = {
  showModalPlanetarium: (data: any) => void;
};

const TablePesanTempat: React.FC<Props> = ({ showModalPlanetarium }) => {
  const navigate = useNavigate();
  const { allReservationPesanTempat, getAllReservationPesanTempat, loading } =
    usePesanTempat();

  useEffect(() => {
    getAllReservationPesanTempat(false);
  }, []);

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
        accessor: "tanggal_pesan",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return <>{globalVar.formatDate(singleData.createdAt)}</>;
        },
      },
      {
        Header: "Tanggal Sewa",
        accessor: "tanggal_sewa",
        sortType: "alphanumeric",
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
            case "KURASI":
              statusClass = "badge badge-light-warning fs-6";
              statusDesc = "Kurasi";
              break;
            case "PROSES":
              statusClass = "badge badge-light-info fs-6";
              statusDesc = "Pesanan Sedang di proses";
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
          let classes =
            singleData.status !== "PENDING"
              ? "btn btn-sm btn-success"
              : "btn btn-sm btn-warning";
          return (
            <button
              className={classes}
              onClick={() => {
                if (singleData.status !== "PENDING") {
                  showModalPlanetarium({
                    show: true,
                    data: singleData,
                  });
                } else {
                  navigate(`/form-pesan-tempat/${singleData.id}`, {
                    state: { reservationDate: singleData.expiredDateTime },
                  });
                }
              }}
            >
              {singleData.status !== "PENDING" ? "Detail" : "Lanjut Pesan"}
            </button>
          );
        },
      },
    ],
    []
  );
  return (
    <>
      <h6>Pesan Tempat</h6>
      <Gap height={8} />
      <Table
        loading={loading}
        data={data}
        columns={columns}
        addData={() => {}}
        showAddButton={false}
        searchData={() => {}}
      />
      <Gap height={8} />
    </>
  );
};

export default TablePesanTempat;
