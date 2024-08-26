import { useEffect, useState } from "react";
import {
  add,
  getAll,
  remove,
  update,
} from "../../../requests/master-data/tempat-tutup";
import Swal from "sweetalert2";
import { INITIAL_PAGE, DEFAULT_LIMIT } from "../../../../constants/PAGE";
import globalVar from "../../../../helper/globalVar";
import { useAuth } from "../../../auth";

export default function useTutupTempat() {
  const { currentUser } = useAuth();
  const actor = currentUser?.email ?? "Admin";

  const [tutupTempat, setTutupTempat] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    tempatId: null,
    startDate: null,
    endDate: null,
  });
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
        tempatId: null,
        startDate: null,
        endDate: null,
      });
      setIsEdit(false);
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
    fetchAllTutupTempat(debouncedQuery);
  }, [debouncedQuery]);

  const validateForm = (data: any) => {
    if (!data.startDate || !data.endDate) {
      console.log("kesiniiii");

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Semua field harus diisi!",
        showConfirmButton: false,
      });
      return false;
    }
    return true;
  };

  const fetchAllTutupTempat = async (Search = "") => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT, Search);
      const data: any[] = [];
      for (let index = 0; index < res.data.data.data.length; index++) {
        const ell = res.data.data.data[index];
        const dataWithStream = {
          ...ell,
          startDate: globalVar.formatInputDate(ell.startDate),
          endDate: globalVar.formatInputDate(ell.endDate),
        };
        data.push(dataWithStream);
      }

      setTutupTempat(data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data tutup tempat",
        text: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const addTutupTempat = async (data: any) => {
    const validate = validateForm(data);
    if (!validate) return;

    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan penambahan data?!",
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
        setLoading(true);
        try {
          const res = await add(data, actor);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil menambah data tutup tempat",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              closeModal();
              fetchAllTutupTempat();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menambahkan data tutup tempat",
            text: error.message,
            showConfirmButton: false,
          });
        }
        setLoading(false);
      }
    });
  };

  const updateTutupTempat = async (data: any) => {
    const validate = validateForm(data);
    if (!validate) return;

    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan perubahan data?!",
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
      setLoading(true);
      if (result.isConfirmed) {
        try {
          const res = await update(data, actor);

          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil mengubah data tutup tempat",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              closeModal();
              fetchAllTutupTempat();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal mengubah data tutup tempat",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
    });
  };

  const deleteTutupTempat = async (id: any) => {
    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan hapus data?!",
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
      setLoading(true);
      if (result.isConfirmed) {
        try {
          const res = await remove(id, actor);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil menghapus data tutup tempat",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              fetchAllTutupTempat();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menghapus data tutup tempat",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAllTutupTempat();
  }, []);

  return {
    tutupTempat,
    addTutupTempat,
    updateTutupTempat,
    deleteTutupTempat,
    fetchAllTutupTempat,
    setQuery,
    isModalOpen,
    isEdit,
    openModal,
    closeModal,
    handleChange,
    formData,
    loading,
  };
}
