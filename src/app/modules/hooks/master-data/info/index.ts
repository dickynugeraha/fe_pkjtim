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
import axiosConfig from "../../../../utils/services/axiosConfig";

export default function useInfo() {
  const [info, setInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formFile, setFormFile] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    file: null,
    name: "",
    title: "",
    content: "",
    status: "",
    publishedAt: "",
    tempatId: "",
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
        id: null,
        file: null,
        name: "",
        title: "",
        content: "",
        status: "",
        publishedAt: "",
        tempatId: "",
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
    searchInfo(debouncedQuery);
  }, [debouncedQuery]);

  const fetchAllInfo = async () => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT);

      const data: any[] = [];
      for (let index = 0; index < res.data.data.data.length; index++) {
        const ell = res.data.data.data[index];
        const imageUrl: any = `${ENDPOINTS.NEWS.NEWS_IMAGE}/${ell.id}/Image?isStream=false`;
        const resBase64 = await axiosConfig.get(imageUrl);
        const base64 = `data:image/png;base64,${resBase64.data.data.fileContents}`;
        const dataWithStream = {
          ...ell,
          file: base64,
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
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const addInfo = async (data: any) => {
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

          Swal.fire({
            icon: "success",
            title: "Berhasil menambah data info",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            fetchAllInfo();
          });
        }
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan data info",
        text: error.message,
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  const updateInfo = async (data: any) => {
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
          const res = await update(data);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil mengubah data info",
              showConfirmButton: false,
              timer: 2000,
            });

            fetchAllInfo();
          }
        }
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah data info",
        text: error.message,
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  const deleteInfo = async (id: any) => {
    setLoading(true);
    try {
      Swal.fire({
        title: "Apakah anda yakin",
        text: "Akan melakukan penghapusan data?!",
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
          const res = await remove(id);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil menghapus data info",
              showConfirmButton: false,
              timer: 2000,
            });
            fetchAllInfo();
          }
        }
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal menghapus data info",
        text: error.message,
        showConfirmButton: false,
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
    setQuery,
    isModalOpen,
    isEdit,
    openModal,
    closeModal,
    handleChange,
    formData,
    formFile,
    setFormFile,
  };
}
