import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (
  actor: string,
  tempatId: number,
  startDate: string,
  endDate: string
) => {
  return axiosConfig.post(
    ENDPOINTS.TEMPAT_TUTUTP.LIST_UPDATE_ADD_DELETE_TEMPAT_TUTUTP,
    {
      actor,
      tempatId,
      startDate,
      endDate,
    }
  );
};

export const getSinglePhoto = (id: number) => {
  return axiosConfig.get(
    `${ENDPOINTS.TEMPAT_TUTUTP.LIST_UPDATE_ADD_DELETE_TEMPAT_TUTUTP}/${id}`
  );
};

export const getSingle = (id: number) => {
  return axiosConfig.get(
    `${ENDPOINTS.TEMPAT_TUTUTP.LIST_UPDATE_ADD_DELETE_TEMPAT_TUTUTP}/${id}`
  );
};

export const getAll = () => {
  return axiosConfig.get(
    ENDPOINTS.TEMPAT_TUTUTP.LIST_UPDATE_ADD_DELETE_TEMPAT_TUTUTP
  );
};

export const remove = (id: number) => {
  return axiosConfig.delete(
    `${ENDPOINTS.TEMPAT_TUTUTP.LIST_UPDATE_ADD_DELETE_TEMPAT_TUTUTP}/${id}`
  );
};

export const update = (
  id: number,
  actor?: string,
  tempatId?: string,
  startDate?: string,
  endDate?: string
) => {
  return axiosConfig.put(
    `${ENDPOINTS.TEMPAT_TUTUTP.LIST_UPDATE_ADD_DELETE_TEMPAT_TUTUTP}/${id}`,
    {
      actor,
      tempatId,
      startDate,
      endDate,
    }
  );
};
