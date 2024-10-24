import { useCallback, useEffect, useState } from "react";
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
import { useAuth } from "../../../auth";

export default function useInfo() {
  const { currentUser } = useAuth();
  const actor = currentUser?.email ?? "Admin";

  const [info, setInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
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
      setIsValidated(false);
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
    setIsValidated(false);
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

  const fetchAllInfo = useCallback(async () => {
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
  }, [info]);

  const searchInfo = useCallback(
    async (Search: string) => {
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
    },
    [info]
  );

  const addInfo = async (data: any) => {
    // const validate = validateForm(data);
    // if (!validate) return;
    setLoading(true);
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
      if (result.isConfirmed) {
        Swal.fire({
          title:
            '<i class="ki-solid ki-gear fs-5x icon-spin"></i><span class="sr-only"> Menyimpan</span>',
          text: "Menyimpan, mohon tunggu",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        try {
          await add(data, actor);

          Swal.fire({
            icon: "success",
            title: "Berhasil menambah data info",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            closeModal();
            fetchAllInfo();
          });
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menambahkan data info",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
    });

    setLoading(false);
  };

  const updateInfo = async (data: any) => {
    // const validate = validateForm(data);
    // if (!validate) return;
    setLoading(true);
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
              title: "Berhasil mengubah data info",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              closeModal();
              fetchAllInfo();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal mengubah data info",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
    });
    setLoading(false);
  };

  const deleteInfo = async (id: any) => {
    setLoading(true);
    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan penghapusan data?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      showLoaderOnConfirm: true,
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
              title: "Berhasil menghapus data info",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              fetchAllInfo();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menghapus data info",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
    });
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
    isValidated,
    setIsValidated,
    fetchAllInfo,
  };
}
