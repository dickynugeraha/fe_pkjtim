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
import { INITIAL_PAGE, DEFAULT_LIMIT } from "../../../../constants/PAGE";
import axiosConfig from "../../../../utils/services/axiosConfig";
import { useAuth } from "../../../auth";

export default function useSeniman() {
  const { currentUser } = useAuth();
  const actor = currentUser?.email ?? "Admin";

  const [seniman, setSeniman] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [formFile, setFormFile] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    file: null,
    name: "",
    biografi: "",
    performanceDesc: "",
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
        name: "",
        biografi: "",
        performanceDesc: "",
        file: null,
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
    searchSeniman(debouncedQuery);
  }, [debouncedQuery]);
  const fetchAllSeniman = async () => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT);

      const data: any[] = [];
      for (let index = 0; index < res.data.data.data.length; index++) {
        const ell = res.data.data.data[index];
        const imageUrl: any = `${ENDPOINTS.SENIMAN.SENIMAN_IMAGE}/${ell.id}/Image?isStream=false`;
        const resBase64 = await axiosConfig.get(imageUrl);
        const base64 = `data:image/png;base64,${resBase64.data.data.fileContents}`;
        const dataWithStream = {
          ...ell,
          file: base64,
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
        timer: 2000,
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const searchSeniman = async (Search: string) => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT, Search);
      const data: any[] = [];
      for (let index = 0; index < res.data.data.length; index++) {
        const ell = res.data.data[index];
        const dataWithStream = {
          ...ell,
          file: `${ENDPOINTS.SENIMAN.SENIMAN_IMAGE}/${ell.id}/Image?isStream=true`,
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
        timer: 2000,
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const addSeniman = async (data: any) => {
    // const validate = validateForm(data);
    // if (!validate) return;
    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan penambahan data?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      showLoaderOnConfirm: true,
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
        Swal.fire({
          title:
            '<i class="ki-solid ki-gear fs-5x icon-spin"></i><span class="sr-only"> Menyimpan</span>',
          text: "Menyimpan, mohon tunggu",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        try {
          const res = await add(data, actor);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil menambah data seniman",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              closeModal();
              fetchAllSeniman();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menambahkan data seniman",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
    });
  };

  const updateSeniman = async (data: any) => {
    // const validate = validateForm(data);
    // if (!validate) return;
    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan perubahan data?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      showLoaderOnConfirm: true,
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
        Swal.fire({
          title:
            '<i class="ki-solid ki-gear fs-5x icon-spin"></i><span class="sr-only"> Menyimpan</span>',
          text: "Menyimpan, mohon tunggu",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        try {
          const res = await update(data, actor);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil mengubah data seniman",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              closeModal();
              fetchAllSeniman();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal mengubah data seniman",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
    });
  };

  const deleteSeniman = async (id: any) => {
    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan hapus data?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      showLoaderOnConfirm: true,
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
        Swal.fire({
          title:
            '<i class="ki-solid ki-gear fs-5x icon-spin"></i><span class="sr-only"> Menyimpan</span>',
          text: "Menyimpan, mohon tunggu",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        try {
          const res = await remove(id, actor);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil menghapus data seniman",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              fetchAllSeniman();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menghapus data seniman",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAllSeniman();
  }, []);

  return {
    seniman,
    addSeniman,
    updateSeniman,
    deleteSeniman,
    searchSeniman,
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
