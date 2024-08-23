import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (data: any) => {
  return axiosConfig.post(ENDPOINTS.TEMPAT.LIST_UPDATE_ADD_DELETE_TEMPAT, {
    actor: "Iq",
    name: data.name,
    priceMainEventWeekEnd: data.priceMainEventWeekEnd,
    priceMainEventWeekDay: data.priceMainEventWeekDay,
    pricePreEventWeekEnd: data.pricePreEventWeekEnd,
    pricePreEventWeekDay: data.pricePreEventWeekDay,
  });
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
  });
};

export const remove = (id: number) => {
  return axiosConfig.delete(
    `${ENDPOINTS.TEMPAT.LIST_UPDATE_ADD_DELETE_TEMPAT}/${id}?actor=Iq`
  );
};

export const update = (data: any) => {
  return axiosConfig.put(
    `${ENDPOINTS.TEMPAT.LIST_UPDATE_ADD_DELETE_TEMPAT}/${data.id}`,
    {
      actor: data.actor,
      name: data.name,
      priceMainEventWeekEnd: data.priceMainEventWeekEnd,
      priceMainEventWeekDay: data.priceMainEventWeekDay,
      pricePreEventWeekEnd: data.pricePreEventWeekEnd,
      pricePreEventWeekDay: data.pricePreEventWeekDay,
    }
  );
};
