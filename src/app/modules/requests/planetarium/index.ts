import { ENDPOINTS } from "../../../constants/API";
import axiosConfig from "../../../utils/services/axiosConfig";

export const initReservation = (data: any) => {
  return axiosConfig.post(
    ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM,
    {
      UserCreatorId: data.UserCreatorId,
      TanggalKunjungan: data.TanggalKunjungan,
      IsPertunjukan: data.IsPertunjukan,
      IsDiskusi: data.IsDiskusi,
      IsPenerpongan: data.IsPenerpongan,
      IsRoketAir: data.IsRoketAir,
    }
  );
};

export const submitReservation = (data: any) => {
  const formData = new FormData();
  formData.append("namaSekolah", data.namaSekolah);
  formData.append("alamatSekolah", data.alamatSekolah);
  formData.append("jumlahPeserta", data.jumlahPeserta);
  formData.append("daerah", data.daerah);
  formData.append("contact", data.contact);
  formData.append("fileSuratUndangan", data.fileSuratUndangan);
  formData.append("fileLembarPernyataan", data.fileLembarPernyataan);
  formData.append("actorId", data.actorId);

  return axiosConfig.put(
    `${ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM}/${data.id}/Request`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
    ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM,
    {
      Page,
      Limit,
      Search,
      UserId,
    }
  );
};

export const singleReservation = (id: any) => {
  return axiosConfig.get(
    `${ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM}/${id}`
  );
};

export const rejectReservation = (data: any) => {
  return axiosConfig.put(
    `${ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM}/${data.id}/Reject`,
    {
      id: data.id,
      actorId: data.actorId,
      reason: data.reason,
    }
  );
};

export const approveReservation = (data: any) => {
  return axiosConfig.put(
    `${ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM}/${data.id}/Done`,
    {
      id: data.id,
      actorId: data.actorId,
      reason: data.reason,
    }
  );
};
