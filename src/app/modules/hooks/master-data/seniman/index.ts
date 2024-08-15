import { useEffect, useState } from "react";
import {
  add,
  getAll,
  getSinglePhoto,
  remove,
  update,
} from "../../../requests/master-data/seniman";
import Swal from "sweetalert2";
import { ENDPOINTS } from "../../../../constants/API";

export default function useSeniman() {
  const [seniman, setSeniman] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllSeniman = async () => {
    setLoading(true);

    try {
      const res = await getAll(1, 1000);
      const data: any[] = [];
      for (let index = 0; index < res.data.data.length; index++) {
        const ell = res.data.data[index];
        const dataWithStream = {
          ...ell,
          file: `${ENDPOINTS.SENIMAN.SENIMAN_IMAGE}${ell.id}/Image?isStream=true`,
        };
        data.push(dataWithStream);
      }
      setSeniman(data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data seniman",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const getSinglePhotoSeniman = async (id: any) => {
    return getSinglePhoto(id);
  };

  const addSeniman = async (data: any) => {
    setLoading(true);
    try {
      const res = await add(
        data.file,
        "Sementara",
        data.name,
        data.biografi,
        data.performanceDesc
      );
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menambah data seniman",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllSeniman();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan data seniman",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const updateSeniman = async (data: any) => {
    setLoading(true);
    try {
      const res = await update(
        data.id,
        data.file,
        "sementara",
        data.name,
        data.biografi,
        data.performanceDesc
      );
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil mengubah data seniman",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllSeniman();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah data seniman",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };

  const deleteSeniman = async (id: any) => {
    setLoading(true);
    try {
      const res = await remove(id);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Berhasil menghapus data seniman",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchAllSeniman();
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus data seniman",
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

  return { seniman, addSeniman, updateSeniman, deleteSeniman, loading };
}
