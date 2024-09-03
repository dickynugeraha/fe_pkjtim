import React, { useEffect, useMemo } from "react";
import Table from "../../../../_metronic/layout/components/table/Table";
import usePlanetarium from "../../../modules/hooks/planetarium";
import Gap from "../../../../_metronic/layout/components/content/Gap";

type Props = {
  showModalPlanetarium: (data: any) => void;
};

const TablePesanTempat: React.FC<Props> = ({ showModalPlanetarium }) => {
  const { getAllReservationPlanetarium, allReservationPlanetarium } =
    usePlanetarium();

  useEffect(() => {
    getAllReservationPlanetarium(false);
  }, []);

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
              <span className="badge badge-light-success fs-6">
                {singleData.tanggal_mulai_sewa}
              </span>
              <span> - </span>
              <span className="badge badge-light-danger fs-6">
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
              statusClass = "badge badge-light-success fs-6";
              break;
            case "Proses":
              statusClass = "badge badge-light-warning fs-6";
              break;
            case "Ditolak":
              statusClass = "badge badge-light-danger fs-6";
              break;
            case "Pending":
              statusClass = "badge badge-light-danger fs-6";
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
              onClick={() => {
                if (singleData.status !== "Pending") {
                  showModalPlanetarium({
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
      <h6>Pesan Tempat</h6>
      <Gap height={8} />
      <Table
        loading={false}
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
