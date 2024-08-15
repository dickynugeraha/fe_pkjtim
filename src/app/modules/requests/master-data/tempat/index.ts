import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (
  actor: string,
  name: string,
  priceMainEventWeekEnd: number,
  priceMainEventWeekDay: number,
  pricePreEventWeekEnd: number,
  pricePreEventWeekDay: number
) => {
  return axiosConfig.post(ENDPOINTS.TEMPAT.LIST_UPDATE_ADD_DELETE_TEMPAT, {
    actor,
    name,
    priceMainEventWeekEnd,
    priceMainEventWeekDay,
    pricePreEventWeekEnd,
    pricePreEventWeekDay,
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

export const getAll = () => {
  return axiosConfig.get(ENDPOINTS.TEMPAT.LIST_UPDATE_ADD_DELETE_TEMPAT);
};

export const remove = (id: number) => {
  return axiosConfig.delete(
    `${ENDPOINTS.TEMPAT.LIST_UPDATE_ADD_DELETE_TEMPAT}/${id}`
  );
};

export const update = (
  id: number,
  actor: string,
  name: string,
  priceMainEventWeekEnd?: number,
  priceMainEventWeekDay?: number,
  pricePreEventWeekEnd?: number,
  pricePreEventWeekDay?: number
) => {
  return axiosConfig.put(
    `${ENDPOINTS.TEMPAT.LIST_UPDATE_ADD_DELETE_TEMPAT}/${id}`,
    {
      actor,
      name,
      priceMainEventWeekEnd,
      priceMainEventWeekDay,
      pricePreEventWeekEnd,
      pricePreEventWeekDay,
    }
  );
};
