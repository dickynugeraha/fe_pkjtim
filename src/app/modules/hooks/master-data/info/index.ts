import { useEffect, useState } from "react";
import {
  add,
  getAll,
  remove,
  update,
} from "../../../requests/master-data/info";
import Swal from "sweetalert2";
import { ENDPOINTS } from "../../../../constants/API";
import { INITIAL_PAGE, DEFAULT_LIMIT } from "../../../../constants/PAGE";

export default function useInfo() {
  const [info, setInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllInfo = async () => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT);
      const data: any[] = [];
      for (let index = 0; index < res.data.data.data.length; index++) {
        const ell = res.data.data.data[index];
        const dataWithStream = {
          ...ell,
          file: `${ENDPOINTS.NEWS.NEWS_IMAGE}/${ell.id}/Image?isStream=true`,
        };

        data.push(dataWithStream);
      }
      setInfo(data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data info",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const searchInfo = async (Search: string) => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT, Search);
      const data: any[] = [];
      for (let index = 0; index < res.data.data.data.length; index++) {
        const ell = res.data.data.data[index];
        const dataWithStream = {
          ...ell,
          file: `${ENDPOINTS.NEWS.NEWS_IMAGE}/${ell.id}/Image?isStream=true`,
        };
        data.push(dataWithStream);
      }
      setInfo(data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data info",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const addInfo = async (data: any) => {
    setLoading(true);
    try {
      const res = await add(data);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menambah data info",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllInfo();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan data info",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const updateInfo = async (data: any) => {
    setLoading(true);
    try {
      const res = await update(data);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil mengubah data info",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllInfo();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah data info",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const deleteInfo = async (id: any) => {
    setLoading(true);
    try {
      const res = await remove(id);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menghapus data info",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllInfo();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus data info",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllInfo();
  }, []);

  return {
    info,
    addInfo,
    updateInfo,
    deleteInfo,
    searchInfo,
    loading,
  };
}
