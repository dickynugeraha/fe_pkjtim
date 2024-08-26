import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (data: any, actor: string) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("actor", actor);
  formData.append("tempatId", data.tempatId);
  formData.append("title", data.title);
  formData.append("sinopsis", data.sinopsis);
  formData.append("namaSanggar", data.namaSanggar);
  formData.append("status", data.status);
  formData.append("jumlahPelakuSeni", data.jumlahPelakuSeni);
  formData.append("jumlahPekerjaSeni", data.jumlahPekerjaSeni);
  formData.append("jumlahPenonton", data.jumlahPenonton);
  formData.append("startDate", data.startDate);
  formData.append("endDate", data.endDate);

  return axiosConfig.post(
    ENDPOINTS.PENTAS.LIST_UPDATE_ADD_DELETE_PENTAS,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getSinglePhoto = (id: number) => {
  return axiosConfig.get(
    `${ENDPOINTS.PENTAS.LIST_UPDATE_ADD_DELETE_PENTAS}/${id}`
  );
};

export const getSingle = (id: number) => {
  return axiosConfig.get(
    `${ENDPOINTS.PENTAS.LIST_UPDATE_ADD_DELETE_PENTAS}/${id}`
  );
};

export const getAll = (Page: number, Limit: number, Search = "") => {
  return axiosConfig.get(ENDPOINTS.PENTAS.LIST_UPDATE_ADD_DELETE_PENTAS, {
    Page,
    Limit,
    Search,
    Sort: "DESC",
    IsIncludeFile: true,
    IsIncludeTempat: true,
  });
};

export const remove = (id: any, actor: string) => {
  return axiosConfig.delete(
    `${ENDPOINTS.PENTAS.LIST_UPDATE_ADD_DELETE_PENTAS}/${id}?actor=${actor}`
  );
};

export const update = (data: any, actor: string) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("actor", actor);
  formData.append("tempatId", data.tempatId ?? data.tempat.id);
  formData.append("title", data.title);
  formData.append("sinopsis", data.sinopsis);
  formData.append("namaSanggar", data.namaSanggar);
  formData.append("status", data.status);
  formData.append("jumlahPelakuSeni", data.jumlahPelakuSeni);
  formData.append("jumlahPekerjaSeni", data.jumlahPekerjaSeni);
  formData.append("jumlahPenonton", data.jumlahPenonton);
  formData.append("startDate", data.startDate);
  formData.append("endDate", data.endDate);
  return axiosConfig.put(
    `${ENDPOINTS.PENTAS.LIST_UPDATE_ADD_DELETE_PENTAS}/${data.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
