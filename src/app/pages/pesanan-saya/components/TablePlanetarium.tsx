import React, { useEffect, useMemo } from "react";
import Table from "../../../../_metronic/layout/components/table/Table";
import usePlanetarium from "../../../modules/hooks/planetarium";
import globalVar from "../../../helper/globalVar";
import Gap from "../../../../_metronic/layout/components/content/Gap";
import { useNavigate } from "react-router-dom";

type Props = {
  showModalPlanetarium: (data: any) => void;
};

const TablePlanetarium: React.FC<Props> = ({ showModalPlanetarium }) => {
  const navigate = useNavigate();
  const {
    getAllReservationPlanetariumByUserId,
    allReservationPlanetariumByUserId,
    loading,
  } = usePlanetarium();

  useEffect(() => {
    getAllReservationPlanetariumByUserId();
  }, []);

  const data = useMemo(() => allReservationPlanetariumByUserId, [loading]);

  const columns = useMemo(
    () => [
      {
        Header: "Tanggal Pemesanan",
        accessor: "tanggal_pesan",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return globalVar.formatDate(singleData.createdAt);
        },
      },
      {
        Header: "Tanggal Kunjungan",
        accessor: "tanggal_sewa",
        sortType: "alphanumeric",
        Cell: (props: any) => {
          let singleData = props.cell.row.original;
          return (
            <div>
              {singleData.tanggalKunjungan != undefined ? (
                <span className="badge badge-light-success fs-6">
                  {globalVar.formatDate(singleData.tanggalKunjungan)}
                </span>
              ) : (
                <span className="badge badge-light-info fs-6">
                  Belum ada tanggal
                </span>
              )}
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

          if (singleData.tanggalKunjungan == undefined) {
            statusDesc = "Dijadwalkan ulang";
            statusClass = "badge badge-light-info fs-6";
          }

          return <span className={statusClass}>{statusDesc}</span>;
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
                  navigate(`/form-planetarium/${singleData.id}`, {
                    state: { reservationDate: singleData.createdAt },
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
      <Gap height={8} />
      <Table
        cardTitle="Pesanan Astronomy"
        loading={loading}
        data={data}
        columns={columns}
        addData={() => {}}
        showAddButton={false}
        isSearch={false}
        searchData={() => {}}
      />
      <Gap height={32} />
    </>
  );
};

export default TablePlanetarium;
