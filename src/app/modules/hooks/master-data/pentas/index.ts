import { useEffect, useState } from "react";
import {
  add,
  getAll,
  remove,
  update,
} from "../../../requests/master-data/pentas";
import Swal from "sweetalert2";
import { ENDPOINTS } from "../../../../constants/API";
import { INITIAL_PAGE, DEFAULT_LIMIT } from "../../../../constants/PAGE";

export default function usePentas() {
  const [pementasan, setPentas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllSeniman = async () => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT);
      const data: any[] = [];
      for (let index = 0; index < res.data.data.length; index++) {
        const ell = res.data.data[index];
        const dataWithStream = {
          ...ell,
          file: `${ENDPOINTS.PENTAS.PENTAS_IMAGE}/${ell.id}/Image?isStream=true`,
        };
        data.push(dataWithStream);
      }
      setPentas(data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data pementasan",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const searchPementasan = async (Search: string) => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT, Search);
      const data: any[] = [];
      for (let index = 0; index < res.data.data.length; index++) {
        const ell = res.data.data[index];
        const dataWithStream = {
          ...ell,
          file: `${ENDPOINTS.PENTAS.PENTAS_IMAGE}/${ell.id}/Image?isStream=true`,
        };
        data.push(dataWithStream);
      }
      setPentas(data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data pementasan",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const addPementasan = async (data: any) => {
    setLoading(true);
    try {
      const res = await add(data);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menambah data pementasan",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllSeniman();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan data pementasan",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const updatePementasan = async (data: any) => {
    setLoading(true);
    try {
      const res = await update(data);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil mengubah data pementasan",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllSeniman();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah data pementasan",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const deletePementasan = async (id: any) => {
    setLoading(true);
    try {
      const res = await remove(id);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menghapus data pementasan",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllSeniman();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus data pementasan",
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
    pementasan,
    addPementasan,
    updatePementasan,
    deletePementasan,
    searchPementasan,
    loading,
  };
}
