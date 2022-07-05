import axios from "axios";
import { API_PATH } from "./constants";

export const authAPI = {
  login: (data) => axios.post(`${API_PATH}/login`, data),
  register: (data) => axios.post(`${API_PATH}/register`, data),
  getInfo: (data) => axios.get(`${API_PATH}/users/${data.id}`),
  changePassword: (id, data) => axios.patch(`${API_PATH}/users/${id}`, data),
  updateInfo: (id, data) => axios.patch(`${API_PATH}/users/${id}`, data),
  getAllUsers: () => axios.get(`${API_PATH}/users`),
};
