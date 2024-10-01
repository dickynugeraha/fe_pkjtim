import { useState } from "react";
import axiosConfig from "../../../../utils/services/axiosConfig";
import { ENDPOINTS } from "../../../../constants/API";
import Swal from "sweetalert2";

export default function useDashboard() {
  const [dataReservasi, setDataReservasi] = useState<any>();
  const [dataStatus, setDataStatus] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getDataDashboard = async () => {
    setLoading(true);
    try {
      const resUser = await axiosConfig.get(
        ENDPOINTS.DASHBOARD.GET_STATUS_USER
      );
      const resReservation = await axiosConfig.get(
        ENDPOINTS.DASHBOARD.GET_EVERY_RESERVATION
      );
      setDataReservasi(resReservation.data.data);
      setDataStatus(resUser.data.data);
      console.log(resUser.data.data);
      console.log(resReservation.data.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal get data",
        text: error.message,
        showConfirmButton: false,
      });
    }
  };

  return { getDataDashboard, dataReservasi, dataStatus, loading };
}
