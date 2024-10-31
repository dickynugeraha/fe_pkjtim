export const API_URL = "http://49.50.9.223:10029/api";
export const WEB_LOCAL_URL = sessionStorage.getItem("hostname");

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `v1/Authentication/SignIn`,
    REFRESH_TOKEN: `v1/Authentication/Refresh`,
    REGISTER: `v1/User/Register`,
  },
  PENGGUNA: {
    MANAGEMENT_PENGGUNA: "v1/User",
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
  PLANETARIUM: {
    LIST_UPDATE_ADD_DELETE_PLANETARIUM: "v1/Planetarium",
  },
  PESAN_TEMPAT: {
    LIST_UPDATE_ADD_DELETE_PESAN_TEMPAT: "v1/Reservasi",
  },
  CONTACT_PERSON: {
    LIST_UPDATE_ADD_DELETE_CONTACT_PERSON: "v1/Utilities/ContactPerson",
  },
  DASHBOARD: {
    GET_STATUS_USER: "v1/Dashboard/Status/User",
    GET_EVERY_RESERVATION: "v1/Dashboard/Tempat/Reservasi",
    GET_DATA_RESERVATION: "v1/Dashboard/Reservasi",
    GET_DATA_PLANETARIUM: "v1/Dashboard/Planetarium",
  },
};
