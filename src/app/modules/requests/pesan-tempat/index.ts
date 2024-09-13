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

export const getAllReservation = (
  Page: number,
  Limit: number,
  Search: any,
  UserId: any
) => {
  return axiosConfig.get(
    ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT,
    {
      Page,
      Limit,
      Search,
      UserId,
      IsIncludeTempat: true,
      IsIncludeUser: true,
    }
  );
};

export const getSingleReservation = (id: number) => {
  return axiosConfig.get(
    `${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${id}`
  );
};

export const submitReservation = (data: any) => {
  const formData = new FormData();
  formData.append("id", data.id);
  formData.append("actorId", data.actorId);
  formData.append("fileSuratPermohonan", data.fileSuratPermohonan);
  formData.append("fileProposal", data.fileProposal);
  formData.append("fileTandaPengenal", data.fileTandaPengenal);
  formData.append("startMainEventDate", data.startMainEventDate);
  formData.append("namaSanggar", data.namaSanggar);
  formData.append("judulPentas", data.judulPentas);
  formData.append("alamatSanggar", data.alamatSanggar);
  formData.append("kodeBooking", data.kodeBooking);
  formData.append("days", data.days);
  formData.append("priceTotal", data.priceTotal);

  return axiosConfig.put(
    `${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/Process`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
