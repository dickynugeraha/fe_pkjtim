import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (data: any, actor: string) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("actor", actor);
  formData.append("title", data.title);
  formData.append("desc", data.desc);
  return axiosConfig.post(
    ENDPOINTS.SENI.LIST_UPDATE_ADD_DELETE_SENI,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getSinglePhoto = (id: number) => {
  return axiosConfig.get(`${ENDPOINTS.SENI.LIST_UPDATE_ADD_DELETE_SENI}/${id}`);
};

export const getSingle = (id: number) => {
  return axiosConfig.get(`${ENDPOINTS.SENI.LIST_UPDATE_ADD_DELETE_SENI}/${id}`);
};

export const getAll = (Page: number, Limit: number, Search = "") => {
  return axiosConfig.get(ENDPOINTS.SENI.LIST_UPDATE_ADD_DELETE_SENI, {
    Page,
    Limit,
    Search,
    Sort: "DESC",
    IsIncludeFile: true,
  });
};

export const remove = (id: any, actor: string) => {
  return axiosConfig.delete(
    `${ENDPOINTS.SENI.LIST_UPDATE_ADD_DELETE_SENI}/${id}?actor=${actor}`
  );
};

export const update = (data: any, actor: string) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("actor", actor);
  formData.append("title", data.title);
  formData.append("desc", data.desc);
  return axiosConfig.put(
    `${ENDPOINTS.SENI.LIST_UPDATE_ADD_DELETE_SENI}/${data.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
