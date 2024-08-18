import { useEffect, useState } from "react";
import {
  add,
  getAll,
  getSinglePhoto,
  remove,
  update,
} from "../../../requests/master-data/seni";
import Swal from "sweetalert2";
import { ENDPOINTS } from "../../../../constants/API";
import { INITIAL_PAGE, DEFAULT_LIMIT } from "../../../../constants/PAGE";
import globalVar from "../../../../helper/globalVar";

export default function useSeni() {
  const [seni, setSeni] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllSeniman = async () => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT);
      const data: any[] = [];
      for (let index = 0; index < res.data.data.length; index++) {
        const ell = res.data.data[index];
        const urlImage = `${ENDPOINTS.SENI.SENI_IMAGE}/${ell.id}/Image?isStream=true`;
        const dataWithStream = {
          ...ell,
          file: urlImage,
        };
        data.push(dataWithStream);
      }
      setSeni(data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data seni",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const searchSeni = async (Search: string) => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT, Search);
      const data: any[] = [];
      for (let index = 0; index < res.data.data.length; index++) {
        const ell = res.data.data[index];
        const dataWithStream = {
          ...ell,
          file: `${ENDPOINTS.SENI.SENI_IMAGE}/${ell.id}/Image?isStream=true`,
        };
        data.push(dataWithStream);
      }
      setSeni(data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data seni",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const addSeni = async (data: any) => {
    setLoading(true);
    try {
      const res = await add(data.file, "Iq", data.title, data.desc);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menambah data seni",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllSeniman();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan data seni",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const updateSeni = async (data: any) => {
    setLoading(true);
    try {
      const res = await update(data.id, data.file, "Iq", data.title, data.desc);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil mengubah data seni",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllSeniman();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah data seni",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const deleteSeni = async (id: any) => {
    setLoading(true);
    try {
      const res = await remove(id);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menghapus data seni",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllSeniman();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus data seni",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllSeniman();
  }, []);

  return {
    seni,
    addSeni,
    updateSeni,
    deleteSeni,
    searchSeni,
    loading,
  };
}
