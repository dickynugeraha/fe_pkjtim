import { DEFAULT_LIMIT } from "./../../../constants/PAGE";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getAllReservation,
  getSingleReservation,
  initBooking,
  submitReservation,
  changeStatusReservation,
} from "../../requests/pesan-tempat";
import { useAuth } from "../../auth";
import ConfirmationDialog from "../../../../_metronic/layout/components/content/ConfirmationDialog";
import { INITIAL_PAGE } from "../../../constants/PAGE";
import { API_URL, ENDPOINTS } from "../../../constants/API";

export default function usePesanTempat() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [singleReservationTempat, setSingleReservationTempat] = useState<any>(
    {}
  );
  const [allReservationPesanTempat, SetAllReservationPesanTempat] = useState<
    any[]
  >([]);

  const getAllReservationPesanTempat = async (
    fromPengelola?: boolean,
    fromKurasi?: boolean
  ) => {
    setLoading(true);
    try {
      const res = await getAllReservation(
        INITIAL_PAGE,
        DEFAULT_LIMIT,
        "",
        !fromPengelola ? currentUser?.id : ""
      );
      let allReservation: any[] = res.data.data.data;

      let allResrvationWithCorrectEmail: any[] = [];
      allReservation.map((data) => {
        const singleReserve = {
          ...data,
          suratPermohonan: `${API_URL}/${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/Attachment/SuratPermohonan`,
          proposal: `${API_URL}/${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/Attachment/Proposal`,
          tandaPengenal: `${API_URL}/${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/Attachment/TandaPengenal`,
        };

        allResrvationWithCorrectEmail.push(singleReserve);
      });

      if (fromPengelola) {
        allResrvationWithCorrectEmail = allResrvationWithCorrectEmail.filter(
          (data) => data.status !== "KURASI"
        );
      }
      if (fromKurasi) {
        allResrvationWithCorrectEmail = allResrvationWithCorrectEmail.filter(
          (data) => data.status === "KURASI"
        );
      }

      SetAllReservationPesanTempat(allResrvationWithCorrectEmail);
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

  const getSinglePesanTempat = async (id: any) => {
    setLoading(true);
    try {
      const res = await getSingleReservation(id);
      const reservation = res.data.data;

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
    if (!currentUser?.email) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Silahkan login terlebih dahulu",
        showConfirmButton: false,
      });
      return;
    }
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

  const requestReservationPesanTempat = (payload: any) => {
    ConfirmationDialog({
      text: "Akan memesan reservasi pesan tempat?!",
      onConfirm: async () => {
        try {
          await submitReservation({
            ...payload,
            actorId: currentUser?.id,
          });
          Swal.fire({
            icon: "success",
            title: "Reservasi berhasil dipesan",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            navigate("/pesanan-saya");
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

  const changeStatus = async (status: string, data: any) => {
    const newData = {
      ...data,
      actorId: currentUser?.id,
    };
    ConfirmationDialog({
      text: "Akan mengubah status reservasi?!",
      onConfirm: async () => {
        try {
          await changeStatusReservation({ ...newData }, status);
          Swal.fire({
            icon: "success",
            title: "Status reservasi berhasil terubah",
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
    singleReservationTempat,
    loading,
    allReservationPesanTempat,
    getSinglePesanTempat,
    nextStepHandler,
    requestReservationPesanTempat,
    getAllReservationPesanTempat,
    changeStatus,
  };
}
