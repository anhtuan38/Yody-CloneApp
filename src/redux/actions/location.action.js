import { createAction } from "../../helper";

import { REQUEST, LOCATION_ACTION } from "../constants";

export const getCities = (payload) =>
  createAction(REQUEST(LOCATION_ACTION.GET_CITIES), payload);

export const getDistricts = (payload) =>
  createAction(REQUEST(LOCATION_ACTION.GET_DISTRICTS), payload);

export const getWards = (payload) =>
  createAction(REQUEST(LOCATION_ACTION.GET_WARDS), payload);
