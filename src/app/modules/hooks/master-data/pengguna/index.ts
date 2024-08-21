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

  const fetchAllPengguna = async (Search = "") => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT, Search);
      console.log("resssss", res);

      setPengguna(res.data.data.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data pengguna",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const addPengguna = async (data: any) => {
    setLoading(true);
    try {
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
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan data pengguna",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const updatePengguna = async (data: any) => {
    setLoading(true);
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
        title: "Gagal mengubah data pengguna",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };
  const approveRequestRegisterFromAdmin = async (id: any) => {
    setLoading(true);
    try {
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
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Register pengguna gagal di setujui",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const deletePengguna = async (id: any) => {
    setLoading(true);
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
        title: "Gagal menghapus data pengguna",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
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
  };
}
