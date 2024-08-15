import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (
  file: any,
  actor: string,
  tempatId: number,
  title: string,
  sinopsis: string,
  namaSanggar: string,
  status: string,
  tipeSanggar: string,
  jumlahPelakuSeni: number,
  jumlahPekerjaSeni: number,
  jumlahPenonton: number,
  startDate: string,
  endDate: string
) => {
  return axiosConfig.post(ENDPOINTS.PENTAS.LIST_UPDATE_ADD_DELETE_PENTAS, {
    file,
    actor,
    tempatId,
    title,
    sinopsis,
    namaSanggar,
    status,
    tipeSanggar,
    jumlahPelakuSeni,
    jumlahPekerjaSeni,
    jumlahPenonton,
    startDate,
    endDate,
  });
};

export const getSinglePhoto = (id: number) => {
  return axiosConfig.get(
    `${ENDPOINTS.PENTAS.LIST_UPDATE_ADD_DELETE_PENTAS}/${id}`
  );
};

export const getSingle = (id: number) => {
  return axiosConfig.get(
    `${ENDPOINTS.PENTAS.LIST_UPDATE_ADD_DELETE_PENTAS}/${id}`
  );
};

export const getAll = () => {
  return axiosConfig.get(ENDPOINTS.PENTAS.LIST_UPDATE_ADD_DELETE_PENTAS);
};

export const remove = (id: number) => {
  return axiosConfig.delete(
    `${ENDPOINTS.PENTAS.LIST_UPDATE_ADD_DELETE_PENTAS}/${id}`
  );
};

export const update = (
  id: number,
  file?: any,
  actor?: string,
  tempatId?: string,
  title?: string,
  sinopsis?: string,
  namaSanggar?: string,
  status?: string,
  tipeSanggar?: string,
  jumlahPelakuSeni?: number,
  jumlahPekerjaSeni?: number,
  jumlahPenonton?: number,
  startDate?: string,
  endDate?: string
) => {
  return axiosConfig.put(
    `${ENDPOINTS.PENTAS.LIST_UPDATE_ADD_DELETE_PENTAS}/${id}`,
    {
      file,
      actor,
      tempatId,
      title,
      sinopsis,
      namaSanggar,
      status,
      tipeSanggar,
      jumlahPelakuSeni,
      jumlahPekerjaSeni,
      jumlahPenonton,
      startDate,
      endDate,
    }
  );
};
