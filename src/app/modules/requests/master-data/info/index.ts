import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (
  file: any,
  actor: string,
  title: string,
  content: string,
  status: string,
  publishedAt: string,
  tempatId: number
) => {
  return axiosConfig.post(ENDPOINTS, {
    actor,
    title,
    content,
    status,
    file,
    publishedAt,
    tempatId,
  });
};

export const getSinglePhoto = (id: number) => {
  return axiosConfig.get(`${ENDPOINTS.NEWS.LIST_UPDATE_ADD_DELETE_NEWS}/${id}`);
};

export const getSingle = (id: number) => {
  return axiosConfig.get(`${ENDPOINTS.NEWS.LIST_UPDATE_ADD_DELETE_NEWS}/${id}`);
};

export const getAll = () => {
  return axiosConfig.get(ENDPOINTS.NEWS.LIST_UPDATE_ADD_DELETE_NEWS);
};

export const remove = (id: number) => {
  return axiosConfig.delete(
    `${ENDPOINTS.NEWS.LIST_UPDATE_ADD_DELETE_NEWS}/${id}`
  );
};

export const update = (
  id: number,
  file: any,
  actor: string,
  title?: string,
  content?: string,
  status?: string,
  publishedAt?: string,
  tempatId?: number
) => {
  return axiosConfig.put(
    `${ENDPOINTS.NEWS.LIST_UPDATE_ADD_DELETE_NEWS}/${id}`,
    {
      file,
      actor,
      title,
      content,
      status,
      publishedAt,
      tempatId,
    }
  );
};
