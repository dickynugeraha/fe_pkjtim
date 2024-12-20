import { API_URL, ENDPOINTS, WEB_LOCAL_URL } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (data: any) => {
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("ktp", data.ktp);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("status", data.status);
  formData.append("role", data.role);
  formData.append("isLocked", data.isLocked);
  formData.append("password", data.password);
  formData.append("komite", data.komite);

  return axiosConfig.post(ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
    `${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${id}/Email/Resend`,
    {
      url: `${sessionStorage.getItem(
        "hostname"
      )}/verify/new?userid={userid}&token={token}`,
    }
  );
};

export const confirmEmailVerif = (id: any, token: any, newEmail?: string) => {
  let params = {};
  if (newEmail) {
    params = {
      code: token,
      newEmail,
    };
  } else {
    params = {
      code: token,
    };
  }
  return axiosConfig.put(
    `${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${id}/Email/Confirm`,
    params
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

export const remove = (id: any) => {
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
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("role", data.role);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("status", data.status);
  formData.append("isLocked", data.isLocked);

  if (data.komite != undefined && data.role == "KURATOR") {
    formData.append("komite", data.komite);
  }else{
    formData.append("komite", "");
  }

  if (data.password != undefined) {
    formData.append("password", data.password);
  }

  if (data.ktp != undefined) {
    formData.append("ktp", data.ktp);
  }

  return axiosConfig.put(
    `${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${data.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const reqUpdateEmail = (
  userId: string,
  newEmail: string,
  password: string
) => {
  return axiosConfig.post(
    `${ENDPOINTS.PENGGUNA.MANAGEMENT_PENGGUNA}/${userId}/email/change/token`,
    {
      url: `${sessionStorage.getItem(
        "hostname"
      )}/verify/email?userid={userid}&newemail={newemail}&token={token}`,
      email: newEmail,
      password: password,
    }
  );
};
