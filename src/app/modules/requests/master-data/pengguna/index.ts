import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (data: any) => {
  const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("status", data.status);
    formData.append("role", data.role);
    formData.append("isLocked", data.isLocked);
    formData.append("password", data.password);

  return axiosConfig.post(
    ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getSinglePhoto = (id: number) => {
  return axiosConfig.get(`${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${id}`);
};

export const getSingle = (id: any) => {
  return axiosConfig.get(`${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${id}`);
};

export const changePassword = (data: any) => {
  return axiosConfig.put(
    `${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${data.id}/Password/Update`,
    {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    }
  );
};

export const resendEmailVerif = (id: any) => {
  return axiosConfig.put(
    `${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${id}/Email/Resend`
  );
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
  return axiosConfig.delete(`${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${id}`);
};

export const approve = (id: any) => {
  return axiosConfig.put(
    `${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${id}/Approve`
  );
};

export const lockAccount = (id: any) => {
  return axiosConfig.post(
    `${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${id}Lock`
  );
};

export const unlockAccount = (id: any) => {
  return axiosConfig.post(
    `${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${id}Unlock`
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
      isLocked: data.isLocked,
      role: data.role,
      password: data.password,
    }
  );

  // const formData = new FormData();
  //   formData.append("fullName", data.fullName);
  //   formData.append("email", data.email);
  //   formData.append("phoneNumber", data.phoneNumber);
  //   formData.append("status", data.status);
  //   formData.append("role", data.role);
  //   formData.append("isLocked", data.isLocked);

  //   if(data.password != ''){
  //     formData.append("password", data.password);
  //   }

  // return axiosConfig.put(
  //   `${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${data.id}`,
  //   formData,
  //   {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   }
  // );
};
