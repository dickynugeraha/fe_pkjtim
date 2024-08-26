import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (data: any, actor: string) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("actor", actor);
  formData.append("name", data.name);
  formData.append("biografi", data.biografi);
  formData.append("performanceDesc", data.performanceDesc);

  return axiosConfig.post(
    ENDPOINTS.SENIMAN.LIST_UPDATE_ADD_DELETE_SENIMAN,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getSinglePhoto = (id: any) => {
  return axiosConfig.get(
    `${ENDPOINTS.SENIMAN.LIST_UPDATE_ADD_DELETE_SENIMAN}/${id}/Image?isStream=false`
  );
};

export const getSingle = (id: any) => {
  return axiosConfig.get(
    `${ENDPOINTS.SENIMAN.LIST_UPDATE_ADD_DELETE_SENIMAN}/${id}`
  );
};

export const getAll = (Page: number, Limit: number, Search = "") => {
  return axiosConfig.get(ENDPOINTS.SENIMAN.LIST_UPDATE_ADD_DELETE_SENIMAN, {
    Page,
    Limit,
    Search,
    Sort: "DESC",
    IsIncludeFile: true,
  });
};

export const remove = (id: any, actor: string) => {
  return axiosConfig.delete(
    `${ENDPOINTS.SENIMAN.LIST_UPDATE_ADD_DELETE_SENIMAN}/${id}?actor=${actor}`
  );
};

export const update = (data: any, actor: string) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("actor", actor);
  formData.append("name", data.name);
  formData.append("biografi", data.biografi);
  formData.append("performanceDesc", data.performanceDesc);
  return axiosConfig.put(
    `${ENDPOINTS.SENIMAN.LIST_UPDATE_ADD_DELETE_SENIMAN}/${data.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
