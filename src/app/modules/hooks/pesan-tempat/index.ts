import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getSingleReservation, initBooking } from "../../requests/pesan-tempat";
import { useAuth } from "../../auth";

export default function usePesanTempat() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [singleReservationTempat, setSingleReservationTempat] = useState<any>(
    {}
  );

  const getSinglePesanTempat = async (id: any) => {
    setLoading(true);
    try {
      const res = await getSingleReservation(id);
      const reservation = res.data.data;
      console.log("reservation", reservation);

      setSingleReservationTempat(reservation);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Gagal mengambil data",
        showConfirmButton: false,
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const nextStepHandler = async (
    choosenTempat: any,
    startDate: any,
    endDate: any
  ) => {
    if (!choosenTempat || !startDate) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Pilih tempat dan tanggal booking",
        showConfirmButton: false,
      });
      return;
    }

    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan reservasi?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve("Confirmed");
          }, 1000);
        });
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const payload = {
            userCreatorId: currentUser?.id,
            tempatId: choosenTempat.id,
            startDate: startDate,
            endDate: endDate,
          };

          const res = await initBooking(payload);
          const reserveData = res.data.data;
          Swal.fire({
            icon: "success",
            title: "Berhasil melakukan reservasi",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate(`/form-pesan-tempat/${reserveData.id}`, {
              state: {
                namaTempat: choosenTempat.name,
                startDate: startDate,
                endDate: endDate,
              },
            });
          });
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  return {
    singleReservationTempat,
    loading,
    getSinglePesanTempat,
    nextStepHandler,
  };
}
