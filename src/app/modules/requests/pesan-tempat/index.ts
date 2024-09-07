import { ENDPOINTS } from "../../../constants/API";
import axiosConfig from "../../../utils/services/axiosConfig";

export const initBooking = (data: any) => {
  return axiosConfig.post(
    `${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}`,
    {
      userCreatorId: data.userCreatorId,
      tempatId: data.tempatId,
      startDate: data.startDate,
      endDate: data.endDate,
    }
  );
};

export const getSingleReservation = (id: number) => {
  return axiosConfig.get(
    `${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${id}`
  );
};
