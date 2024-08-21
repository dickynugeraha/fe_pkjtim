import { useEffect, useState } from "react";
import {
  add,
  getAll,
  remove,
  update,
} from "../../../requests/master-data/tempat-tutup";
import Swal from "sweetalert2";
import { INITIAL_PAGE, DEFAULT_LIMIT } from "../../../../constants/PAGE";

export default function useTutupTempat() {
  const [tutupTempat, setTutupTempat] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllTutupTempat = async (Search = "") => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT, Search);

      setTutupTempat(res.data.data.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data tutup tempat",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const addTutupTempat = async (data: any) => {
    console.log("data from view", data);

    setLoading(true);
    try {
      const res = await add(data);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menambah data tutup tempat",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllTutupTempat();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan data tutup tempat",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const updateTutupTempat = async (data: any) => {
    setLoading(true);
    try {
      const res = await update(data);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil mengubah data tutup tempat",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllTutupTempat();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah data tutup tempat",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const deleteTutupTempat = async (id: any) => {
    setLoading(true);
    try {
      const res = await remove(id);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menghapus data tutup tempat",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllTutupTempat();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus data tutup tempat",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
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
    loading,
  };
}
