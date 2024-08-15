import axios from "axios";
import { AuthModel, UserModel } from "./_models";
import axiosConfig from "../../../utils/services/axiosConfig";
import { ENDPOINTS } from "../../../constants/API";

// const API_URL = "http://49.50.9.223:10029/api";
// const API_URL = import.meta.env.PKJTIM_API_URL;
const API_URL = import.meta.env.VITE_APP_API_URL;

export const LOGIN_URL = `${API_URL}/login`;
// export const REGISTER_URL = `${API_URL}/register`;
// export const LOGIN_URL = `${API_URL}/v1/Authentication/SignIn`;
// export const REGISTER_URL = `${API_URL}/v1/User/Register`;
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`;

// Server should return AuthModel
export function login(email: string, password: string) {
  // return axios.post<AuthModel>(LOGIN_URL, {
  //   email,
  //   password,
  // });
  return axiosConfig.post(ENDPOINTS.AUTH.LOGIN, {
    email,
    password,
  });
}

// Server should return AuthModel
export function register(
  email: string,
  fullName: string,
  phoneNumber: string,
  password: string,
  rePassword: string
) {
  return axiosConfig.post(ENDPOINTS.AUTH.REGISTER, {
    email,
    fullName,
    phoneNumber,
    password,
    rePassword,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  });
}
