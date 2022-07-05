import axios from "axios";
import { API_PATH } from "./constants";

export const cartAPI = {
  getOrderFromServe: (id) => axios.get(`${API_PATH}/orders?userID=${id}`),
  pushCartToServer: (payload) => {
    return axios.post(`${API_PATH}/orders`, payload);
  },
};
