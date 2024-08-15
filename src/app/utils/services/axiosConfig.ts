import axios from "axios";
import globalVar from "../../helper/globalVar";
import { getAuth, removeAuth } from "../../modules/auth";
import { API_URL } from "../../constants/API";

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
    console.log("responseeeeeeeeeeee", response);

    return response;
  },
  async function (error) {
    console.log("errorrrrrrrrrrrrr", error);

    const { statusCode } = error?.response?.data;

    if (statusCode === 401 || error.status === 401) {
      removeAuth();
      // replaceToLogin();
    }
    return Promise.reject(error?.errors || error?.response?.data);
  }
);

class APIClient {
  get = (url: any, params?: any) => {
    let response;

    let paramKeys: any = [];

    if (params) {
      Object.keys(params).map((key) => {
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
  /**
   * post given data to url
   */
  post = (url: any, data: any, options?: any) => {
    return axios.post(`${API_URL}/${url}`, data, options);
  };
  /**
   * Updates data
   */
  patch = (url: any, data: any, config?: any) => {
    return axios.patch(`${API_URL}/${url}`, data, config);
  };

  put = (url: any, data: any, options?: any) => {
    return axios.put(`${API_URL}/${url}`, data, options);
  };
  /**
   * Delete
   */
  delete = (url: any, config?: any) => {
    console.log("config", config);

    return axios.delete(`${API_URL}/${url}`, config);
  };
}

export default new APIClient();
