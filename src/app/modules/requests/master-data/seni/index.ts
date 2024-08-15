import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (file: any, actor: string, title: string, desc: string) => {
  return axiosConfig.post(ENDPOINTS.SENI.LIST_UPDATE_ADD_DELETE_SENI, {
    file,
    actor,
    title,
    desc,
  });
};

export const getSinglePhoto = (id: number) => {
  return axiosConfig.get(`${ENDPOINTS.SENI.LIST_UPDATE_ADD_DELETE_SENI}/${id}`);
};

export const getSingle = (id: number) => {
  return axiosConfig.get(`${ENDPOINTS.SENI.LIST_UPDATE_ADD_DELETE_SENI}/${id}`);
};

export const getAll = () => {
  return axiosConfig.get(ENDPOINTS.SENI.LIST_UPDATE_ADD_DELETE_SENI);
};

export const remove = (id: number) => {
  return axiosConfig.delete(
    `${ENDPOINTS.SENI.LIST_UPDATE_ADD_DELETE_SENI}/${id}`
  );
};

export const update = (
  id: number,
  file?: any,
  actor?: string,
  title?: string,
  desc?: string
) => {
  return axiosConfig.put(
    `${ENDPOINTS.SENI.LIST_UPDATE_ADD_DELETE_SENI}/${id}`,
    {
      file,
      actor,
      title,
      desc,
    }
  );
};
