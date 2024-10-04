import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (data: any, actor: string) => {
  const formData = new FormData();
  formData.append("actor", actor);
  formData.append("photo", data.photo);
  formData.append("name", data.name);
  formData.append("priceMainEventWeekEnd", data.priceMainEventWeekEnd);
  formData.append("priceMainEventWeekDay", data.priceMainEventWeekDay);
  formData.append("pricePreEventWeekEnd", data.pricePreEventWeekEnd);
  formData.append("pricePreEventWeekDay", data.pricePreEventWeekDay);
  return axiosConfig.post(
    ENDPOINTS.TEMPAT.LIST_UPDATE_ADD_DELETE_TEMPAT,
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
    `${ENDPOINTS.TEMPAT.LIST_UPDATE_ADD_DELETE_TEMPAT}/${id}`
  );
};

export const getSingle = (id: number) => {
  return axiosConfig.get(
    `${ENDPOINTS.TEMPAT.LIST_UPDATE_ADD_DELETE_TEMPAT}/${id}`
  );
};

export const getAll = (Page: number, Limit: number, Search = "") => {
  return axiosConfig.get(ENDPOINTS.TEMPAT.LIST_UPDATE_ADD_DELETE_TEMPAT, {
    Page,
    Limit,
    Search,
    Sort: "DESC",
    IsIncludeFile: true,
    IsIncludePhoto: true,
  });
};

export const remove = (id: number, actor: string) => {
  return axiosConfig.delete(
    `${ENDPOINTS.TEMPAT.LIST_UPDATE_ADD_DELETE_TEMPAT}/${id}?actor=${actor}`
  );
};

export const update = (data: any, actor: string) => {
  const formData = new FormData();
  formData.append("actor", actor);
  formData.append("photo", data.photo);
  formData.append("name", data.name);
  formData.append("priceMainEventWeekEnd", data.priceMainEventWeekEnd);
  formData.append("priceMainEventWeekDay", data.priceMainEventWeekDay);
  formData.append("pricePreEventWeekEnd", data.pricePreEventWeekEnd);
  formData.append("pricePreEventWeekDay", data.pricePreEventWeekDay);
  return axiosConfig.put(
    `${ENDPOINTS.TEMPAT.LIST_UPDATE_ADD_DELETE_TEMPAT}/${data.id}`,

    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
