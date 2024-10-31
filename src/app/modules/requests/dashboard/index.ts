import { ENDPOINTS } from "../../../constants/API";
import axiosConfig from "../../../utils/services/axiosConfig";

export const getDashboardReservation = (
  Page: number,
  Limit: number,
  Search: any,
  UserId: any,
  Status?: any[]
) => {
  const params = new URLSearchParams();
  params.append("Page", `${Page}`);
  params.append("Limit", `${Limit}`);
  params.append("Search", Search);
  params.append("UserId", UserId);
  params.append("IsIncludeTempat", "true");
  params.append("IsIncludeUser", "true");
  params.append("IsIncludeExpired", "false");

  Status?.map((sts) => {
    params.append("Status", sts);
  });

  return axiosConfig.get(ENDPOINTS.DASHBOARD.GET_DATA_RESERVATION, { params });
};
export const getDashboardPlanetarium = (
  Page: number,
  Limit: number,
  Search: any,
  Status?: any[]
) => {
  const params = new URLSearchParams();
  params.append("Page", `${Page}`);
  params.append("Limit", `${Limit}`);
  params.append("Search", Search);

  Status?.map((sts) => {
    params.append("Status", sts);
  });

  return axiosConfig.get(ENDPOINTS.DASHBOARD.GET_DATA_PLANETARIUM, { params });
};
