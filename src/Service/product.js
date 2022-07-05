import axios from "axios";
import { API_PATH } from "./constants";

export const productAPI = {
  getAllProduct: () => axios.get(`${API_PATH}/products`),
  getProductDetail: (id) => axios.get(`${API_PATH}/products/${id}`),
  deleteProduct: (id) => axios.delete(`${API_PATH}/products/${id}`),
};
