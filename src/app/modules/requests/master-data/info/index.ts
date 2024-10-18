import { ENDPOINTS } from "../../../../constants/API";
import globalVar from "../../../../helper/globalVar";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (data: any, actor: string) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("actor", actor);
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("status", data.status);
  formData.append("publishedAt", data.publishedAt);
  formData.append("tempatId", data.tempatId);

  return axiosConfig.post(
    ENDPOINTS.NEWS.LIST_UPDATE_ADD_DELETE_NEWS,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "time-stamp": globalVar.getCurrentTimeStampForHeader(),
      },
    }
  );
};

export const getSingle = (id: number) => {
  return axiosConfig.get(`${ENDPOINTS.NEWS.LIST_UPDATE_ADD_DELETE_NEWS}/${id}`);
};

export const getAll = (Page: number, Limit: number, Search = "") => {
  return axiosConfig.get(ENDPOINTS.NEWS.LIST_UPDATE_ADD_DELETE_NEWS, {
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
    `${ENDPOINTS.NEWS.LIST_UPDATE_ADD_DELETE_NEWS}/${id}?actor=${actor}`
  );
};

export const update = (data: any, actor: string) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("actor", actor);
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("status", data.status);
  formData.append("publishedAt", data.publishedAt);
  return axiosConfig.put(
    `${ENDPOINTS.NEWS.LIST_UPDATE_ADD_DELETE_NEWS}/${data.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
