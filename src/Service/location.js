import axios from "axios";
import { API_PATH } from "./constants";

export const locationAPI = {
  getCities: (id) => axios.get(`${API_PATH}/cities?code=${id}`),
  getDistricts: (id) => axios.get(`${API_PATH}/districts?code=${id}`),
  getWards: (id) => axios.get(`${API_PATH}/wards?code=${id}`),
};
