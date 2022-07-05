import { createAction } from "../../helper";
import { REQUEST, PRODUCT_ACTION } from "../constants";

export const getAll = (payload) =>
  createAction(REQUEST(PRODUCT_ACTION.GET_ALL_PRODUCT), payload);

export const getProductDetail = (payload) =>
  createAction(REQUEST(PRODUCT_ACTION.GET_PRODUCT_INFO), payload);

export const filterProduct = (payload) =>
  createAction(REQUEST(PRODUCT_ACTION.FILTER_PRODUCT), payload);

export const createProduct = (payload) =>
  createAction(REQUEST(PRODUCT_ACTION.CREATE_PRODUCT), payload);

export const updateProduct = (payload) =>
  createAction(REQUEST(PRODUCT_ACTION.UPDATE_PRODUCT), payload);

export const deleteProduct = (payload) =>
  createAction(REQUEST(PRODUCT_ACTION.DELETE_PRODUCT), payload);
