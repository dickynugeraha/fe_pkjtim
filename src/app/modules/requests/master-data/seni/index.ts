import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (file: any, actor: string, title: string, desc: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("actor", "Iq");
  formData.append("title", title);
  formData.append("desc", desc);
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

export const remove = (id: any) => {
  return axiosConfig.delete(
    `${ENDPOINTS.SENI.LIST_UPDATE_ADD_DELETE_SENI}/${id}?actor=Iq`
  );
};

export const update = (
  id: any,
  file?: any,
  actor?: string,
  title?: string,
  desc?: string
) => {
  return axiosConfig.put(
    `${ENDPOINTS.SENI.LIST_UPDATE_ADD_DELETE_SENI}/${id}`,
    {
      file,
      actor: "Iq",
      title,
      desc,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
