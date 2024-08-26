import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (data: any, actor: string) => {
  return axiosConfig.post(
    ENDPOINTS.TEMPAT_TUTUP.LIST_UPDATE_ADD_DELETE_TEMPAT_TUTUP,
    {
      actor: actor,
      tempatId: data.tempatId as number,
      startDate: data.startDate,
      endDate: data.endDate,
      isIncludeTempat: true,
    }
  );
};

export const getSinglePhoto = (id: number) => {
  return axiosConfig.get(
    `${ENDPOINTS.TEMPAT_TUTUP.LIST_UPDATE_ADD_DELETE_TEMPAT_TUTUP}/${id}`
  );
};

export const getSingle = (id: number) => {
  return axiosConfig.get(
    `${ENDPOINTS.TEMPAT_TUTUP.LIST_UPDATE_ADD_DELETE_TEMPAT_TUTUP}/${id}`
  );
};

export const getAll = (Page: number, Limit: number, Search = "") => {
  return axiosConfig.get(
    ENDPOINTS.TEMPAT_TUTUP.LIST_UPDATE_ADD_DELETE_TEMPAT_TUTUP,
    {
      Page,
      Limit,
      Search,
      Sort: "DESC",
      IsIncludeTempat: true,
    }
  );
};

export const remove = (id: number, actor: string) => {
  return axiosConfig.delete(
    `${ENDPOINTS.TEMPAT_TUTUP.LIST_UPDATE_ADD_DELETE_TEMPAT_TUTUP}/${id}?actor=${actor}`
  );
};

export const update = (data: any, actor: string) => {
  return axiosConfig.put(
    `${ENDPOINTS.TEMPAT_TUTUP.LIST_UPDATE_ADD_DELETE_TEMPAT_TUTUP}/${data.id}`,
    {
      actor: actor,
      tempatId: data.tempatId,
      startDate: data.startDate,
      endDate: data.endDate,
    }
  );
};
