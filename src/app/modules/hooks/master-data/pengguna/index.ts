import { useEffect, useState } from "react";
import {
  add,
  approve,
  getAll,
  remove,
  update,
} from "../../../requests/master-data/pengguna";
import Swal from "sweetalert2";
import { INITIAL_PAGE, DEFAULT_LIMIT } from "../../../../constants/PAGE";

export default function usePengguna() {
  const [pengguna, setPengguna] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    id: null,
    isLocked: false,
    phoneNumber: "",
    status: "",
    role: "",
  });
  const [isLockedCheck, setIsLockedCheck] = useState(false);
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
        email: "",
        fullName: "",
        id: null,
        isLocked: false,
        phoneNumber: "",
        status: "",
        role: "",
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
    fetchAllPengguna(debouncedQuery);
  }, [debouncedQuery]);

  const fetchAllPengguna = async (Search = "") => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT, Search);

      setPengguna(res.data.data.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data pengguna",
        text: error.message,
        showConfirmButton: false,
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const addPengguna = async (data: any) => {
    setLoading(true);
    try {
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
          const res = await add(data);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil menambah data pengguna",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchAllPengguna();
          }
        }
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan data pengguna",
        text: error.message,
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  const updatePengguna = async (data: any) => {
    setLoading(true);
    try {
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
        if (result.isConfirmed) {
          try {
            const res = await update(data);
            if (res) {
              Swal.fire({
                icon: "success",
                title: "Berhasil mengubah data pengguna",
                showConfirmButton: false,
                timer: 1500,
              });
              fetchAllPengguna();
            }
          } catch (error: any) {
            Swal.fire({
              icon: "error",
              title: "Gagal menghapus data",
              text: error.message,
              showConfirmButton: false,
            });
          }
        }
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah data pengguna",
        text: error.message,
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  const approveRequestRegisterFromAdmin = async (id: any) => {
    setLoading(true);
    try {
      Swal.fire({
        title: "Apakah anda yakin",
        text: "Akan melakukan Persetujuan request?!",
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
          const res = await approve(id);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Register pengguna berhasil di setujui",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchAllPengguna();
          }
        }
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Register pengguna gagal di setujui",
        text: error.message,
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  const deletePengguna = async (id: any) => {
    setLoading(true);
    try {
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
        if (result.isConfirmed) {
          try {
            const res = await remove(id);
            if (res) {
              Swal.fire({
                icon: "success",
                title: "Berhasil menghapus data pengguna",
                showConfirmButton: false,
                timer: 1500,
              });
              fetchAllPengguna();
            }
          } catch (error: any) {
            Swal.fire({
              icon: "error",
              title: "Gagal menghapus data",
              text: error.message,
              showConfirmButton: false,
            });
          }
        }
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus data pengguna",
        text: error.message,
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllPengguna();
  }, []);

  return {
    pengguna,
    addPengguna,
    updatePengguna,
    deletePengguna,
    fetchAllPengguna,
    approveRequestRegisterFromAdmin,
    loading,
    setQuery,
    isModalOpen,
    isEdit,
    openModal,
    closeModal,
    handleChange,
    formData,
    isLockedCheck,
    setIsLockedCheck,
  };
}
