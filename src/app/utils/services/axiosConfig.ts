import axios from "axios";
import globalVar from "../../helper/globalVar";
import { getAuth, removeAuth } from "../../modules/auth";
import { API_URL } from "../../constants/API";
import Swal from "sweetalert2";

// default
axios.defaults.baseURL = API_URL;

// content type
axios.defaults.headers.Accept = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Access-Control-Allow-Credentials"] = "true";

axios.interceptors.request.use(
  async (config) => {
    const auth = getAuth();

    if (auth && auth.api_token) {
      config.headers.Authorization = `Bearer ${auth.api_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.toJSON().message === "Network Error") {
      // alert("No Internet Connection");
      Swal.fire({
        title: "Internal Server Error!",
        icon: "error",
        heightAuto: false,
        timer: 5000,
        showConfirmButton: false,
      });
      return;
    }

    if (error.response.status === 401) {
      removeAuth();
    }
    return Promise.reject(error?.errors || error?.response?.data);
  }
);

class APIClient {
  // get data specific for image
  getImage = (url: any) => {
    const response = axios.get(url, {
      responseType: "blob",
    });

    return response;
  };

  // get data
  get = (url: any, params?: any) => {
    let response;

    let paramKeys: any = [];

    if (params) {
      Object.keys(params).map((key) => {
        if (params[key] == "") return;

        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${API_URL}/${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };

  getWithKey = (url: string, params?: any, customHeaders?: any) => {
    const paramKeys = params
      ? Object.keys(params)
          .filter((key) => params[key] !== "")
          .map((key) => `${key}=${params[key]}`)
      : [];

    const queryString = paramKeys.length ? `?${paramKeys.join("&")}` : "";

    return axios.get(`${API_URL}/${url}${queryString}`, {
      params,
      headers: { ...customHeaders },
    });
  };
  /**
   * post given data to url
   */
  post = (url: any, data?: any, options?: any) => {
    return axios.post(`${API_URL}/${url}`, data, options);
  };
  /**
   * Updates data
   */
  patch = (url: any, data?: any, config?: any) => {
    return axios.patch(`${API_URL}/${url}`, data, config);
  };

  put = (url: any, data?: any, options?: any) => {
    return axios.put(`${API_URL}/${url}`, data, options);
  };
  /**
   * Delete
   */
  delete = (url: any, config?: any) => {
    return axios.delete(`${API_URL}/${url}`, config);
  };
}

export default new APIClient();
