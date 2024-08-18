import { useEffect, useState } from "react";
import {
  add,
  getAll,
  remove,
  update,
} from "../../../requests/master-data/tempat";
import Swal from "sweetalert2";
import { INITIAL_PAGE, DEFAULT_LIMIT } from "../../../../constants/PAGE";

export default function useTempat() {
  const [tempat, setTempat] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllTempat = async (Search = "") => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT, Search);

      setTempat(res.data.data.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data tempat",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const addTempat = async (data: any) => {
    setLoading(true);
    try {
      const res = await add(data);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menambah data tempat",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllTempat();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan data tempat",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const updateTempat = async (data: any) => {
    setLoading(true);
    try {
      const res = await update(data);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil mengubah data tempat",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllTempat();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah data tempat",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const deleteTempat = async (id: any) => {
    setLoading(true);
    try {
      const res = await remove(id);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menghapus data tempat",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllTempat();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus data tempat",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllTempat();
  }, []);

  return {
    tempat,
    addTempat,
    updateTempat,
    deleteTempat,
    fetchAllTempat,
    loading,
  };
}
