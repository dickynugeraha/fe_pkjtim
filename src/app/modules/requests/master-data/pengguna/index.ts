import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (data: any) => {
  return axiosConfig.post(ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA, {
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    status: data.status,
    role: data.role,
    password: data.password,
  });
};

export const getSinglePhoto = (id: number) => {
  return axiosConfig.get(`${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${id}`);
};

export const getSingle = (id: number) => {
  return axiosConfig.get(`${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${id}`);
};

export const getAll = (Page: number, Limit: number, Search = "") => {
  return axiosConfig.get(ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA, {
    Page,
    Limit,
    Search,
    Sort: "DESC",
  });
};

export const remove = (id: number) => {
  return axiosConfig.delete(
    `${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${id}?actor=Iq`
  );
};

export const approve = (id: any) => {
  return axiosConfig.put(
    `${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${id}/Approve`
  );
};

export const update = (data: any) => {
  return axiosConfig.put(
    `${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${data.id}`,
    {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      status: data.status,
      role: data.role,
      password: data.password,
    }
  );
};