import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (
  file: any,
  actor: string,
  name: string,
  biografi: string,
  performanceDesc: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("actor", actor);
  formData.append("name", name);
  formData.append("biografi", biografi);
  formData.append("performanceDesc", performanceDesc);

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

export const remove = (id: any) => {
  return axiosConfig.delete(
    `${ENDPOINTS.SENIMAN.LIST_UPDATE_ADD_DELETE_SENIMAN}/${id}?actor=Iq`
  );
};

export const update = (
  id: any,
  file?: any,
  actor?: string,
  name?: string,
  biografi?: string,
  performanceDesc?: string
) => {
  return axiosConfig.put(
    `${ENDPOINTS.SENIMAN.LIST_UPDATE_ADD_DELETE_SENIMAN}/${id}`,
    {
      actor,
      name,
      biografi,
      performanceDesc,
      file,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
