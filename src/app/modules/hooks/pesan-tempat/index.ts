import { DEFAULT_LIMIT } from "./../../../constants/PAGE";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getAllReservation,
  getSingleReservation,
  initBooking,
  submitReservation,
  getAllReservationByStatus,
  changeStatusReservation,
} from "../../requests/pesan-tempat";
import { getAll } from "../../requests/master-data/tempat-tutup";
import { useAuth } from "../../auth";
import ConfirmationDialog from "../../../../_metronic/layout/components/content/ConfirmationDialog";
import { INITIAL_PAGE } from "../../../constants/PAGE";
import { API_URL, ENDPOINTS } from "../../../constants/API";
import globalVar from "../../../helper/globalVar";
import axiosConfig from "../../../utils/services/axiosConfig";

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
  const [eventCalendar, setEventCalendar] = useState<any[]>([]);
  const [
    allReservationPesanTempatByUserId,
    SetAllReservationPesanTempatByUserId,
  ] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const getAllReservationByUserId = async () => {
    setLoading(true);
    try {
      const res = await getAllReservation(
        INITIAL_PAGE,
        DEFAULT_LIMIT,
        "",
        currentUser?.id,
        ""
      );
      let allReservation: any[] = res.data.data.data;

      let allResrvationWithCorrectEmail: any[] = [];
      allReservation.map((data) => {
        const singleReserve = {
          ...data,
          suratPermohonan: data.suratPermohonan
            ? `${API_URL}/${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/Attachment/SuratPermohonan`
            : null,
          proposal: data.proposal
            ? `${API_URL}/${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/Attachment/Proposal`
            : null,
        };

        allResrvationWithCorrectEmail.push(singleReserve);
      });

      SetAllReservationPesanTempatByUserId(allResrvationWithCorrectEmail);
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

  const getAllReservationPesanTempat = async (search = "") =>
    // fromPengelola?: boolean, //update ariko reservasi status kurasi dapat dilihat oleh pengelola
    //fromKurasi?: boolean //update ariko reservasi status kurasi dapat dilihat semua oleh kurator
    {
      setLoading(true);
      try {
        const reservations = await getAllReservation(
          INITIAL_PAGE,
          DEFAULT_LIMIT,
          search,
          "",
          "" //update ariko reservasi status kurasi dapat dilihat semua oleh kurator
        );
        let allReservation: any[] = reservations.data.data.data;

        let allReservationWithFile: any[] = [];
        allReservation.map((data) => {
          const singleReserve = {
            ...data,
            suratPermohonan: data.suratPermohonan
              ? `${API_URL}/${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/Attachment/SuratPermohonan`
              : null,
            proposal: data.proposal
              ? `${API_URL}/${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/Attachment/Proposal`
              : null,
            suratPermohonanByPengelola: data.suratPermohonanByPengelola
              ? `${API_URL}/${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/Attachment/SuratPermohonanPengelola`
              : null,
            statusDesc: globalVar.exportStatusPesanTempatToTitle(data.status),
          };

          allReservationWithFile.push(singleReserve);
        });

        SetAllReservationPesanTempat(allReservationWithFile);
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
        Swal.fire({
          title:
            '<i class="ki-solid ki-gear fs-5x icon-spin"></i><span class="sr-only"> Menyimpan</span>',
          text: "Menyimpan, mohon tunggu",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
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
        Swal.fire({
          title:
            '<i class="ki-solid ki-gear fs-5x icon-spin"></i><span class="sr-only"> Menyimpan</span>',
          text: "Menyimpan, mohon tunggu",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
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
      text:
        status == "Done"
          ? "Apakah anda yakin ingin menyelesaikan pesanan?"
          : status == "Reject"
          ? "Apakah anda yakin ingin menolak pesanan?"
          : status == "Kurasi"
          ? "Apakah anda yakin ingin melanjutkan pesanan ke kurator?"
          : status == "Answer-Letter"
          ? "Apakah anda yakin ingin menerima kurasi reservasi?"
          : status == "Revise"
          ? "Apakah anda yakin ingin merekomendasikan revisi?"
          : "",
      onConfirm: async () => {
        Swal.fire({
          title:
            '<i class="ki-solid ki-gear fs-5x icon-spin"></i><span class="sr-only"> Menyimpan</span>',
          text: "Menyimpan, mohon tunggu",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        try {
          await changeStatusReservation({ ...newData }, status);

          Swal.fire({
            icon: "success",
            title: "Status reservasi berhasil terubah",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            getAllReservationPesanTempat();
          });
          return true;
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: error.message,
            showConfirmButton: false,
          });
          return false;
        }
      },
    });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    getAllReservationPesanTempat(debouncedQuery);
  }, [debouncedQuery]);

  return {
    singleReservationTempat,
    loading,
    allReservationPesanTempat,
    allReservationPesanTempatByUserId,
    eventCalendar,
    setEventCalendar,
    getSinglePesanTempat,
    nextStepHandler,
    requestReservationPesanTempat,
    getAllReservationPesanTempat,
    getAllReservationByUserId,
    changeStatus,
    setQuery,
  };
}
