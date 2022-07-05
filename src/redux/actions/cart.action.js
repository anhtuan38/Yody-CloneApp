import { createAction } from "../../helper";
import { REQUEST, CART_ACTION } from "../constants";

export const getOrderFromServer = (payload) =>
  createAction(REQUEST(CART_ACTION.GET_ORDER), payload);

export const addToCart = (payload) =>
  createAction(REQUEST(CART_ACTION.ADD_TO_CART), payload);

export const changeAmountProduct = (payload) =>
  createAction(REQUEST(CART_ACTION.CHANGE_AMOUNT_PRODUCT), payload);

export const removeFromCart = (payload) =>
  createAction(REQUEST(CART_ACTION.REMOVE_FROM_CART), payload);

export const pushCartToServer = (payload) =>
  createAction(REQUEST(CART_ACTION.PUSH_CART), payload);

export const cancelOrder = (payload) =>
  createAction(REQUEST(CART_ACTION.CANCEL_ORDER), payload);
