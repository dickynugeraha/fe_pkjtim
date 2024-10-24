import { useEffect, useState } from "react";
import {
  add,
  getAll,
  remove,
  update,
} from "../../../requests/master-data/tempat";
import Swal from "sweetalert2";
import { INITIAL_PAGE, DEFAULT_LIMIT } from "../../../../constants/PAGE";
import { useAuth } from "../../../auth";
import { ENDPOINTS } from "../../../../constants/API";

export default function useTempat() {
  const { currentUser } = useAuth();
  const actor = currentUser?.email ?? "Admin";

  const [tempat, setTempat] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formFile, setFormFile] = useState(null);

  const [formData, setFormData] = useState({
    id: null,
    actor: "",
    name: "",
    photo: "",
    priceMainEventWeekEnd: 0,
    priceMainEventWeekDay: 0,
    pricePreEventWeekEnd: 0,
    pricePreEventWeekDay: 0,
  });
  const [isPreEvent, setIsPreEvent] = useState(
    formData.pricePreEventWeekDay !== 0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const openModal = (data = null) => {
    if (data) {
      setFormData(data);
      setIsEdit(true);
    } else {
      setFormData({
        id: null,
        actor: "",
        photo: "",
        name: "",
        priceMainEventWeekEnd: 0,
        priceMainEventWeekDay: 0,
        pricePreEventWeekEnd: 0,
        pricePreEventWeekDay: 0,
      });
      setIsEdit(false);
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setFormFile(null);
  };
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    fetchAllTempat(debouncedQuery);
  }, [debouncedQuery]);

  const fetchAllTempat = async (Search = "") => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT, Search);
      const data: any[] = [];
      for (let index = 0; index < res.data.data.data.length; index++) {
        const ell = res.data.data.data[index];

        const imageUrl: any = `${ENDPOINTS.TEMPAT.TEMPAT_IMAGE}/${ell.id}/Image?isStream=true`;
        const dataWithStream = {
          ...ell,
          photo: imageUrl,
        };
        data.push(dataWithStream);
      }

      setTempat(data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data tempat",
        text: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const addTempat = async (data: any) => {
    // const validate = validateForm(data);
    // if (!validate) return;
    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan penambahan data?!",
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
        Swal.fire({
          title:
            '<i class="ki-solid ki-gear fs-5x icon-spin"></i><span class="sr-only"> Menyimpan</span>',
          text: "Menyimpan, mohon tunggu",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        try {
          const res = await add(data, actor);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil menambah data tempat",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              closeModal();
              fetchAllTempat();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menambahkan data tempat",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
    });
  };

  const updateTempat = async (data: any) => {
    // const validate = validateForm(data);
    // if (!validate) return;
    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan perubahan data?!",
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
        Swal.fire({
          title:
            '<i class="ki-solid ki-gear fs-5x icon-spin"></i><span class="sr-only"> Menyimpan</span>',
          text: "Menyimpan, mohon tunggu",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        try {
          const res = await update(data, actor);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil mengubah data tempat",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              closeModal();
              fetchAllTempat();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal mengubah data tempat",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
    });
  };

  const deleteTempat = async (id: any) => {
    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan hapus data?!",
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
        Swal.fire({
          title:
            '<i class="ki-solid ki-gear fs-5x icon-spin"></i><span class="sr-only"> Menyimpan</span>',
          text: "Menyimpan, mohon tunggu",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        try {
          const res = await remove(id, actor);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil menghapus data tempat",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              fetchAllTempat();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menghapus data tempat",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
    });
  };

  return {
    tempat,
    loading,
    isPreEvent,
    isModalOpen,
    formData,
    isEdit,
    addTempat,
    setFormFile,
    formFile,
    updateTempat,
    deleteTempat,
    fetchAllTempat,
    openModal,
    setIsPreEvent,
    setQuery,
    handleChange,
    closeModal,
  };
}
