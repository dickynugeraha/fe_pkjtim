import { useEffect, useState } from "react";
import {
  add,
  approve,
  changePassword,
  resendEmailVerif,
  confirmEmailVerif as confirmEmail,
  reqUpdateEmail,
  getAll,
  getSingle,
  remove,
  update,
} from "../../../requests/master-data/pengguna";
import Swal from "sweetalert2";
import { INITIAL_PAGE, DEFAULT_LIMIT } from "../../../../constants/PAGE";
import { API_URL, ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function usePengguna() {
  const [pengguna, setPengguna] = useState<any[]>([]);
  const [singlePengguna, setSinglePengguna] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [formFile, setFormFile] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    id: null,
    isLocked: false,
    phoneNumber: "",
    status: "",
    komite: "",
    role: "",
  });
  const [isLockedCheck, setIsLockedCheck] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
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
        email: "",
        fullName: "",
        id: null,
        isLocked: false,
        phoneNumber: "",
        status: "",
        komite: "",
        role: "",
      });
      setIsEdit(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsValidated(false);
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
    fetchAllPengguna(debouncedQuery);
  }, [debouncedQuery]);

  const getSinglePengguna = async (id: any) => {
    setLoading(true);
    try {
      const res = await getSingle(id);

      setSinglePengguna(res.data.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data pengguna",
        text: error.message,
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  const profileChangePassword = async (data: any) => {
    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan perubahan password?!",
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
        setLoading(true);
        Swal.fire({
          title:
            '<i class="ki-solid ki-gear fs-5x icon-spin"></i><span class="sr-only"> Menyimpan</span>',
          text: "Menyimpan, mohon tunggu",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        try {
          await changePassword(data);
          Swal.fire({
            icon: "success",
            title: "Berhasil mengubah password",
            showConfirmButton: false,
            timer: 2000,
          });
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal mengubah password",
            text: error.message,
            showConfirmButton: false,
          });
        }
        setLoading(false);
      }
    });
  };

  const sendEmailVerif = async (id: any) => {
    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan verifikasi email?!",
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
        setLoading(true);
        Swal.fire({
          title:
            '<i class="ki-solid ki-gear fs-5x icon-spin"></i><span class="sr-only"> Menyimpan</span>',
          text: "Menyimpan, mohon tunggu",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        try {
          await resendEmailVerif(id);
          Swal.fire({
            icon: "success",
            title: "Verifikasi berhasil terkirim",
            showConfirmButton: false,
            timer: 2000,
          });
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Verifikasi gagal terkirim",
            text: error.message,
            showConfirmButton: false,
          });
        }
        setLoading(false);
      }
    });
  };

  const fetchAllPengguna = async (Search = "") => {
    setLoading(true);
    try {
      const res = await getAll(INITIAL_PAGE, DEFAULT_LIMIT, Search);
      const users: any[] = res.data.data.data;
      const usersWithFile: any[] = [];

      setPengguna(users);
      setLoading(false);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data pengguna",
        text: error.message,
        showConfirmButton: false,
      });
    }
  };

  const confirmEmailVerif = async (id: any, token: any, newEmail?: string) => {
    setLoading(true);
    try {
      await confirmEmail(id, token, newEmail);
      Swal.fire({
        icon: "success",
        title: "Email berhasil terverifikasi",
        text: "Anda sudah bisa memesan tempat dan dapat akses penuh terhadap aplikasi!",
        showConfirmButton: false,
        timer: 5000,
      }).then(() => {
        window.location.href = "/dashboard";
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Email gagal terverifikasi",
        text: error.message,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "/dashboard";
      });
    }
    setLoading(false);
  };

  const addPengguna = async (data: any) => {
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
          await add(data);
          Swal.fire({
            icon: "success",
            title: "Berhasil menambah data pengguna",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            fetchAllPengguna();
            closeModal();
          });
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menambahkan data pengguna",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
    });
    setLoading(false);
  };

  const updatePengguna = async (data: any) => {
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
          const res = await update(data);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil mengubah data pengguna",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              fetchAllPengguna();
              closeModal();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal mengubah data pengguna",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
    });
    setLoading(false);
  };

  const approveRequestRegisterFromAdmin = async (id: any) => {
    setLoading(true);
    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan Persetujuan request?!",
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
          const res = await approve(id);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Register pengguna berhasil di setujui",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              fetchAllPengguna();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Register pengguna gagal di setujui",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
    });
    setLoading(false);
  };

  const deletePengguna = async (id: any) => {
    setLoading(true);
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
      if (result.isConfirmed) {
        Swal.fire({
          title:
            '<i class="ki-solid ki-gear fs-5x icon-spin"></i><span class="sr-only"> Menyimpan</span>',
          text: "Menyimpan, mohon tunggu",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        try {
          const res = await remove(id);

          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil menghapus data pengguna",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              fetchAllPengguna();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menghapus data",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
    });

    setLoading(false);
  };

  const reqChangeEmail = async (
    userId: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    try {
      await reqUpdateEmail(userId, email, password);
      Swal.fire({
        icon: "success",
        title: "Email terkirim",
        text: "Silahkan periksa email saat ini.",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Email gagal terkirim",
        text: error.message,
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  return {
    addPengguna,
    updatePengguna,
    deletePengguna,
    fetchAllPengguna,
    approveRequestRegisterFromAdmin,
    setQuery,
    openModal,
    closeModal,
    handleChange,
    setIsLockedCheck,
    getSinglePengguna,
    profileChangePassword,
    sendEmailVerif,
    setIsValidated,
    setFormFile,
    confirmEmailVerif,
    reqChangeEmail,
    pengguna,
    singlePengguna,
    loading,
    isModalOpen,
    isEdit,
    formFile,
    formData,
    isLockedCheck,
    isValidated,
  };
}
