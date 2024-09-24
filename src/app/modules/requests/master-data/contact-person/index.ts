import { ENDPOINTS } from "../../../../constants/API";
import axiosConfig from "../../../../utils/services/axiosConfig";

export const add = (data: any) => {
  return axiosConfig.post(
    ENDPOINTS.CONTACT_PERSON.LIST_UPDATE_ADD_DELETE_CONTACT_PERSON,
    JSON.stringify(data)
  );
};

export const getAll = () => {
  return axiosConfig.get(
    ENDPOINTS.CONTACT_PERSON.LIST_UPDATE_ADD_DELETE_CONTACT_PERSON
  );
};

export const remove = (actor: string) => {
  return axiosConfig.delete(
    `${ENDPOINTS.CONTACT_PERSON.LIST_UPDATE_ADD_DELETE_CONTACT_PERSON}`,
    {
      actor: actor,
    }
  );
};

export const update = (data: any) => {
  return axiosConfig.put(
    `${ENDPOINTS.CONTACT_PERSON.LIST_UPDATE_ADD_DELETE_CONTACT_PERSON}`,
    JSON.stringify(data)
  );
};
