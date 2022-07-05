import { notification } from "antd";

export const openNotificationWithIcon = ({ type, message, description }) => {
  notification[type]({
    message,
    description,
  });
};

export const createAction = (type, payload = {}) => {
  return { type, payload };
};
export const createActionSuccess = (type, data = {}) => {
  return { type: `${type}_SUCCESS`, data };
};
export const createActionFail = (type, data = {}) => {
  return { type: `${type}_FAIL`, data };
};

export const logger = (reducer) => {
  return (preState, action) => {
    console.group(action.type);
    console.log("preState: ", preState);
    console.log("Action: ", action);
    const newState = reducer(preState, action);
    console.log("Next State: ", newState);
    console.groupEnd();
    return newState;
  };
};

export const formatNumber = (value = 0) => {
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const getLocal = (value, defaultValue = null) => {
  return JSON.parse(localStorage.getItem(value)) || defaultValue;
};

export const setLocal = ({ key, value }) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocal = (value) => {
  return localStorage.removeItem(value);
};
