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

export const getAllReservationByStatus = (
  Page: number,
  Limit: number,
  Search: any,
  UserId: any,
  Status?: any[]
) => {
  const params = new URLSearchParams();
  params.append("Page", `${Page}`);
  params.append("Limit", `${Limit}`);
  params.append("Search", Search);
  params.append("UserId", UserId);
  params.append("IsIncludeTempat", "true");
  params.append("IsIncludeUser", "true");
  params.append("IsIncludeExpired", "false");

  Status?.map((sts) => {
    params.append("Status", sts);
  });

  return axiosConfig.get(
    ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT,
    {
      params,
    }
  );
};

export const getAllReservation = (
  Page: number,
  Limit: number,
  Search: any,
  UserId: any,
  Status?: any
) => {
  return axiosConfig.get(
    ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT,
    {
      Page,
      Limit,
      Search,
      UserId,
      Status,
      IsIncludeTempat: true,
      IsIncludeUser: true,
      IsIncludeExpired: true,
    }
  );
};

export const getSingleReservation = (id: any) => {
  return axiosConfig.get(
    `${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${id}`
  );
};

export const changeStatusReservation = (data: any, status: string) => {
  if (status == "Kurasi") {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("actorId", data.actorId);
    formData.append("note", data.note);
    formData.append("reason", data.reason);
    formData.append(
      "fileSuratPermohonanByPengelola",
      data.fileSuratPermohonanByPengelola
    );
    formData.append("fileSuratPermohonan", data.fileSuratPermohonan);
    formData.append("fileProposal", data.fileProposal);
    formData.append("judulPentas", data.judulPentas);
    formData.append("alamatSanggar", data.alamatSanggar);
    formData.append("namaSanggar", data.namaSanggar);

    return axiosConfig.put(
      `${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/${status}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } else {
    return axiosConfig.put(
      `${ENDPOINTS.PESAN_TEMPAT.LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT}/${data.id}/${status}`,
      data
    );
  }
};

export const submitReservation = (data: any) => {
  const formData = new FormData();
  formData.append("id", data.id);
  formData.append("actorId", data.actorId);
  formData.append("fileSuratPermohonan", data.fileSuratPermohonan);
  formData.append("fileProposal", data.fileProposal);
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
