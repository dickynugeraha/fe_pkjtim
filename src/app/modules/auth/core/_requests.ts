import axios from "axios";
import { AuthModel, UserModel } from "./_models";
import axiosConfig from "../../../utils/services/axiosConfig";
import { API_URL, ENDPOINTS, WEB_LOCAL_URL } from "../../../constants/API";

// const API_URL = "http://49.50.9.223:10029/api";
// const API_URL = import.meta.env.PKJTIM_API_URL;

// Server should return AuthModel
export function login(email: string, password: string) {
  return axiosConfig.post(ENDPOINTS.AUTH.LOGIN, {
    email,
    password,
  });
}

export function register(data: any) {
  const formData = new FormData();
  formData.append("ktp", data.ktp);
  formData.append("email", data.email);
  formData.append("fullName", data.fullname);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("password", data.password);
  formData.append("rePassword", data.rePassword);
  formData.append("url", `${WEB_LOCAL_URL}/verify/email/{userid}/{token}`);

  return axiosConfig.post(ENDPOINTS.AUTH.REGISTER, formData, {
    headers: {
      "Content-Type": "multipart-form/data",
    },
  });
}

export function refresToken(token: string) {
  return axiosConfig.post(ENDPOINTS.AUTH.REFRESH_TOKEN, token);
}
