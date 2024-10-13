import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  initReservation,
  singleReservation,
  submitReservation,
  getAllReservation,
  rejectReservation as reject,
  approveReservation as approve,
  changeVisitDate,
} from "../../requests/planetarium";
import { useAuth } from "../../auth";
import { useNavigate } from "react-router-dom";
import { DEFAULT_LIMIT, INITIAL_PAGE } from "../../../constants/PAGE";
import ConfirmationDialog from "../../../../_metronic/layout/components/content/ConfirmationDialog";
import { API_URL, ENDPOINTS } from "../../../constants/API";
import { ROLE } from "../../../constants/ROLE";
import globalVar from "../../../helper/globalVar";
import axiosConfig from "../../../utils/services/axiosConfig";

export default function usePlanetarium() {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const { currentUser } = useAuth();
  const actorEmail = currentUser?.email ?? "Admin";
  const [allReservationPlanetarium, setAllReservationPlanetarium] = useState<
    any[]
  >([]);
  const [
    allReservationPlanetariumByUserId,
    setAllReservationPlanetariumByUserId,
  ] = useState<any[]>([]);
  const [singleReservationPlanetarium, setSingleReservationPlanetarium] =
    useState<any>({});
  const [disabledDates, setDisabledDates] = useState<any[]>([]);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    show: boolean;
    data: any;
  }>({
    show: false,
    data: {},
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setIsValidated(false);
  };

  const openModal = (data = null) => {
    if (data) {
      setFormData(data);
      setIsValidated(false);
    } else {
      setFormData({
        show: false,
        data: {},
      });
    }
    setIsModalOpen(true);
  };

  const nextStepHandler = async (
    indoor: any,
    outdoor: any,
    bookingDate: any
  ) => {
    if (!currentUser?.email) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Silahkan login terlebih dahulu!",
        showConfirmButton: false,
      });
      return;
    }
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
            IsPeneropongan: outdoor.peneropongan_matahari ? true : false,
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

  const getAllReservationPlanetariumByUserId = async (search = "") => {
    setLoading(true);
    try {
      const res = await getAllReservation(
        INITIAL_PAGE,
        DEFAULT_LIMIT,
        search,
        currentUser?.id
      );
      let allReservation: any[] = res.data.data.data;

      let allResrvationWithFile: any[] = [];
      allReservation.map((data) => {
        const singlePlanet = {
          ...data,
          pernyataanPersetujuan: data.pernyataanPersetujuan
            ? `${API_URL}/${ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM}/${data.id}/Attachment/PernyataanPersetujuan`
            : null,
          suratUndangan: data.suratUndangan
            ? `${API_URL}/${ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM}/${data.id}/Attachment/SuratUndangan`
            : null,
        };
        allResrvationWithFile.push(singlePlanet);
      });

      setAllReservationPlanetariumByUserId(allResrvationWithFile);
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

  const getAllReservationPlanetarium = async (search = "") => {
    setLoading(true);
    try {
      const res = await getAllReservation(
        INITIAL_PAGE,
        DEFAULT_LIMIT,
        search,
        ""
      );
      let allReservation: any[] = res.data.data.data;
      let allResrvationWithFile: any[] = [];
      let allReservationPlanetariumDates: any[] = [];

      allReservation.map((data) => {
        const singlePlanet = {
          ...data,
          pernyataanPersetujuan: data.pernyataanPersetujuan
            ? `${API_URL}/${ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM}/${data.id}/Attachment/PernyataanPersetujuan`
            : null,
          suratUndangan: data.suratUndangan
            ? `${API_URL}/${ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM}/${data.id}/Attachment/SuratUndangan`
            : null,
        };
        allResrvationWithFile.push(singlePlanet);
      });

      allReservation.map((b) => {
        if (b?.status != "EXPIRED" && b?.status != "REJECT") {
          allReservationPlanetariumDates.push(
            new Date(globalVar.formatInputDate(b?.tanggalKunjungan))
          );
        }
      });

      setDisabledDates(allReservationPlanetariumDates);
      setAllReservationPlanetarium(allResrvationWithFile);
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
            getAllReservationPlanetarium();
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
            getAllReservationPlanetarium();
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

  const updateVisitDate = async (data: any) => {
    console.log("DATA",data);
    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan penjadwalan ulang?!",
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
      setLoading(true);
      if (result.isConfirmed) {
        try {
          const res = await changeVisitDate(data, actorEmail);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil menjadwalkan ulang",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              closeModal();
              getAllReservationPlanetarium(debouncedQuery);
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menjadwalkan ulang",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
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
    getAllReservationPlanetarium(debouncedQuery);
  }, [debouncedQuery]);

  return {
    loading,
    singleReservationPlanetarium,
    allReservationPlanetarium,
    allReservationPlanetariumByUserId,
    disabledDates,
    isModalOpen,
    formData,
    isValidated,
    setIsValidated,
    updateVisitDate,
    openModal,
    closeModal,
    nextStepHandler,
    requestReservationPlanetarium,
    getSingleReservationPlanetarium,
    getAllReservationPlanetarium,
    getAllReservationPlanetariumByUserId,
    rejectReservation,
    approveReservation,
    setQuery,
  };
}
