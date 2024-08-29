import { ENDPOINTS } from "../../../constants/API";
import axiosConfig from "../../../utils/services/axiosConfig";

export const initBooking = (data: any) => {
  const formData = new FormData();
  formData.append("UserCreatorId", data.UserCreatorId);
  formData.append("TanggalKunjungan", data.TanggalKunjungan);
  formData.append("IsPertunjukan", data.IsPertunjukan);
  formData.append("IsDiskusi", data.IsDiskusi);
  formData.append("IsPenerpongan", data.IsPenerpongan);
  formData.append("IsRoketAir", data.IsRoketAir);

  return axiosConfig.post(
    ENDPOINTS.PLANETARIUM.LIST_UPDATE_ADD_DELETE_PLANETARIUM,
    formData
  );
};
