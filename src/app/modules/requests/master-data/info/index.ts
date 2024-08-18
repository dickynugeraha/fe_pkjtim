import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (data: any) => {
  return axiosConfig.post(ENDPOINTS.NEWS.LIST_UPDATE_ADD_DELETE_NEWS, {
    actor: data.actor,
    title: data.title,
    content: data.content,
    status: data.status,
    file: data.file,
    publishedAt: data.publishedAt,
    tempatId: data.tempatId,
  });
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
