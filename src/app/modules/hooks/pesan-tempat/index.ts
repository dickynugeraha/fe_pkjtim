import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { initBooking } from "../../requests/pesan-tempat";
import { useAuth } from "../../auth";

export default function usePesanTempat() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [choosenTempat, setChoosenTempat] = useState<any>();
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();

  const nextStepHandler = async () => {
    console.log("choosenTempat", choosenTempat);

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
          console.log("payload", payload);

          const res = await initBooking(payload);
          const reserveData = res.data.data;
          Swal.fire({
            icon: "success",
            title: "Berhasil melakukan reservasi",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate(`/form-pesan-tempat/${reserveData.id}`, {
              state: { nama_tempat: choosenTempat.name },
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
    setStartDate,
    startDate,
    endDate,
    setChoosenTempat,
    setEndDate,
    nextStepHandler,
    choosenTempat,
  };
}
