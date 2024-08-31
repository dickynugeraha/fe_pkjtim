import { useState } from "react";
import Swal from "sweetalert2";
import { initBooking } from "../../requests/planetarium";
import { useAuth } from "../../auth";
import { useNavigate } from "react-router-dom";

export default function usePlanetarium() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const nextStepHandler = async (
    indoor: any,
    outdoor: any,
    bookingDate: any
  ) => {
    if (!indoor) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Pilih kegiatan Indoor",
        showConfirmButton: false,
      });
      return;
    }
    if (!outdoor.peneropongan_matahari && !outdoor.percobaan_roket_air) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Pilih salah satu atau keduanya pada kegiatan Outdoor",
        showConfirmButton: false,
      });
      return;
    }
    if (!bookingDate) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Masukkan tanggal booking",
        showConfirmButton: false,
      });
      return;
    }

    try {
      const data = {
        UserCreatorId: currentUser?.id,
        TanggalKunjungan: bookingDate,
        IsPertunjukan: indoor === "planetarium_mini" ? true : false,
        IsDiskusi: indoor === "diskusi_astronomi" ? true : false,
        IsPenerpongan: outdoor.peneropongan_matahari ? true : false,
        IsRoketAir: outdoor.percobaan_roket_air ? true : false,
      };
      await initBooking(data);
      Swal.fire({
        icon: "success",
        title: "Berhasil mengubah data info",
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate(`/form-planetarium`, {
          state: { bookingDate: new Date() },
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
  };

  return {
    nextStepHandler,
  };
}
