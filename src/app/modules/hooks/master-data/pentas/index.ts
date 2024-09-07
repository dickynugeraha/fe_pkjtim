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
import axiosConfig from "../../../../utils/services/axiosConfig";
import globalVar from "../../../../helper/globalVar";
import { useAuth } from "../../../auth";

export default function usePentas() {
  const { currentUser } = useAuth();
  const actor = currentUser?.email ?? "Admin";

  const [pementasan, setPentas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [formFile, setFormFile] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    file: null,
    tempatId: "",
    title: "",
    sinopsis: "",
    namaSanggar: "",
    status: "",
    jumlahPelakuSeni: "",
    jumlahPekerjaSeni: "",
    jumlahPenonton: "",
    startDate: "",
    endDate: "",
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
        tempatId: "",
        title: "",
        sinopsis: "",
        namaSanggar: "",
        status: "",
        jumlahPelakuSeni: "",
        jumlahPekerjaSeni: "",
        jumlahPenonton: "",
        startDate: "",
        endDate: "",
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
    searchPementasan(debouncedQuery);
  }, [debouncedQuery]);

  const fetchAllPentas = async () => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT);

      const data: any[] = [];
      for (let index = 0; index < res.data.data.data.length; index++) {
        const ell = res.data.data.data[index];

        const imageUrl: any = `${ENDPOINTS.PENTAS.PENTAS_IMAGE}/${ell.id}/Image?isStream=false`;
        const resBase64 = await axiosConfig.get(imageUrl);

        const base64 = `data:image/png;base64,${resBase64.data.data.fileContents}`;
        const dataWithStream = {
          ...ell,
          startDate: globalVar.formatInputDate(ell.startDate),
          endDate: globalVar.formatInputDate(ell.endDate),
          file: base64,
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
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const searchPementasan = async (Search: string) => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT, Search);
      const data: any[] = [];
      for (let index = 0; index < res.data.data.length; index++) {
        const ell = res.data.data[index];
        const imageUrl: any = `${ENDPOINTS.PENTAS.PENTAS_IMAGE}/${ell.id}/Image?isStream=false`;
        const resBase64 = await axiosConfig.get(imageUrl);

        const base64 = `data:image/png;base64,${resBase64.data.data.fileContents}`;
        const dataWithStream = {
          ...ell,
          startDate: globalVar.formatInputDate(ell.startDate),
          endDate: globalVar.formatInputDate(ell.endDate),
          file: base64,
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
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const addPementasan = async (data: any) => {
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
        try {
          const res = await add(data, actor);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil menambah data pementasan",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              closeModal();
              fetchAllPentas();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menambahkan data pementasan",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
    });
  };

  const updatePementasan = async (data: any) => {
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
        try {
          const res = await update(data, actor);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil mengubah data pementasan",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              closeModal();
              fetchAllPentas();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal mengubah data pementasan",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
    });
  };

  const deletePementasan = async (id: any) => {
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
        try {
          const res = await remove(id, actor);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil menghapus data pementasan",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              fetchAllPentas();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menghapus data pementasan",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAllPentas();
  }, []);

  return {
    pementasan,
    addPementasan,
    updatePementasan,
    deletePementasan,
    searchPementasan,
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
