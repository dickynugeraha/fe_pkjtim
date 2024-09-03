import { useState } from "react";
import Swal from "sweetalert2";
import {
  initReservation,
  singleReservation,
  submitReservation,
  getAllReservation,
  rejectReservation as reject,
  approveReservation as approve,
} from "../../requests/planetarium";
import { useAuth } from "../../auth";
import { useNavigate } from "react-router-dom";
import { DEFAULT_LIMIT, INITIAL_PAGE } from "../../../constants/PAGE";
import ConfirmationDialog from "../../../../_metronic/layout/components/content/ConfirmationDialog";
import { API_URL, ENDPOINTS } from "../../../constants/API";

export default function usePlanetarium() {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [allReservationPlanetarium, setAllReservationPlanetarium] = useState<
    any[]
  >([]);
  const [singleReservationPlanetarium, setSingleReservationPlanetarium] =
    useState<any>({});
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
            UserCreatorId: currentUser?.id,
            TanggalKunjungan: bookingDate,
            IsPertunjukan: indoor === "planetarium_mini" ? true : false,
            IsDiskusi: indoor === "diskusi_astronomi" ? true : false,
            IsPenerpongan: outdoor.peneropongan_matahari ? true : false,
            IsRoketAir: outdoor.percobaan_roket_air ? true : false,
          };
          const res = await initReservation(payload);
          const dataReservation: any = res.data.data;

          Swal.fire({
            icon: "success",
            title: "Berhasil melakukan reservasi",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate(`/form-planetarium/${dataReservation.id}`, {
              state: { reservationDate: bookingDate },
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

  const requestReservationPlanetarium = (data: any) => {
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
          const res = await submitReservation({
            ...data,
            actorId: currentUser?.id,
          });

          Swal.fire({
            icon: "success",
            title:
              "Berhasil melakukan reservasi, file-file akan dilakukan pengecekan oleh admin",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate(`/pesanan-saya`);
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

  const getSingleReservationPlanetarium = async (id: any) => {
    setLoading(true);
    try {
      const res = await singleReservation(id);
      const planet = res.data.data;

      setSingleReservationPlanetarium(planet);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: error.message,
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  const getAllReservationPlanetarium = async (fromAdmin: boolean) => {
    setLoading(true);
    try {
      const res = await getAllReservation(
        INITIAL_PAGE,
        DEFAULT_LIMIT,
        "",
        !fromAdmin ? currentUser?.id : ""
      );
      let allReservation: any[] = res.data.data.data;

      if (fromAdmin) {
        allReservation = allReservation.filter(
          (val: any) => val.status == "REQUEST"
        );
      }

      let allResrvationWithCorrectEmail: any[] = [];
      allReservation.map((data) => {
        const singlePlanet = {
          ...data,
          pernyataanPersetujuan: `${API_URL}/${ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM}/${data.id}/PernyataanPersetujuan`,
          suratUndangan: `${API_URL}/${ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM}/${data.id}/SuratUndangan`,
        };
        allResrvationWithCorrectEmail.push(singlePlanet);
      });

      setAllReservationPlanetarium(allResrvationWithCorrectEmail);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: error.message,
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  const rejectReservation = async (data: any) => {
    ConfirmationDialog({
      text: "Akan menolak reservasi planetarium customer?!",
      onConfirm: async () => {
        try {
          await reject({
            id: data.id,
            actorId: currentUser?.id,
            reason: data.reason,
          });
          Swal.fire({
            icon: "success",
            title: "Reservasi berhasil ditolak",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            window.location.reload();
          });
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: error.message,
            showConfirmButton: false,
          });
        }
      },
    });
  };

  const approveReservation = async (data: any) => {
    ConfirmationDialog({
      text: "Akan menerima reservasi planetarium customer?!",
      onConfirm: async () => {
        try {
          await approve({
            id: data.id,
            actorId: currentUser?.id,
            reason: data.reason,
          });
          Swal.fire({
            icon: "success",
            title: "Reservasi berhasil diterima",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            window.location.reload();
          });
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: error.message,
            showConfirmButton: false,
          });
        }
      },
    });
  };

  return {
    loading,
    singleReservationPlanetarium,
    allReservationPlanetarium,
    nextStepHandler,
    requestReservationPlanetarium,
    getSingleReservationPlanetarium,
    getAllReservationPlanetarium,
    rejectReservation,
    approveReservation,
  };
}
