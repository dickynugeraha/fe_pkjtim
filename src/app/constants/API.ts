export const API_URL = "http://49.50.9.223:10029/api";
export const ENDPOINTS = {
  AUTH: {
    LOGIN: `v1/Authentication/SignIn`,
    REGISTER: `v1/User/Register`,
  },
  SENIMAN: {
    LIST_UPDATE_ADD_DELETE_SENIMAN: "v1/Seniman",
    SENIMAN_IMAGE: API_URL + "/v1/Seniman",
  },
  NEWS: {
    LIST_UPDATE_ADD_DELETE_NEWS: "v1/News",
    NEWS_IMAGE: API_URL + "/v1/News",
  },
  PENTAS: {
    LIST_UPDATE_ADD_DELETE_PENTAS: "v1/Pentas",
    PENTAS_IMAGE: API_URL + "/v1/Pentas",
  },
  SENI: {
    LIST_UPDATE_ADD_DELETE_SENI: "v1/Seni",
    SENI_IMAGE: API_URL + "/v1/Seni",
  },
  TEMPAT: {
    LIST_UPDATE_ADD_DELETE_TEMPAT: "v1/Tempat",
    TEMPAT_IMAGE: API_URL + "/v1/Tempat",
  },
  TEMPAT_TUTUP: {
    LIST_UPDATE_ADD_DELETE_TEMPAT_TUTUP: "v1/TempatTutup",
    TEMPAT_TUTUP_IMAGE: API_URL + "/v1/TempatTutup",
  },
};
