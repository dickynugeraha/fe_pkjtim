import { useEffect, useState } from "react";
import {
  add,
  getAll,
  remove,
  update,
} from "../../../requests/master-data/contact-person";
import Swal from "sweetalert2";
import { INITIAL_PAGE, DEFAULT_LIMIT } from "../../../../constants/PAGE";
import { useAuth } from "../../../auth";

export default function useContactPerson() {
  const { currentUser } = useAuth();
  const actor = currentUser?.email ?? "Admin";

  const [contact, setContact] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    forContent: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const openModal = (data = null) => {
    if (data) {
      setFormData(data);
      setIsEdit(true);
    } else {
      setFormData({
        name: "",
        phone: "",
        forContent: "",
      });
      setIsEdit(false);
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchAllContact = async () => {
    setLoading(true);
    try {
      const res = await getAll();
      // setContact(res.data);
      setContact(JSON.parse(res.data.data));
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data contact",
        text: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const addContact = async (data: any) => {
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
          const newData = [...contact, data];
          setContact(newData);
          const res = await add({
            actor: currentUser?.email,
            value: JSON.stringify(newData),
          });
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil menambah data contact",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              closeModal();
              fetchAllContact();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menambahkan data contact",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
    });
  };

  const updateContact = async (data: any) => {
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
          const res = await update(data);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil mengubah data contact",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              closeModal();
              fetchAllContact();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal mengubah data contact",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
    });
  };

  const deleteContact = async (contactId: any) => {
    Swal.fire({
      title: "Apakah anda yakin",
      text: "Akan melakukan menghapus kontak?!",
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
          console.log("contact", contact);
          console.log("contactId", contactId);

          const newArr = contact.filter((ctc) => {
            return ctc.id !== contactId;
          });

          console.log("newArr", newArr);
          return;

          setContact(newArr);
          const res = await add({
            actor: currentUser?.email,
            value: JSON.stringify(newArr),
          });
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Berhasil menghapus data contact",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              closeModal();
              fetchAllContact();
            });
          }
        } catch (error: any) {
          Swal.fire({
            icon: "error",
            title: "Gagal menghapus data contact",
            text: error.message,
            showConfirmButton: false,
          });
        }
      }
      setLoading(false);
    });
  };

  return {
    contact,
    loading,
    isModalOpen,
    formData,
    isEdit,
    addContact,
    updateContact,
    deleteContact,
    fetchAllContact,
    openModal,
    handleChange,
    closeModal,
  };
}
